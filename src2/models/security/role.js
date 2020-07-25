import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {message } from 'antd'
import roleService,* as role from 'services/security/role'
import { pageModel } from 'models/common'
import {l2t,apiPrefix } from 'utils'

export default modelExtend(pageModel, {

  namespace: 'secRole',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    pershow:false, 
    usershow : false,
    dpshow : false,
    perDatas:[],
    checkedKeys:[],
    roleId:'',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/security/roles') {
          dispatch({ 
              type: 'query', 
              payload: location.query || {},
          })
        }
      })
    },
  },

  effects: {
    * query ({payload}, { call, put }) {
        const {success, data} = yield call(role.query, payload)
        if (success) {
          yield put({ type: 'hideTabPane' })
          yield put({
            type: 'querySuccess',
            payload: data,
          })
        }
    },
    
    * create ({ payload }, { call, put,select }) {
        const { data } = yield roleService.create(payload)
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.secRole)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("创建成功");
    },

    * update ({ payload }, { select, call, put }) {
        const id = yield select(({ secRole }) => secRole.currentItem.id)
        const newRole = { ...payload, id }
        const {data} = yield roleService.update(newRole)
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.secRole)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("修改成功");
    },
    
    * delete ({ payload}, { call, put, select }) {    
        let {success,data} = yield call(role.getUserByRoleID, { id:payload })         
        if(success && data && data.length>0){
          message.info("该角色已绑定用户，请先解除绑定后再删除！");
        }else{
          const { dataSource,pagination: { pageSize,current } } = yield select(_ => _.secRole)
          let {success,data} = yield call(role.remove, { id:payload })
          if(dataSource.length==1&&current>1){
            let currentPage=current-1;
            yield put({ type: 'query', payload: {pageSize, page:currentPage }})
          }else{
            yield put({ type: 'query', payload: {pageSize, page:current }})
          }
          message.info("删除成功");
        }                            
      },

    * perSetting ({ currentItem }, {call,put}) {
        const {data} = yield call(role.perScanall)
        let firstCode=[];
        let parentDatas={};
        const nodes=l2t(data,{key_id:"code",key_parent:"parentCode"})
        const newNodes = (nodes,i=0) => nodes.map((item) => {
            let code=item.code;
            const first=code.split('.');
            item.first=first[0];
            firstCode.push(first[0]);
        });
        newNodes(nodes);
        let parent=Array.from(new Set(firstCode));
        for(let i=0;i<parent.length;i++){
          let temp=[];
          for(let j=0;j<nodes.length;j++){
            if(nodes[j].first===parent[i]){
              temp.push(j);
            }
          }
          parentDatas[parent[i]]=temp;
        }
        
        const checkeds = yield call(role.getPernByRoleID, { id:currentItem.id })
        yield put({ type: 'showPerSetting',currentItem,perDatas:data,parentDatas,checkedKeys:checkeds.data})
      },
      
    * savePerSet ({data}, {call,put}) {
        const url = `${apiPrefix}/security/permission/role/${data.roleId}`
        yield roleService.create(data.ids,url)
        yield put({ type: 'hideTabPane' })
      },
      
    * userSettings (payload, {call,put}) {
        const userIDs = yield call(role.getRoleUser, { id:payload.currentItem.id })
        let data = {};
        if (userIDs.data.length !== 0) {
          const value = yield call(role.getRoleUserByID,{page:payload.page.current,pageSize:payload.page.pageSize,userIDs:userIDs.data})
          data = value.data;
        }
        yield put({ type: 'showUserSetting',currentItem:payload.currentItem,userListDatas:data.data,userLength:data.length,userPage:data.page,userPageSize:data.pageSize})
      },

    * queryUnauthorizedUsers ({ roleId,unauthorizedPage,unauthorizedPageSize,userfilter}, { call, put }) {
        const userIDs = yield call(role.getRoleUser, { id:roleId })   
        const {data} = yield call(role.getUnauthorRoleUserByID,{userIDs:userIDs.data,unauthorizedPage,unauthorizedPageSize,userfilter})
        yield put({ type: 'showUserModal',unAuthorizedUserDatas:data.data,unauthorizedLength:data.length,unauthorizedPage,unauthorizedPageSize  })
      },

    * userAuthorize ({ payload }, {call,put,select}) {
        yield call(role.bindRoleUsers,{roleId:payload.currentItem.id,userIds:payload.ids})
        yield put({ type: 'hideUserModal',selectedRowKeys:[] })
        yield put({ type: 'userSettings', currentItem:payload.currentItem,page:{current:1,pageSize:10}})
    },
    
    * delRoleUsersByIds (payload, {call,put}) {
          yield call(role.delRoleUsersByIds, {...payload})
      },
    * dpSetting (payload, {call,put}) {
          yield put({ type: 'showdpSetting' })
      },
        
  },

  reducers: {
	  showModal (state, { payload }) {
		  return { ...state, ...payload, modalVisible: true }
	  },

	  hideModal (state) {
		  return { ...state, modalVisible: false }
    },
      
	  hideTabPane (state) {
		  return { ...state, pershow:false, usershow : false, dpshow : false }
    },

    showPerSetting(state, { perDatas,parentDatas,checkedKeys,currentItem}) {
		  return { ...state,perDatas,parentDatas,checkedKeys,currentItem, pershow : true, usershow:false, dpshow : false }
    },

    showUserSetting(state,{currentItem,userListDatas,userLength,userPage,userPageSize}) {
		  return {...state,currentItem,userListDatas,userLength,userPage,userPageSize,pershow : false, usershow:true, dpshow : false  }
    },

    showUserModal (state, { unAuthorizedUserDatas,unauthorizedLength,unauthorizedPage,unauthorizedPageSize }) {
      return { ...state, unAuthorizedUserDatas, userModalVisible: true,unauthorizedLength,unauthorizedPage,unauthorizedPageSize }
    },

    hideUserModal (state,{selectedRowKeys}) {
      return { ...state, userModalVisible: false,selectedRowKeys }
    },

    showdpSetting (state) {
		  return { ...state, pershow:false, usershow : false, dpshow : true }
    },
    
     
  },
})

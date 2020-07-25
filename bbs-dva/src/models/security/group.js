/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import * as group from 'services/security/group'
import * as user from 'services/security/user'
import { pageModel } from 'models/common'
import {message } from 'antd'

export default modelExtend(pageModel, {

  namespace: 'secGroup',
  state: {
   currentItem: {},
   modalVisible: false,
   userModalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
   usershow : false,
   groupUserDatas:[],
   groupId:'',
   groupName:'',
   unAuthorizedUserDatas:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/security/group') {
          dispatch({ 
              type: 'query', 
              payload: location.query || {},
          })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const {success, data} = yield call(group.query, payload)
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })
      }
    },

    * create ({ payload }, { call, put,select }) {
        const {data} = yield call(group.create, payload)   
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.secGroup)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("创建成功");
      },

    * update ({ payload }, { select, call, put }) {
        const id = yield select(({ secGroup }) => secGroup.currentItem.id)
        const newGroup = { ...payload, id }
        const {data} = yield call(group.update, newGroup)
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.secGroup)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("修改成功");
      },

    * delete ({ payload}, { call, put, select }) {
        let {success,data} = yield call(group.getGroupByGroupID, { id:payload })
        if(success && data && data.length>0){
          message.info("该群组已绑定用户，请先解除绑定后再删除！");
        }else{
          const { dataSource,pagination: { pageSize,current } }=yield select(_ => _.secGroup)
          let {success,data} = yield call(group.remove, { id:payload })
          if(dataSource.length==1&&current>1){
            let currentPage=current-1;
            yield put({ type: 'query', payload: {pageSize, page:currentPage }})
          }else{
            yield put({ type: 'query', payload: {pageSize, page:current }})
          }
          message.info("删除成功");
        }     
      },

    * queryAuthorizedUsers ({ groupId,groupName,userPage,userPageSize }, {call,put}) {
        const userIDs = yield call(group.getGroupByGroupID, { id:groupId })
        if(userIDs.data.length<=0){
          yield put({ type: 'showUserAuthorize',groupUserDatas:[],groupId,groupName,userLength:0,userPage,userPageSize})
        }else{
          const {data} = yield call(group.getGroupUserByID,{userIDs:userIDs.data,userPage,userPageSize})
          yield put({ type: 'showUserAuthorize',groupUserDatas:data.data,groupId,groupName,userLength:data.length,userPage:data.page,userPageSize:data.pageSize})
        }
    },

    * cancelAuthorization({ groupId,groupName,userId}, { call, put, select }){
        let {success,data} = yield call(group.removeGroupUser, { groupId,userId })
        if(success){
          yield put({ type: 'queryAuthorizedUsers', groupId,groupName,userPage:1,userPageSize:10})
          message.info("取消成功！");
        }
        
    },

    * queryUnauthorizedUsers ({ groupId,unauthorizedPage,unauthorizedPageSize,userfilter}, { call, put }) {
        const userIDs = yield call(group.getGroupByGroupID, { id:groupId })   
        const {data} = yield call(group.getUnauthorizedUsers,{userIDs:userIDs.data,unauthorizedPage,unauthorizedPageSize,userfilter})
        yield put({ type: 'showUserModal',unAuthorizedUserDatas:data.data,unauthorizedLength:data.length,unauthorizedPage,unauthorizedPageSize  })
    },

    * userAuthorize ({ payload }, {call,put,select}) {
        yield call(group.insertGroupUsers,{groupId:payload.groupId,userIds:payload.ids})
        yield put({ type: 'hideUserModal',selectedRowKeys:[] })
        yield put({ type: 'queryAuthorizedUsers', groupId:payload.groupId,groupName:payload.groupName,userPage:1,userPageSize:10})
        message.info("用户授权成功");
    }

  },

  reducers: {
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    showUserModal (state, { unAuthorizedUserDatas,unauthorizedLength,unauthorizedPage,unauthorizedPageSize }) {
      return { ...state, unAuthorizedUserDatas, userModalVisible: true,unauthorizedLength,unauthorizedPage,unauthorizedPageSize }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    hideUserModal (state,{selectedRowKeys}) {
      return { ...state, userModalVisible: false,selectedRowKeys }
    },

    hideTabPane (state) {
		  return { ...state, usershow : false}
    },

    showUserAuthorize(state, { groupUserDatas,groupId,groupName,userLength,userPage,userPageSize}) {
		  return { ...state,groupUserDatas,groupId,groupName,usershow : true,userLength,userPage,userPageSize}
    },
    
  },
})

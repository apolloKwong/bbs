/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { get, list, update, remove, create } from 'services/lookupArea'
import { treeModel } from 'models/common'
import { routerRedux } from 'dva/router'
import { i18n } from 'utils'

export default modelExtend(treeModel, {

  namespace: 'secLookupSingleLayer',
  state: {
    currentItem: null,
    selectedKeys: [],
    isSingle:false,
   },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/lookup/:id').exec(location.pathname)
        if( match && !location.query ){
          dispatch({ type: 'get', payload: { id: match[1], flag: 0}})//first
        }else if( match && location.query ){
          if(location.query.id === match[1]){
            dispatch({ type: 'get', payload: { id: location.query.id, flag: 1}})//father
          }else{
            dispatch({ type: 'get', payload: { id: location.query.id, flag: 2}})//child
          }
        }
      })
    },
  },

  effects: {
    * get ({
        payload,
      }, { call, put, select }) {
      let queryResult = { currentItem: null, selectedKeys:[], isSingle:false } 
      // const dataSource1 = yield select(_ => _.secLookupSingleLayer)
      let flag = payload.flag;
      switch(flag){
        case 0:
          const { data } = yield call(get,payload)
          let filter = { Q_groupCode_EQ: data.groupCode };
          const result = yield call(list,filter)
          queryResult.dataSource = result.data;
          queryResult.currentItem = null;
          break;
        case 1:
          const data1 = yield call(get,payload)
          data1.data.parent = data1.data.desp;
          queryResult.currentItem =  data1.data;
          queryResult.selectedKeys[0] = payload.id
          queryResult.isSingle = true;
          queryResult.flag = 1;
          break;
        case 2:
          const data2 = yield call(get,payload)
          let parentPayload = { id: data2.data.parentId+''}
          const parent = yield call(get,parentPayload)
          data2.data.parent = parent.data.desp;
          let filter2 = { Q_groupCode_EQ: parent.data.groupCode};
          const result2 = yield call(list,filter2)
          queryResult.dataSource = result2.data;
          queryResult.currentItem = data2.data;
          queryResult.currentItem.type = parent.data.type;
          if(parent.data.type === "0")
            queryResult.isSingle = true;
          queryResult.selectedKeys[0] = payload.id;
          queryResult.flag = 2;
          break;
        case 3:
          queryResult.selectedKeys[0] = payload.id;
          queryResult.currentItem = payload.currentItem;
          queryResult.currentItem.code = "";
          queryResult.currentItem.desp = "";
          queryResult.flag = 3;
          break;
      }
      yield put({ type: 'querySuccess', payload: queryResult})
    },

    * create ({ payload }, { call, put }) {
      yield put(routerRedux.push({
        pathname:location.pathname,
      }))
      const result = yield call(create,payload)
      message.success(i18n('lab.lookup.addsuccess'));  
      
    },

    * update ({ payload }, { call, put }) {
      const id = payload.id;
      const lookup = {...payload, id}
      yield put(routerRedux.push({
        pathname:location.pathname,
        query:{ id:payload.id+"" },
      }))
      yield call(update, lookup)
      message.success(i18n('lab.lookup.updatesuccess'));
      
    },

    * remove ({ payload }, { call, put }) { 
      yield put(routerRedux.push({
        pathname:location.pathname,
      }))
      yield call(remove, payload)  
      message.success(i18n('lab.lookup.delsuccess'));      
      
    },
  }, 

  reducers: {

  },
})

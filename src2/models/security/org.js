/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import orgService, { tree, getById } from 'services/security/org'
import { treeModel } from 'models/common'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default modelExtend(treeModel, {

  namespace: 'org',
  state: {
   currentItem: null,
   selectedKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/security/org') {
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
    }, { call, put, select  }) {
      let queryResult = { currentItem: null,selectedKeys:[] } 
      
        const { data } = yield orgService.list()
        queryResult.dataSource = data
        
        if(payload.id){
            const { data } = yield orgService.get(payload.id)
            queryResult.currentItem = data
            queryResult.selectedKeys[0] = payload.id
        }
        yield put({ type: 'querySuccess', payload: queryResult})
      },

    * create({
        payload,
      }, { call, put, select }) {
        yield put({type:'query', payload: {}})
        const { data } = yield orgService.create(payload)
        message.info("新增成功");
    },

    * save({
        payload,
      }, { call, put, select }) {
        yield put({type:'query', payload: {}})
        const { data } = yield orgService.update(payload)
        message.info("修改成功");
     },
     
     * delete({
         payload,
       }, { call, put, select }) {
         const { data } = yield orgService.remove(payload)
         message.info("删除成功");
         yield put({type:'query',payload: {},})
      },
  },

  reducers: {

  },
})

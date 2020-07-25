/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import menuService, { tree, getById } from 'services/menu'
import { treeModel } from 'models/common'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { i18n } from 'utils'

export default modelExtend(treeModel, {

  namespace: 'menu',
  state: {
   currentItem: null,
   selectedKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/menus') {
          dispatch({ 
              type: 'query', 
              payload: location.query || {},
          })
        }
      })
    },
  },

  effects: {
    * query({
        payload,
      }, { call, put, select }) {
        let queryResult = { currentItem: null,selectedKeys:[] } 
        const { data } = yield menuService.list()
        queryResult.dataSource = data
        
        if(payload.id){
            const { data } = yield menuService.get(payload.id)
            data.value = i18n(data.name)
            queryResult.currentItem = data
            queryResult.selectedKeys[0] = payload.id
        }
        yield put({ type: 'querySuccess', payload: queryResult})
      },
    * save({
        payload,
      }, { call, put, select }) {
        yield put({type:'query', payload: {}})
        const { data } = yield menuService.update(payload)
        message.info("修改成功");
     },
     
     * delete({
         payload,
       }, { call, put, select }) {
         yield put({type:'query', payload: {}})
         const { data } = yield menuService.remove(payload)
         message.info("删除成功");
      },

    * create({
         payload,
       }, { call, put, select }) {
         yield put({type:'query', payload: {}})
         const { data } = yield menuService.create(payload)
         message.info("新增成功");
      },
  },

  reducers: {
     
  },
})

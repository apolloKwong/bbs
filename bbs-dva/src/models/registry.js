/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import registryService, { tree, getById } from 'services/registry'
import { treeModel } from 'models/common'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default modelExtend(treeModel, {
 
  namespace: 'registry',
  state: {  
   currentItem: null, 
   selectedKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/registry') {
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

      const { dataSource } = yield select(_ => _.registry)
      if(dataSource == null || payload.id === ""){
            const { data } = yield registryService.list()
            queryResult.dataSource = data
        }
        
        if(payload.id){
            const { data } = yield registryService.get(payload.id)
            queryResult.currentItem = data
            queryResult.selectedKeys[0] = payload.id
        }
        yield put({ type: 'querySuccess', payload: queryResult})
      },
    * save({
        payload,
      }, { call, put, select }) {
        const { data } = yield registryService.update(payload)
        message.info(payload.id ? "修改成功":"创建成功");
        yield put(routerRedux.push({
             pathname:location.pathname,
             query:{id:payload.id}
         }))
     },
     
     * delete({
         payload,
       }, { call, put, select }) {
         const { data } = yield registryService.remove(payload)
         message.info("删除成功");
         yield put(routerRedux.push({
             pathname:location.pathname,
             query:{id:""}
         }))
      },

    * create({
         payload,
       }, { call, put, select }) {
         const { data } = yield registryService.create(payload)
         message.info("新增成功");
         yield put(routerRedux.push({
             pathname:location.pathname,
             query:{id:""}
         }))
      },
  },

  reducers: {
     
  },
})

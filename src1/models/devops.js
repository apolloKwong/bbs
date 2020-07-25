/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import * as devops from 'services/devops'
import { pageModel } from 'models/common'
import { message } from 'antd'

export default modelExtend(pageModel, {

  namespace: 'devOperation',
  state: {
   operationDatas:[],
   statusCode:'',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/devops') {
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
        const {success, data} = yield call(devops.query, payload)
        if (success) {
            yield put({type: 'querySuccess',payload: {operationDatas:data}})
        }
    },

    * updatePermission({item},{call,put}){
        const {data}=yield call(devops.updatePermission,item)
        if (data.code == 200) {
            message.success( "权限码更新成功",3)
		} else if (data.code == 404){
			message.error("找不到对应的微服务实例")
		} else {
			message.error(data.result)
		}
        yield put({ type: 'query'})
    },

    * refreshCache({item},{call,put}){
        const {data}=yield call(devops.refreshCache,item)
        if (data.code == 200) {
			message.success( "刷新缓存成功",3)
		} else if (data.code == 404){
			message.error("找不到对应的微服务实例")
		} else {
			message.error(data.result)
		}
        yield put({ type: 'query'})
    },

  },

  reducers: {
    
  },
})

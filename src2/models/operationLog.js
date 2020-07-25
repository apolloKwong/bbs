/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import * as operLog from 'services/operationLog'
import { pageModel } from 'models/common'
import { message } from 'antd'

export default modelExtend(pageModel, {

  namespace: 'operLog',
  state: {
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/operationLog') {
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
        const {success, data} = yield call(operLog.query, payload)
        if (success) {
            yield put({type: 'querySuccess',payload: data})
        }
    },

  },

  reducers: {
    
  },
})

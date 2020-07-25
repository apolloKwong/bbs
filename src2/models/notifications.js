import modelExtend from 'dva-model-extend'
import * as notification from 'services/notification'
import * as user from 'services/security/user'
import { pageModel } from './common'
import { message } from 'antd'



export default modelExtend(pageModel, {
  namespace: 'notification',
  state: {
    dataSource: {},
    userName: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/notifications') {
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
    }, { call, put }) {
      const authInfo = yield call(user.getAuthInfo)
      const userId = authInfo.data.userId
      const userName = authInfo.data.lastname

      const result = yield call(notification.getByUserId, { userId: userId, page: payload.page, pageSize: 10 })
      const { success, message, status, data } = result
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data,
            userName: userName,
          },
        })
      } else {
        throw result
      }
    },
    * setRead({ payload, }, { select, call, put }) {
     const authInfo = yield call(user.getAuthInfo)
     const userId = authInfo.data.userId
     yield call(notification.setRead, { id: userId })
   },
   * setSingleRead({ payload, }, { select, call, put }) {
   yield call(notification.setSingleRead, { id: payload })
 },
  },


  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

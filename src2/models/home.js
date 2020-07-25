import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import pathToRegexp from 'path-to-regexp'
import * as activity from 'services/activity'
import * as training from 'services/training'
import * as poll from 'services/poll'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from './common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'sweetHome',
    state: {
        dataSource:{},
        dataTop24h:{},
        dataLatest24h:{},
        dataTraining:{},
        dataPoll:{},
    },
    subscriptions: {
      setup({ dispatch, history }) {
          history.listen((location) => {
              if (location.pathname === '/home') {
                  dispatch({
                      type: 'query',
                      payload: location.query || {},
                  })
              } 
          })
      },
  },
    effects: {
      *query({ payload}, { call, put }) {
          const authInfo = yield call(user.getAuthInfo)
          const userId = authInfo.data.userId
          const name = authInfo.data.lastname
          const List = yield call(activity.query, payload)
          const { success, message, status, data } = List
          const dataPage = payload.page
          const length = data.length

          const resultTop24h = yield call(resource.top24h)
          const dataTop24h=resultTop24h.data
          const resultLatest24h = yield call(resource.latest24h)
          const dataLatest24h=resultLatest24h.data

          const ListTraining = yield call(training.query, payload)
          const dataTraining=ListTraining.data
          const ListPoll = yield call(poll.query, payload)
          const dataPoll=ListPoll.data
          if (success) {
              yield put({
                  type: 'querySuccess',
                  payload: {
                      dataSource: data,
                      dataTop24h:  dataTop24h,
                      dataLatest24h: dataLatest24h,
                      dataTraining:dataTraining,
                      dataPoll:dataPoll,

                      userName: name,
                  }
              })
          } else {
              throw result
          }
      },
  },

  reducers: {
      querySuccess(state, { payload }) {

          return {
              ...state,
              ...payload,
          }
      },
  
  }
})
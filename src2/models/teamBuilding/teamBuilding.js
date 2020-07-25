import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import pathToRegexp from 'path-to-regexp'
import * as activity from 'services/activity'
import * as training from 'services/training'
import * as poll from 'services/poll'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'teamBuilding',
    state: {
        dataSource:{},
        pageM:1,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname}) => {
                const match = pathToRegexp('/teamBuilding/:name').exec(pathname)
                if (match) {  
                  const name = match[1]             
                  dispatch({ type: 'query', payload: { name:name,page:1} })
                }
            })
        },
    },
    effects: {
      *query({ payload}, { call, put }) {
          const authInfo = yield call(user.getAuthInfo)

          const userId = authInfo.data.userId
          const name = authInfo.data.lastname
          let meme = activity
          if(payload.name == 'activity') {
            meme = activity
          }
          else if(payload.name == 'training') {
            meme = training
          }
          else if(payload.name == 'poll') {
            meme = poll
          }
          const List = yield call(meme.query, payload)
          const { success, message, status, data } = List
          const dataPage = payload.page
          const length = data.length

          if (success) {
              yield put({
                  type: 'querySuccess',
                  payload: {
                      dataSource: data,
                      activityNum: length,
                      userName: name,
                      pageM:dataPage
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
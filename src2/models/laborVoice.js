import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import pathToRegexp from 'path-to-regexp'
import * as activity from 'services/activity'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from './common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'laborVoice',
    state: {
        dataSource:{},
        pageM:1,
    },
    subscriptions: {
      setup({ dispatch, history }) {
        history.listen(({pathname}) => {
            const match = pathToRegexp('/laborVoice/:name').exec(pathname)
            if (match) {  
              const name = match[1]             
              dispatch({ type: 'query', payload: { name:name,page:1} })
            }
        })
    },
    },
    effects: {
      *query({ payload}, { call, put }) {
          console.log("payload",payload)


          const authInfo = yield call(user.getAuthInfo)

          const userId = authInfo.data.userId
          const name = authInfo.data.lastname
          let meme = activity
          if(payload.name == 'hot') {
            meme = activity
          }
          else if(payload.name == 'suggest') {
            meme = activity
          }
          else if(payload.name == 'voice') {
            meme = activity
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
import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import * as activity from 'services/activity'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'


export default modelExtend(pageModel, {

  namespace: 'activityDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/teamBuilding/activity/activityDetail/:id').exec(pathname)
        if (match) {
          const id = parseInt(match[1])
          dispatch({ type: 'query', payload: { id: id } })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const result = yield call(activity.get, { id: payload.id })
      const userId = result.data.userId
      const authInfo = yield call(user.get,{id:userId})
      const userName = authInfo.data.lastname
      const organization = authInfo.data.orginfoName
      const { data,success } = result
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
            userName: userName,
            organization: organization,
          },
        })
      } else {
        throw data
      }
    },
  },



  
  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

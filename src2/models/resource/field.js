import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'



export default modelExtend(pageModel, {

  namespace: 'field',

  state: {
    dataSource: {},
    userName: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/share/field/:id').exec(pathname)
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
      const result = yield call(resource.getByFieldName2, { fieldName: payload.id, page: payload.page, pageSize:10})
      const authInfo = yield call(user.getAuthInfo)
      const userId = authInfo.data.userId
      const userName = authInfo.data.lastname
    
      const { success, message, status, data  } = result

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

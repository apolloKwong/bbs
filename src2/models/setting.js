/* global location */
import pathToRegexp from 'path-to-regexp'
import * as userService  from 'services/security/user'
import { query } from 'services/app'
import { pageModel } from 'models/common'
import { message } from 'antd'

export default {

  namespace: 'curUser',

  state: {
      currentUser: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/setting') {
          dispatch({ 
              type: 'getUser', 
              payload: {}
          })
        }
      })
    },
  },

// effects 理解为异步
// reducers 同步

// call 是调用执行一个函数 (调用service里面的方法)
// put 则是相当于 dispatch 执行一个 action
// select 则可以用来访问其它 model
  effects: {
    * getUser ({
      payload,
    }, { call, put ,select }) {
      const authInfo = yield call(query)
      const user = yield call(userService.get, { id : authInfo.data.userId })
      if (user) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentUser: user.data
          }
        });
      } 
    },


    * modify({payload}, { select, call, put }) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentUser: payload
          }
        })
        yield call(userService.modify, payload)
        message.info("修改成功");
    },

    * modifyPwd({payload}, { select, call, put }) {
        yield put({
          type: 'querySuccess',
          payload: {
            currentUser: payload
          }
        })
        yield call(userService.modifyPwd, payload)
        message.info("修改成功");
    }
  },

  reducers: {
      querySuccess (state, { payload }) {
        return {
          ...state,
          ...payload,
        }
      },
  },
}

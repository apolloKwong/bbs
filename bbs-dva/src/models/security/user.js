/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import * as user from 'services/security/user'
import { pageModel } from 'models/common'
import { message } from 'antd'

export default modelExtend(pageModel, {

  namespace: 'secUser',

  state: {
   currentItem: {},
   modalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/security/users') {
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
    }, { call, put }) {
      const result = yield call(user.query, payload)
      const { success, message, status, data } = result
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })
      } else {
        throw result
      }
    },

    * create ({ payload }, { call, put,select }) {
      const {data} = yield call(user.create, payload)
      message.info("新增成功");   
      yield put({ type: 'hideModal' })
      const { pagination: { pageSize,current } } = yield select(_ => _.secUser)
      debugger
      yield put({ type: 'query', payload: {pageSize, page:current } })
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ secUser }) => secUser.currentItem.id)

      const newUser = { ...payload, id }
  
      const {data} = yield call(user.update, newUser)
      message.info("修改成功");
      yield put({ type: 'hideModal' })
      const { pagination: { pageSize,current } } = yield select(_ => _.secUser)
      yield put({ type: 'query', payload: {pageSize, page:current } })
    },
  },

  reducers: {
     showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },
  },
})

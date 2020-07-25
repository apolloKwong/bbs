/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query ,remove ,update ,create} from 'services/i18n'
import { pageModel } from 'models/common'
import React from 'react'
import { i18n }  from 'utils'

export default modelExtend(pageModel, {

  namespace: 'secI18n',
  state: {
   currentItem: {},
   modalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/i18n') {
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
      const { data } = yield call(query, payload)
        yield put({
          type: 'querySuccess',
          payload: data,
        })
    },

    * remove ({
          payload,
        }, { call, put }) {
        const { success } = yield call(remove, payload)
        if (success) {
          const { data } = yield call(query,{})
          yield put({
            type: 'querySuccess',
            payload: data,
          })            
          message.success(i18n('lab.i18n.delnice'));
        }
      },

    * create ({ payload }, { call, put }) {
      const { success } = yield call(create, payload)
      if (success) {
        yield put({ type: 'hideModal' })
        const { data } = yield call(query,{})
        yield put({
          type: 'querySuccess',
          payload: data,
        }) 
        message.success(i18n('lab.i18n.addnice'));
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ secI18n }) => {
          return secI18n.currentItem.id})
      const obj = { ...payload, id }
      yield call(update, obj)
        yield put({ type: 'hideModal' })
        const { data } = yield call(query,{})
        yield put({
          type: 'querySuccess',
          payload: data,
        })
        message.success(i18n('lab.i18n.upeditnice'));
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

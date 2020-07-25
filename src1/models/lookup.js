/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query ,remove ,update ,create } from 'services/lookup'
import { pageModel } from 'models/common'
import { i18n } from 'utils'

export default modelExtend(pageModel, {

  namespace: 'secLookup',
  state: {
   currentItem: {},
   modalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/lookup') {
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


    * remove ({ payload }, { call, put }) {
        yield call(remove, payload)
          const { data } = yield call(query,{})
          yield put({
            type: 'querySuccess',
            payload: data,
          })            
          message.success(i18n('lab.lookup.delsuccess'));
      },

    * create ({ payload }, { call, put }) {
        yield call(create, payload)
        yield put({ type: 'hideModal' })
        const { data } = yield call(query,{})
        yield put({
          type: 'querySuccess',
          payload: data,
        }) 
        message.success(i18n('lab.lookup.addsuccess'));   
    },

    * update ({ payload }, { select, call, put }) {
        const id = yield select(({ secLookup }) => {
            return secLookup.currentItem.id})
        const newUser = { ...payload, id }
        yield call(update, newUser)
        yield put({ type: 'hideModal' })
        const { data } = yield call(query,{})
        yield put({
          type: 'querySuccess',
          payload: data,
        })
        message.success(i18n('lab.lookup.updatesuccess'));
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

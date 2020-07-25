/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { query } from 'services/workflow/workflowProcDef'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {

  namespace: 'workflowProcDef',

  state: {
   currentItem: {},
   modalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/workflow/ProcDef') {
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
      const {success, data} = yield call(query, payload)
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: data,
        })
      }
    },
    
  },

  reducers: {
    showModal (state, { payload }) {
        return { ...state, ...payload, modalVisible: true }
    },
    hideModal (state) {
        return { ...state, modalVisible: false }
    },

    showDiagramModal (state, {payload}) {
        return { ...state, ...payload, diagramModalVisible: true}
    },
    hideDiagramModal (state) {
      return { ...state, diagramModalVisible: false}
    },
  },
})

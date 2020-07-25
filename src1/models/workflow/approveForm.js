/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { getInstance, list } from 'services/workflow/workflowApprove'
import { message } from 'antd'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {

  namespace: 'approveForm',
  state: {
    currentItem: {},
   },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/workflow/inst/:id').exec(location.pathname)
        if(match){
            dispatch({
              type:'getInstance',
              payload:{ id:match[1] }
            })
        }
      })
    },
  },

  effects: {
    * getInstance ({
      payload,
    }, { call, put }) {
      const { data } = yield call(getInstance, payload)
      let qs = { Q_procinstId_EQ : payload.id};
      const result = yield call(list, qs)
        yield put({
          type: 'querySuccess',
          payload: { currentItem: data,
                     wfLog: result.data,},
        })
    },
    
  },

  reducers: {
    showDiagramModal (state, {payload}) {
        return { ...state, ...payload, diagramModalVisible: true}
    },
    hideDiagramModal (state) {
      return { ...state, diagramModalVisible: false}
    },
  },
})

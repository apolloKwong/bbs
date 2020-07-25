/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {message } from 'antd'
import * as wfHandin from 'services/workflow/workflowHandin'
import * as wfDef from 'services/workflow/workflowProcDef'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {

  namespace: 'workflowHandin',

  state: {
   currentItem: {},
   modalVisible: false,
   modalType: 'create',
   selectedRowKeys: [],
   dataSource:[],
   typeData:[],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/workflow/Handin') {
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
      const {success, data} = yield call(wfHandin.query, payload)
      const result = yield call(wfDef.list,{})
      let temp = {data:[],typeData:[]}
      temp.data = data.data;
      temp.typeData = result.data;
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: temp,
          // payload:data,
        })
      }
    },
    
  },

  reducers: {
     
  },
})

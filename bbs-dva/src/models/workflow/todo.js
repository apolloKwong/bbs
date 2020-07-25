/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {message } from 'antd'
import * as wfTodo from 'services/workflow/workflowTodo'
import * as wfDef from 'services/workflow/workflowProcDef'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {

  namespace: 'workflowTodo',

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
        if (location.pathname === '/workflow/Todo') {
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
      const {success, data} = yield call(wfTodo.query, payload)
      const result = yield call(wfDef.list,{})
      let temp = {data:[],typeData:[]}
      temp.data = data.data;
      temp.typeData = result.data;
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: temp,
          // payload: data,
        })
      }
    },
    
  },

  reducers: {
     
  },
})

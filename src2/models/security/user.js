/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import * as user from 'services/security/user'
import * as user1 from 'services/user1'
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
      const id=data.id
      const extendData={}
      extendData.userId=id
      extendData.userImage="http://img4.imgtn.bdimg.com/it/u=2756483497,3832097767&fm=27&gp=0.jpg"  
      yield call(user1.create,extendData)
      
      message.info("新增成功");   
      yield put({ type: 'hideModal',payload:extendData })
      const { pagination: { pageSize,current } } = yield select(_ => _.secUser)
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

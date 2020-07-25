import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import {message } from 'antd'
import jobService ,* as job from 'services/job'
import { pageModel } from 'models/common'
import {apiPrefix } from 'utils'

export default modelExtend(pageModel, {

  namespace: 'jobModel',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/job') {
          dispatch({ 
              type: 'query', 
              payload: location.query || {},
          })
        }
      })
    },
  },

  effects: {
    * query ({payload}, { call, put }) {
        const {success, data} = yield call(job.query, payload)
        if (success) {
          yield put({
            type: 'querySuccess',
            payload: data,
          })
        }
    },
    * create ({ payload }, { call, put,select }) {
        const { data } = yield jobService.create(payload)
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.jobModel)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("创建成功");
    },

    * update ({ payload }, { select, call, put }) {
        const id = yield select(({ jobModel }) => jobModel.currentItem.id)
        const newJob = { ...payload, id }
        const {data} = yield jobService.update(newJob)
        yield put({ type: 'hideModal' })
        const { pagination: { pageSize,current } } = yield select(_ => _.jobModel)
        yield put({ type: 'query', payload: {pageSize, page:current } })
        message.info("修改成功");
    },
    * delete ({ payload}, { call, put, select }) {
        const { pagination: { pageSize,current } } = yield select(_ => _.jobModel)
        yield jobService.remove(payload)
        yield put({ type: 'query', payload: {pageSize, page:current }})
    },
    * startJob ({ payload }, { call, put, select }) {
          const { pagination: { pageSize,current } } = yield select(_ => _.jobModel)
          const {data} = yield call(job.startJob, { id:payload })
          yield put({ type: 'query', payload: {pageSize, page:current }})
      },
    * stopJob ({ payload }, { call, put, select }) {
          const { pagination: { pageSize,current } } = yield select(_ => _.jobModel)
          const {data} = yield call(job.stopJob, { id:payload })
          yield put({ type: 'query', payload: {pageSize, page:current }})
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

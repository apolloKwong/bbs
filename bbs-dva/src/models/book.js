/* global location */
import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { pageModel } from 'models/common'
import { routerRedux } from 'dva/router'
import { query , create, update, remove, get } from 'services/book'

export default modelExtend(pageModel, {

  namespace: 'wfBook',
  state: {
    currentItem: {},
    modalVisible:false,
    modalType: 'create',
   },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/book/edit/:id').exec(location.pathname)
        if(match){
          dispatch({
            type: 'get',
            payload: { id: match[1] },
          })
        }
        if (location.pathname === '/book') {
          dispatch({ 
              type: 'query', 
              payload: location.query || {},
          })
        }
      })
    },
  },

  effects: {

    * get ({ payload, }, { call, put }) {
      let temp = { currentItem:{}, modalType:'create'}
      if(payload.id==="0"){
        temp.modalType = 'create'
        yield put({
          type: 'querySuccess',
          payload: temp,
        })
      }else{
        const { data } = yield call(get, payload)
        temp.currentItem = data;
        temp.modalType = 'update';
        yield put({
          type: 'querySuccess',
          payload: temp,
        })
      }
     
    },

    * query ({
      payload,
    }, { call, put }) {
      const { data } = yield call(query, payload)
        yield put({
          type: 'querySuccess',
          payload: data,
        })
    }, 

    * create ({ payload }, { call, put }) {
        yield call(create, payload)
        yield put(routerRedux.push({
          pathname: '/book',
        })) 
        message.success("新增成功！"); 
        
    },

    * update ({ payload }, { call, put }) {
        const book = {...payload}
        yield call(update, book) 
        yield put(routerRedux.push({
          pathname: '/book',
        })) 
        message.success("修改成功！");
    },

    * remove ({ payload }, { call, put }) {
        yield call(remove, payload)
        yield put(routerRedux.push({
          pathname: '/book',
        }))            
        message.success("删除成功！");
    },
  },

  reducers: {

  },
})

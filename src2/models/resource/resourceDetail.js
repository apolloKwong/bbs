import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import * as resource from 'services/resource'
import * as downloadRecord from 'services/downloadRecord'
import * as user from 'services/security/user'
import * as user1 from 'services/user1'
import { pageModel } from '../common'
import { message } from 'antd'
import { query } from '../../services/user1'


export default modelExtend(pageModel, {

  namespace: 'resourceDetail',

  state: {
    data: {},
    dataDownloader: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/userPostings/resourceDetail/:id').exec(pathname)
        if (match) {
          const id = parseInt(match[1])
          dispatch({ type: 'query', payload: { id: id } })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const resultDownloader = yield call(user.getAuthInfo)
      const result = yield call(resource.get, { id: payload.id })
      const userId = result.data.userId
      const authInfo = yield call(user.get,{id:userId})
      const userName = authInfo.data.lastname
      const info=yield call(user1.get,{id:userId})
      const image = info.data.userImage
      const { data,success } = result
      const Downloader = resultDownloader
      const dataDownloader=Downloader.data
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data,
            userName: userName,
            image:image,
            dataDownloader:dataDownloader,
          },
        })
      } else {
        throw data
      }
    },
    * downloadsPlusOne({ }, { select, call, put }) {

      const data = yield select(_ => _.resourceDetail)
      const id = data.data.id
      yield call(resource.downloadsPlusOne, { id: id })
    },
    *create({ payload }, { call, put }) {
      const { data } = yield call(downloadRecord.create, payload)
      message.success("下载成功");
   }
  },



  
  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})

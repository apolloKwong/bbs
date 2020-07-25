import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { query } from 'services/app'
import * as plate from 'services/plate'
import * as comment from 'services/comment'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import * as user1 from 'services/user1'
import * as articleDetails from 'services/articleDetails'
import { pageModel } from './common'
import { message } from 'antd'
export default modelExtend(pageModel, {
  namespace: 'posting',
  state: {
    plateList: [],
    dataSource: {},
    dataSource_resource: {},
    replyComment: [],
    Q: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/userPostings') {
          dispatch({
            type: 'query',
            payload: location.query || {},
          })
        } else if (location.pathname === '/writearticle') {
          dispatch({
            type: 'queryforAuthInfo'
          })
        }
      })
    },
  },
  effects: {
    *query({ payload = {} }, { call, put }) {
      const authInfo = yield call(user.getAuthInfo)
      const userId = authInfo.data.userId
      const info = yield call(user1.get, { id: userId })
  
      const data1 = info.data
      const description = data1.userDescription
      const image = data1.userImage
      const name = authInfo.data.lastname

      const result = yield call(articleDetails.query, payload)
      let { success, message, status, data } = result

      const length = data.length

      const result_resource = yield call(resource.getByUserId, { userId: userId, page: payload.page, pageSize: 10 })
      const a = result_resource
      const data_resource = a.data
      if (undefined != payload.Q) {
        data.Q = payload.Q
      }
      let replyComment = []
      for (let x in data.data) {
        replyComment[x] = (undefined != data.data[x].replyComment ? data.data[x].replyComment : [])
        replyComment[x].articleId = data.data[x].id
        replyComment[x].activeKeyId = ''
        let upvoteList = data.data[x].upvoteList
        upvoteList = (undefined != upvoteList ? upvoteList : [])
        data.data[x].upvoteList = upvoteList
      }
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data,
            dataSource_resource: data_resource,
            articleNum: length,
            replyComment: replyComment,
            userName: name,
            description: description,
            image: image

          }
        })

      } else {
        throw result
      }
      let plateList = yield call(plate.query, {})
      success = plateList.success
      data = plateList.data
      if (success) {
        yield put({
          type: 'getPlate',
          payload: data.data,
        })
      } else {
        throw plateList
      }
    },
    * createComment({ payload }, { call, put, select }) {

      const replyComment = payload.replyComment
      payload = payload.e

      const authInfo = yield call(query)
      const { userId, lastname } = authInfo.data

      payload.replyUserId = userId
      payload.replyUserName = lastname
      payload.replyDate = new Date()

      yield call(comment.create, payload)
      message.info("新增成功")

      const { data } = yield call(comment.freshReply, payload.articleId)
      data.articleId = payload.articleId
      data.activeKeyId = ''
      replyComment[payload.index] = data
      yield put({
        type: 'createCommentSuccess',
        payload: replyComment
      })

    },
    * changeActiveKeyId({ payload }, { put }) {
      const replyComment = payload.replyComment
      replyComment[payload.index].activeKeyId = payload.key
      yield put({
        type: 'createCommentSuccess',
        payload: replyComment
      })
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
        Q: payload.Q,
      }
    },

    getPlate(state, { payload }) {
      return {
        ...state,
        plateList: payload,
      }
    },

    createCommentSuccess(state, { payload }) {
      return { ...state, replyComment: payload }
    },
  }
})

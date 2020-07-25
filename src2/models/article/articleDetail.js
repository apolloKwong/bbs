import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import * as article from 'services/article'
import * as user from 'services/security/user'
import * as user1 from 'services/user1'
import { pageModel } from '../common'
import { message } from 'antd'
import { query } from '../../services/user1'
import * as articleDetails from 'services/articleDetails'


export default modelExtend(pageModel, {

  namespace: 'articleDetail',

  state: {
    data: {},
    postState: '',
    replyComment: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/userPostings/articleDetail/:id').exec(pathname)
        if (match) {
          const id = parseInt(match[1])
          dispatch({ type: 'query', payload: { id: id } })
        }
      })
    },
  },

  effects: {
    * query({
      payload,
    }, { call, put }) {

      const result = yield call(articleDetails.query, {Q:'id_EQ='+payload.id})
      const { postState } = result.data.data[0]
      const { data, success } = result
      let replyComment = []
      for (let x in data.data) {
        replyComment[x] = (undefined != data.data[x].replyComment ? data.data[x].replyComment : [])
        replyComment[x].articleId = data.data[x].id
        replyComment[x].activeKeyId = ''
      }
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            data: data.data[0],
            replyComment: replyComment,
            postState: postState
          },
        })
      } else {
        throw data
      }
    },
    * editPSById({ payload }, { select, call, put }) {

      const data = yield select(_ => _.articleDetail)

      const id = data.data.id

      yield call(article.editPSById, { id: id, postState: payload })
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
      const { data } = payload
      return {
        ...state,
        ...payload,
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
  },
})

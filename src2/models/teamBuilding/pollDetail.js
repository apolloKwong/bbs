import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import * as poll from 'services/poll'
import * as pollOption from 'services/pollOption'
import * as pollRecord from 'services/pollRecord'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'


export default modelExtend(pageModel, {

  namespace: 'pollDetail',

  state: {
    data: {},
    dataOption: {},
    checkedList: [],
    checkIfPolled:{data:""},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/teamBuilding/poll/pollDetail/:id').exec(pathname)
        if (match) {
          const id = parseInt(match[1])
          dispatch({ type: 'query', payload: { id: id } })
        }
      })
    },
  },

  effects: {
    *create({ payload,pollId }, { call, put }) {
      const userInfo = yield call(user.getAuthInfo)
      const userId = userInfo.data.userId
      const data = payload.split(",")
      for ( let id in data) {
        yield call(pollOption.voteCountPlusOne, {id:data[id]})
        yield call(pollRecord.create, {pollId:pollId,pollOptionId:data[id],userId:userId})
      }
      message.success("投票成功");
   },
    * query({
      payload,
    }, { call, put }) {
      const result = yield call(poll.get, { id: payload.id })
      const userId = result.data.userId
      const authInfo = yield call(user.get, { id: userId })
      const userName = authInfo.data.lastname
      const organization = authInfo.data.orginfoName
      const { data, success } = result
      const resultOption = yield call(pollOption.getPollOptionsByPollId, payload.id)
      console.log("resultOption",resultOption)
      const userInfo2 = yield call(user.getAuthInfo)
      const loginUserId = userInfo2.data.userId
      const checkIfPolled = yield call(pollRecord.checkIfPolled,{pollId:data.id,userId:loginUserId})
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
          checkIfPolled:checkIfPolled,
          data: data,
          userName: userName,
          organization: organization,
          dataOption: resultOption.data,
          },
        })
      } else {
        throw data
      }
    },
  },




  reducers: {
    querySuccess(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    getCheckedList(state, { payload }) {
      return {
        ...state,
        checkedList: payload
      }
    },
  },
})

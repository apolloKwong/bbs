import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as poll from 'services/poll'
import * as pollOption from 'services/pollOption'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'newPolling',
    state: {
        authInfo: {},
        value: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/upload/newPoll') {
                    dispatch({
                        type: 'query',
                        payload: location.query || {},
                    })
                }
            })
        },
    },
    effects: {
        *query({ payload = {} }, { call, put }) {

            const authInfo = yield call(user.getAuthInfo)
            yield put({
                type: 'querySuccess',
                payload: authInfo
            })

        },
        *insert({ payload = {} }, { call, put ,select}){
            const data=yield select (_=>_.activityUploading)
            
        },

        *create({ payload }, { call, put }) {
            const {data} = yield call(poll.create, payload)
              for (let i in payload['key'].keys) {
                  const key = payload.key.keys[i]
                  yield call(pollOption.create, {pollId:data,content:payload.key[`option-${key}`],voteCount:0,status:1})
              }
            message.success("发布成功");
        }
    },





    reducers:{

        querySuccess(state, { payload }) {
            return {
                ...state, authInfo: payload
            }
        },
        getValue(state, { payload }) {
            return {
                ...state,
                value: payload
            }
        },




    },
    
})
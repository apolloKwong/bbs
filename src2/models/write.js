import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as article from 'services/article'
import * as user from 'services/security/user'
import { pageModel } from './common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'writing',
    state: {
        richValue: {},
        authInfo: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/writearticle') {
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
            const data=yield select (_=>_.writing)
            
        },

        *create({ payload }, { call, put }) {
            const { data } = yield call(article.create, payload)


            message.success("发表成功");
        }
    },





    reducers:{


        getRichValue(state, { payload }) {
            return {
                ...state, richValue: payload
            }
        },

        querySuccess(state, { payload }) {
            return {
                ...state, authInfo: payload
            }
        }


    },
    
})
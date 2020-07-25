import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'

import { pageModel } from 'models/common'
import * as user from 'services/security/user'
import * as user1 from 'services/user1'


export default modelExtend(pageModel, {

    namespace: 'person',

    state: {
        currentItem: {},
        imgUrl: "",
        extendData: {},
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/personal') {

                    dispatch({
                        type: 'query',
                        payload: location.query || {},
                    })
                }
            })
        },
    },

    effects: {
        * query({
        payload,
    }, { call, put }) {
            const authInfo = yield call(user.getAuthInfo)
            const id = authInfo.data.userId
            // const allResult = yield call(user1.getAllInfoByUserId, { userId: id })
            const result = yield call(user.get, { id: id })
        
            const result2 = yield call(user1.get, { id: id })


            const data1 = result.data

            const data2 = result2.data


            const { success, message, status, data } = result2
            if (result.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        currentItem: data1,
                        extendData: data2,
                    }
                })

            } else {
                throw result
            }
        },


        * update1({ payload }, { select, call, put }) {
            const authInfo = yield call(user.getAuthInfo)
            const id = authInfo.data.userId
            const languageCode = "cn"
            const newUser = { ...payload, id, languageCode }
            const { data } = yield call(user.update, newUser)
        },
        * update2({ payload }, { select, call, put }) {

            const authInfo = yield call(user.getAuthInfo) 
            const userId = authInfo.data.userId
            const ids=yield call(user1.getIdByUId,{userId:userId})
            const id=ids.data
            const newUser = { ...payload, userId,id  }
            const { data } = yield call(user1.update, newUser)
            
            yield put({
                type: 'query'
            })

        },
    },

    reducers: {
        querySuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },

        getImgUrl(state, { payload }) {

            return {
                ...state,
                imgUrl: payload
            }
        }
    },
})

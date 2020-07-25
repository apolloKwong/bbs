import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'

import { pageModel } from 'models/common'
import * as user from 'services/security/user'


export default modelExtend(pageModel, {

    namespace: 'person',

    state: {
        currentItem: {},
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

            const result = yield call(user.get, { id: id })

            const { success, message, status, data } = result
            if (success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        currentItem: data
                    }
                })

            } else {
                throw result
            }
        },


        * update({ payload }, { select, call, put }) {
            const authInfo = yield call(user.getAuthInfo)
            const id = authInfo.data.userId

            const languageCode = "cn"
            const newUser = { ...payload, id, languageCode }


            const { data } = yield call(user.update, newUser)
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
    },
})

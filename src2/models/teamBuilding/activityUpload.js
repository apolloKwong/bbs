import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as activity from 'services/activity'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'activityUploading',
    state: {
        richValue: {},
        authInfo: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/upload/activityUpload') {
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
            const { data } = yield call(activity.create, payload)


            message.success("发布成功");
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
        },
    },
})
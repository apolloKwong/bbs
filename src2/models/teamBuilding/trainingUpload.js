import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as training from 'services/training'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'trainingUploading',
    state: {
        richValue: {},
        authInfo: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/upload/trainingUpload') {
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
            const data=yield select (_=>_.trainingUploading)
            
        },

        *create({ payload }, { call, put }) {
            const { data } = yield call(training.create, payload)


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
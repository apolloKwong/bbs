import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'uploading',
    state: {
        richValue: {},
        fileUrl: "",
        fileSize: "",
        authInfo: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/upload/resourceUpload') {
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
            const data=yield select (_=>_.uploading)
            
        },

        *create({ payload }, { call, put }) {
            const { data } = yield call(resource.create, payload)

            message.success("上传成功");
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

        getFileUrl(state, { payload }) {
            return {
                ...state,
                fileUrl: payload
            }
        },

        getFileSize(state, { payload }) {
            return {
                ...state,
                fileSize: payload
            }
        }


    },
    
})
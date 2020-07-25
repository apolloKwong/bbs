import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as question from 'services/questionbar/question'
import * as classification from 'services/questionbar/classification'
import { pageModel } from '../common'
import { message } from 'antd'

const { prefix } = config


export default modelExtend(pageModel, {
    namespace: 'question',

    state: {
        questionsdata: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/questionbar/question') {
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
            let questionsdata = yield call(classification.CorrespondingQuestion, payload)
            let { success, message, status, data } = questionsdata
            if (undefined != payload.Q) {
                data.Q = payload.Q
            }          
            if (success) {             
                yield put({
                    type: 'getCorrespondingQuestion',
                    payload: data.data
                })
            } else {
                throw questionsdata
            }
           
        },

    },


    reducers: {
        getCorrespondingQuestion(state, { payload }) {
            return { ...state, questionpayload: payload }
        },

    }

})


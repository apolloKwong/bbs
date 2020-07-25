import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as internet from 'services/internet'
//import * as user from 'services/user'
import { pageModel } from './common'
import { message } from 'antd'

const { prefix } = config


export default modelExtend(pageModel, {
    namespace: 'internet',

    state: {
        internetdata: [],
        internetload:[],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/internet') {
                    dispatch({
                        type: 'query',
                        payload: location.query || {},
                    })
                     console.log("q")
                }
            })
        },
    },
    
    effects: {
        *query({ payload = {} }, { call, put }) {
           // let internetdata = yield call(internet.query,payload)
          // let internetdata= yield call(user.query)
       
           let internetdata= yield call(internet.querytest,payload)
            console.log("aaaaaaaaaaaaaaaa")
            console.log("99",internetdata)
            let { success, message, status, data } = internetdata
            if (undefined != payload.Q) {
                data.Q = payload.Q
            }          
            if (success) {             
                yield put({
                    type: 'query',
                    payload: data.data
                })
            } else {
                throw internetdata
            }
           
        },

    },


    reducers: {
        query(state, { payload }) {
            return { ...state, internetload: payload }
        },

    }

})


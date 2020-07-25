import pathToRegexp from 'path-to-regexp'
import modelExtend from 'dva-model-extend'
import { query } from 'services/app'
import { pageModel } from 'models/common'
import * as userService from 'services/security/user'


export default modelExtend(pageModel, {

    namespace: 'password',

    state: {
        currentUser: {},
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/modifyPassword') {

                    dispatch({
                        type: 'getUser',
                        payload: {}
                    })
                }
            })
        },
    },

    effects: {

        * getUser({
      payload,
    }, { call, put, select }) {
            const authInfo = yield call(query)
            const user = yield call(userService.get, { id: authInfo.data.userId })
            if (user) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        currentUser: user.data
                    }
                });
            }
        },
        * modifyPwd({ payload }, { select, call, put }) {
            const {currentUser}=yield select(_=>_.password)
            const auth=currentUser.currentUser
          
             const passwordInfo={...payload,...auth}
             debugger
            yield call(userService.modifyPwd, passwordInfo)
            message.info("修改成功");
        }
    },


    reducers: {
        querySuccess(state, { payload }) {
            return {
               currentUser:payload
            }
        },
    },
})

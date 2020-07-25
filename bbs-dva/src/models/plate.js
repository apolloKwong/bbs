import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as plate from 'services/plate'
import { pageModel } from './common'
import { message } from 'antd'

const { prefix } = config


export default modelExtend(pageModel, {
    namespace: 'plate',

    state: {
        modalVisible: false,
        currentItem: {},
        modalType: 'create',
        category: {}
    },




    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/plate') {
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

            const result = yield call(plate.query, payload)
             console.log("11111111111111111111",result)
            const { success, message, status, data } = result
            if (success) {
                yield put({
                    type: 'querySuccess',
                    payload: data,
                })
            } else {
                throw result
            }
                 
        },
        * create({ payload }, { call, put, select }) {
            const { data } = yield call(plate.create, payload)
            message.info("新增成功");
            yield put({ type: 'hideModal' })
            yield put({ type: 'query' })


        },


        * update({ payload }, { call, put, select }) {
            //获取命名空间为plate的所有状态，select本来就是获取state的状态
            const data1 = yield select(_ => _.plate)
            debugger
            const id = yield select(({ plate }) => plate.currentItem.id)
            console.log(id);

            const newPlate = { ...payload, id }
            const data = yield call(plate.update, newPlate)
            message.info("修改成功")
            yield put({ type: 'hideModal' })
            yield put({ type: 'query' })
        },

        *delete({ payload }, { call, put, select }) {
            let { success, data } = yield call(plate.remove, { id: payload.id })
            yield put({ type: 'query' })
        }
    },





    reducers: {
        openModal(state, { payload }) {

            return { ...state, ...payload, modalVisible: true }
        },

        hideModal(state, { payload }) {
            return { ...state, modalVisible: false }
        },

    }

















})
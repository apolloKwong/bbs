import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'

export default modelExtend(pageModel, {
    namespace: 'sharing',
    state: {
        dataSource:{},
        dataSourceDay:{},
        dataSourceWeek:{},
        dataSourceMonth:{},
        dataSourceYear:{},
        // dataSource_downloads:{},
        // dataSource_date: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/share') {
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

            const userId = authInfo.data.userId
            const name = authInfo.data.lastname

            const resourceDetailsList = yield call(resource.query, payload)
            const resultDay = yield call(resource.topEveryDay)
            const resultWeek = yield call(resource.topEveryWeek)
            const resultMonth = yield call(resource.topEveryMonth)
            const resultYear = yield call(resource.topEveryYear)
            // const result_downloads = yield call(resource.getAllByDownloads)
            // const result_date = yield call(resource.getAllByDate)
            const { success, message, status, data } = resourceDetailsList

            const Day = resultDay
            const dataDay=Day.data

            const Week = resultWeek
            const dataWeek=Week.data

            const Month = resultMonth
            const dataMonth=Month.data

            const Year = resultYear
            const dataYear=Year.data

            // const downloads = result_downloads
            // const data_downloads=downloads.data

            // const date = result_date
            // const data_date=date.data
            const length = data.length

            

            if (success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataSource: data,
                        dataSourceDay: dataDay,
                        dataSourceWeek: dataWeek,
                        dataSourceMonth: dataMonth,
                        dataSourceYear: dataYear,
                        // dataSource_downloads: data_downloads,
                        // dataSource_date:data_date,
                        resourceNum: length,
                        userName: name

                    }
                })

            } else {
                throw result
            }
        },
        


    },

    reducers: {
        querySuccess(state, { payload }) {

            return {
                ...state,
                ...payload,
            }
        },
    
    }
})
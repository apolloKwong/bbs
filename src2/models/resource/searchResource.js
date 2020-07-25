import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import * as resource from 'services/resource'
import * as user from 'services/security/user'
import { pageModel } from '../common'
import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'

export default modelExtend(pageModel, {
    namespace: 'searching',
    state: {
        searchResult:{},
        keywordModel:{},
        fieldModel:{},
        resourceTypeModel:{},
        pageM:1,
        selectedTags: "",
        selectedFields: "",
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const match = pathToRegexp('/searchResource/:field/:resourceType/:keyword').exec(pathname)
                if (match) {  
                  const field = match[1]        
                  const resourceType = match[2]
                  const keyword = match[3]        
                  dispatch({ type: 'search', payload: { keyword: keyword,field: field,resourceType: resourceType,page:1} })
                }
              })
        },
    },
    effects: {
        * search({ payload }, { call, put }) {
         
            console.log("payload",payload)
            const resultSearch = yield call(resource.search, { keyword: payload.keyword,field: payload.field,resourceType: payload.resourceType, page: payload.page, pageSize:10})
            const Search = resultSearch
            const dataSearch=Search.data
            const dataKeyword = payload.keyword
            const dataField = payload.field
            const dataResourceType = payload.resourceType
            const dataPage = payload.page
            yield put({
                type: 'searchSuccess',
                payload: {
                    searchResult:dataSearch,
                    keywordModel:dataKeyword,
                    fieldModel: dataField,
                    resourceTypeModel: dataResourceType,
                    pageM:dataPage
                
                }
            })
        },


    },

    reducers: {
        searchSuccess(state, { payload }) {
            return {                 
                ...state,
                ...payload, 
            }
        },
        getSelectedTags(state, { payload }) {
            return {
                ...state,
                selectedTags: payload
            }
        },
        getSelectedFields(state, { payload }) {
            return {
                ...state,
                selectedFields: payload
            }
        },
    }
})
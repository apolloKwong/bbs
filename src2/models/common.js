import modelExtend from 'dva-model-extend'
import { i18n } from 'utils'

const model = {
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const pageModel = modelExtend(model, {

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `${i18n('lab.cmn.total')}  ${total} ${i18n('lab.cmn.num')}`,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data, ...p } = payload
      return {
        ...state,
        ...p,
        dataSource:data,
        pagination: {
          ...state.pagination,
          current: p.page,
          pageSize: p.pageSize,
          total: p.length,
        },
      }
    },
  },

})


const treeModel = modelExtend(model, {

  state: {
     dataSource: null,
  },

  reducers: {
    querySuccess (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },
  },

})


module.exports = {
  model,
  pageModel,
  treeModel,
}

import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Modal from './Modal'
import { i18n } from 'utils'

const WorkflowBook = ({ location, dispatch, wfBook, loading}) => {
  const { dataSource, pagination, currentItem, isMotion, modalVisible, modalType, selectedRowKeys} = wfBook
  const { pageSize } = pagination


  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    footer:null,
    maskClosable: false,
    confirmLoading: loading.effects['wfBook/update'],
    title: `${modalType === 'create' ? "新增": "修改"}`,
    wrapClassName: 'vertical-center-modal',
    onOk (items) {
      dispatch({
        type: `wfBook/${modalType}`,
        payload: items,
      })
    },
    onCancel () {
      dispatch({
        type: 'wfBook/hideModal',
      })
    },
    onClear (){
      dispatch({
        type: 'wfBook/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  const listProps = {
    dataSource,
    loading: loading.effects['wfBook/query'],
    pagination,
    location,
    isMotion,
    dispatch,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem (id) {
        dispatch({
          type: 'wfBook/remove',
          payload: id,
        })
      },
    onEditItem (item) {
        dispatch({
            type: 'wfBook/showModal',
            payload: {
            modalType: 'update',
            currentItem: item,
            },
        })
    },
  }

  return (
    <div className="content-inner">
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

WorkflowBook.propTypes = {
  workflowProcDef: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ wfBook, loading }) => ({ wfBook, loading }))(WorkflowBook)

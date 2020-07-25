import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import DiagramModal from '../DiagramModal'
import { i18n } from 'utils'

const ProcDef = ({ location, dispatch, workflowProcDef, loading}) => {
  const { dataSource, pagination, currentItem, modalVisible, diagramModalVisible, modalType, isMotion, selectedRowKeys} = workflowProcDef
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    width:250,
    footer:null,
    maskClosable: false,
    confirmLoading: loading.effects['workflowProcDef/update'],
    title: `${modalType === 'create' ? `${i18n('lab.wf.procmodalpub')}` :""}`,
    wrapClassName: 'vertical-center-modal',
    onOk (items) {
      dispatch({
        type: `workflowProcDef/${modalType}`,
        payload: items,
      })
    },
    onCancel () {
      dispatch({
        type: 'workflowProcDef/hideModal',
      })
    },
  }

  const DiagramModalProps = {
    item:currentItem,
    title:`${i18n('lab.wf.procdiag')}`,
    visible:diagramModalVisible,
    width:1000,
    height:500,
    footer:null,
    maskClosable:false,
    wrapClassName: 'vertical-center-modal',
    onCancel () {
      dispatch({
        type:`workflowProcDef/hideDiagramModal`,
      })
    }
  }

  const listProps = {
    dataSource,
    loading: loading.effects['workflowSpon/query'],
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
    onDiagramShow (id) {
      dispatch({
        type: `workflowProcDef/showDiagramModal`,
        payload:{
          currentItem: {
            id}, 
        }
      })
    }
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }))
    },
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {diagramModalVisible && <DiagramModal {...DiagramModalProps}/>}
    </div>
  )
}

ProcDef.propTypes = {
  workflowProcDef: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ workflowProcDef, loading }) => ({ workflowProcDef, loading }))(ProcDef)

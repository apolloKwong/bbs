import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { i18n } from 'utils'

const Lookup = ({ location, dispatch, secLookup, loading }) => {
  const { dataSource, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = secLookup
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    footer:null,
    maskClosable: false,
    confirmLoading: loading.effects['secLookup/update'],
    title: `${modalType === 'create' ? i18n('lab.lookup.add'): i18n('lab.lookup.edit')}`,
    wrapClassName: 'vertical-center-modal',
    onOk (items) {
      dispatch({
        type: `secLookup/${modalType}`,
        payload: items,
      })
    },
    onCancel () {
      dispatch({
        type: 'secLookup/hideModal',
      })
    },
    onClear (){
      dispatch({
        type: 'secLookup/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
  }

  const listProps = {
    dataSource,
    loading: loading.effects['secLookup/query'],
    pagination,
    location,
    isMotion,
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
        type: 'secLookup/remove',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'secLookup/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
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
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/lookup/dataType',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/lookup/dataType',
      }))
    },
    onAdd () {
      dispatch({
        type: 'secLookup/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'secLookup/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'secLookup/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps}/>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Lookup.propTypes = {
  secLookup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ secLookup, loading }) => ({ secLookup, loading }))(Lookup)

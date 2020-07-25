import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { i18n }  from 'utils'

const User = ({ location, dispatch, secI18n, loading }) => {
  const { dataSource, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = secI18n
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['user/update'],
    title: `${modalType === 'create' ? i18n('lab.i18n.add') : i18n('lab.i18n.upedit')}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `secI18n/${modalType}`,
        payload: data,
      })
    },
    onCancel () {
      dispatch({
        type: 'secI18n/hideModal',
      })
    },
  }

  const listProps = {
    dataSource,
    loading: loading.effects['secI18n/query'],
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
        type: 'secI18n/remove',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'secI18n/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'secI18n/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
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
        type: 'secI18n/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'secI18n/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'secI18n/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
        <Filter {...filterProps}/>
      {/* {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      } */}
      <List {...listProps} />
      {/* {modalVisible} */}
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

User.propTypes = {
  secI18n: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ secI18n, loading }) => ({ secI18n, loading }))(User)

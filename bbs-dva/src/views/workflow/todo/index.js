import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import List from './List'
import Filter from './Filter'

const Todo = ({ location, dispatch, workflowTodo, loading}) => {
  const { dataSource, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys, typeData } = workflowTodo
  const { pageSize } = pagination

  
  const listProps = {
    dataSource,
    loading: loading.effects['workflowTodo/query'],
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
  }

  const filterProps = {
    isMotion,
    typeData:typeData,
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
      {modalVisible}
    </div>
  )
}

Todo.propTypes = {
  workflowTodo: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ workflowTodo, loading }) => ({ workflowTodo, loading }))(Todo)

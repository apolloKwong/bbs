import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Tabs } from 'antd'
import Filter from './Filter'
import Grid from "components/Grid"
import { hasPerm, i18n, PERMS } from 'utils'

const Log = ({ location, dispatch, operLog, loading }) => {
  const {dataSource, pagination} = operLog
  const { pageSize } = pagination

  const listProps = {
    dataSource,
    loading: loading.effects['operLog/query'],
    location,
    pagination,
    onChange(page) {
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
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
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

  const columns = [
   {
       title: i18n('lab.operlog.operCode'),
       width:80,
       dataIndex: 'operCode', 
   },{
       title: i18n('lab.operlog.operDesc'),
       width: 120,
       dataIndex: 'operDesc'
   }, {
       title: i18n('lab.operlog.resCode'),
       width: 80,
       dataIndex: 'resCode'
   },{
       title: i18n('lab.operlog.resDesc'),
       width: 80,
       dataIndex: 'resDesc'
  },{
       title: i18n('lab.operlog.paramDesc'),
       width: 80,
       dataIndex: 'paramDesc'
  },{
       title: i18n('lab.operlog.methodName'),
       width: 80,
       dataIndex: 'methodName'
  },{
       title: i18n('lab.operlog.createUserId'),
       width: 80,
       dataIndex: 'createUserId'
  },{
       title: i18n('lab.operlog.ipAddress'),
       width: 80,
       dataIndex: 'ipAddress'
  },{
       title: i18n('lab.operlog.createDate'),
       width: 80,
       dataIndex: 'createDate'
  }];

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <Grid  {...listProps} rowKey='id' columns={columns} title={i18n('lab.operlog.operlog')} />
    </div>
  )
}

Log.propTypes = {
  operLog: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ operLog, loading }) => ({ operLog, loading }))(Log)

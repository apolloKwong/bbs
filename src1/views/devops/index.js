import React from 'react'
import PropTypes from 'prop-types'
import { Card, Col, Row, Button, Table } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { hasPerm, i18n } from 'utils'

const OperationList = ({ location, devOperation, dispatch, ...tableProps }) => {
  const { operationDatas, statusCode } = devOperation
  const length = operationDatas.length;

  const gridStyle = {
    width: '30%',
    textAlign: 'center',
    margin: '10px 20px',
  };
  const column = []
  const updatePermission = (item) => {
    dispatch({
      type: 'devOperation/updatePermission',
      item: item,
    })
  }

  const refreshCache = (item) => {
    dispatch({
      type: 'devOperation/refreshCache',
      item: item,
    })
  }

  return (
    <Card title={i18n('lab.opmanage.list')} noHovering>

      {
        _.map(operationDatas, function (item) {
          return (
            <Card.Grid style={gridStyle} key={item.serviceName}>
              <Card title={<h3>{item.serviceName}</h3>}>
                <div >
                  <Button type="primary" htmlType="submit" onClick={() => { updatePermission(item) }}>{i18n('lab.opmanage.update')}</Button>
                  <Button type="primary" htmlType="submit" onClick={() => { refreshCache(item) }} style={{ margin: '0px 50px' }}>{i18n('lab.opmanage.refresh')}</Button>
                </div>
              </Card>
            </Card.Grid>
          )
        })
      }
    </Card>
  )
}

OperationList.propTypes = {
  dispatch: PropTypes.func,
  location: PropTypes.object,
  devOperation: PropTypes.object,
}

export default connect(({ devOperation, dispatch }) => ({ devOperation, dispatch }))(OperationList)

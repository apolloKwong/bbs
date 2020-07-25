import React from 'react'
import { Row, Col, Input, Select, Button, Form, Upload, message, Icon } from 'antd'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './index.less'
import WrappedDynamicFieldSet from './DynamicFieldSet.js'

const FormItem = Form.Item
const newPoll = ({ loading, newPolling, dispatch, location
}) => {

  const { authInfo,value } = newPolling
  const onClickpublish = (value) => {
    const title = value.title
    const hits = value.hits
    const key = value
    const postdate = getNowFormatDate()
    const deadline = value.deadline.format('YYYY-MM-DD HH:mm:ss')
    console.log("deadline",deadline)
    function getNowFormatDate() {
      let date = new Date();

      return date;
    }
    const data = {}
    data.postDate = postdate
    data.userId = authInfo.data.userId
    data.status = 1
    data.title = title
    data.deadline = deadline
    data.hits = hits
    data.key = key
    dispatch({
      type: 'newPolling/create',
      payload: data
    })
    dispatch(routerRedux.push({
      pathname: '/teamBuilding/poll',
    }))

  }
  const uploadProps = {
    getValue(data) {
      dispatch({
        type: 'newPolling/getValue',
        payload: data
      })

    },
    onClickpublish,
  }

  return (
    <div className={styles.newPoll}>
        <WrappedDynamicFieldSet {...uploadProps} />
        {/* <Button type="primary" htmlType="submit" onClick={onClickpublish}>提交</Button> */}
    </div>
  )
}

export default connect(({ loading, newPolling }) => ({ loading, newPolling }))(newPoll)






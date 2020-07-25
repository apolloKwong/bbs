import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Select, Button, Form, Upload, message, Icon } from 'antd'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './index.less'
import Wangeditor from '../../../components/Wangeditor'
import { createDataForm } from 'utils'

const FormItem = Form.Item
const uploadActivity = ({ loading, trainingUploading, dispatch, location,
  form: {
    getFieldDecorator,
    getFieldValue,
    setFieldValue,
    getFormatFieldValue,
    }
}) => {

  const { richValue, authInfo } = trainingUploading
  const editorProps = {
    getValue(value) {
      dispatch({
        type: 'trainingUploading/getRichValue',
        payload: value,
      })
    }
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  const onClickpublish = () => {
    const title = getFieldValue('title')
    const postdate = getNowFormatDate()
    function getNowFormatDate() {
      let date = new Date();

      return date;
    }
    const data = {}
    data.content = richValue
    data.postDate = postdate
    data.userId = authInfo.data.userId
    data.postState = 1
    data.title = title
    dispatch({
      type: 'trainingUploading/create',
      payload: data
    })
    dispatch(routerRedux.push({
      pathname: '/teamBuilding/training',
    }))

  }


  return (
    <div className={styles.trainingUpload}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} >
          <div className={styles.title}>
            {getFieldDecorator('title')(<Input size='large' placeholder="请输入资源标题" style={{ width: 390, }} />)}
          </div>
        </FormItem ><br />

        <FormItem >
          <Wangeditor {...editorProps} />
        </FormItem >

        <FormItem  {...formItemLayout} >
          <div className={styles.operate}>
            <Button type="primary" size="large" onClick={onClickpublish}>发 布</Button>
          </div>
        </FormItem >

      </Form>
    </div>
  )
}
uploadActivity.PropTypes = {
  trainingUploading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading, trainingUploading }) => ({ loading, trainingUploading }))(createDataForm(uploadActivity))






import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Input, Select, Button, Form, Upload, message, Icon } from 'antd'

import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import styles from './index.less'
import Wangeditor from '../../../components/Wangeditor'
import { createDataForm } from 'utils'
import MyUpload from './MyUpload.js'

const FormItem = Form.Item
const uploadResource = ({ loading, uploading, dispatch, location,
  form: {
    getFieldDecorator,
    getFieldValue,
    setFieldValue,
    getFormatFieldValue,
    }
}) => {

  const { fileUrl, fileSize, richValue, authInfo } = uploading
  console.log("authInfo",authInfo)
  const editorProps = {
    getValue(value) {
      dispatch({
        type: 'uploading/getRichValue',
        payload: value,
      })
    }
  }
  const uploadProps = {
    getFileSize(data) {
      dispatch({
        type: 'uploading/getFileSize',
        payload: data
      })

    },
    getFileUrl(data) {
      dispatch({
        type: 'uploading/getFileUrl',
        payload: data
      })

    }
  }
  
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  const onClickpublish = () => {

    const resourcename = getFieldValue('resourcename')
    const field = getFieldValue('fieldname')
    const resourceType = getFieldValue('resourceType')
    const name_field = field[0]
    const name_resourceType = resourceType[0]
    const postdate = getNowFormatDate()
    function getNowFormatDate() {
      let date = new Date();

      return date;
    }
    const data = {}
    data.content = richValue
    data.downloads = 0
    data.postDate = postdate
    data.url = fileUrl
    data.size = fileSize
    data.fieldName = name_field
    data.resourceType = name_resourceType
    data.userId = authInfo.data.userId
    data.postState = 1
    data.resourceName = resourcename

    dispatch({
      type: 'uploading/create',
      payload: data
    })
    dispatch(routerRedux.push({
      pathname: '/userPostings',
    }))

  }


  return (
    <div className={styles.resourceUpload}>
      <Form layout="horizontal">
        <br />
        <FormItem  {...formItemLayout} >
          <div className={styles.field}>
            <Row>
              <Col span={3} style={{ fontSize: '14px' }}>领域范围</Col>
              <Col span={6}>{getFieldDecorator('fieldname')(<Lookup groupCode="field" size='large' placeholder="领域范围" style={{ width: 260, }} />)}</Col>
            </Row>
          </div>
        </FormItem >

        <FormItem  {...formItemLayout} >
          <div className={styles.field}>
            <Row>
              <Col span={3} style={{ fontSize: '14px' }}>资源类型</Col>
              <Col span={6}>{getFieldDecorator('resourceType')(<Lookup groupCode="resourceType" size='large' placeholder="资源类型" style={{ width: 260, }} />)}</Col>
            </Row>
          </div>
        </FormItem >

        <FormItem  {...formItemLayout} >
          <MyUpload {...uploadProps} />
          (限15M文件,文件名最好为英文)
        </FormItem >

        <FormItem {...formItemLayout} > 
          <div className={styles.title}>
            {getFieldDecorator('resourcename')(<Input size='large' placeholder="请输入资源标题" style={{ width: 390, }} />)}
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
uploadResource.PropTypes = {
  uploading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading, uploading }) => ({ loading, uploading }))(createDataForm(uploadResource))






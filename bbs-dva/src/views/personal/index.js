import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Row, Form, Input, Avatar, Select } from 'antd'
import styles from './index.less'
import LazyCascader from 'components/LazyCascader'
import Lookup from 'components/Lookup'
import Org from 'components/Org'
import { Page } from 'components'
import { createDataForm } from 'utils'
const FormItem = Form.Item

const PersonalInfo = ({ person, loading, dispatch, location,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    getFormatFieldsValue,
}
}) => {

  const { editable, currentItem } = person

  const modify = () => {
    const data = {
      ...getFormatFieldsValue(),
      key: currentItem.key,
    }


    dispatch({
      type: 'person/update',
      payload: data
    })
  }

  const toModify = () => {
    dispatch(routerRedux.push({
      pathname: '/modifyPassword',
    }))
  }
  const props = {
    loading: loading.effects['person/query']
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };
  return (
    <Page  {...props}>
      <div>

        <div className={styles.leftBar}>
          <div className={styles.baseInfo}>
            <Button type="default" size="large" icon="bars" >
              个人信息
          </Button>
          </div>
          <div className={styles.modifyPassword}>
            <Button size="large" icon="edit" onClick={toModify} >
              修改密码
          </Button>
          </div>
        </div>
        <div className={styles.form}>

          <Form layout="horizontal">

            <FormItem {...formItemLayout} >
              <div className={styles.font}>
                昵称
                </div>

              <div className={styles.input} >
                {
                  getFieldDecorator('acount', { initialValue: currentItem.acount })(

                    <Input />)
                }
              </div>

            </FormItem >

            <FormItem  {...formItemLayout} >
              <div className={styles.font}>
                姓名
                </div>
              <div className={styles.input} >
                {
                  getFieldDecorator('lastname', { initialValue: currentItem.lastname })(<Input />)

                }
              </div>
            </FormItem >

            <FormItem  {...formItemLayout}  >
              <div className={styles.font}>
                邮箱
                </div>
              <div className={styles.input} >
                {getFieldDecorator('email', { initialValue: currentItem.email })(<Input />)}
              </div>
            </FormItem>

            <FormItem  {...formItemLayout}  >
              <div className={styles.font}>
                电话
                </div>
              <div className={styles.input}>
                {getFieldDecorator('phone', { initialValue: currentItem.phone })(<Input />)}
              </div>
            </FormItem>

            <FormItem   {...formItemLayout}  >
              <div className={styles.font}>
                部门
                </div>
              <div className={styles.org}>
                {getFieldDecorator('orginfo', { initialValue: currentItem.orginfo })
                  (<Org valueKey="id"
                    parentIdKey="pId"
                  />)}
              </div>
            </FormItem>
            <FormItem   {...formItemLayout}  >
              <div className={styles.font}>
                状态
                </div>
              <div className={styles.input}>
                {getFieldDecorator('status', { initialValue: currentItem.status })
                  (<Lookup groupCode="STATUS" placeholder="状态" />)}
              </div>
            </FormItem>
            <FormItem  >

              <Button onClick={modify}>更新</Button>

            </FormItem>
          </Form>

        </div>
      </div>
    </Page>

  )
}


PersonalInfo.PropTypes = {
  person: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ person, loading }) => ({ person, loading }))(createDataForm(PersonalInfo, 'currentItem'))

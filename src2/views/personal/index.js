import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Row, Form, Input, Select, Radio } from 'antd'
import styles from './index.less'
import LazyCascader from 'components/LazyCascader'
import Lookup from 'components/Lookup'
import Org from 'components/Org'
import { Page } from 'components'
import { createDataForm } from 'utils'
import Avatars from './upload.js'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const PersonalInfo = ({ person, loading, dispatch, location,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
    getFormatFieldsValue,
}
}) => {

  const { currentItem,extendData } = person


  const modify = () => {

    const imgUrl = person.imgUrl
    const data = {
      ...getFormatFieldsValue(),
      key: currentItem.key,
    }
    
    const data1 = {}

    data1.acount=data.acount
    data1.email=data.email
    data1.lastname=data.lastname
    data1.phone=data.phone
    data1.orginfo=currentItem.orginfo
    data1.status=data.status
    const data2={}
    data2.userMale=data.userMale
    data2.userDescription=data.userDescription
    data2.userImage=imgUrl
      console.log("imgUrl",imgUrl)
    dispatch({
      type: 'person/update1',
      payload: data1
    })

       dispatch({
      type: 'person/update2',
      payload: data2
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

  const uploadProps = {
    getImgUrl(data) {
      dispatch({
        type: 'person/getImgUrl',
        payload: data
      })

    },
extendData:extendData
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
           <Avatars {...uploadProps} />

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
            <FormItem  {...formItemLayout} >
              <div className={styles.font}>
                性别
                </div>
              <div className={styles.Radio}>
                {
                  getFieldDecorator('userMale', { initialValue: extendData.userMale })(
                    <RadioGroup>
                      <Radio value="male">男</Radio>
                      <Radio value="female">女</Radio>
                    </RadioGroup>
                  )

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
                状态
                </div>
              <div className={styles.input}>
                {getFieldDecorator('status', { initialValue: currentItem.status })
                  (<Lookup groupCode="STATUS" placeholder="状态" />)}
              </div>
            </FormItem>

            <FormItem  {...formItemLayout}  >
              <div className={styles.font}>
                个人简介
                </div>
              <div className={styles.inputs} >
                {getFieldDecorator('userDescription', { initialValue: extendData.userDescription })(<Input />)}
              </div>
            </FormItem>
            <br />
            <br />
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

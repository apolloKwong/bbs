import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import LazyCascader from 'components/LazyCascader'
import Lookup from 'components/Lookup'
import Org from 'components/Org'
import { createDataForm, ValidateRules, i18n } from 'utils'

const FormItem = Form.Item
const { SEC } = ValidateRules


const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
} 

const modal = ({
  item = {},
  onOk,
  form: {
    getFormatFieldsValue,
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFormatFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const acountValidate = (rule, value, callback) => {
    if(!value || value.length > SEC.USER.ACOUNT_MAX){
      callback([new Error(`账户必须填写，且不能超出${SEC.USER.ACOUNT_MAX}个字符`)]);
    }else{
        if(!SEC.USER.ACOUNT_REGEX.test(value)){
          callback([new Error('抱歉，账户只能由英文字母、数字和下划线组成。')]);
        }else if(value.length < SEC.USER.ACOUNT_MIN && value!='root'){
          callback([new Error(`用户账户长度不得小于${SEC.USER.ACOUNT_MIN}个字符`)]);
        }else {
          callback();
        }
    }
  }

  const nameValidate = (rule, value, callback) => {
    if(!value || value.length > SEC.USER.NAME_MAX) {
      callback([new Error(`姓名必须填写，且不能超出${SEC.USER.NAME_MAX}个字符`)]);
    }else {
      if(!SEC.USER.NAME_REGEX.test(value)) {
        callback([new Error('抱歉，姓名只能由中英文，数字，下划线，减号组成。')]);
      }else {
        callback();
      }
    }
	}

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={i18n('lab.user.acount')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('acount', {
            rules: [
              {
                required: true,
                max:SEC.USER.ACOUNT_MAX, 
                validator:acountValidate
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.user.lastname')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('lastname', {
            rules: [
              {
                required: true,
                max:SEC.USER.NAME_MAX, 
                validator: nameValidate
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.sec.org')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('orginfo', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Org 
                valueKey="id" 
                parentIdKey="pId" 
                style={{width:300}} />
          )}
        </FormItem>
        <FormItem label={i18n('lab.user.email')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            rules: [
              {
                required: false,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.user.phone')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            rules: [
              {
                required: false,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.sec.status')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
              rules: [
                  { required: true}
                ]})(<Lookup groupCode = "STATUS" />)}
        </FormItem>
        <FormItem label={i18n('lab.user.language')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('languageCode', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Lookup groupCode = "LANGUAGE" />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default createDataForm(modal,'item')
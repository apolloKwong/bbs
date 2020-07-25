import React from 'react'
import PropTypes from 'prop-types'
import Lookup from 'components/Lookup'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import { createDataForm, i18n }  from 'utils'

const FormItem = Form.Item

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
    getFieldDecorator,
    validateFields,
    getFormatFieldsValue,
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
      data.code = data.groupCode;
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={i18n('lab.i18n.language')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('languageCode', {
            initialValue: item.languageCode,
            rules: [
              {
                required: true,
              },
            ],
          })(<Lookup groupCode = "LANGUAGE" placeholder={i18n('lab.i18n.language')} />)}
        </FormItem>
        <FormItem label={i18n('lab.i18n.key')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('keyCode', {
            initialValue: item.keyCode,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.i18n.value')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('valueDesc', {
            initialValue: item.valueDesc,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
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

export default createDataForm(modal,'item');

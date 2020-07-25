import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select, Button } from 'antd'
import { createDataForm, i18n, ValidateRules }  from 'utils'

const FormItem = Form.Item
const { SEC } = ValidateRules;

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
  onClear,
  onValidator,
  form: {
    getFieldDecorator,
    validateFields,
    getFormatFieldsValue,
    resetFields,
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

  const handleClear = () => {
    resetFields();
    onClear();
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onClear:handleClear,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true, 
              },
            ],
          })(<Input placeholder="名称"/>)}
        </FormItem>
        <FormItem label="remark" hasFeedback {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [
              {
                required: true, 
              },
            ],
          })(<Input placeholder="remark"/>)}
        </FormItem>     
      </Form>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" onClick={()=>handleOk()} style={{marginRight:8}}>{i18n('btn.cmn.save')}</Button>
        <Button onClick={()=>handleClear()}>{i18n('btn.cmn.reset')}</Button>
      </div>
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

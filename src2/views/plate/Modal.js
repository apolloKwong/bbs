import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Cascader, Select, Button } from 'antd'
import { createDataForm, i18n, ValidateRules }  from 'utils'
import lookup from 'services/lookup'
import Lookup from 'components/Lookup'
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

  

 

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="板块名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('plateName', {
            
            rules: [
              {
                required: true
              }
            ],
          })(<Input placeholder="板块名称"/>)}
        </FormItem>
        <FormItem label="排序" hasFeedback {...formItemLayout}>
          {getFieldDecorator('order', {
           
            rules: [
              {
                required: true
               
              },
            ],
          })(<Input placeholder="排序"/>)}
        </FormItem>
        <FormItem label="点击数" hasFeedback {...formItemLayout}>
          {getFieldDecorator('hit', {
     
          
          })(
            <Input placeholder="0"  disabled/>
          )}
        </FormItem>   
         <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('plateState', {
            
            rules: [
              {
                required: true,
               
              },
            ],
          })(
            <Lookup groupCode="plateState" />
          )}
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

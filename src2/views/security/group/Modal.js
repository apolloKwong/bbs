import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import Lookup from 'components/Lookup'
import { createDataForm, i18n,ValidateRules }  from 'utils'
import groupService from 'services/security/group'

const { SEC } = ValidateRules;
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
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  const codeValidate = (rule, value, callback) => {
      const values = {
        ...getFormatFieldsValue(),
      }
			if (value != undefined &&  value.length <= SEC.GROUP.CODE_MAX) {
        setTimeout(() => {
          var queryFilter = {};
          const codeFilter = "Q_code_EQ";
          queryFilter[codeFilter] = value;
          const idFilter = "Q_id_L_NE";
          const id = values.id;
          if(id !== undefined){
            queryFilter[idFilter] = id;
          }
          groupService.list(queryFilter).then(function ({data}) {
              if(value.length > 1 && data.length >0){
                callback([new Error(i18n('lab.group.vco'))]);
              }else{
                callback();
              }
          }, function (error) {
              callback([new Error(error)]);
          });
          },100);
      } else {
        callback();
      }
	}

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={i18n('lab.group.code')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true,max:SEC.GROUP.CODE_MAX,message:`${i18n('lab.group.vcoc')} ${SEC.GROUP.CODE_MAX} ${i18n('lab.cmn.vnc')}`
              },{
                pattern: /^\w+$/,
                message: i18n('lab.group.vcor'),
              },{
                validator: codeValidate,
              }],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.group.name')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,max:SEC.GROUP.NAME_MAX,min:SEC.GROUP.NAME_MIN,message:`${i18n('lab.group.vnac')} ${SEC.GROUP.NAME_MIN} ${i18n('lab.cmn.vnc')}${i18n('lab.group.vnad')} ${SEC.GROUP.NAME_MAX} ${i18n('lab.cmn.vnc')}`
              }],
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.group.desp')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('desp', {
            initialValue: item.desp,
            rules: [
              {
                max:SEC.GROUP.DESP_MAX,message:`${i18n('lab.group.vdec')} ${SEC.GROUP.DESP_MAX} ${i18n('lab.cmn.vnc')}`
              },]
          })(<Input />)}
        </FormItem>
        <FormItem label={i18n('lab.group.status')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Lookup groupCode = "STATUS" placeholder={i18n('lab.group.status')} />
          )}
        </FormItem>
        {getFieldDecorator('id')(<Input type="hidden" />)}
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

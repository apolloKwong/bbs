import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Modal, Cascader, Select, Button } from 'antd'
import { createDataForm, i18n, ValidateRules }  from 'utils'
import lookup from 'services/lookup'

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
      data.groupCode = data.code;
      onOk(data)
    })
  }

  const handleClear = () => {
    resetFields();
    onClear();
  }

  const codeValidator = (rule, value, callback) => {
    const {idForm} = getFormatFieldsValue();
    if(value !== undefined && value.length>0 && value.length <= SEC.LOOKUP.CODE_MAX){
      setTimeout(() => {
        let queryFilter = {};
        const codeFilter = "Q_code_EQ";
        const parentId = "Q_parentId_EQ";
        queryFilter[parentId]= "0";
        queryFilter[codeFilter] = value;
        const idFilter = "Q_id_L_NE";
        const id = idForm;
        if(id !== undefined){
          queryFilter[idFilter] = id;
        }
        lookup.list(queryFilter).then(function ({data}) {
          if(value.length>1 && data.length >0){
            callback([new Error(i18n('lab.lookup.coderept'))]);
          }else{
            callback();
          }
          }, function () {
            callback([new Error(error)]);
        });
      },100);
    }else{
      callback([new Error(i18n('lab.lookup.vcod')+SEC.LOOKUP.CODE_MAX+i18n('lab.cmn.vnc'))]);
    }
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onClear:handleClear,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label={i18n('lab.lookup.desp')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('desp', {
            initialValue: item.desp,
            rules: [
              {
                required: true, max: SEC.LOOKUP.DESP_MAX, min: SEC.LOOKUP.DESP_MIN,
                message:`${i18n('lab.lookup.vdesp1')} ${SEC.LOOKUP.DESP_MIN} ${i18n('lab.cmn.vnc')} ${i18n('lab.lookup.vdesp2')} ${SEC.LOOKUP.DESP_MAX} ${i18n('lab.cmn.vnc')}`
              },
            ],
          })(<Input placeholder={i18n('lab.lookup.vdesph')}/>)}
        </FormItem>
        <FormItem label={i18n('lab.lookup.code')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [
              {
                required: true, max: SEC.LOOKUP.CODE_MAX, min: 1,
                pattern: /^[A-Za-z0-9-]+$/,
                message:`${i18n('lab.lookup.vcod')} ${SEC.LOOKUP.CODE_MAX} ${i18n('lab.cmn.vnc')}`,
                validator:codeValidator,
              },
            ],
          })(<Input placeholder={i18n('lab.lookup.vcodep')}/>)}
        </FormItem>
        <FormItem label={i18n('lab.lookup.type')} hasFeedback {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
            rules: [
              {
                required: true,
                message:i18n('lab.lookup.vtyp')
              },
            ],
          })(
            <Select
              placeholder={i18n('lab.lookup.vtyph')}
            >
              <Select.Option value="0">单层级</Select.Option>
              <Select.Option value="1">多层级</Select.Option>
            </Select>
          )}
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

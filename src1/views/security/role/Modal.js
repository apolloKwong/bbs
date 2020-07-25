import React from 'react'
import { Form, Input, InputNumber, Radio, Modal, Cascader,Row,Col,Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from 'components/Lookup'
import { createDataForm,i18n,ValidateRules }  from 'utils'
import roleService from 'services/security/role'

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
  onOk,
  data={},
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
      const values = {
        ...getFormatFieldsValue(),
      }
      onOk(values)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  
  const nameValidate = (rule, value, callback) => {
      const values = {
        ...getFormatFieldsValue(),
      }
			if (value != undefined &&  value.length >= SEC.ROLE.NAME_MIN && value.length <= SEC.ROLE.NAME_MAX) {
        setTimeout(() => {
          var queryFilter = {};
          const nameFilter = "Q_name_EQ";
          queryFilter[nameFilter] = value;
          const idFilter = "Q_id_L_NE";
          const id = values.id;
          if(id !== undefined){
            queryFilter[idFilter] = id;
          }
          roleService.list(queryFilter).then(function ({data}) {
              if(value.length > 1 && data.length >0){
                callback([new Error(i18n('lab.role.vna'))]);
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
		    <div className="content-inner">
			  <Form layout="horizontal">
          <Row>
            <FormItem label={i18n('lab.role.name')} hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{
                    required: true,max:SEC.ROLE.NAME_MAX,min:SEC.ROLE.NAME_MIN,message:`${i18n('lab.role.vnac')} ${SEC.ROLE.NAME_MAX} ${i18n('lab.cmn.vnc')}`
                  },{
                    pattern: /^[A-Za-z0-9_]+$/,
                    message: i18n('lab.role.vnar'),
                  },{
                    validator: nameValidate,
                  }],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n('lab.role.desp')} hasFeedback {...formItemLayout}>
              {getFieldDecorator('desp', {
                rules: [
                  {
                    required: true,max:SEC.ROLE.DESP_MAX,message:`${i18n('lab.role.vdec')} ${SEC.ROLE.DESP_MAX} ${i18n('lab.cmn.vnc')}`
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n('lab.role.status')} hasFeedback {...formItemLayout}>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Lookup groupCode = "STATUS" placeholder={i18n('lab.role.status')} />)}
            </FormItem>
            {getFieldDecorator('id')(<Input type="hidden" />)}
          </Row>
		  </Form>
		</div>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  data: PropTypes.object,
  onOk: PropTypes.func,
}

export default createDataForm(modal,'data');

import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Checkbox, Row, Col, Button } from 'antd'
import { config, createDataForm, ValidateRules, i18n } from 'utils'

const FormItem = Form.Item
const { SEC } = ValidateRules
var nameValidateResult = "";

const OrgForm = createDataForm(React.createClass({

		handleSubmit(e) {
		    e.preventDefault();
		    const { form, dispatch, type } = this.props
		    form.validateFields((errors, values) => {
		        if (!!errors) {
		          return;
		        }
		        var data = form.getFieldsValue()
							if (type === 'edit'){
											dispatch({
													type:'org/save',
													payload:data,
											})
							} else {
											dispatch({
													type:'org/create',
													payload:data,
											})
							}
		    });
		},
			
			getValidateStatus(field) {
			    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

			    if (isFieldValidating(field)) {
			      return 'validating';
			    } else if (!!getFieldError(field)) {
			      return 'error';
			    } else if (getFieldValue(field)) {
			      return 'success';
			    }
			  },
				
			  nameValidate(rule, value, callback) {
		          callback();
		          nameValidateResult = this.refs.orgName.getValidateStatus();
			  },
		     orgCodePattern(rule, value, callback) {
			    if (!value || value.length > SEC.ORG.ORGCODE_MAX) {
			      callback([new Error(`机构编号必须填写，且不能超出${SEC.ORG.ORGCODE_MAX}个字符`)]);
			    } else {
			      setTimeout(() => {
			    	if(!SEC.ORG.ORGCODE_REGEX.test(value)){
					    callback([new Error('抱歉，机构编号只能由英文字母和数字组成。')]);
			    	}else{
			    		callback();
			    	}
			      }, 800);
			    }
			  },
					  
		render() {
			const {form} = this.props;
			const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
			return (
	      <Form>
	        <FormItem ref="orgName"
	          label={i18n('lab.org.name')}
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          {getFieldDecorator("orgName", {
	              rules: [
	  	                { required: true, max: SEC.ORG.ORGNAME_MAX, message: `机构名称必须填写，且不能超出${SEC.ORG.ORGNAME_MAX}个字符`},
	  	                { validator: this.nameValidate },
	  	              ],
	  	            })(<Input />)}
	        </FormItem>
	        
            <FormItem ref="orgName"
	          label={i18n('lab.org.filed')}
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
              {getFieldDecorator("filed1", {
	              rules: [
	  	                { required: false, max: SEC.ORG.FILED1_MAX, message: `机构简称不能超过${SEC.ORG.FILED1_MAX}个字符`},
	  	                { validator: this.nameValidate },
	  	              ],
	  	            })(<Input />)}
	        </FormItem>

	        <FormItem
	          label={i18n('lab.org.code')}
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          {getFieldDecorator("orgCode", {
	                rules: [
	  	                  { required: true ,max: SEC.ORG.ORGCODE_MAX, validator: this.orgCodePattern},
	  	                ],
	  	            })(<Input />)}
	        </FormItem>

	        <FormItem
	          label={i18n('lab.org.node')}
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          {getFieldDecorator("orgNote")(<Input type="textarea" id="orgNote" name="orgNote"  />)}
	        </FormItem>

	        <FormItem wrapperCol={{ span: 12, offset: 7 }} >
	          <Button type="primary" onClick={this.handleSubmit}>{i18n('btn.cmn.okText')}</Button>
	          <span>&nbsp;&nbsp;&nbsp;</span>
	          <Button type="ghost"  onClick={this.props.handleReset}>{i18n('btn.cmn.reset')}</Button>
	        </FormItem>
	          
	        {getFieldDecorator("id")(<Input type="hidden" />)}
            {getFieldDecorator("pId")(<Input type="hidden" />)} 
	      </Form>
	    );
	  }

	}));

export default OrgForm
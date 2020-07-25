import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Checkbox, Row, Col, Button } from 'antd'
import { hasPerm } from 'utils'
import { config, createDataForm, ValidateRules } from 'utils'

const FormItem = Form.Item
const { SEC } = ValidateRules

const getPcode = function(parent){
		if(!parent){
			return '';
		}
		let {id,pcode,code} = parent
		if(id == null){
			return ''
		}
		if(pcode){
			return pcode;
		}
		return code
		
}

const RegistryForm = createDataForm(React.createClass({

		handleSubmit(e) {
		    e.preventDefault();
		    const { form, dispatch } = this.props
		    form.validateFields((errors, values) => {
		        if (!!errors) {
		          return;
		        }
		        var data = form.getFieldsValue()
						dispatch({
							type:'registry/save',
							payload:data,
						})
		    });
		},
			
					  
		render() {
			const {form,data} = this.props,
				{getFieldDecorator} = form;
			return (
	      <Form horizontal className="as-form as-m-form">
	        <FormItem label="名称" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	        	{getFieldDecorator('code',{
		                rules: [
		                  { required: true, max:SEC.REGISTRY.CODE_MAX, message:`请输入名称，且不能超出${SEC.REGISTRY.CODE_MAX}个字符`},
		                ],
		         })(<Input type="input" addonBefore={getPcode(data)} placeholder="名称"/>)}
	        </FormItem>
	        <FormItem label="值" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          {getFieldDecorator('value')(<Input type="input" placeholder="值"/>)}
	        </FormItem>
	        <FormItem wrapperCol={{ span: 14, offset: 3 }}>
	        	{getFieldDecorator('enabled',{valuePropName:'checked'})(<Checkbox>是否生效</Checkbox>)}
	        </FormItem>
	        <FormItem label="描述" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          {getFieldDecorator('desp')(<Input type="textarea" placeholder="描述" />)}
	        </FormItem>
	        <Row>
	          <Col span="16" offset="3">
	          	{getFieldDecorator('id')(<Input type="hidden" />)}
	          	{getFieldDecorator('pcode')(<Input type="hidden" />)}
	          	{getFieldDecorator('parentId')(<Input type="hidden" />)}
	            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>确定</Button>
	          </Col>
	        </Row>
	      </Form>
	    );
	  }

	}));

export default RegistryForm
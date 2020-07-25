import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Form, Input } from 'antd'
import { i18n, ValidateRules, createDataForm }  from 'utils'
import Lookup from 'components/Lookup'

const FormItem = Form.Item
const { SEC } = ValidateRules

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
} 

const UserForm = ({ 
    onSubmit,
    onReturn,
    form: {
        getFormatFieldsValue,
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    ...userProps
}) => {
    const handlerSubmit = (e) => {
        e.preventDefault();
       validateFields((errors) => {
         if (errors) {
            return
         }
         const data = {
            ...getFormatFieldsValue(),
         }
         onSubmit(data)
        })
    }

    const handlerReturn = () => {
        onReturn()
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

    return (
        <Form layout="horizontal">
            <FormItem label={i18n('lab.user.acount')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('acount')(<Input  disabled />)}
            </FormItem>
            <FormItem label={i18n('lab.user.lastname')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('lastname', {
                    rules: [{
                        required: true,
                        max:SEC.USER.NAME_MAX, 
                        validator: nameValidate
                    },],
                })(<Input />)}
            </FormItem>
            <FormItem label={i18n('lab.user.email')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('email', {
                    rules: [{
                        required: false,
                        pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                        message: 'The input is not valid E-mail!',
                    },],
                })(<Input />)}
            </FormItem>
            <FormItem label={i18n('lab.user.phone')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('phone', {
                    rules: [{
                        required: false,
                        pattern: /^1[34578]\d{9}$/,
                        message: 'The input is not valid phone!',
                    },],
                })(<Input />)}
            </FormItem>
            <FormItem label={i18n('lab.user.language')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('languageCode', {
                    rules: [{
                        required: true,
                    },],
                })(<Lookup groupCode = "LANGUAGE" />)}
            </FormItem>
            <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                <Button  type="primary"  onClick = {handlerSubmit}>{i18n('btn.cmn.okText')}</Button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <Button  onClick = {handlerReturn}>{i18n('btn.cmn.return')}</Button>
            </FormItem>
            {getFieldDecorator("id")(<Input type="hidden" />)}
            {getFieldDecorator("orginfo")(<Input type="hidden" />)} 
            {getFieldDecorator("status")(<Input type="hidden" />)}
        </Form>
    )
} 

UserForm.PropTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    onReturn: PropTypes.func,
}

export default createDataForm(UserForm)
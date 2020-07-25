import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Form, Input } from 'antd'
import { i18n, ValidateRules, createDataForm } from 'utils'

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

const PwdForm = ({
    onSubmit,
    onReturn,
    form: {
        getFormatFieldsValue,
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        getFieldValue,
    },
    ...pwdProps
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

    const checkPass = (rule, value, callback) => {

        if (getFieldValue('newPwd')) {
            validateFields(['reNewPwd'], { force: true });
        }
        callback();
    }

    const checkPass2 = (rule, value, callback) => {
        if (value && value !== getFieldValue('newPwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    return (
        <Form layout="horizontal">
            <FormItem label={i18n('lab.setting.oldpwd')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('oldPwd', {
                    rules: [{
                        required: true,
                        whitespace: true,
                        max: SEC.USER.PWD_MAX,
                        min: SEC.USER.PWD_MIN,
                    },],
                })(<Input type="password"
                    onContextMenu={false}
                    onPaste={false}
                    onCopy={false}
                    onCut={false}
                    autoComplete="off" />)}
            </FormItem>
            <FormItem label={i18n('lab.setting.newpwd')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('newPwd', {
                    rules: [{
                        required: true,
                        whitespace: true,
                        validator: checkPass,
                        max: SEC.USER.PWD_MAX,
                        min: SEC.USER.PWD_MIN,
                    },],
                })(<Input type="password"
                    onContextMenu={false}
                    onPaste={false}
                    onCopy={false}
                    onCut={false}
                    autoComplete="off" />)}
            </FormItem>
            <FormItem label={i18n('lab.setting.renewpwd')} hasFeedback {...formItemLayout}>
                {getFieldDecorator('reNewPwd', {
                    rules: [{
                        required: true,
                        whitespace: true,
                        validator: checkPass2,
                        max: SEC.USER.PWD_MAX,
                        min: SEC.USER.PWD_MIN,
                    },],
                })(<Input type="password"
                    onContextMenu={false}
                    onPaste={false}
                    onCopy={false}
                    onCut={false}
                    autoComplete="off" />)}
            </FormItem>


            <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                <Button type="primary" onClick={handlerSubmit}>{i18n('btn.cmn.okText')}</Button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <Button onClick={handlerReturn}>{i18n('btn.cmn.return')}</Button>
            </FormItem>
            {getFieldDecorator("id")(<Input type="hidden" />)}
            {getFieldDecorator("orginfo")(<Input type="hidden" />)}
            {getFieldDecorator("status")(<Input type="hidden" />)}
        </Form>
    )
}

PwdForm.PropTypes = {
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
    onReturn: PropTypes.func,
}

export default createDataForm(PwdForm)
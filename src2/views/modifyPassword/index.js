import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Button, Row, Form, Input, Avatar, Select } from 'antd'
import styles from './index.less'
import LazyCascader from 'components/LazyCascader'
import Lookup from 'components/Lookup'
import Org from 'components/Org'
import { Page } from 'components'
import { createDataForm } from 'utils'
const FormItem = Form.Item

const modifyPassword = ({ password, loading, dispatch, location,
    form: {
    getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        getFieldValue,
        validateFields,
}
}) => {




    const props = {
        loading: loading.effects['password/query']
    }

    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 10 },
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        validateFields((errors) => {
            if (errors) {
                return
            }
            const data = getFieldsValue();

            dispatch({
                type: 'password/modifyPwd',
                payload: data
            })
        })
    }

    const handleBack = () => {
        dispatch(routerRedux.push({
            pathname: '/dashboard',
        }))
    }
    const toPersonInfo = () => {
        dispatch(routerRedux.push({
            pathname: '/personal',
        }))
    }

    return (
        <Page  {...props}>
            <div>

                <div className={styles.leftBar}>
                    <div className={styles.baseInfo}>
                        <Button type="default" size="large" icon="bars" onClick={toPersonInfo}>
                            个人信息
          </Button>
                    </div>
                    <div className={styles.modifyPassword}>
                        <Button size="large" icon="edit"  >
                            修改密码
          </Button>
                    </div>
                </div>
                <div className={styles.form}>

                    <Form layout="horizontal">

                        <FormItem {...formItemLayout} >
                            <div className={styles.font}>
                                当前密码
                </div>

                            <div className={styles.input} >
                                {getFieldDecorator('oldPwd', {
                                    rules: [{
                                        required: true,
                                        whitespace: true,

                                    },],
                                })(<Input type="password"
                                    onContextMenu={false}
                                    onPaste={false}
                                    onCopy={false}
                                    onCut={false}
                                    autoComplete="off" />)}
                            </div>

                        </FormItem >

                        <FormItem  {...formItemLayout} >
                            <div className={styles.font}>
                                新密码
                </div>
                            <div className={styles.input} >
                                {getFieldDecorator('newPwd', {
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        validator: checkPass,
                                    },],
                                })(<Input type="password"
                                    onContextMenu={false}
                                    onPaste={false}
                                    onCopy={false}
                                    onCut={false}
                                    autoComplete="off" />)}
                            </div>
                        </FormItem >
                        <FormItem {...formItemLayout} >
                            <div className={styles.font}>
                                确认密码
                </div>

                            <div className={styles.input} >
                                {getFieldDecorator('reNewPwd', {
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        validator: checkPass2,
                                    },],
                                })(<Input type="password"
                                    onContextMenu={false}
                                    onPaste={false}
                                    onCopy={false}
                                    onCut={false}
                                    autoComplete="off" />)}
                            </div>

                        </FormItem >
                        <FormItem  >
                            <div >
                                <Button type="primary" onClick={handleSubmit} >确定</Button>
                            </div>
                            <div className={styles.buttonback}>
                                <Button type="primary" onClick={handleBack} >返回</Button>
                            </div>
                        </FormItem>
                    </Form>

                </div>
            </div>
        </Page>

    )
}


modifyPassword.PropTypes = {
    password: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({ password, loading }) => ({ password, loading }))(Form.create()(modifyPassword))

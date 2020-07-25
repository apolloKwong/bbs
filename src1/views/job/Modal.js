import React from 'react'
import { Form, Input, Modal,Row,Col,message} from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from 'components/Lookup'
import { DatePicker } from 'components'
import { createDataForm,i18n }  from 'utils'
import moment from 'moment';

const FormItem = Form.Item

const modal = ({
  onOk,
  data={},
  form: {
    getFieldDecorator,
    validateFields,
    getFormatFieldsValue,
    isFieldValidating,
    getFieldError,
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
      if(values.cronExpression === 'undefined') {
        message.warn('Cron表达式不能为空');
        return;
      }
      if (values.endTime < values.startTime) {
        message.warn('结束时间不能小于开始时间！');
        return;
      }
      onOk(values)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  
  return (
		 <Modal {...modalOpts}>
		    <div className="content-inner">
            <Form layout="horizontal">
              <Row>
					      <Col span="12">
						      <FormItem
                        label = {i18n('lab.job.taskName')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                        hasFeedback
                        help={isFieldValidating('taskName') ? '校验中...' : (getFieldError('taskName') || []).join(', ')}>
                        {getFieldDecorator('taskName', {
                              rules: [
                                    { required: true},
                                  ],
                              })(<Input type="text" placeholder={i18n('lab.job.taskName')}  />)}
                      </FormItem>
					      </Col>
					      <Col span="12">
						      <FormItem
                        label = {i18n('lab.job.jobDescription')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                        hasFeedback
                        help={isFieldValidating('jobDescription') ? '校验中...' : (getFieldError('jobDescription') || []).join(', ')}>
                        {getFieldDecorator('jobDescription', {
                              rules: [
                                    { required: true},
                                  ],
                              })(<Input type="input" placeholder={i18n('lab.job.jobDescription')}  />)}
                      </FormItem>
					      </Col>
				      </Row>
              <Row>
					      <Col span="12">
						       <FormItem
                        label = {i18n('lab.job.serviceName')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                        hasFeedback
                        help={isFieldValidating('serviceName') ? '校验中...' : (getFieldError('serviceName') || []).join(', ')}>
                        {getFieldDecorator('serviceName', {
                              rules: [
                                    { required: true , message:`微服务名称不能为空`},
                                  ],
                              })(<Input type="input" placeholder={i18n('lab.job.serviceName')}  />)}
                      </FormItem>
					      </Col>
					      <Col span="12">
						      <FormItem
                        label = {i18n('lab.job.methodPath')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                        hasFeedback
                        help={isFieldValidating('methodPath') ? '校验中...' : (getFieldError('methodPath') || []).join(', ')}>
                        {getFieldDecorator('methodPath', {
                              rules: [
                                    { required: true ,  message:`完整方法路径不能为空`},
                                  ],
                              })(<Input type="input" placeholder={i18n('lab.job.methodPath')}  />)}
                      </FormItem>
					      </Col>
				      </Row>
              <Row>
					      <Col span="12">
						       <FormItem
                        label = {i18n('lab.job.startTime')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}
                        hasFeedback
                        help={isFieldValidating('startTime') ? '校验中...' : (getFieldError('startTime') || []).join(', ')}>
                        {getFieldDecorator('startTime')(
                          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{ width: 160 }} 
                            getPopupContainer={() => document.getElementById('area')}/>)}
                      </FormItem>
					      </Col>
					      <Col span="12">
                    <FormItem
                        label = {i18n('lab.job.endTime')+":"}
                        labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                        hasFeedback
                        help={isFieldValidating('endTime') ? '校验中...' : (getFieldError('endTime') || []).join(', ')}>
                        {getFieldDecorator('endTime')(
                          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"  style={{ width: 160 }} 
                          getPopupContainer={() => document.getElementById('area')}/>)}
                    </FormItem>
					      </Col>
				      </Row>
              <Row>
					      <Col span="12">
						      <FormItem
                      label =  {i18n('lab.job.cronExpression')+":"}
                      labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}
                      hasFeedback
                      help={isFieldValidating('cronExpression') ? '校验中...' : (getFieldError('cronExpression') || []).join(', ')}>
                      {getFieldDecorator('cronExpression', {
                            rules: [
                                { required: true, message:`Cron表达式不能为空`},
                                ],
                            })(<Input type="input" placeholder={i18n('lab.job.cronExpression')} />)}
                  </FormItem>
					      </Col>
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

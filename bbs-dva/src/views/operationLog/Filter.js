import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, DatePicker } from 'components'
import { Form, Button, Row, Col, Input, Cascader, Switch, } from 'antd'
import { createDataForm, i18n } from 'utils'

const FormItem = Form.Item
const Search = Input.Search

const Filter = ({
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFormatFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    let fields = getFormatFieldsValue()
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFormatFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  return (
    <Form layout="inline">
      <FormItem label={i18n('lab.operlog.operCode')} >
        {getFieldDecorator('Q_operCode_LK')(<Input type="text" placeholder={i18n('lab.operlog.operCode')} />)}
      </FormItem>
      <FormItem label={i18n('lab.operlog.operDesc')} >
        {getFieldDecorator('Q_operDesc_LK')(<Input type="text" placeholder={i18n('lab.operlog.operDesc')} />)}
      </FormItem>
      <FormItem label={i18n('lab.operlog.resCode')} >
        {getFieldDecorator('Q_resCode_LK')(<Input type="text" placeholder={i18n('lab.operlog.resCode')} />)}
      </FormItem>
      <FormItem label={i18n('lab.operlog.methodName')} >
        {getFieldDecorator('Q_methodName_LK')(<Input type="text" placeholder={i18n('lab.operlog.methodName')} />)}
      </FormItem>
      <FormItem label={i18n('lab.operlog.createUserId')} >
        {getFieldDecorator('Q_createUserId_LK')(<Input type="text" placeholder={i18n('lab.operlog.createUserId')} />)}
      </FormItem>
      <FormItem label={i18n('lab.cmn.rangedate')} >
        {getFieldDecorator('Q_createDate_D_GE')(<DatePicker placeholder={i18n('lab.cmn.selectdate')} />)}
      </FormItem>
      <FormItem label={i18n('lab.cmn.reach')} >
        {getFieldDecorator('Q_createDate_D_LE')(<DatePicker placeholder={i18n('lab.cmn.selectdate')} />)}
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" size='small' onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
              <Button onClick={handleReset} size='small'>{i18n('btn.cmn.reset')}</Button>
      </FormItem>
    </Form>
  )
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default createDataForm(Filter, 'filter')

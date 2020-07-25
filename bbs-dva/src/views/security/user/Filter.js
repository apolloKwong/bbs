import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Lookup from 'components/Lookup'
import Org from 'components/Org'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,} from 'antd'
import { createDataForm, hasPerm, i18n, PERMS}  from 'utils'

const FormItem = Form.Item

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    getFormatFieldsValue,
    setFieldsValue,
  },
}) => {

  const handleSubmit = () => {
    let fields = getFormatFieldsValue()
 
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
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

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  return (
    <Form layout="inline">
          <FormItem label={i18n('lab.sec.account')} >
              {getFieldDecorator('Q_acount_LK')(<Input type="text" placeholder="名称" />)}
          </FormItem>
              
          <FormItem label={i18n('lab.sec.org')} >
              {getFieldDecorator('Q_orginfo_EQ')(<Org valueKey="id" placeholder="组织机构" style={{width:300}} />)}
          </FormItem>
          
          <FormItem label={i18n('lab.sec.status')} >
              {getFieldDecorator('Q_status_I_EQ')(<Lookup groupCode = "STATUS" placeholder="状态" />)}
          </FormItem>
              
          <FormItem>
              <Button type="primary" size='small' onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
              <Button onClick={handleReset} size='small'>{i18n('btn.cmn.reset')}</Button>
          </FormItem>
          <Row>
              <p style={{fontSize:15,textAlign:'right'}}><span>{i18n('lab.user.initpwd')}</span></p>
          </Row>
          <FormItem>
              <Button type="ghost" onClick={onAdd} disabled={!hasPerm(PERMS.USER.CREATE)}>{i18n('btn.cmn.add')}</Button>
          </FormItem>
    </Form>     
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default createDataForm(Filter,'filter')

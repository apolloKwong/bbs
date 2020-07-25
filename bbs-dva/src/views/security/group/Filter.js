import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Input, Cascader, Switch,} from 'antd'
import { createDataForm, i18n }  from 'utils'

const FormItem = Form.Item
const Search = Input.Search

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
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFormatFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    return fields
  }

  const handleSubmit = () => {
    let fields = getFormatFieldsValue()
    fields = handleFields(fields)
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
    <Form layout="inline" style={{marginBottom:20}}>
          <FormItem label={i18n('lab.group.code')} >
              {getFieldDecorator('Q_code_LK')(<Input type="text" placeholder={i18n('lab.group.code')} />)}
          </FormItem>
          <FormItem label={i18n('lab.group.name')} >
              {getFieldDecorator('Q_name_LK')(<Input type="text" placeholder={i18n('lab.group.name')} />)}
          </FormItem>
          <FormItem label={i18n('lab.group.desp')} >
              {getFieldDecorator('Q_desp_LK')(<Input type="text" placeholder={i18n('lab.group.desp')} />)}
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

export default createDataForm(Filter,'filter')

import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import Lookup from 'components/Lookup'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,} from 'antd'
import { createDataForm, hasPerm, i18n}  from 'utils'

const FormItem = Form.Item
const Search = Input.Search
const { RangePicker } = DatePicker

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

  const handleChange = (key, values) => {
    let fields = getFormatFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  return (
    <Form layout="inline" style={{marginBottom:20}}>
          <FormItem label={i18n('lab.role.name')}>
              {getFieldDecorator('Q_name_LK')(<Input type="text" placeholder={i18n('lab.role.name')} />)}
          </FormItem>
          <FormItem label={i18n('lab.role.desp')} >
              {getFieldDecorator('Q_desp_LK')(<Input type="text" placeholder={i18n('lab.role.desp')}/>)}
          </FormItem>
          <FormItem label={i18n('lab.role.status')} >
              {getFieldDecorator('Q_status_I_EQ')(<Lookup groupCode = "STATUS" placeholder={i18n('lab.role.status')} />)}
          </FormItem>
          <FormItem>
              <Button type="primary" size='small' onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
              <Button onClick={handleReset} size='small'>{i18n('btn.cmn.reset')}</Button>
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

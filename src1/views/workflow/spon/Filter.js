import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem, DatePicker } from 'components'
import { Form, Button, Row, Col, Input, Cascader, Switch, Select } from 'antd'
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
  onAdd,
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  typeData,
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
  }

  const handleChange = (key, values) => {
    let fields = getFormatFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter
  return (
    <Form layout="inline">
      <FormItem label={i18n('lab.wf.typefilter')}>
        {getFieldDecorator('Q_procDefName_LK')(
          <Select
            placeholder={i18n('lab.wf.type')}
            style={{width:150}}
            allowClear={true}>
            { typeData.map(d => <Select.Option key={d.name}>{d.name}</Select.Option>) }
          </Select>)}
      </FormItem>
      <FormItem label={i18n('lab.wf.namefilter')}>
          {getFieldDecorator('Q_name_LK')(<Input type="text" placeholder={i18n('lab.wf.name')} />)}
      </FormItem>
      <FormItem label={i18n('lab.wf.rangedate')} >
          {getFieldDecorator('Q_createDate_D_GE')(<DatePicker placeholder={i18n('lab.wf.createdate')}/>)}
      </FormItem>
      <FormItem label="-">
          {getFieldDecorator('Q_createDate_D_LE')(<DatePicker placeholder={i18n('lab.wf.enddate')} />)}
      </FormItem>
      <FormItem>
          <Button type="primary" htmlType="submit" size='small'  onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
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
  typeData: PropTypes.array,
  onFilterChange: PropTypes.func,
}

export default createDataForm(Filter,'filter')

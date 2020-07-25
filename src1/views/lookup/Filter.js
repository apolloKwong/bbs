import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Cascader, Switch,} from 'antd'
import city from 'utils/city'
import { createDataForm, i18n }  from 'utils'

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
    <div>
      <Form layout="inline">
            <FormItem label={i18n('lab.lookup.code')} >
                {getFieldDecorator("Q_code_LK")(<Input type="text" placeholder={i18n('lab.lookup.code')} />)}
            </FormItem>
            <FormItem label={i18n('lab.lookup.desp')} >
                {getFieldDecorator("Q_desp_LK")(<Input type="text" placeholder={i18n('lab.lookup.desp')} />)}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" size='small'  onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
                <Button onClick={handleReset} size='small'>{i18n('btn.cmn.reset')}</Button>
            </FormItem>
      </Form>
      {/* <Button type="ghost" onClick={onAdd}>新增数据类型filter</Button>    */}
    </div>  
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

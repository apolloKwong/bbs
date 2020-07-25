

import React from 'react'
import PropTypes from 'prop-types'

import Lookup from 'components/Lookup'
import { Form, Input, Button } from 'antd'
import { createDataForm } from 'utils'
const FormItem = Form.Item


const Filter = ({
onFilterChange,
    form: {
    getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        getFormatFieldsValue,
  }
}) => {

    const handleSubmit = () => {
        let fields = getFormatFieldsValue()
        onFilterChange(fields)
    }

    const handleReset = () => {
        const fields = getFieldsValue()
        console.log(fields)
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
            <FormItem label="板块名">
                {getFieldDecorator('Q_plateName_LK')
                    (<Input placeholder="板块名" />)}
            </FormItem>
            <FormItem label="状态">
                {getFieldDecorator('Q_plateState_EQ')
                    (<Lookup groupCode="plateState" placeholder="状态" />)}
            </FormItem>
            <FormItem>
                <Button type="primary" size='small' onClick={handleSubmit}>查询</Button>&nbsp;
              <Button onClick={handleReset} size='small'>重置</Button>
            </FormItem>
        </Form>

    )








}


export default createDataForm(Filter, 'filter')
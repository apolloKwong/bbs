import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Table, Button } from 'antd'
import Lookup from 'components/Lookup'
import { createDataForm, i18n }  from 'utils'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  onOk,
  onUserFilterChange,
  form: {
    getFieldDecorator,
    getFormatFieldsValue,
    setFieldsValue,
  },
  ...userModalProps
}) => {
  const userTableProps=userModalProps.userTableProps

  const modalOpts = {
    ...userModalProps,
    onOk: onOk,
  }

  const columns = [
    {
      title: i18n('lab.user.acount'),
      dataIndex: 'acount',
      key: 'acount',
    }, {
      title: i18n('lab.user.email'),
      dataIndex: 'email',
      key: 'email',
    }, {
      title: i18n('lab.user.lastname'),
      dataIndex: 'lastname',
      key: 'lastname',
    },
  ]

  const handleSubmit = () => {
    let fields = getFormatFieldsValue()
    onUserFilterChange(fields)
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
    <Modal {...modalOpts} title={<h3><i className="fa fa-plus-square-o"/>{i18n('lab.group.selectuser')}</h3>} width='800px'>
      <Form layout="inline" style={{marginBottom:'20px'}}>
          <FormItem label={i18n('lab.user.acount')} >
              {getFieldDecorator('Q_acount_LK')(<Input type="text" placeholder={i18n('lab.user.acount')} />)}
          </FormItem>
          <FormItem label={i18n('lab.user.lastname')} >
              {getFieldDecorator('Q_lastname_LK')(<Input type="text" placeholder={i18n('lab.user.lastname')} />)}
          </FormItem>
          <FormItem>
              <Button type="primary" htmlType="submit" size='small'  onClick={handleSubmit}>{i18n('btn.cmn.query')}</Button>&nbsp;
              <Button onClick={handleReset} size='small'>{i18n('btn.cmn.reset')}</Button>
          </FormItem>
      </Form> 
      <Table
        {...userTableProps}
        bordered
        size='small'
        columns={columns}
        simple
        rowKey={record => record.id}
      />
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  onOk: PropTypes.func,
}

export default createDataForm(modal)
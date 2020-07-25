import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input ,Col} from 'antd'
import { config } from 'utils'
import styles from './index.less'
import { routerRedux } from 'dva/router'
const FormItem = Form.Item

const PortalLogin = ({
  loading,
  dispatch,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
}) => {

  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      dispatch({ type: 'plogin/login', payload: values })
      .then(()=>{dispatch({ type: 'plogin/wsLogin', payload: values })})
      // .then(()=>{dispatch({ type: 'plogin/wsSend', payload: values })})
    })

  }
   function jump() {
    dispatch(routerRedux.push({
      pathname: '/login',
    }))
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt={'logo'} src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" onPressEnter={handleOk} placeholder="Username" />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
              },
            ],
          })(<Input size="large" type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <Row>
          <Col>
            <Button type="primary" onClick={handleOk} loading={loading.effects.login}>
              用户登录
          </Button>
          </Col>
          <a onClick={jump}>管理员登录？</a>
          <Col>
          </Col>
        </Row>

      </form>
    </div>
  )
}

PortalLogin.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ loading }) => ({ loading }))(Form.create()(PortalLogin))

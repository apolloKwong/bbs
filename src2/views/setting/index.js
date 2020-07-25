import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import UserForm from './UserForm'
import PwdForm from './PwdForm'
import { Tabs } from 'antd';
import { i18n }  from 'utils'

const TabPane = Tabs.TabPane;

const Setting = ({ location, dispatch, loading , curUser}) => {
    const userProps = {
        data: curUser.currentUser,
        onSubmit (data) {
          dispatch({
            type: `curUser/modify`,
            payload: data,
          })
        },
        onReturn () {
          dispatch(routerRedux.push({
            pathname: '/dashboard',
          }))
        },
        loading,
        location,
        dispatch
    }

    const pwdProps = {
        data: curUser.currentUser,
        onSubmit (data) {
          dispatch({
            type: `curUser/modifyPwd`,
            payload: data,
          })
        },
        onReturn () {
          dispatch(routerRedux.push({
            pathname: '/dashboard',
          }))
        },
        loading,
        location,
        dispatch
    }

  return (
    <div style = {{width:"60%", margin:"0 auto" }}>
      <Tabs tabPosition="top" defaultActiveKey="1">
        <TabPane tab={i18n('lab.setting.userinfo')} key="1">
          <UserForm  {...userProps}/>
        </TabPane>
        <TabPane tab={i18n('lab.setting.pwdmodify')} key="2">
          <PwdForm {...pwdProps} />
        </TabPane>
      </Tabs>
    </div>
  )
}

Setting.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

// connect方法将组件与数据关联在一起
export default connect(({curUser}) => ({curUser}))(Setting)

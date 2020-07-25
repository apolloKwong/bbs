import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Grid from "components/Grid"
import { hasPerm, i18n, PERMS } from 'utils'
import styles from 'views/css/List.less'

const {TabPane} = Tabs;
const confirm = Modal.confirm

const UserAuthorize = ({onCancelAuthorization,location,dispatch,groupId,groupName, ...tableProps }) => {
  const cancel = (e) => {
  };

  const userAuthorizeToolbar = [
   {
       text:i18n('lab.group.authorize'),
       icon:'new',
       disabled: !hasPerm(PERMS.GROUP.AUSER),
       handler:function(){
           dispatch({
               type: 'secGroup/queryUnauthorizedUsers',
               groupId: groupId,
               unauthorizedPage: 1,
               unauthorizedPageSize: 10,
            })
       }
   }];

  const columns = [
   {
       title: i18n('lab.cmn.operation'),
       dataIndex: 'operation',
       width: 80,
       render(text,record) {
           return <span>
               <span disabled={!hasPerm(PERMS.GROUP.DEUSER)} title={i18n('lab.group.cacelauthorize')} onClick={()=>{onCancelAuthorization(record.id)}}><i className="fa fa-minus-circle" /></span>
           </span>
       }
   },{
       title: i18n('lab.user.acount'),
       width:210,
       dataIndex: 'acount', 
   },{
       title: i18n('lab.user.email'),
       width:210,
       dataIndex: 'email'
   }, {
       title: i18n('lab.user.lastname'),
       width: 120,
       dataIndex: 'lastname'
   },{
       title: i18n('lab.user.status'),
       width: 80,
       dataIndex: 'statusDesp'
  }];

  return (
    <Grid rowKey='id' {...tableProps} columns={columns} toolbar={userAuthorizeToolbar} 
    title={i18n('lab.group.group')+'-'+groupName+'-'+i18n('lab.group.aulist')}/>
  )
}

UserAuthorize.propTypes = {
  onCancelAuthorization: PropTypes.func,
  dispatch: PropTypes.func,
  location: PropTypes.object,
  loading: PropTypes.object,
}

export default UserAuthorize

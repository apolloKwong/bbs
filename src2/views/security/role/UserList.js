import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs,message,Card } from 'antd'
import classnames from 'classnames'
import { Link,routerRedux } from 'dva/router'
import Grid from "components/Grid"
import { hasPerm,forward,i18n,PERMS } from 'utils'
import styles from 'views/css/List.less'


const UserList = ({location,dispatch,delRoleUsersByIds,currentItem, ...tableProps }) => {
    const cancel = (e) => {
    };
    const userToolbar = [
    {
        text:i18n('lab.role.bindUser'),
        icon:'new',
        disabled: !hasPerm(PERMS.ROLE.BUSER),
        handler:function(){
            dispatch({
               type: 'secRole/queryUnauthorizedUsers',
               roleId: currentItem.id,
               unauthorizedPage: 1,
               unauthorizedPageSize: 10,
            })
        }
    }];

    const columns = [
    {
        title: i18n('lab.cmn.operation'),
        dataIndex: 'operation',
        width: 60,
        render(text, record) {
            return <span>
                    <a disabled={!hasPerm(PERMS.ROLE.DEUSER)} title={i18n('lab.role.ubuser')}
                    onClick={() => { delRoleUsersByIds(record.id)}} ><i className="fa fa-cog" /></a>
                </span>
        }
    },{
        title: i18n('lab.user.acount'),
        width:210,
        dataIndex: 'acount',
    }, {
        title: i18n('lab.user.email'),
        dataIndex: 'email'
    },{
       title: i18n('lab.user.lastname'),
       width: 120,
       dataIndex: 'lastname'
   },{
        title: i18n('lab.user.status'),
        width: 80,
        dataIndex: 'statusDesp',
    }];

    return (
        <div>
            <Grid  {...tableProps} rowKey='id' columns={columns} toolbar={userToolbar} 
            title={i18n('lab.role.role')+'-'+currentItem.name+'-'+i18n('lab.role.bulist')}/>
        </div>
    )
}

UserList.propTypes = {
    delRoleUsersByIds:PropTypes.func,
    location: PropTypes.object,
    currentItem:PropTypes.object,
}

export default UserList

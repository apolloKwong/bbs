import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import Grid from "components/Grid"
import { Link } from 'dva/router'
import { hasPerm, i18n, PERMS } from 'utils'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location, ...tableProps }) => {

  const columns = [
    {
       title: i18n('lab.user.acount'),
       width: 120,
       dataIndex: 'acount',
       render(text,row,index) {
           return  <span><a disabled={!hasPerm(PERMS.USER.UPDATE)} onClick={
             function(){
               onEditItem(row);
            }
           }> {text} </a></span>; 
       }
   },{
       title: i18n('lab.user.lastname'),
       width: 120,
       dataIndex: 'lastname'
   }, {
       title: i18n('lab.user.email'),
       width: 180,
       dataIndex: 'email'
   },{
       title: i18n('lab.sec.org'),
       width: 220,
       dataIndex: 'orginfoName'
   },{
       title: i18n('lab.user.language'),
       width: 100,
       dataIndex: 'languageCodeDesp',
   },{
       title: i18n('lab.user.status'),
       width: 80,
       dataIndex: 'statusDesp',
  }];

  return (
    <div>
      <Grid {...tableProps} rowKey='id' columns={columns} />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
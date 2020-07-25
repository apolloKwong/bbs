import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import Grid from "components/Grid"
import { hasPerm, i18n,PERMS } from 'utils'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, queryAuthorizedUsers, location,secGroup,dispatch,modalType,...tableProps }) => {
  const cancel = (e) => {
  };

  const groupToolbar = [
   {
       text:i18n('btn.group.create'),
       icon:'new',
       disabled: !hasPerm(PERMS.GROUP.CREATE),
       handler:function(){
         dispatch({
           type: 'secGroup/showModal',
           payload: {
             modalType: 'create',
            },
          })
       }
   }];

  const columns = [
   {
       title: i18n('lab.cmn.operation'),
       dataIndex: 'operation',
       width: 80,
       render(text, record) {
    	   return <span>
				<a disabled={!(hasPerm(PERMS.GROUP.AULIST))} title={i18n('lab.group.authorize')} onClick={()=>{queryAuthorizedUsers(record)}}><i className="fa fa-users" /></a>
				<span className="ant-divider"></span>
				{record.defaultIn == false?<a disabled={!(hasPerm(PERMS.GROUP.DELETE))}><Popconfirm title={i18n('lab.group.cfdelete')} onConfirm={()=>{onDeleteItem(record.id)}} onCancel={cancel}><span title={i18n('lab.cmn.delete')}><i className="fa fa-trash-o" /></span></Popconfirm></a> : null}
			</span>
       }
   },{
       title: i18n('lab.group.code'),
       width:120,
       dataIndex: 'code',
       render(text, record) {
           return  <a disabled={!hasPerm(PERMS.GROUP.UPDATE)} onClick={
             function(){
               onEditItem(record);
               }
           } >{text}</a>;
       } 
   },{
       title: i18n('lab.group.name'),
       width: 120,
       dataIndex: 'name'
   }, {
       title: i18n('lab.group.desp'),
       width: 210,
       dataIndex: 'desp'
   },{
       title: i18n('lab.group.status'),
       width: 80,
       dataIndex: 'statusDesp'
  }];

  return (
    <div>
      <Grid  {...tableProps} rowKey='id' columns={columns} toolbar={groupToolbar} />
    </div>
  )
}

List.propTypes = {
  dispatch: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  queryAuthorizedUsers: PropTypes.func,
  location: PropTypes.object,
  secGroup: PropTypes.object,
}

export default connect(({ secGroup,dispatch }) => ({ secGroup,dispatch }))(List)

import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs,message} from 'antd'
import classnames from 'classnames'
import { Link,routerRedux } from 'dva/router'
import Grid from "components/Grid"
import { hasPerm,i18n,PERMS } from 'utils'
import styles from 'views/css/List.less'

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem, perSetting,onEditItem,userSettings,dpSetting,
    isMotion, location,dispatch, ...tableProps }) => {
  const cancel = (e) => {
  };
  const userToolbar = [
   {
       text:i18n('btn.role.create'),
       icon:'new',
       disabled: !hasPerm(PERMS.ROLE.CREATE),
       handler:function(){
           dispatch({
        	   type: 'secRole/showModal',
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
       width: 120,
       render(text, record) {
    	   return <span>
                    <a disabled={!(hasPerm(PERMS.ROLE.PERSET))} 
                        title={i18n('lab.role.perSet')} onClick={()=>{perSetting(record)}}>
                        <i className="fa fa-cog" />
                    </a>
				    <span className="ant-divider"></span>
				    <a disabled={!(hasPerm(PERMS.ROLE.BULIST))}  title={i18n('lab.role.bindUser')} 
                        onClick={()=>{userSettings(record)}}><i className="fa fa-users" />
                    </a>
				    <span className="ant-divider"></span>
                    {/* <span disabled={!hasPerm('10008.10112.003')} title={i18n('lab.role.dataper')} onClick={()=>{dpSetting(record.id)}}><i className="fa fa-edit" /></span>
                    <span className="ant-divider"></span> */}
                    {
                        record.defaultIn == false?
                        <a disabled={!(hasPerm(PERMS.ROLE.DELETE))}>
                            <Popconfirm title={i18n('lab.role.cfdelete')} onConfirm={()=>{onDeleteItem(record.id)}} onCancel={cancel}>
                                <span title={i18n('lab.cmn.delete')}><i className="fa fa-trash-o" /></span>
                            </Popconfirm>
                        </a> : null
                    }
			</span>
       }
   },{
       title: i18n('lab.role.name'),
       width:210,
       dataIndex: 'name',
       render(text, record) {
           return  <span><a disabled={!hasPerm(PERMS.ROLE.UPDATE)} onClick={
            function(){
               onEditItem(record);
            }
           }>{text}</a></span>;
       }
   }, {
       title:i18n('lab.role.desp'),
       dataIndex: 'desp'
   },{
       title: i18n('lab.role.status'),
       width: 80,
       dataIndex: 'statusDesp',
  }];

  return (
    <div>
        <Grid  {...tableProps} rowKey='id' columns={columns} toolbar={userToolbar} />
   </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  perSetting:PropTypes.func,
  onEditItem: PropTypes.func,
  userSettings:PropTypes.func,
  dpSetting:PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List

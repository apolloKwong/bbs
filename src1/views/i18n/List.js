import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm, Tabs, Button } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { connect } from 'dva'
import Grid from "components/Grid"
import { hasPerm, i18n } from 'utils'
import styles from 'views/css/List.less'

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem, dispatch, onEditItem, onAddItem, isMotion, location, ...tableProps }) => {

  const handleItemDelete = (record) => {
    onDeleteItem(record.id);
  }

  const handleShowDetail = (record) => {
    onEditItem(record); 
  }

  const userToolbar = [
   {
       text:i18n('btn.cmn.add'),
       icon:'new',
       disabled: !hasPerm('10005.10120.001'),
       handler:function(){
          dispatch({
            type: 'secI18n/showModal',
            payload: {
              modalType: 'create',
            },
          })
       }
   }];

  const columns = [
    {
        title:i18n('lab.cmn.operation'),
        dataIndex: 'operation',
        width: 120,
        render(text,item,index) {
            return <span>
                {/*<span disabled={!hasPerm('10005.10120.003')} title="数据维护" ><i className="fa fa-cog" /></span>
                <span className="ant-divider"></span>*/}
                <span className={!hasPerm('10005.10120.004')} title={i18n('lab.cmn.delete')} >
                  <Popconfirm title={i18n('lab.i18n.cfdelete')} onConfirm={()=>handleItemDelete(item)}>
                    <a><i className="fa fa-trash-o" /></a>
                  </Popconfirm></span>
            </span>
        }
    },{
        title: i18n('lab.i18n.language'),
        dataIndex: 'languageCodeDesp',
        render(text, record) {
           return  <span><a onClick={
            function(){
               onEditItem(record);
            }
           }>{text}</a></span>;
       }
    },{
        title: i18n('lab.i18n.key'),
        dataIndex: 'keyCode',
    },{
        title: i18n('lab.i18n.value'),
        dataIndex: 'valueDesc',
    }];

  return (
    <div>
      <Grid {...tableProps} rowKey='id' columns={columns} toolbar={userToolbar} />
   </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default connect(({ dispatch }) => ({ dispatch }))(List)

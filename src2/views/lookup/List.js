import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm, Tabs, Button } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import { connect } from 'dva'
import Grid from "components/Grid"
import { hasPerm, i18n, PERMS } from 'utils'
import styles from 'views/css/List.less'

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem, dispatch, onEditItem, onAddItem, isMotion, location, ...tableProps }) => {

  const handleItemDelete = (record) => {
    onDeleteItem(record.id);
  }

  const handleEditItem = (item) => {
    onEditItem(item); 
  }

  const userToolbar = [
   {
       text:i18n('btn.lookup.add'),
       icon:'new',
       disabled: !hasPerm(PERMS.LOOKUP.CREATE),
       handler:function(){
        dispatch({
          type: `secLookup/showModal`,
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
        width: 100,
        render(text,item,index) {
            return <span>
                <span disabled={!(hasPerm(PERMS.LOOKUP.MENU))} title={i18n('lab.lookup.datacog')} >
                  <Link to={`/lookup/${item.id}`}><i className="fa fa-cog" /></Link></span>
                <span className="ant-divider"></span>
                <a disabled={!(hasPerm(PERMS.LOOKUP.DELETE))} title={i18n('lab.cmn.delete')} >
                  <Popconfirm title={i18n('lab.lookup.delinfo')} onConfirm={()=>handleItemDelete(item)}>
                    <i className="fa fa-trash-o" />
                  </Popconfirm></a>
            </span>
        }
    },{
        title: i18n('lab.lookup.desp'),
        dataIndex: 'desp',
        width: 200,
        render(text,item,index){
          return <span>
              <a onClick={()=>handleEditItem(item)}>{text}</a>
          </span>
        }
    },{
        title: i18n('lab.lookup.code'),
        dataIndex: 'code',
        width: 200,
    },{
        title: i18n('lab.lookup.type'),
        dataIndex: 'type',
        width: 200,
        render(text,item,index){
          return (text==="0"?'单层级':'多层级')
        }
    },{
        title: i18n('lab.lookup.createtime'),
        dataIndex: 'createDate',
        width: 200,
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

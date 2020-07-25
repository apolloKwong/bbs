import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm, message} from 'antd'
import classnames from 'classnames'
import { Link,routerRedux } from 'dva/router'
import Grid from "components/Grid"
import { connect } from 'dva'
import { hasPerm, forward, i18n, rpc } from 'utils'
import styles from 'views/css/List.less'

const done = rpc('/')

const confirm = Modal.confirm

const Book = ({ onDeleteItem, onEditItem, isMotion, location, dispatch, ...tableProps }) => {

    const handleEditItem = (item) => {
        onEditItem(item); 
    }
    const handleItemDelete = (record) => {
        onDeleteItem(record.id);
    }
    const bookToolbar = [
        {
            text:"新增",
            icon:'file-add',
            // disabled: !hasPerm('10003.10301.001'),
            handler:function(){
                dispatch(routerRedux.push({
                    pathname: location.pathname+`/Edit/${0}`,
                }))
            }
        }];

    const columns = [
        {
            title:i18n('lab.cmn.operation'),
            dataIndex: 'operation',
            width: 100,
            render(text,item,index) {
                return <span>
                    <a title={i18n('lab.cmn.delete')} >
                      <Popconfirm title="确认删除吗？" onConfirm={()=>handleItemDelete(item)}>
                        <i className="fa fa-trash-o" />
                      </Popconfirm></a>
                </span>
            }
        },{
            title: "名称",
            dataIndex: 'name',
            render(text,item,index){
                return <span>
                    <Link to={`/book/Edit/${item.id}`}>{text}</Link>
                </span>
              }
        },{
            title: "remark",
            dataIndex: 'remark',
        },{
            title: "createUserId",
            dataIndex: 'createUserId',
        },{
            title: "lastUpdateUserId",
            dataIndex: 'lastUpdateUserId',
        }];
  
    return (
        <div>
            <Grid  {...tableProps} rowKey='id' columns={columns} title="书籍管理" toolbar={bookToolbar}/>
        </div>
    )
}

Book.propTypes = {
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default connect(({ dispatch }) => ({ dispatch }))(Book)

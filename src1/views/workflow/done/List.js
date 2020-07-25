import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs,message} from 'antd'
import classnames from 'classnames'
import { Link,routerRedux } from 'dva/router'
import Grid from "components/Grid"
import { hasPerm, forward, i18n, rpc } from 'utils'
import styles from 'views/css/List.less'
import Handler from '../Handler'

const done = rpc('/')

var app = this;

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, isMotion, location,dispatch, ...tableProps }) => {
  
  const cancel = (e) => {
  };
  

  const columns = [
	 {
	  	title: '',
		width:18,
		dataIndex: '',
		className:'cell-icon',
		render(text,record) {
			return <div className='smart-wf-active' />;
		}
	  },{
		title: i18n('lab.wf.procInstName'),
		dataIndex: 'procInstName',
		render(text,record) {
            return <span><Link to={`../services/${record.category}/wf/process/instances/view/${record.id}`}>{text}</Link></span>; 
		}
	 },{
		title: i18n('lab.wf.procDefName'),
		dataIndex: 'procDefName',
	 },{
		title: i18n('lab.wf.category'),
		dataIndex: 'category',
	 },{
		title: i18n('lab.wf.starterName'),
		dataIndex: 'startUserLastName',
	 },{
		title: i18n('lab.wf.status'),
		dataIndex: 'status',
	 },{
		title: i18n('lab.wf.createDate'),
		dataIndex: 'createDate',
	 },{
		title: i18n('lab.wf.updateDate'),
		dataIndex: 'updateDate',
	 }];
  
  return (
    <div>
    	<Grid  {...tableProps} rowKey='id' columns={columns} title={i18n('lab.wf.donelist')} />
    </div>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List

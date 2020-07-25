import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs,message} from 'antd'
import classnames from 'classnames'
import { Link,routerRedux } from 'dva/router'
import { connect } from 'dva'
import Grid from "components/Grid"
import { hasPerm, forward, i18n, rpc } from 'utils'
// import styles from 'routes/css/List.less'

const spon = rpc('/')

var app = this;

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onDiagramShow, isMotion, location,dispatch, ...tableProps }) => {
  
  const cancel = (e) => {
  };
  

  const handleDiagramShow = (id) => {
	  onDiagramShow(id);
  }

  const userToolbar = [
	{
		text:i18n('lab.wf.procpub'),
		icon:'file-add',
		// disabled: !hasPerm('10003.10301.001'),
		handler:function(){
		 dispatch({
			type:`workflowProcDef/showModal`,
			payload: {
				modalType: 'create',
			},
		 })
		}
	}];

  const columns = [
	 {
		title: i18n('lab.wf.procId'),
		dataIndex: 'key',
		render(text,record) {
            return <span><Link to={`services/${record.category}/wf/process/${record.id}`}>{text}</Link></span>; 
		}
	 },{
		title: i18n('lab.wf.procname'),
		dataIndex: 'name',
	 },{
		title: i18n('lab.wf.proccateg'),
		dataIndex: 'category',
	 },{
		title: i18n('lab.wf.procvers'),
		dataIndex: 'version',
		
	 },{
		title: i18n('lab.wf.resourceName'),
		dataIndex: 'resourceName',
	 },{
		title: i18n('lab.wf.hasStartFormKey'),
		dataIndex: 'hasStartFormKey',
		render(text,record){
			return (text===true?'有效':'无效')
		}
	 },{
		title: i18n('lab.cmn.operation'),
		dataIndex: '',
		render(text,record){
			return <span><a onClick={()=>handleDiagramShow(record.id)}>流程图</a></span>
		}
	 }];

  return (
    <div>
    	<Grid  {...tableProps} rowKey='id' columns={columns} title={i18n('lab.wf.proclist')} toolbar={userToolbar} />
    </div>
  )
}

List.propTypes = {
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default connect(({ dispatch }) => ({ dispatch }))(List)
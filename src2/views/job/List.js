import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Popconfirm,Tabs,message} from 'antd'
import classnames from 'classnames'
import Grid from "components/Grid"
import { hasPerm,forward,i18n,PERMS } from 'utils'
import styles from 'views/css/List.less'

const {TabPane} = Tabs;
const confirm = Modal.confirm

const List = ({ onDeleteItem,onEditItem,startJob,stopJob, location,dispatch, ...tableProps }) => {
  const cancel = (e) => {
	};
  const userToolbar = [
   {
       text:i18n('lab.job.add'),
       icon:'new',
			 disabled: !hasPerm(PERMS.JOB.CREATE),
       handler:function(){
           dispatch({
        	   type: 'jobModel/showModal',
               payload: {
                 modalType: 'create',
                },
           })
       }
   }];

  const columns = [{
  		title: i18n('lab.cmn.operation'),
  		dataIndex: 'operation',
  		width: 80,
  		render(text, record, index) {
  			if("PAUSED" == record["jobStatus"] || "WAITING" == record["jobStatus"] ){
				return (
  				      <span>
  				        <a disabled={!(hasPerm(PERMS.JOB.DELETE))} title={i18n('lab.cmn.delete')}><Popconfirm title={i18n('lab.job.cfdelete')} onConfirm={()=>{onDeleteItem(record.id)}}><i className="fa fa-trash-o" /></Popconfirm></a>
  				        <span className="ant-divider"></span>
  				        <Popconfirm title={i18n('lab.job.cfstart')} onConfirm={()=>{startJob(record.id)}}><span title={i18n('lab.job.start')}><i className="fa fa-cog" /></span></Popconfirm>
  				      </span>
  				    );
			}else if("ACQUIRED" == record["jobStatus"] || "NORMAL" == record["jobStatus"] || "ERROR" == record["jobStatus"]){
				return (
  				      <span>
  				        <a disabled={!(hasPerm(PERMS.JOB.DELETE))} title={i18n('lab.cmn.delete')}><Popconfirm title={i18n('lab.job.cfdelete')} onConfirm={()=>{onDeleteItem(record.id)}}><i className="fa fa-trash-o" /></Popconfirm></a>
  				        <span className="ant-divider"></span>
  				        <Popconfirm title={i18n('lab.job.cfstop')} onConfirm={()=>{stopJob(record.id)}}><span title={i18n('lab.job.stop')}><i className="fa fa-cog" /></span></Popconfirm>
  				      </span>
  				    );
			}else{
				return (
  				      <span>
  				        <a disabled={!(hasPerm(PERMS.JOB.DELETE))} title={i18n('lab.cmn.delete')}><Popconfirm title={i18n('lab.job.cfdelete')} onConfirm={()=>{onDeleteItem(record.id)}}><i className="fa fa-trash-o" /></Popconfirm></a>
  				      </span>
  				    );
			}
  			
  		}
  	}, {
  	  	title: i18n('lab.job.taskName'),
				dataIndex: 'taskName',
				render(text, record) {
						return  <a disabled={!hasPerm(PERMS.JOB.UPDATE)} onClick={
							function(){
								onEditItem(record);
							}
						}>{text}</a>;
				}
  	  }, {
  	  	title: i18n('lab.job.serviceName'),
  			dataIndex: 'serviceName',
  	  }, {
  	  	title: i18n('lab.job.methodPath'),
  			dataIndex: 'methodPath',
  	  }, {
  	  	title: i18n('lab.job.cronExpression'),
  			dataIndex: 'cronExpression',
  	  }, {
  	  	title: i18n('lab.job.jobDescription'),
  			dataIndex: 'jobDescription',
  	  }, {
  	  	title: i18n('lab.job.startTime'),
  			dataIndex: 'startTime',
  	  }, {
  	  	title: i18n('lab.job.endTime'),
  			dataIndex: 'endTime',
  	  }, {
  	  	title: i18n('lab.job.status'),
				dataIndex: 'status',
				render(text,record,index) {
					var html = "";
					text=record.jobStatus
					if ("WAITING" == text) {
						html = i18n('job.lab.wait');
					} else if ("ACQUIRED" == text || "NORMAL" == text) {
						html = i18n('job.lab.acq');
					} else if ("ERROR" == text) {
						html = i18n('job.lab.err');
					} else if ("COMPLETE" == text) {
						html = i18n('job.lab.com');
					} else if ("PAUSED" == text) {
						html = i18n('job.lab.pas');
					} else if ("BLOCKED" == text) {
						html = i18n('job.lab.block');
					}
					return html;
			}
    }];

  return (
    <div>
        <Grid  {...tableProps} rowKey='id' columns={columns} toolbar={userToolbar} title={i18n('lab.job.list')} />
   </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  location: PropTypes.object,
	onEditItem: PropTypes.func,
	startJob:PropTypes.func,
	stopJob:PropTypes.func,
}

export default List

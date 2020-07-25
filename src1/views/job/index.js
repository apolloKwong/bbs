import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { i18n }  from 'utils'

const Job = ({ location, dispatch, jobModel, loading}) => {
	  const { dataSource, pagination, currentItem, modalVisible,selectedRowKeys,
			modalType, isMotion} = jobModel
	  const { pageSize,current } = pagination
	  
	  const listProps = {
	    dataSource,
	    loading: loading.effects['jobModel/query'],
	    pagination,
	    location,
	    isMotion,
	    dispatch,
	    onChange (page) {
	      const { query, pathname } = location;
	      dispatch(routerRedux.push({
	        pathname,
	        query: {
	          ...query,
	          page: page.current,
	          pageSize: page.pageSize,
	        },
	      }))
	    },
	    
	    onDeleteItem (id) {
	      dispatch({
	        type: 'jobModel/delete',
	        payload: id,
	      })
	    },
	    
	    onEditItem (item) {
	      dispatch({
	        type: 'jobModel/showModal',
	        payload: {
	          modalType: 'update',
	          currentItem: item,
	        },
	      })
			},
			startJob (id) {
	      dispatch({
	        type: 'jobModel/startJob',
	        payload:id,
	      })
			},
			stopJob (id) {
	      dispatch({
	        type: 'jobModel/stopJob',
	        payload: id,
	      })
			}
	  }
	
	  const modalProps = {
			data: modalType === 'create' ? {} : currentItem,
	    visible: modalVisible,
	    maskClosable: false,
			confirmLoading: loading.effects['secGroup/update'],
			title: `${modalType === 'create' ? i18n('btn.job.create') : i18n('btn.job.update')}`,
			wrapClassName: 'vertical-center-modal',
			width:1000,
			okText:i18n('btn.cmn.okText'),
			cancelText:i18n('btn.cmn.cancelText'),
	    onOk (data) {
	    	dispatch({
	        type: `jobModel/${modalType}`,
	        payload: data,
	      })
	    },
	    onCancel () {
	      dispatch({
	        type: 'jobModel/hideModal',
	      })
			},
		}

		const filterProps = {
	    isMotion,
	    filter: {
	      ...location.query,
	    },
	    onFilterChange (value) {
	      dispatch(routerRedux.push({
	        pathname: location.pathname,
	        query: {
	          ...value,
	          page: 1,
	          pageSize,
	        },
	      }))
	    },
	  }

	  const handleDeleteItems = () => {
	    dispatch({
	      type: 'jobModel/multiDelete',
	      payload: {
	        ids: selectedRowKeys,
	      },
	    })
	  }
	  const handleTabClick = (key) => {
		  dispatch({
			  type: 'jobModel/hideTabPane',
		  })
	  }

	  return (
	   <div className="content-inner">
				<Filter {...filterProps} />
				<List {...listProps} />
				{modalVisible && <Modal {...modalProps} />}
    </div>
	  )
}

 Job.propTypes = {
  jobModel: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ jobModel, loading }) => ({ jobModel, loading }))(Job)

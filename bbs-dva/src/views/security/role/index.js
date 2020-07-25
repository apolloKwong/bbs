import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm,Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import PerSetting from './PerSetting'
import UserList from './UserList'
import UserModal from '../UserModal'
import { hasPerm,i18n } from 'utils'

const TabPane = Tabs.TabPane

const Role = ({ location, dispatch, secRole, loading}) => {
	  const { dataSource, pagination, currentItem, modalVisible,userModalVisible,
			modalType, isMotion, selectedRowKeys,pershow ,usershow,dpshow,
			perDatas,parentDatas,checkedKeys,roleId,userListDatas,userLength,userPage,userPageSize,
			unAuthorizedUserDatas,unauthorizedLength,unauthorizedPage,unauthorizedPageSize} = secRole
	  const { pageSize,current } = pagination
	 
	  const listProps = {
	    dataSource,
	    loading: loading.effects['secRole/query'],
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
	        type: 'secRole/delete',
	        payload: id,
	      })
	    },
	    
	    onEditItem (item) {
	      dispatch({
	        type: 'secRole/showModal',
	        payload: {
	          modalType: 'update',
	          currentItem: item,
	        },
	      })
			},
			perSetting (item) {
	      dispatch({
	        type: 'secRole/perSetting',
	        currentItem: item,
	      })
			},
			userSettings (item) {
	      dispatch({
	        type: 'secRole/userSettings',
					currentItem: item,
					page:pagination
	      })
			},
			dpSetting(item){
				dispatch({
	        type: 'secRole/dpSetting',
					roleId: item,
					page:pagination
	      })
			}
	  }
	
	  const modalProps = {
	    data: modalType === 'create' ? {} : currentItem,
	    visible: modalVisible,
	    maskClosable: false,
	    confirmLoading: loading.effects['secGroup/update'],
	    title: `${modalType === 'create' ? i18n('btn.role.create') : i18n('btn.role.update')}`,
			okText:i18n('btn.cmn.okText'),
			cancelText:i18n('btn.cmn.cancelText'),
			wrapClassName: 'vertical-center-modal',
	    onOk (data) {
	    	dispatch({
	        type: `secRole/${modalType}`,
	        payload: data,
	      })
	    },
	    onCancel () {
	      dispatch({
	        type: 'secRole/hideModal',
	      })
			},
		}

		const userSettingProps = {
			dataSource:userListDatas,
			loading: loading.effects['secRole/query'],
			currentItem,
			pagination: {
					showSizeChanger: true,
					showQuickJumper: true,
					showTotal: total => `${i18n('lab.cmn.total')}  ${userLength} ${i18n('lab.cmn.num')}`,
          current: userPage,
          pageSize: userPageSize,
          total: userLength,
      },
	    location,
	    dispatch,
	    onChange (page) {
				dispatch({
	        type: 'secRole/userSettings',
					currentItem:currentItem,			
					page:page,
	      })
			},
			delRoleUsersByIds (item) {
	      dispatch({
					type: 'secRole/delRoleUsersByIds',
					roleId:currentItem.id,
	        userIDs: item,
				})
				dispatch({
	        type: 'secRole/userSettings',
					currentItem:currentItem,			
					page:pagination,
	      })
			},
		}

		const userModalProps = {
			visible: userModalVisible,
			maskClosable: false,
			wrapClassName: 'vertical-center-modal',
			okText:i18n('btn.cmn.okText'),
			cancelText:i18n('btn.cmn.cancelText'),
			userTableProps:{
				dataSource:unAuthorizedUserDatas,
				loading: loading.effects['secRole/query'],
				pagination: {
						showSizeChanger: true,
						showQuickJumper: true,
						showTotal: total => `${i18n('lab.cmn.total')}  ${unauthorizedLength} ${i18n('lab.cmn.num')}`,
						current: unauthorizedPage,
						pageSize: unauthorizedPageSize,
						total: unauthorizedLength,
				},
				location,
				dispatch,
				onChange (page) {
					dispatch({
						type: 'secRole/queryUnauthorizedUsers',
						roleId:currentItem.id,
						unauthorizedPage:page.current,
						unauthorizedPageSize:page.pageSize,
					})
				},
				rowSelection: {
					selectedRowKeys,
					onChange: (keys) => {
						dispatch({
							type: 'secRole/updateState',
							payload: {
								selectedRowKeys: keys,
							},
						})
					},
				},
			},
			onUserFilterChange (value) {
				dispatch({
						type: 'secRole/queryUnauthorizedUsers',
						roleId:currentItem.id,
						unauthorizedPage:1,
						unauthorizedPageSize:10,
						userfilter:value,
					})
			},
			onOk () {
				dispatch({
					type: 'secRole/userAuthorize',
					payload: {
						currentItem:currentItem,
						ids: selectedRowKeys,
					},
				})  
			},
			onCancel () {
				dispatch({
					selectedRowKeys,
					type: 'secRole/hideUserModal',
				})
			},
		}
			
		const perSettingProps = {
			perDatas,
			parentDatas,
			checkedKeys,
			currentItem,
			savePermissions(roleId,checkedKeys){
					var ids = _.filter(checkedKeys,(id)=>{return id.indexOf('.') > 0});
					dispatch({
						type: 'secRole/savePerSet',
						data: {
							roleId:roleId,
							ids: ids,
						},
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
	      type: 'secRole/multiDelete',
	      payload: {
	        ids: selectedRowKeys,
	      },
	    })
	  }
	  const handleTabClick = (key) => {
		  dispatch({
			  type: 'secRole/hideTabPane',
		  })
	  }
	  
	  
		let RoleTabPans;
	  if (pershow) {//分配权限
		  RoleTabPans = (
			  <Tabs activeKey="2" type="card" onTabClick={handleTabClick} >
		      <TabPane tab={i18n('lab.role.list')} key="1">     
				    <Filter {...filterProps} />
				    <List {...listProps} />
				    {modalVisible && <Modal {...modalProps} />}
		      </TabPane>
					<TabPane tab={i18n('lab.role.perSet')} key="2">
		      	<PerSetting  {...perSettingProps}/>
		      </TabPane>
	      </Tabs>
	    )
	  } else if(usershow){//绑定用户
		  RoleTabPans = (
			  <Tabs activeKey="2" type="card" onTabClick={handleTabClick} >
		      <TabPane tab={i18n('lab.role.list')} key="1">     
				    <Filter {...filterProps} />
				    <List {...listProps} />
				    {modalVisible && <Modal {...modalProps} />}
		      </TabPane>
					<TabPane tab={i18n('lab.role.luserset')} key="2">
		      	<UserList {...userSettingProps} />
						 {userModalVisible && <UserModal {...userModalProps} />}
		      </TabPane>
	      </Tabs>
	    )
	  } else if(dpshow){//数据权限
		  RoleTabPans = (
			  <Tabs activeKey="2" type="card" onTabClick={handleTabClick} >
		      <TabPane tab={i18n('lab.role.list')} key="1">     
				    <Filter {...filterProps} />
				    <List {...listProps} />
				    {modalVisible && <Modal {...modalProps} />}
		      </TabPane>
					<TabPane tab={i18n('lab.role.dp')} key="2">
		      </TabPane>
	      </Tabs>
			)
	  } else {//默认显示
				RoleTabPans = (
					<Tabs type="card" onTabClick={handleTabClick} >
						<TabPane tab={i18n('lab.role.list')} key="1">     
							<Filter {...filterProps} />
							<List {...listProps} />
							{modalVisible && <Modal {...modalProps} />}
						</TabPane>
					</Tabs>
				)
		}

	  return (
	    <div className="content-inner">
	        {RoleTabPans}
	    </div>
	  )
}

Role.propTypes = {
  secRole: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ secRole, loading }) => ({ secRole, loading }))(Role)

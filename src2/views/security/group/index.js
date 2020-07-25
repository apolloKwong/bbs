import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Tabs } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import UserModal from '../UserModal'
import UserAuthorize from './UserAuthorize'
import { hasPerm, i18n, PERMS } from 'utils'

const TabPane = Tabs.TabPane

const Group = ({ location, dispatch, secGroup, loading }) => {
  const { dataSource, pagination, currentItem, modalVisible, modalType,
    usershow, groupUserDatas, groupId, groupName, userLength, userPage, userPageSize, userModalVisible,
    unAuthorizedUserDatas, unauthorizedLength, unauthorizedPage, unauthorizedPageSize, selectedRowKeys } = secGroup
  const { pageSize } = pagination

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    okText: i18n('btn.cmn.okText'),
    cancelText: i18n('btn.cmn.cancelText'),
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['secGroup/update'],
    title: `${modalType === 'create' ? i18n('lab.group.create') : i18n('lab.group.update')}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `secGroup/${modalType}`,
        payload: data,
      })
    },
    onCancel() {
      dispatch({
        type: 'secGroup/hideModal',
      })
    },
  }

  const userModalProps = {
    visible: userModalVisible,
    okText: i18n('btn.cmn.okText'),
    cancelText: i18n('btn.cmn.cancelText'),
    maskClosable: false,
    confirmLoading: loading.effects['secGroup/update'],
    wrapClassName: 'vertical-center-modal',
    userTableProps: {
      dataSource: unAuthorizedUserDatas,
      loading: loading.effects['secGroup/query'],
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
      onChange(page) {
        dispatch({
          type: 'secGroup/queryUnauthorizedUsers',
          groupId: groupId,
          unauthorizedPage: page.current,
          unauthorizedPageSize: page.pageSize,
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: (keys) => {
          dispatch({
            type: 'secGroup/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    },
    onUserFilterChange(value) {
      dispatch({
        type: 'secGroup/queryUnauthorizedUsers',
        groupId: groupId,
        unauthorizedPage: 1,
        unauthorizedPageSize: 10,
        userfilter: value,
      })
    },
    onOk() {
      dispatch({
        type: 'secGroup/userAuthorize',
        payload: {
          groupId: groupId,
          groupName: groupName,
          ids: selectedRowKeys,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'secGroup/hideUserModal',
        selectedRowKeys,
      })
    },
  }

  const listProps = {
    dataSource,
    loading: loading.effects['secGroup/query'],
    pagination,
    location,
    onChange(page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }))
    },
    onDeleteItem(id) {
      dispatch({
        type: 'secGroup/delete',
        payload: id,
      })
    },
    onEditItem(item) {
      dispatch({
        type: 'secGroup/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    queryAuthorizedUsers(item) {
      dispatch({
        type: 'secGroup/queryAuthorizedUsers',
        groupId: item.id,
        groupName: item.name,
        userPage: 1,
        userPageSize: 10
      })
    },
  }

  const filterProps = {
    filter: {
      ...location.query,
    },
    onFilterChange(value) {
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

  const userAuthorizeProps = {
    dataSource: groupUserDatas,
    groupId,
    groupName,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `${i18n('lab.cmn.total')} ${userLength} ${i18n('lab.cmn.num')}`,
      current: userPage,
      pageSize: userPageSize,
      total: userLength,
    },
    location,
    dispatch,
    onChange(page) {
      dispatch({
        type: 'secGroup/queryAuthorizedUsers',
        groupId: groupId,
        groupName,
        userPage: page.current,
        userPageSize: page.pageSize,
      })
    },
    onCancelAuthorization(userId) {
      dispatch({
        type: 'secGroup/cancelAuthorization',
        groupId: groupId,
        groupName,
        userId: userId,
      })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'secGroup/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  const handleTabClick = (key) => {
    dispatch({
      type: 'secGroup/hideTabPane',
    })
  }

  let groupTabPans;
  if (usershow) {//用户授权
    groupTabPans = (
      <Tabs activeKey="2" type="card" onTabClick={handleTabClick} >
        <TabPane tab={i18n('lab.group.list')} key="1">
          <Filter {...filterProps} />
          <List {...listProps} />
          {modalVisible && <Modal {...modalProps} />}
        </TabPane>
        <TabPane tab={i18n('lab.group.authorize')} key="2">
          <UserAuthorize {...userAuthorizeProps} />
          {userModalVisible && <UserModal {...userModalProps} />}
        </TabPane>
      </Tabs>
    )
  } else {//默认显示
    groupTabPans = (
      <Tabs type="card" onTabClick={handleTabClick} >
        <TabPane tab={i18n('lab.group.list')} key="1">
          <Filter {...filterProps} />
          <List {...listProps} />
          {modalVisible && <Modal {...modalProps} />}
        </TabPane>
      </Tabs>
    )
  }

  return (
    <div className="content-inner">
      {groupTabPans}
    </div>
  )
}

Group.propTypes = {
  secGroup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ secGroup, loading }) => ({ secGroup, loading }))(Group)

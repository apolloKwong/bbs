



import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import Filter from './filter.js'
import List from './List.js'
import Modal from './Modal.js'
const Plate = ({ plate, loading, dispatch }) => {
    const { dataSource, currentItem, modalType, modalVisible, pagenation } = plate
    const pageSize = 10



    const filterProps = {
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

        onSearch(fieldsValue) {
            fieldsValue.keyword.length ? dispatch(routerRedux.push({
                pathname: '/plate',
                query: {
                    field: fieldsValue.field,
                    keyword: fieldsValue.keyword,
                },
            })) : dispatch(routerRedux.push({
                pathname: '/plate',
            }))
        }
    }

    const listProps = {
        loading: loading.effects['plate/query'],
        dataSource,
        pagenation,
        location,
        onEdit(item) {
            dispatch({
                type: 'plate/openModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                }
            })
            console.log(item)

        },

        onAdd() {
            dispatch({
                type: 'plate/openModal',
                payload: {
                    modalType: 'create',
                    currentItem: {},
                }
            })
        },

        onDelete(item) {
            dispatch({
                type: 'plate/delete',
                payload: {

                    id: item.id
                }
            })
        },
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
        }
    }

    const modalProps = {
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        confirmLoading: loading.effects['plate/update'],
        title: modalType === 'create' ? 'create' : 'update',
        onOk(data) {
            dispatch({
                type: `plate/${modalType}`,
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'plate/hideModal',
            })

            dispatch({
                type: 'plate/query',
            })
        },


    }

    return (
        <Page inner>
            <Filter {...filterProps} />

            <List {...listProps} />
            {modalVisible && <Modal{...modalProps} />}
        </Page>
    )
}


Plate.PropTypes = {
    plate: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({ plate, loading }) => ({ plate, loading }))(Plate)
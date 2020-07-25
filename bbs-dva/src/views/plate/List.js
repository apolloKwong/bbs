import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import Grid from "components/Grid"
import { Link } from 'dva/router'



const List = ({ ...tableProps, dispatch, onEdit, onAdd, onDelete }) => {

  const PlateToolbar = [
        {
            text: '新增',
            icon: 'new',
            disabled: false,
            handler: function () {
                onAdd()
            }
        }
    
    ];
    const columns = [
        {
            title: '操作',
            // width: 20,
            render(text, record) {
                //  disabled={!hasPerm(PERMS.PLATE.UPDATE)}
                return (
                    <a onClick={

                        function () {
                            onDelete(record)
                        }
                    }>删除</a>
                )
            }
        },


        {
            title: "板块名称",
            // width: 40,
            dataIndex: 'plateName',
            render(text, record) {
                //  disabled={!hasPerm(PERMS.PLATE.UPDATE)}
                return (
                    <a onClick={

                        function () {

                            onEdit(record)
                        }
                    }>{text}</a>
                )
            }
        }, {
            title: "排序",
            // width: 40,
            dataIndex: 'order',

        }, {
            title: "点击数",
            // width: 40,
            dataIndex: 'hit',
        }, {
            title: "状态",
            // width: 40,
            dataIndex: 'plateStateDesp',
        }

    ];

    return (
        <div>
            <Grid {...tableProps} rowKey='id' columns={columns} toolbar={PlateToolbar} />
        </div>
    )
}

List.PropTypes = {

    openModal: PropTypes.func
}

export default List
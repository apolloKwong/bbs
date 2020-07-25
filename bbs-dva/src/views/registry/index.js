import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TreeForm from "components/TreeForm"
import { Form, Input, InputNumber, Checkbox, Row, Col, Button } from 'antd'
import RegistryForm from './Form'

const FormItem = Form.Item;

const Registry = ({
    registry,
    location,
    dispatch,
}) => {
    const { dataSource, selectedKeys, currentItem } = registry;
    const onCreate = (currentItem) => {
        let pcode = "";
        if(currentItem.pcode){
            pcode = currentItem.pcode + ".";
        }
        return {
            id : '',
            code : '',
            value : '',
            desp : '',
            pcode: pcode + currentItem.code,
            enabled:true,
            parentId : currentItem.id,
        };
    };

    const onDelete = (ids) => {
        dispatch({ type: 'registry/delete',  payload: ids })
    };

    return (
        <TreeForm 
            Form={RegistryForm}
            dataSource={dataSource}
            location={location}
            dispatch={dispatch}
            selectedKeys={selectedKeys}
            currentItem={currentItem}
            root={null}
            nameKey='registryName'
            parentKey='pId'
            snKey='id'
            expandedKeys={["1","2"]} 
            onCreate={onCreate}
            onDelete={onDelete}
        />
    )
}

export default connect(({registry}) => ({registry}))(Registry)
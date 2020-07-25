import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TreeForm from "components/TreeForm"
import { Form, Input, InputNumber, Checkbox, Row, Col, Button } from 'antd'
import OrgForm from './OrgForm'
import { Page } from 'components'

const FormItem = Form.Item;

const Org = ({ org, location, dispatch, loading }) => {
    const { dataSource, selectedKeys, currentItem } = org;
    const onCreate = (currentItem) => {
        return {
            orgName : '',
            id : '',
            pId:currentItem.id,
            orgCode : '',
            porgName:'',
            porgCode:'',
            orgNote:'',
        };
    };

    const onDelete = (ids) => {
        dispatch({ type: 'org/delete',  payload: ids })
    };

    return (
       <Page inner>
            <TreeForm 
            Form={OrgForm}
            loading={loading.effects['org/query']}
            //root={{id:0, orgName:'公司组织机构'}}
            height={'calc(100vh - 190px)'}
            dataSource={dataSource}
            location={location}
            dispatch={dispatch}
            selectedKeys={selectedKeys}
            currentItem={currentItem}
            root={null}
            nameKey='orgName'
            parentKey='pId'
            snKey='id'
            expandedKeys={["1","2"]} 
            onCreate={onCreate}
            onDelete={onDelete}
        />
      </Page>
    )
}

export default connect(({org,loading}) => ({org, loading}))(Org)
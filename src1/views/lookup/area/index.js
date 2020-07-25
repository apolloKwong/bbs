import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TreeForm from "components/TreeForm"
import { config, createDataForm, ValidateRules, i18n } from 'utils'
import styles from './index.less'
import { Form, Input, InputNumber, Checkbox, Row, Col, Button} from 'antd'
import singleLayerData from 'services/lookupArea'

const FormItem = Form.Item;
const { SEC } = ValidateRules

const Lookup = ({
  secLookupSingleLayer,
  location, 
  dispatch,
  loading,
}) => {
    
  const { dataSource, selectedKeys, isSingle, flag } = secLookupSingleLayer
  let { currentItem } = secLookupSingleLayer
  let currentItemTemp = currentItem;
  // if(currentItem!==null && currentItem.parentId===0 && flag ===1){
  if(flag===1){//father
    currentItem=null;
  }
  if(dataSource!==null){
    dataSource.map((value,key)=>{
      dataSource[key].name = dataSource[key].desp;
    })
  }
  function onCreate(selectedRow){
    dispatch({ type: "secLookupSingleLayer/get", payload:{currentItem:currentItemTemp,flag:3}}) 
    return {
      name:currentItemTemp.desp,
      id:"",
      parentId:currentItemTemp.id,
      sn:"1",
      groupCode:currentItemTemp.groupCode,
      parent:currentItemTemp.parent,
      code:currentItemTemp.code,
      desp:currentItemTemp.desp,
    }   
  }
  function onDelete(ids){
      dispatch({type: 'secLookupSingleLayer/remove', payload: ids})
  }
  return (
          <TreeForm 
            Form={LookupForm}
            loading={loading.effects['secLookupSingleLayer/get']}
            dataSource={dataSource}
            location={location}
            dispatch={dispatch}
            selectedKeys={selectedKeys}
            currentItem={currentItem}
            isSingle={isSingle}
            defaultExpandAll={true}
            onDelete={onDelete} 
            onCreate={onCreate}
          />
  )
}


function callback(key){
}
  class FormC extends React.Component{
    constructor(props){
      super(props);
    }
    handleSubmit=(e)=>{
      e.preventDefault();
      const { form, dispatch } = this.props
      form.validateFields((errors, values) => {
          if (!!errors) {
            return;
          }
          var data = form.getFieldsValue()
          if(data.id===""){
            dispatch({
              type: 'secLookupSingleLayer/create',
              payload: data,
            })
          }else{
            dispatch({ 
              type: 'secLookupSingleLayer/update', 
              payload: data,
            })
          }        
      });
    }

    codeValidator = (rule, value, callback) => {
      const { getFieldsValue } = this.props.form;
      const temp = getFieldsValue();
      const { id, code, parentId } = getFieldsValue();
      if(code !== undefined && code.length>0 && code.length <= SEC.LOOKUP.CODE_MAX){
        setTimeout(() => {
          let queryFilter = {};
          const codeFilter = "Q_code_EQ";
          const parentIdFilter = "Q_parentId_EQ";
          queryFilter[parentIdFilter]= parentId;
          queryFilter[codeFilter] = code;
          const idFilter = "Q_id_L_NE";
          if(id !== undefined){
            queryFilter[idFilter] = id;
          }
          singleLayerData.list(queryFilter).then(function ({data}) {
            if(code.length>1 && data.length >0){
              callback((i18n('lab.lookup.coderept')));
            }else{
              callback();
            }
            }, function () {
              callback([new Error(error)]);
          });
        },100);
      }else{
        callback();
      }
    }

    render(){
      const { getFieldDecorator } = this.props.form;
      const colProps = {
        labelCol:{ span: 3 },
        wrapperCol:{ span: 14 }
      }
      return(
        <Form layout="horizontal" className="as-form as-m-form">
          <FormItem label={i18n('lab.lookup.datatype')} {...colProps}>
            {getFieldDecorator('parent', {
            })(<Input disabled/>)}
          </FormItem>
          <FormItem label={i18n('lab.lookup.desp')} {...colProps}>
            {getFieldDecorator('desp', {
              rules: [
                {
                  required: true,
                  message:`${i18n('lab.lookup.vdesp1')} ${SEC.LOOKUP.DESP_MIN} ${i18n('lab.cmn.vnc')}`
                },
              ],
            })(<Input placeholder={i18n('lab.lookup.vdesph')}/>)}
          </FormItem>
          <FormItem label={i18n('lab.lookup.code')} {...colProps}>
            {getFieldDecorator('code', {
              rules: [
                {
                  required: true,
                  message:i18n('lab.lookup.vcodesng'),
                },
                {
                  validator:this.codeValidator,
                },
              ],
            })(<Input placeholder={i18n('lab.lookup.vcodep')}/>)}
          </FormItem> 
          <Row>
            <Col span="16" offset="3">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              {getFieldDecorator("parentId")(<Input type="hidden"/>)}
              {getFieldDecorator("groupCode")(<Input type="hidden"/>)}
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>{i18n('btn.lookup.sure')}</Button>
            </Col>
          </Row>
        </Form>
      );
    } 
  } 
  const LookupForm = createDataForm(FormC);

export default connect(({ secLookupSingleLayer, loading}) => ({ secLookupSingleLayer, loading}))(Lookup)

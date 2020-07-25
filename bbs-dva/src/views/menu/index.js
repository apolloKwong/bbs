import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import TreeForm from "components/TreeForm"
import { Page } from 'components'
import { config, createDataForm, ValidateRules, i18n } from 'utils'
import styles from './index.less'
import { Form, Input, InputNumber, Checkbox, Row, Col, Button} from 'antd'

const FormItem = Form.Item;
const { SEC } = ValidateRules

const Menu = ({
  menu,
  location, 
  dispatch,
  loading,
  //form: {
  //  getFieldDecorator,
  //  validateFieldsAndScroll,
  //},
}) => {
    
  const { dataSource,selectedKeys, currentItem } = menu
  if (dataSource != null) {
    dataSource.forEach(function(item){
        item.name = i18n(item.name)
    })
  }
  
  function onCreate(selectedRow){
      return {
          name : "",
          id : "",
          parentId:selectedRow.id,
          sn : "1",
          publish:false,
          iconName:"",
          className:"",
          url:"",
      };
  }
  function onDelete(ids){
      dispatch({ type: 'menu/delete',  payload: ids })
  }

  return (
          <Page inner>
              <TreeForm 
              loading={loading.effects['menu/query']}
              height={'calc(100vh - 190px)'}
              Form={MenuForm}
              dataSource={dataSource}
              location={location}
              dispatch={dispatch}
              selectedKeys={selectedKeys}
              currentItem={currentItem}
              expandedKeys={["1","2"]} 
              onDelete={onDelete} 
              onCreate={onCreate} />
          </Page>
  )
}


  const MenuForm  = createDataForm(React.createClass({
      
      handleSubmit(e) {
          e.preventDefault();
          const { form, dispatch, type} = this.props
          form.validateFields((errors, values) => {
              if (!!errors) {
                return;
              }
              var data = form.getFieldsValue()

              if (type === 'edit'){
                dispatch({
                    type:'menu/save',
                    payload:data,
                })
              } else {
                dispatch({
                    type:'menu/create',
                    payload:data,
                })
              }
          });
      },
      
      render() {
          const {form,data} = this.props,
              {getFieldDecorator} = form;

          const colProps = {
              labelCol:{ span: 3 },
              wrapperCol:{ span: 14 }
           }  
          return (
        <Form layout="horizontal" className="as-form as-m-form">
          <FormItem label="名称" {...colProps}>
              <Row>
                  <Col span={12}>
                    {getFieldDecorator("name",{
                        rules: [
                        { required: true, max: SEC.MENU.NAME_MAX, message: `请输入栏目名称，且不能超出${SEC.MENU.NAME_MAX}个字符`},
                        ],
                    })(<Input placeholder="名称" />)}
                  </Col>
                  <Col span={12}>（{data.value}）</Col>
              </Row>
          </FormItem>
          <FormItem label="URL" {...colProps}>
              {getFieldDecorator("url")(<Input placeholder="URL"/>)}
          </FormItem>
          <FormItem label="权限码" {...colProps}>
              {getFieldDecorator("moduleCode")(<Input placeholder="权限码"/>)} 
          </FormItem>
          <FormItem label="Class" {...colProps}>
              {getFieldDecorator("className")(<Input placeholder="样式"/>)}
          </FormItem>
          <FormItem label="Icon" {...colProps}>
              {getFieldDecorator("iconName")(<Input placeholder="图标"/>)} 
          </FormItem>
          <FormItem label="锚点" {...colProps}>
              {getFieldDecorator("anchor")(<Input placeholder="anchor"/>)} 
          </FormItem>
          <FormItem label="排序号" {...colProps}>
              {getFieldDecorator("sn",{initialValue:0})(<InputNumber min={0} />)}
          </FormItem> 
          <FormItem wrapperCol={{ span: 14, offset: 3 }}>
              {getFieldDecorator("publish",{valuePropName:"checked"})(<Checkbox>是否发布</Checkbox>)}
          </FormItem>
          <Row>
            <Col span="16" offset="3">
              {getFieldDecorator("id")(<Input type="hidden"/>)}
              {getFieldDecorator("parentId")(<Input type="hidden"/>)}
              <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>确定</Button>
            </Col>
          </Row>
        </Form>
      );
    }

  }));

export default connect(({ menu, loading}) => ({ menu, loading}))(Menu)

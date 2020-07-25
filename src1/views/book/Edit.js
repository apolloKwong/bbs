import React from'react'
import { Input, Button, Form, Row, Col } from 'antd'
import { createDataForm } from 'utils'
import wfBook from 'services/book'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'

const FormItem = Form.Item;

const Book = ({
    wfBook,
    location,
    dispatch,
    loading,
}) => {
    let data = {}
    const { currentItem, dataSource } = wfBook
    if(wfBook.modalType==="update"){
        data = currentItem
    }
    return (
        <Forms dispatch={dispatch} data={data}/>
    )
}

class FormTest extends React.Component{
    constructor(props){
        super(props);
    }
    handleSave = (e) =>{
        e.preventDefault();
        const { form, dispatch, data } = this.props
        form.validateFields((err, values) => {
          if (!err) {
            if(values.id===undefined){
                dispatch({
                    type:`wfBook/create`,
                    payload:values,
                })
            }else{
                dispatch({
                    type:`wfBook/update`,
                    payload:values,
                })
            }        
          }
        });
    }
    handleBack = () =>{
        const { dispatch } = this.props    
        dispatch(routerRedux.push({
            pathname: '/book',
        }))
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form>
                <Row>
                    <Col span="10">
                        <FormItem label = "名称：" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} hasFeedback>
                            {getFieldDecorator('name', {
                                rules: [{ required: true , }],
                                })(<Input type="text" placeholder="名称"  />)}
                        </FormItem>
                        <FormItem label = "描述：" labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} hasFeedback>
                            {getFieldDecorator('remark', {
                                rules: [{ required: true , }],
                                })(<Input type="input" placeholder="remark"  />)}
                        </FormItem>
                    </Col>
		        </Row>
                <Row>
                    {getFieldDecorator('id')(<Input type="hidden"/>)}
                    <Col offset={4}>
                        <Button onClick={this.handleSave} type="primary" htmlType="submit">保存</Button>
                        <span>&nbsp;</span>
                        <Button onClick={this.handleBack}>返回</Button>
                    </Col>
                </Row><br/>
            </Form>
        )
    }
}
const Forms = createDataForm(FormTest);

export default connect(({ wfBook, loading}) => ({ wfBook, loading}))(Book)

import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Card, Form, Input } from 'antd'
import { createDataForm, i18n } from 'utils'
import ApproveTail from './ApproveTail'
import Handler from '../Handler'
import DiagramModal from '../DiagramModal'
import { get, query } from 'services/security/user'

const FormItem = Form.Item;

const Approve = ({ location, dispatch, approveForm, loading }) => {
  const { isMotion, currentItem, diagramModalVisible, wfLog } = approveForm
    var taskDefObj;
    var formEntityObj;
    var wfLogArr = [];
    var logId = null;
    var formKeyObj;
    if(JSON.stringify(currentItem)!=="{}"){
        wfLogArr = wfLog;
        const { formEntity } = currentItem
        const { taskDef } = currentItem
        const { formKey } = currentItem
        taskDefObj = eval('('+taskDef+')');
        formEntityObj = eval('('+formEntity+')');
        formKeyObj = formKey;
        // console.log(taskDefObj);
        // console.log(formEntityObj);
        // console.log(formKeyObj);
        logId = formEntityObj.id;
    }
    const DiagramModalProps = {
        item:currentItem,
        title:`${i18n('lab.wf.procdiag')}`,
        visible:diagramModalVisible,
        width:1000,
        height:500,
        footer:null,
        maskClosable:false,
        wrapClassName: 'vertical-center-modal',
        onCancel () {
            dispatch({
                type:`approveForm/hideDiagramModal`,
            })
        }
    }

  return (
    <div className="content-inner">
      <ApproveHeader taskDefObj={taskDefObj} formEntityObj={formEntityObj} dispatch={dispatch} currentItem={currentItem}/>
      <Card title={`处理环节(${taskDefObj!==undefined?taskDefObj.name:""})`}>
        <ApproveInnerForm/>
        <br/>
        <Row>
            <Col span="24" offset="4" className="as-form-btn">
                <Button type="primary" htmlType="submit">确定</Button>
                <Button style={{marginLeft:12}}>返回</Button>
            </Col>
        </Row>
      </Card>
      <ApproveTail logId={logId} dispatch={dispatch}/>
      {diagramModalVisible && <DiagramModal {...DiagramModalProps}/>}
    </div>
  )
}

class ApproveHeader extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        startHandler:{},
    }
    showDiagramModal = (processDefinitionId) => {
        const { currentItem } = this.props; 
        currentItem.id = processDefinitionId;
        this.props.dispatch({
            type:`approveForm/showDiagramModal`,
            payload:{  
                currentItem: currentItem, 
              }
        })
    }
    componentWillReceiveProps(nextProps){
        const { formEntityObj } = this.props;
        let that = this;
        if(formEntityObj !== undefined){
            let id = { id: formEntityObj.startUserId}
            get(id).then(function ({data}){
                that.setState({
                    startHandler:{
                                    "groups":[],
                                    "users":[{
                                        "idLastName":data.lastname,
                                        "idAcount":data.acount,
                                        "idEmail":data.email,
                                        "phone":data.phone,
                                    }]
                                }
                });          
            })
        }
    }
    render(){
        const { taskDefObj, formEntityObj } = this.props
        const { startHandler } = this.state
        return(
            <Card title={<span>基本信息<a onClick={()=>this.showDiagramModal(formEntityObj!==undefined?formEntityObj.processDefinitionId:null)}>(流程图)</a></span>}>
                <Row>
                    <Col span="6">
                        <label>流程类型：</label><span>{formEntityObj!==undefined?formEntityObj.processDefinitionName:null}</span><br/>
                        <label>流程发起人：</label><span>{formEntityObj!==undefined?<Handler handler={startHandler}/>:null}</span>
                    </Col>
                    <Col span="6">
                        <label>流程名称：</label><span>{formEntityObj!==undefined?formEntityObj.name:null}</span><br/>
                        <label>当前处理人：</label><span>{formEntityObj!==undefined?<Handler handler={formEntityObj.handler}/>:null}</span><br/>
                    </Col>
                    <Col span="6">
                        <label>流程状态：</label><span>{formEntityObj!==undefined?formEntityObj.status:null}</span><br/>
                    </Col>
                </Row>
            </Card>
        )
    }
}
class ApproveInner extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        dataSource:[],
    }
    handleToOthers = () => {
        console.log("handleToOthers");
        let that = this;
        let qs = {}
        query(qs).then(function ({data}){
            // console.log(data);
            that.setState({dataSource:data});
        })
    }
    handleToChoose = () => {
        console.log("handleToChoose");
    }
    render(){
        const { getFieldDecorator } = this.props.form
        return(
            <div className="as-workflow as-form as-m-form">
                <Form layout="horizontal">
                    <Row >
                        <Col span="24">
                            <FormItem label="路由" className="as-m-form-item" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
                                { getFieldDecorator('type1', {
                                    rules: [{
                                        required: true,
                                    }],})(
                                    <Input/>
                                )}
                            </FormItem>
                            <FormItem label="处理意见" className="as-m-form-item" labelCol={{ span: 2 }} wrapperCol={{ span: 10 }}>
                                { getFieldDecorator('type', {
                                    rules: [{
                                        required: true,
                                    }],})(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    {/* <Row>
						<Card title="功能操作">
							<Row>
								<Col span="24">
									<FormItem label="转他人处理" className="as-m-form-item" labelCol={{ span: 2 }} wrapperCol={{ span: 22 }}>
										<Button type="primary" onClick={this.handleToOthers} size="small">转给他人处理</Button>
						        	</FormItem>
								</Col>
							</Row>
							<Row>
                                <Col span="24">
                                    <FormItem
                                        className="as-m-form-item"
                                        label="抄送给他人"
                                        labelCol={{ span: 2 }}
                                        wrapperCol={{ span: 12 }}>
                                        <Button type="primary" onClick={this.handleToChoose} size="small">点选抄送人员</Button>
                                        {getFieldDecorator('flow.ccNames')(<Input placeholder="已选抄送人" disabled/>)}
                                    </FormItem>
                                    {getFieldDecorator('flow.cc')(<Input type="hidden" />)}
                                </Col>
							</Row>
						</Card>
					</Row> */}
                </Form>
            </div>
        )
    }
}
const ApproveInnerForm = createDataForm(ApproveInner);

Approve.propTypes = {
  approveForm: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  taskDefObj: PropTypes.object,
  formEntityObj: PropTypes.object,
}

export default connect(({ approveForm, loading }) => ({ approveForm, loading }))(Approve)

import React from 'react'
import PropTypes from 'prop-types'
import { Card, Timeline, Icon, Row, Col } from 'antd'
import approveWfLog from 'services/workflow/workflowApprove'

class ApproveTail extends React.Component{
    constructor(props){
        super(props)
    }
    state = {
        down:true,
        dataSource:[],
    }

    
    componentWillReceiveProps(nextProps){
        const { logId } = this.props;
        let that = this;
        if(logId!==null){
            let qs = { Q_procinstId_EQ : logId};
            approveWfLog.list(qs).then(function ({data}){
                that.setState({dataSource: data});
            })
        }
    }
    handleClick = () => {
        const { down } = this.state;
        const { dataSource } = this.state;
        let temp = [];
        temp = dataSource;
        temp.reverse();
        this.setState({dataSource:temp, down:!down});
    }
    render(){
        const { down, dataSource } = this.state; 
        let items = [];
        items.push(
            <Timeline.Item className='timelineitem' key={0} dot={<i className="fa fa-bars" aria-hidden="true"></i>}>
                <Row className='timelineitem-row'>
                    <Col span="4">
                        事项名称&nbsp;
                        <a onClick={ this.handleClick }>{(down?<i className="fa fa-angle-down" aria-hidden="true"></i>:<i className="fa fa-angle-up" aria-hidden="true"></i>)}</a>
                    </Col>
                    <Col span="4">处理人</Col>
                    <Col span="4">处理时间</Col>
                    <Col>处理结果</Col>
                </Row>
            </Timeline.Item>);
        (dataSource!==[]?           
            _.each(dataSource,function(data){
                items.push(
                <Timeline.Item className='timelineitem' key={data.id} 
                  color={data.operationType == "06"?'red':data.taskEndTime || data.operator ?'blue':'red'} 
                  dot={data.operationType == "06"?<i className="fa fa-arrow-right" aria-hidden="true"></i>:data.taskEndTime || data.operator?'':<i className="fa fa-clock-o" aria-hidden="true"></i>}>
                    <Row className='timelineitem-row'>
                        <Col span="4">{data.operationType == "06"?data.taskName+" [转他人处理]":data.taskName}</Col>
                        <Col span="4">{data.operator}</Col>
                        <Col span="4">{data.taskEndTime}</Col>
                        <Col>{data.operation}</Col>
                    </Row>
                </Timeline.Item>)
            })
        :null)
        return(
            <Card title={<span>流程操作历史记录：</span>}>
                <Timeline>
                    {items}
                </Timeline>
            </Card>
        )
    }
}

export default ApproveTail;

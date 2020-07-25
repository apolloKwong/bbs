import React, { Component } from 'react';
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Col, Card, Form, Input, Avatar, Select, Tabs, Radio, Icon, Tag,Pagination, } from 'antd'
import styles from './index.less'



const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option


const HotAndClassification = ({questionList,}) => {
   // console.log("classificationList",classificationList)
     console.log("questionList",questionList)
   
  
        return (
            <div className={styles.hotandclassification}>
                <Form>
                    <FormItem >
                        <br/>
                        <div style={{ background: '#fff' }}>
                            <div style={{ marginBottom: 8, fontSize: '20px', fontFamily: '微软雅黑',}}>问题分类</div>                    
                            <div style={{ marginBottom: 10, width: '80px', height: '3px', background: 'red' }}></div>
                            <div className={styles.classification}>
                                <Tabs defaultActiveKey="0" style={{height:500,fontSize:18}}>
                                    {_.map(questionList, function (item, x) {
                                    return(  
                                        <TabPane tab= {<span style={{fontSize:'17px',fontFamily:'微软雅黑',}}> {item.className}</span>} key={x} >
                                            {_.map(questionList[x].questions, function (item, y) {
                                                return (                           
                                                    <div key={y}>
                                                        <div style={{ marginBottom: 8, fontSize: '15px', fontFamily: '微软雅黑', }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.content}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.questionDate}</div>
                                                        <hr style={{}} />
                                                        <div style={{height:'18px'}}></div>

                                                    </div>
                                                    )
                                                })
                                            }
                                        </TabPane>
                                        )
                                        })
                                    }
                                </Tabs>
                                
                            </div>
                            {/*<Pagination defaultCurrent={1} total={50} style={{display:'block' ,marginLeft:'30%'}}/><br/>*/}
                        </div>
                    </FormItem >



                    <FormItem >
                        <br/> <div style={{ background: '#fff' }}>
                        <div style={{ marginBottom: 8, fontSize: '20px', fontFamily: '微软雅黑', }}>热门问题</div>
                        <div style={{ marginBottom: 10, width: '80px', height: '3px', textDecorationStyle: 'underline', background: 'red' }}></div>
                        <Tabs defaultActiveKey="1" style={{ height: 460, background: '#fff' }}>
                            <TabPane tab={<span style={{ fontSize: '16px'}}>等我回答</span>} key="1">
                                <div className={styles.hot} style={{}}>

                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}><a href="/questionbar/questionandanswer" style={{color:'black'}}>富文本编辑器怎么写？有没有demo之类的</a></div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>微服务划分模块有什么要求吗？</div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>谁会搭建阿里云服务器环境，求指教？</div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>环境配置好了，前端框架搭不起来，npm start老是报错？</div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>前端框架能在组织一次培训吗？</div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>公司年会会有什么精彩节目啊？</div>
                                    <hr style={{}} />
                                    <br />
                                    <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>SmartAS框架的开发手册有最新版的吗？</div>
                                    <hr style={{}} />
                                </div>

                            </TabPane>
                            <TabPane tab={<span style={{ fontSize: '16px' }}>大家再问</span>} key="2">
                                大家再问什么呢
                             </TabPane>
                            <TabPane tab={<span style={{ fontSize: '16px' }}>已解决</span>} key="3">
                                已解决的问题
                             </TabPane>
                        </Tabs>

                    </div><br/>
                    </FormItem >

                </Form>
            </div>
        );
    
}


export default createDataForm(HotAndClassification)
// export default HotAndClassification


    // <TabPane tab={<span style={{ fontSize: '16px' }}>运营管理</span>} key="2" style=    { fontSize: '18px' }
    //                                     <Tag>项目管理</Tag><Tag>需求设计</Tag><Tag>测试流程</Tag><Tag>项目维护</Tag>
    //                                     <Tag>敏捷开发</Tag><Tag>瀑布开发</Tag><Tag>客户维护</Tag>

    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>补贴报销</span>} key="3">
    //                                     <Tag>出差报销</Tag><Tag>餐补报销</Tag><Tag>话费报销</Tag><Tag>车费报销</Tag>
    //                                     <Tag>报销流程</Tag><Tag>高温补贴</Tag><Tag>其他报销</Tag>
    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>公司政策</span>} key="4">
    //                                     <Tag>办公规定</Tag><Tag>公司福利</Tag><Tag>请假报销</Tag><Tag>其他</Tag>

    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>前端</span>} key="5">
    //                                     <Tag>javascript</Tag><Tag>react</Tag><Tag>phoneixUI</Tag><Tag>bootstrap</Tag>
    //                                     <Tag>ant-design</Tag><Tag>前端demo</Tag><Tag>相关文档</Tag>
    //                                     <Tag>前端学习指南</Tag><Tag>前端新技术</Tag><Tag>前端书籍推荐</Tag>
    //                                     <Tag>es6</Tag><Tag>PHP</Tag><Tag>其他</Tag>
    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>人力资源</span>} key="6">
    //                                     <Tag>资源配置</Tag><Tag>人资建议</Tag><Tag>招聘计划</Tag><Tag>入职相关</Tag>
    //                                     <Tag>辞职相关</Tag>

    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>产品与设计</span>} key="7">
    //                                     <Tag>UI设计</Tag><Tag>原型设计</Tag><Tag>产品优化</Tag><Tag>设计杂谈</Tag>

    //                                 </TabPane>

    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>职场人生</span>} key="9">
    //                                     <Tag>程序员健康</Tag><Tag>个人与公司</Tag><Tag>经验总结</Tag><Tag>新员工指南</Tag>
    //                                     <Tag>发展前景</Tag><Tag>工作与生活</Tag><Tag>职场与家庭</Tag>
    //                                 </TabPane>
    //                                 <TabPane tab={<span style={{ fontSize: '16px' }}>友圈互动</span>} key="10">
    //                                     <Tag>拼车回家/上班</Tag><Tag>好书借给我</Tag><Tag>唱歌</Tag><Tag>郊游</Tag><Tag>篮球</Tag><Tag>羽毛球</Tag><Tag>乒乓球</Tag>
    //                                     <Tag>团队活动</Tag><Tag>其他</Tag>
    //                                 </TabPane>



    //   {/*<div>{item.className}</div>*/}
    //                             <TabPane  tab="sd" key={x}  >
    //                                 <div>1</div>
                               
    //                             </TabPane>
    //                                 {/*<div className={styles.hot} style={{}}>{item.className} 

    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}><a href="/questionbar/questionandanswer" style={{color:'black'}}>富文本编辑器怎么写？有没有demo之类的</a></div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>微服务划分模块有什么要求吗？</div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>谁会搭建阿里云服务器环境，求指教？</div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>环境配置好了，前端框架搭不起来，npm start老是报错？</div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>前端框架能在组织一次培训吗？</div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>公司年会会有什么精彩节目啊？</div>
    //                                 <hr style={{}} />
    //                                 <br />
    //                                 <div style={{ marginBottom: 8, fontSize: '16px', fontFamily: '微软雅黑', }}>SmartAS框架的开发手册有最新版的吗？</div>
    //                                 <hr style={{}} />
    //                             </div>*/}

    //                             {/*</TabPane>*/}
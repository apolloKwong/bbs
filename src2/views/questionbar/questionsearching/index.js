//说明，该页面是问题搜索的结果展示页面，有相关类似问题展示，还有找人回答板块
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon ,Pagination} from 'antd'

import styles from './index.less'



const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option

const QuestionSearching = ({ loading, dispatch,
    form: {
      getFieldDecorator,
        getFieldValue,
        setFieldValue,
        getFormatFieldValue,
}
}) => {

    const Search = Input.Search

    return (

         <Form>
            <FormItem >
                <div className={styles.search_box}  >
                    <br />
                    <div className={styles.search}>
                        {
                            <div>
                                <Search placeholder="微服务配置中心怎么配置?" size="large" style={{ width: '40%', left: '10%',color:'black' }} />
                                <Button type="primary" size="large" style={{ left: '10%' }} ><a href="/questionbar/questionsearching">搜 &nbsp;索</a></Button>

                                <Button type="primary" size="large" style={{ left: '15%' }} ><a href="/questionbar/questioning">我要提问</a></Button>
                            </div>}
                    </div>

                </div >
            </FormItem >
            <FormItem >
                <div className={styles.box}>
                    <div className={styles.questioncontent}  >
                        <p style={{color:'green',fontSize:'16px'}}>关于 <span >微服务配置中心怎么配置 </span>的搜索结果如下:</p>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        <div className={styles.result}>
                            <p style={{textDecoration:'underline',fontSize:'19px'}}>基于docker部署的 <span style={{color:'red'}}>微服务架构配置中心</span>的原理是什么？</p>
                            <p>在 spring cloud 中使用 config-server 集中管理配置文件，可以使用 git、svn、本地资源目录 来管理配置文件，在集成了 spring cloud bus 之后还可以通过一条 post 请求，让所有连接到消息总线的服务，重新从 config-server 拉取配置文件，非常方便。</p>
                            <div className={styles.iconp}>
                                <div className={styles.a}>  回答者:<span>黑天鹅</span></div>
                                <div className={styles.b}>  回答时间:<span>2018-1-14</span></div>
                                <div className={styles.c}>  <span>4</span>个回答</div>                              
                            </div>                 
                        </div>
                        
                    <br/> <hr/><br/><Pagination defaultCurrent={1} total={50} style={{textAlign:'center'}}/><br/>
                    </div>


                    <div className={styles.people}  >
                         <div className={styles.title}  >
                            找他回答
                         </div><hr/>
                         <div className={styles.list}  >
                              <div className={styles.a}  >
                                  <img src={require('../../images/首页/u13.png')} style={{width:'100%'}}/>
                            
                              </div>
                              <div className={styles.b}  >
                                  <p style={{fontSize:'16px'}}>程序员小弟</p>
                                  <p style={{fontSize:'14px'}}>前端框架核心成员</p>
                     
                              </div>
                         </div>
                             
                    </div>
                </div>
            </FormItem >
        </Form >
    )
}
QuestionSearching.PropTypes = {

    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}


export default connect(({ loading, }) => ({ loading, }))(createDataForm(QuestionSearching))




//该页面是问题和答案展示，包括问题，及答案，其中有最佳答案，我有更好答案等功能
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Form, Input, Avatar, Select, Tabs, Radio, Icon, Pagination ,Modal} from 'antd'
import Wangeditor5 from '../../../components/Wangeditor5'
import styles from './index.less'

const FormItem = Form.Item
class QuestionAndAnswer extends React.Component {
    state = {
        loading: false,
        visible: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { visible, loading } = this.state;
        return (

            <Form>
                <div className={styles.box}>
                    <FormItem>
                        <div className={styles.classf}><br />
                            <p><span>富文本编辑器怎么写？有没有demo之类的</span></p>
                            <div className={styles.iconp}><br />
                                <div className={styles.a}>  <span>王伟鹏</span></div>
                                <div className={styles.b}>  提问时间 : <span>2018-1-14</span></div>
                                <div className={styles.c}> 问题归类 ：<span>前端</span></div>
                            </div> <br />
                        </div>
                    </FormItem>

                    <FormItem>
                        <div className={styles.answer}><br />
                            <div >
                                <Button type="primary" style={{ width: '230px', height: '50px', fontSize: '22px', fontFamily: '微软雅黑' }} onClick={this.showModal}>
                                我有更好的答案
                            </Button><br/>
                                <Modal bodyStyle={{ width: '100%'}} width="1000"
                                    visible={visible}
                                    title="编辑答案后点击提交就可以发布了"
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    footer={[
                                        <Button key="back" onClick={this.handleCancel}> 返 回 </Button>,
                                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}> 提 交  </Button>,                 
                                    ]}
                                >
                                    <Wangeditor5/>
                                </Modal>
                            </div><br/>
                        </div>
                    </FormItem>
                    <FormItem>
                        <div className={styles.otheranswer}><br />
                            <p style={{ height: '50px', fontSize: '22px', fontFamily: '微软雅黑', background: '#fff', color: 'black' }} >好评回答</p>
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div>
                            <br /></div>
                    </FormItem>
                    <FormItem>
                        <div className={styles.otheranswer}><br />
                            <p style={{ height: '50px', fontSize: '22px', fontFamily: '微软雅黑', background: '#fff', color: 'black' }} >其它答案 (共10条回答）</p>
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div><hr /><br />
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div><hr /><br />
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div><hr /><br />
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div><hr /><br />
                            <div className={styles.content}>
                                <div className={styles.answerlist}>UEditor 所提供的所有后端代码都仅为 DEMO 作用，切不可直接使用到生产环境中，目前已知 php 的代码会存在 ssrf 的安全漏洞。修复方式：使用最新的 Uploader https://github.com/fex-team/ueditor/blob/dev-1.5.0/php/Uploader.class.php
                             </div><span style={{ fontSize: '18px' }}>程序员小白 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018-1-20</span> <br />
                            </div><hr />
                            <br />
                            <Pagination defaultCurrent={1} total={50} style={{ textAlign: 'center' }} /><br /></div>
                    </FormItem>
                </div>
            </Form>

        );
    }
}

QuestionAndAnswer.PropTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default QuestionAndAnswer

import React, { Component } from 'react';
import { connect } from 'dva'
import Lookup from '../../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Col, Card, Form, Input, Avatar, Select, Tabs, Radio, Icon, Tag, } from 'antd'
import styles from './index.less'


const FormItem = Form.Item
const TabPane = Tabs.TabPane
const Option = Select.Option


class MostBrain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
        };
    }

    render() {
        const { mode } = this.state;
        return (
            <div className={styles.mostbrain}>
                <Form>
                    <FormItem >
                        <br/>
                        <div style={{ marginBottom: 8, fontSize: '20px', fontFamily: '微软雅黑', }}>云创最强大脑</div>
                        <div style={{ marginBottom: 12, width: '120px', height: '3px', textDecorationStyle: 'underline', background: 'red' }}></div>
                        <div className={styles.box}>
                            <div className={styles.a}> </div>
                            <div className={styles.b}>黑天鹅 </div>
                            <div className={styles.c}>擅长领域：<span>java,微服务，mySQL</span> </div>
                            <div className={styles.d}> 已给<span style={{ color: 'red' }}>25</span>人提供帮助</div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.a}> </div>
                            <div className={styles.b}><span>天，鹅</span> </div>
                            <div className={styles.c}>擅长领域：<span>项目管理,客户维护</span> </div>
                            <div className={styles.d}> 已给<span style={{ color: 'red' }}>25</span>人提供帮助</div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.a}> </div>
                            <div className={styles.b}><span>天鹅</span></div>
                            <div className={styles.c}>擅长领域：<span>产品设计，原型设计</span> </div>
                            <div className={styles.d}> 已给<span style={{ color: 'red' }}>25</span>人提供帮助</div>
                        </div>
                        <div className={styles.box}>
                            <div className={styles.a}> </div>
                            <div className={styles.b}><span>白天鹅</span> </div>
                            <div className={styles.c}>擅长领域：<span>react,bootstrap</span> </div>
                            <div className={styles.d}> 已给<span style={{ color: 'red' }}>25</span>人提供帮助</div>
                        </div>
                                   
                    </FormItem >

                </Form>
            </div>
        );
    }
}

export default MostBrain
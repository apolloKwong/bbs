
import React, { Component } from 'react';
import { connect } from 'dva'
import Lookup from '../../components/Lookup'
import { routerRedux } from 'dva/router'
import { createDataForm } from 'utils'
import { Button, Row, Col, Card, Form, Input, Avatar, Select, Tabs, Radio, Icon, Tag, Collapse, } from 'antd'
import styles from './Comment.less'

const Panel = Collapse.Panel;
const { TextArea } = Input;
const FormItem = Form.Item
const customPanelStyle = {
    background: '#fff',
    border: 0,
    fontSize: '14px',
    overflow: 'hidden',
};

const Comment = ({
    index,
    commentList,
    handleSubmit,
    handleActiveKeyId,
    form: {
        getFieldDecorator,
        getFieldsValue,
        setFieldsValue,
        getFormatFieldsValue,
  }

 }) => {

    const activeKeyId = String(commentList.activeKeyId)
    let x = 0, y = 0, z = 0
    const handlepublish = (x, y, z, key) => {
        let field = getFieldsValue()
        let fields = {}
        if (y == 0 && z == 0) {
            fields = {
                content: field['content1' + x],
                articleId: commentList.articleId,
                targetId: commentList[x].id, replyState: 1,
                targetUserName: commentList[x].replyUserName,
                targetUserId: commentList[x].replyUserId,
            }
        } else if (z == 1) {
            fields = {
                content: field['content2' + y],
                articleId: commentList[x].replyComment[y].articleId,
                targetId: commentList[x].replyComment[y].id, replyState: 1,
                targetUserName: commentList[x].replyComment[y].replyUserName,
                targetUserId: commentList[x].replyComment[y].replyUserId,
            }
        } else if (x == 0 && y == 0 && z == 2) {
            fields = {
                content: field['content'], replyState: 1,
                articleId: commentList.articleId,
                targetId: 0,
                targetUserId:0,
            }
        }
        fields.index = index
        handleSubmit(fields)
        handleReset(key)
    }

    const handleReset = (key) => {
        const fields = getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else {
                    fields[item] = undefined
                }
            }
        }
        setFieldsValue(fields)
        callback(key)
    }

    const callback = (key) => {
        const fields = {
            key: key == activeKeyId ? '' : key,
            index: index
        }
        handleActiveKeyId(fields)
    }
    
    
        return (
        <div className={styles.commentbox}>
            {commentList.length == 0 && <div key='1'>
                <br />
                <div style={{ fontSize: '16px' }}>
                    暂时还没有评论哦，赶快抢沙发吧 !
                            </div>
            </div>

            }
            {_.map(commentList, function (item, x) {
                return (
                    <div key={x}>
                        <div className={styles.commentlist}>
                            <div className={styles.comment}>
                                <div className={styles.info}>
                                    <div className={styles.a}><img style={{ width: '40px' }} src={commentList[x].userImage} /></div>
                                    <div className={styles.b}>
                                        <p style={{ fontSize: '16px' }} >{item.replyUserName}</p>
                                        <p style={{ fontSize: '12px' }} dangerouslySetInnerHTML={{ __html: item.replyDate }}></p>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div>
                                        <p style={{ fontSize: '16px' }} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                    </div>
                                </div>
                                <div className={styles.clickreply}>

                                    <div className={styles.a}> </div>
                                    <div className={styles.b}><Icon type="message" /></div>
                                    <Collapse bordered={false} onChange={() => callback(item.id)} activeKey={activeKeyId}>
                                        <Panel icon="message" showArrow={false} header="回复1" style={customPanelStyle} key={item.id}>
                                            <div className={styles.replybox}>
                                                <div className={styles.rinput}>
                                                    <Form>
                                                        <FormItem>
                                                            {getFieldDecorator('content1' + x)(<TextArea rows={4} />)}
                                                        </FormItem>
                                                        <Button type="reset" htmlType="submit" onClick={() => handleReset(item.id)} style={{ float: 'right' }} ><div>取 消</div></Button>
                                                        <Button type="primary" htmlType="submit" onClick={() => handlepublish(x, y = 0, z = 0, item.id)} style={{ float: 'right' }}><div>发 表</div></Button>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Panel>                     
                                    </Collapse>

                                </div>

                            </div>


                            {commentList[x].replyComment.length == 0 && <div key='1'>   </div>}
                            {_.map(commentList[x].replyComment, function (item, y) {
                                return (
                                    <div key={y}>
                                        <div className={styles.reply}>
                                            <div>
                                                <div><a >{item.replyUserName}</a><a>: @</a>
                                                    <a >{item.targetUserName}</a>  <a style={{ fontSize: "15px", color: '#777' }}>{item.content} </a></div>
                                            </div>
                                            <div className={styles.clickreply}>
                                                <div className={styles.a}><div style={{ display: 'block', marginTop: '9px' }}>{item.replyDate}</div> </div>
                                                <div className={styles.b}><Icon type="message" /></div>
                                                <Collapse bordered={false} onChange={() => callback(item.id)} activeKey={activeKeyId}>
                                                    <Panel icon="message" showArrow={false} header="回复2" style={customPanelStyle} key={item.id}>
                                                        <div className={styles.replybox}>
                                                            <div className={styles.rinput}>
                                                                <Form>
                                                                    <FormItem>
                                                                        {getFieldDecorator('content2' + y)(<TextArea rows={4} />)}
                                                                    </FormItem>
                                                                    <Button type="reset" htmlType="submit" onClick={() => handleReset(item.id)} style={{ float: 'right' }} ><div>取 消</div></Button>
                                                                    <Button type="primary" htmlType="submit" onClick={() => handlepublish(x, y, z = 1, item.id)} style={{ float: 'right' }}><div>发 表</div></Button>
                                                                </Form>
                                                            </div>
                                                        </div>
                                                    </Panel>                                              
                                                </Collapse>
                                            </div>
                                            <br />
                                        </div>
                                    </div>
                                )
                            })
                            }

                        </div>
                        <br />

                    </div>
                )
            })
            }
            <div className={styles.commentinput}>
                <br />
                <br />
                <div> <Icon type="edit" /> 在这里写下你的评论：</div>
                <div className={styles.replybox}>
                    <div className={styles.rinput}>
                        <Form>
                            <FormItem>
                                {getFieldDecorator('content')(<TextArea rows={4} />)}
                            </FormItem>
                            <Button type="reset" htmlType="submit" onClick={handleReset} style={{ float: 'right' }} ><div>取 消</div></Button>
                            <Button type="primary" htmlType="submit" onClick={() => handlepublish(x = 0, y = 0, z = 2)} style={{ float: 'right' }}><div>发 表</div></Button>
                        </Form>
                    </div>
                </div>

            </div>
        </div>

    );
}


export default createDataForm(Comment)
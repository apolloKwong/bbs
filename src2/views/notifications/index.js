import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Pagination, Row, Col, Card, Button } from 'antd'
import styles from './index.less'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'


const Note = ({ dispatch, notification }) => {

    const { dataSource } = notification
    const onClickAllRead = () => {
        dispatch({
            type: 'notification/setRead',
        })
    }
    function onClickSingleRead (data) {
        dispatch({
            type: 'notification/setSingleRead',
            payload: data
        })
    }
    function onChangePage(pageNumber) {
        const path = location.pathname
        dispatch({
            type: 'notification/query',
            payload: {
                page: pageNumber
            }
        })
    }

    return (

        <div className={styles.share}>
            <div className={styles.content}>
                <div style={{ padding: '10px' }}>
                    <Button type="primary" ghost onClick={onClickAllRead} >全部标记为已读</Button>
                </div>
                {
                    _.map(dataSource.data, function (item) {
                        return (
                            <Card key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                                <Row >
                                    <Col >
                                        <div>
                                            <Row>
                                                <Col>
                                                    {item.lastUpdateDate}
                                                    {item.type == 1 && <div>
                                                        {item.senderName + "回复了你的帖子" } 
                                                        <Link to={`userPostings/articleDetail/${item.articleId}` }> 
                                                        <Badge dot = {!item.status} onClick={() => onClickSingleRead(item.id)}>
                                                        {item.articleName}&nbsp;
                                                        </Badge>
                                                        </Link>
                                                        </div>}
                                                    {item.type == 2 && <div>
                                                        {item.senderName + "赞了你的帖子" } 
                                                        <Link to={`userPostings/articleDetail/${item.articleId}`}> 
                                                        <Badge dot = {!item.status} onClick={() => onClickSingleRead(item.id)}>
                                                        {item.articleName}&nbsp;
                                                        </Badge>
                                                        </Link>
                                                        </div>}
                                                    {item.type == 3 && <div>
                                                        {item.senderName + "收藏了你的帖子" } 
                                                        <Link to={`userPostings/articleDetail/${item.articleId}`}> 
                                                        <Badge dot = {!item.status} onClick={() => onClickSingleRead(item.id)}>
                                                        {item.articleName}&nbsp;
                                                        </Badge>
                                                        </Link>
                                                        </div>}
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })

                }

                <Pagination height='120px' style={{ paddingTop: '10px' }}
                    showQuickJumper onChange={onChangePage}
                    defaultCurrent={1} defaultPageSize={10} total={dataSource.length} />
            </div>
        </div>

    )
}
export default connect(({ notification, loading }) => ({ notification, loading }))(Note)
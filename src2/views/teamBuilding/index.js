import React from 'react'
import { Tabs, Card, Button, Pagination, Row, Col, Icon } from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import { Link } from 'react-router-dom'

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
const TeamBuilding = ({ teamBuilding, dispatch }) => {
    const { dataSource, pageM } = teamBuilding
    const path = location.pathname
    const pathName = path.substring(14, path.length)
    function onChangePage(pageNumber) {
        dispatch({
            type: 'teamBuilding/query',
            payload: {
                page: pageNumber,
                name: pathName
                // pageSize, 
            }
        })
    }
    return (
        <div className={styles.home}>
            <div className={styles.content}>
                {
                    _.map(dataSource.data, function (item) {
                        return (
                            <Card key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                                <Row >
                                    <Col >
                                        <div>
                                            <Link to={`${pathName}/${pathName}Detail/${item.id}`}>
                                                <div style={{ color: 'black', fontSize: '16px', display: 'inline' , fontWeight: "bold" }}>
                                                    {item.title}
                                                </div>
                                            </Link>
                                            
                                                {item.status != undefined ? item.status ? <div style={{ color: 'red' ,display: 'inline'}}>(进行中)</div> : <div style={{display: 'inline'}}>(已结束)</div> : <div></div>}
                                            
                                        </div>

                                        <div>
                                            {'<' + item.userName + '>'}在{item.lastUpdateDate}发布
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })
                }
                <Pagination height='120px' style={{ paddingTop: '10px' }}
                    showQuickJumper onChange={onChangePage} defaultCurrent={1}
                    current={pageM} defaultPageSize={10} total={dataSource.length} />
            </div>

            <div className={styles.side}>
                <Card bodyStyle={{ padding: '10px 5px 10px 20px' }} style={{ fontWeight: "bold",fontSize: '18px' }} type="primary" size="large"  >
                    <Link to={`activity`} style={{ color: 'black' }}>
                        活动发布
                </Link>&nbsp;
                <Link to={`/upload/activityUpload`}>
                        <Icon type="plus-circle-o" />
                    </Link>
                </Card>
                <Card bodyStyle={{ padding: '10px 5px 10px 20px' }} style={{ fontWeight: "bold",fontSize: '18px' }} type="primary" size="large"  >
                    <Link to={`training`} style={{ color: 'black' }}>
                        培训公告
                </Link>&nbsp;
                <Link to={`/upload/trainingUpload`}>
                        <Icon type="plus-circle-o" />
                    </Link>
                </Card>
                <Card bodyStyle={{ padding: '10px 5px 10px 20px' }} style={{ fontWeight: "bold",fontSize: '18px' }} type="primary" size="large"  >
                    <Link to={`poll`} style={{ color: 'black' }}>
                        投票
                </Link>&nbsp;
                <Link to={`/upload/newPoll`}>
                        <Icon type="plus-circle-o" />
                    </Link>
                </Card>
            </div>
        </div>
    )
}

export default connect(({ teamBuilding }) => ({ teamBuilding }))(TeamBuilding)
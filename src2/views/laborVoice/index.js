import React from 'react'
import { Tabs, Card, Button,Pagination,Row, Col } from 'antd'
import { connect } from 'dva'
import styles from './index.less'
import { Link } from 'react-router-dom'

const TabPane = Tabs.TabPane;
function callback(key) {
    console.log(key);
}
const LaborVoice = ({laborVoice,dispatch }) => {
    const { dataSource,pageM } = laborVoice
    function onChangePage(pageNumber) {
        const path = location.pathname
        dispatch({
            type: 'laborVoice/query',
            payload: {
                page: pageNumber,
                name: path.substring(14, path.length),
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
                                        <div style={{ fontSize: '16px', fontWeight: "bold", color: 'black' }} >              
                                        {item.title}
                                        </div>
                                        {'<' + item.userName + '>'}在{item.lastUpdateDate}发布
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    )
                })
            }
            <Pagination height='120px'
                showQuickJumper onChange={onChangePage} defaultCurrent={1}
                current={pageM} defaultPageSize={10} total={dataSource.length} />
            </div>
            <div className={styles.side}>
                <Link to={`hot`}>
                    <Card style={{ fontSize: '18px', fontWeight: "bold", color: 'black' }} type="primary" size="large"  >
                        热点关注
                    </Card>
                </Link>
                <Link to={`suggest`}>
                    <Card style={{ fontSize: '18px', fontWeight: "bold", color: 'black' }} type="primary" size="large"  >
                        我建议
                    </Card>
                </Link>
                <Link to={`voice`}>
                    <Card style={{ fontSize: '18px', fontWeight: "bold", color: 'black' }} type="primary" size="large"  >
                        我想说
                    </Card>
                </Link>
            </div>
        </div>
    )
}

export default connect(({ loading, laborVoice }) => ({ loading, laborVoice }))(LaborVoice)
import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Table, Input, Button, Pagination, Tag, Row, Col, Card, Collapse } from 'antd'
import styles from './index.less'
import { connect } from 'dva'
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const Panel = Collapse.Panel;

function fileSizeCalculator(size) {

    const isKB = size /1024/1024 < 1;
    if (isKB) {
      return (size/1024).toFixed(2)+ "KB";
    } 
      return (size/1024/1024).toFixed(2)+"MB"; 
}


const Field = ({ dispatch, field }) => {

    const { dataSource } = field
    function onChangePage(pageNumber) {
        const path = location.pathname
        dispatch({
            type: 'field/query',
            payload: {
                id: path.substring(13, path.length),
                page: pageNumber
                // pageSize, 
            }
        })
    }

    return (

        <div className={styles.share}>
            <div className={styles.content}>
                {
                    _.map(dataSource.data, function (item) {
                        return (
                            <Card key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                                <Row >
                                    <Col >
                                        <div>
                                            <Row>
                                                <Col >
                                                    <div style={{ float: 'left' }} >
                                                      
                                                        <Link style={{ fontSize: '18px', fontWeight: "bold", color: 'black' }} to={`${item.fieldName}`}>
                                                            {'[' + item.fieldNameReal + ']'}
                                                        </Link>
                                                        &nbsp;&nbsp;
                                                    <Link style={{ fontSize: '18px', fontWeight: "bold", color: 'black' }} target="_blank" to={`/userPostings/resourceDetail/${item.id}`}>
                                                            {item.resourceName}
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                            {'<' + item.userName + '>'}在{item.lastUpdateDate}上传
                                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                        </div>
                                        <div>
                                            资源类型:{item.resourceTypeName}&nbsp;&nbsp;下载次数:{item.downloads}&nbsp;&nbsp;文件大小:{fileSizeCalculator(item.size)}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        )
                    })

                }
            
                <Pagination height='120px' style={{paddingTop: '10px'}} 
                    showQuickJumper onChange={onChangePage}
                    defaultCurrent={1} defaultPageSize={10} total={dataSource.length} />
            </div>
            <div className={styles.side}>
                <div className={styles.plate}>
                <div style={{paddingBottom:'10px'}}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link target="_blank" to={`/questionbar/questioning`}>
                    <Button type="primary" size="large" >
                        资源求助
                    </Button>
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Link target="_blank" to={`/upload/resourceUpload`}>
                        <Button type="primary" size="large" >上传资源</Button>
                </Link>
                </div>
                <hr  style={{backgroundColor:'#f7f7f7',height:'2px',border:'none'}}/>
                    <div className={styles.sideTag}>
                        <Link target="_blank" to={`1`}>
                            <Tag color="#108ee9" style={{ fontSize: '14px' }}>运营管理</Tag>
                        </Link>
                        <Link target="_blank" to={`2`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>产品设计</Tag>
                        </Link>
                        <Link target="_blank" to={`3`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>编程语言</Tag>
                        </Link>
                        <Link target="_blank" to={`4`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>研发管理</Tag>
                        </Link>
                        <Link target="_blank" to={`5`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>云计算/大数据</Tag>
                        </Link>
                        <Link target="_blank" to={`6`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>开源软件</Tag>
                        </Link>
                        <Link target="_blank" to={`7`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>物联网</Tag>
                        </Link>
                        <Link target="_blank" to={`8`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>系统运维</Tag>
                        </Link>
                        <Link target="_blank" to={`9`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>移动开发</Tag>
                        </Link>
                        <Link target="_blank" to={`10`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>前端开发</Tag>
                        </Link>
                        <Link target="_blank" to={`11`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>后端开发</Tag>
                        </Link>
                        <Link target="_blank" to={`12`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>软件测试</Tag>
                        </Link>
                        <Link target="_blank" to={`13`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>架构设计</Tag>
                        </Link>
                        <Link target="_blank" to={`14`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>信息安全</Tag>
                        </Link>
                        <Link target="_blank" to={`15`}>
                        <Tag color="#108ee9" style={{ fontSize: '14px' }}>敏捷</Tag>
                        </Link>
                        </div></div></div>
        </div>
        
    )
}
export default connect(({ field, loading }) => ({ field, loading }))(Field)
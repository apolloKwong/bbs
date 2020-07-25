import React from 'react'
import { createDataForm } from 'utils'
import { Link } from 'react-router-dom'
import { Tabs, Table, Input, Button, Pagination, Tag, Row, Col, Card, Form } from 'antd'
import styles from './index.less'
import { connect } from 'dva'
import HotTags from '../HotTags.js'
import HotFields from '../HotFields.js'

const TabPane = Tabs.TabPane
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 10 },
}

function fileSizeCalculator (size) {
  const isKB = size / 1024 / 1024 < 1
  if (isKB) {
    return `${(size / 1024).toFixed(2)}KB`
  }
  return `${(size / 1024 / 1024).toFixed(2)}MB`
}

let resourceType = '0'
let field = '0'

const Share = ({ sharing, dispatch, loading,
  form: {
    getFieldDecorator,
    getFieldValue,
  },
}) => {
  console.log('loading', loading)
  let loadingSharing = loading.models.sharing
  const { dataSource, dataSourceDay, dataSourceWeek, dataSourceMonth, dataSourceYear } = sharing
  const keyword = getFieldValue('keyword')
  function onChangePage (pageNumber) {
    dispatch({
      type: 'sharing/query',
      payload: {
        page: pageNumber,
        // pageSize,
      },
    })
  }
  const keywordEncode = encodeURIComponent(keyword)

  return (

    <div className={styles.share}>
      <div className={styles.content}>
        <div className={styles.content_list}>
          <Card>
            <Link target="_blank" to={'share/field/1'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>运营管理</Tag>
            </Link>
            <Link target="_blank" to={'share/field/2'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>产品设计</Tag>
            </Link>
            <Link target="_blank" to={'share/field/3'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>编程语言</Tag>
            </Link>
            <Link target="_blank" to={'share/field/4'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>研发管理</Tag>
            </Link>
            <Link target="_blank" to={'share/field/5'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>云计算/大数据</Tag>
            </Link>
            <Link target="_blank" to={'share/field/6'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>开源软件</Tag>
            </Link>
            <Link target="_blank" to={'share/field/7'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>物联网</Tag>
            </Link>
            <Link target="_blank" to={'share/field/8'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>系统运维</Tag>
            </Link>
            <Link target="_blank" to={'share/field/9'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>移动开发</Tag>
            </Link>
            <Link target="_blank" to={'share/field/10'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>前端开发</Tag>
            </Link>
            <Link target="_blank" to={'share/field/11'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>后端开发</Tag>
            </Link>
            <Link target="_blank" to={'share/field/12'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>软件测试</Tag>
            </Link>
            <Link target="_blank" to={'share/field/13'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>架构设计</Tag>
            </Link>
            <Link target="_blank" to={'share/field/14'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>信息安全</Tag>
            </Link>
            <Link target="_blank" to={'share/field/15'}>
              <Tag color="#108ee9" style={{ fontSize: '14px' }}>敏捷</Tag>
            </Link>
          </Card>
        </div>
        <div className={styles.content_list}>
          <Card loading={loadingSharing} bodyStyle={{ padding: '10px 5px 10px 20px' }} >
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'black', float: 'left' }}>
                            最近更新
            </div>
            <div style={{ float: 'left' }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
              <Link target="_blank" to={'/questionbar/questioning'}>
                <Button type="primary" size="large" >资源求助</Button>
              </Link>
            </div>
            <div style={{ float: 'left' }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
              <Link target="_blank" to={'/upload/resourceUpload'}>
                <Button type="primary" size="large" >上传资源</Button>
              </Link>
            </div>
          </Card>

        </div>
        {
          _.map(dataSource.data, (item) => {
            return (
              <Card loading={loadingSharing}key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                <Row >
                  <Col >
                    <div>
                      <Row>
                        <Col >
                          <div style={{ float: 'left' }} >
                            <Link style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }} target="_blank" to={`share/field/${item.fieldName}`}>
                              {`[${item.fieldNameReal}]`}
                            </Link>
                                                        &nbsp;&nbsp;
                            <Link style={{ fontSize: '18px', fontWeight: 'bold', color: 'black' }} target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                              {item.resourceName}
                            </Link>
                          </div>
                        </Col>
                      </Row>
                      {`<${item.userName}>`}在{item.lastUpdateDate}上传
                      <div dangerouslySetInnerHTML={{ __html: item.content }} />
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

        <Pagination height="120px"
          style={{ paddingTop: '10px' }}
          showQuickJumper
          onChange={onChangePage}
          defaultCurrent={1}
          defaultPageSize={10}
          total={dataSource.length}
        />


      </div>

      <div className={styles.side}>
        <div className={styles.plate}>
          <div className={styles.search_bar}>
            <Form>
              <FormItem>
                <div>
                  <div style={{ float: 'left' }}>
                    {getFieldDecorator('keyword')(<Input size="large" style={{ width: '270px' }} />)}
                  </div>
                  <div>
                    <Link to={`/searchResource/0/0/${keywordEncode}`}>
                      <Button type="primary" size="large" >
                                                搜索
                      </Button>
                    </Link>
                  </div>
                </div>
              </FormItem >
            </Form>
          </div>

          <div style={{ fontWeight: 'bold', margin: '8px', fontSize: '18px', color: 'black' }}>
                        热门下载
          </div>
          <Tabs defaultActiveKey="1" >
            {/* 资源排行默认显示每日排行 */}
            <TabPane tab="日" key="1">

              {
                _.map(dataSourceDay, (item) => {
                  return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                    <Row >
                      <Col span={21} >
                        <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                          <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                            {item.resourceName}
                          </div>
                        </Link>
                      </Col>
                      <Col span={1} >
                        <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                          {item.downloads}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                  )
                })

              }
            </TabPane>
            <TabPane tab="周" key="2">
              {
                _.map(dataSourceWeek, (item) => {
                  return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                    <Row >
                      <Col span={21} >
                        <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                          <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                            {item.resourceName}
                          </div>
                        </Link>
                      </Col>
                      <Col span={1} >
                        <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                          {item.downloads}</div>
                      </Col>
                    </Row>
                  </Card>
                  )
                })

              }
            </TabPane>
            <TabPane tab="月" key="3">
              {
                _.map(dataSourceMonth, (item) => {
                  return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                    <Row >
                      <Col span={21} >
                        <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                          <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                            {item.resourceName}
                          </div>
                        </Link>
                      </Col>
                      <Col span={1} >
                        <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                          {item.downloads}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                  )
                })

              }
            </TabPane>
            <TabPane tab="年" key="4">
              {
                _.map(dataSourceYear, (item) => {
                  return (<Card key={item.id} bodyStyle={{ padding: '10px 5px 10px 20px' }}>
                    <Row >
                      <Col span={21} >
                        <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
                          <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                            {item.resourceName}
                          </div>
                        </Link>
                      </Col>
                      <Col span={1} >
                        <div style={{ margin: '4px', fontSize: '14px', color: 'black' }} >
                          {item.downloads}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                  )
                })

              }
            </TabPane>
          </Tabs>


        </div>

      </div>
    </div>
  )
}
export default connect(({ loading, sharing }) => ({ loading, sharing }))(createDataForm(Share))

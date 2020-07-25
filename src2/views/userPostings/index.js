
import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, Card, Icon, Pagination, Avatar, Tabs, Upload } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'
import Comments from './comments.js'
const TabPane = Tabs.TabPane;
function fileSizeCalculator(size) {

  const isKB = size /1024/1024 < 1;
  if (isKB) {
    return (size/1024).toFixed(2)+ "KB";
  }
    return (size/1024/1024).toFixed(2)+"MB";
}
const UserPosting = ({ loading, dispatch, posting }) => {

  const { dataSource, dataSource_resource, userName, articleNum, description, image, replyComment, plateList} = posting
  const personal = () => {
    const data = {
      ...getFormatFieldsValue(),
      key: currentItem.key,
    }


    dispatch({
      type: 'person/update',
      payload: data
    })
  }

  const toPersonal = () => {
    dispatch(routerRedux.push({
      pathname: '/writearticle',
    }))
  }

  const gridStyleBlock = {
    width: '50%',
    textAlign: 'center',
  };

  const gridStyleWritor = {
    width: '100%',
    textAlign: 'center',
  };

  const gridStyleOperate = {
    width: '25%',
    textAlign: 'center',
    fontSize: 15,
  };
  function onChangePage(pageNumber) {

    dispatch({
      type: 'posting/query',
      payload: {
        page: pageNumber
      }
    })
  }
  function handleSubmit(e) {
    dispatch({
      type: 'posting/createComment',
      payload: {
        e,
        replyComment
      }

    })
  }

  function handleActiveKeyId(e) {
    dispatch({
        type: 'posting/changeActiveKeyId',
        payload: {
            key: e.key,
            index: e.index,
            replyComment
        }

    })
}

  //根据选择的板块显示文章
  function selectPlate(value) {
    dispatch({
        type: 'posting/query',
        payload: {
            Q: 'plateNameReal_LK=' + value,
        }
    })
}

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  )

  return (
    <div className={styles.all}>
      <div className={styles.userInfo}>
        <div className={styles.userName}>
          <Card title="个人信息" extra={<a onClick={toPersonal}><Button type="primary" icon="user">我要发帖</Button></a>}>
            <div className="custom-card">
              <Avatar shape="square" size="large" src={image} />
              <h3>{userName}</h3>
              <br />
              <p>{description}</p>
              <br />
              <h3>我的文章 {articleNum}</h3>
            </div>
          </Card>
        </div>
      </div>

      <div className={styles.rightBar}>
        <div className={styles.uploadSource}>
          <Button type="primary"><a target="_blank" href="./upload/resourceUpload"><h1>上传资源</h1></a></Button>
        </div>
        <div className={styles.recommendBlock}>
          <Card title={<h2>版块分类</h2>} noHovering style={{ fontSize: 15 }} key="1">
            {
              _.map(plateList, function (item, x) {
                return (
                    <a key={x} value={item.plateName} onClick={() => { selectPlate(item.plateName) }}><Card.Grid  style={gridStyleBlock} >{item.plateName}</Card.Grid></a>
                )
              })
            }
          </Card>
        </div>
        <div className={styles.recommendWritor}>
          <Card title={<h2>猜你感兴趣</h2>} noHovering style={{ fontSize: 15 }} key="2">
            <a><Card.Grid style={gridStyleWritor}>运营管理</Card.Grid></a>
            <Card.Grid style={gridStyleWritor}>产品与设计</Card.Grid>
            <Card.Grid style={gridStyleWritor}>万物互联</Card.Grid>
            <Card.Grid style={gridStyleWritor}>技术之家</Card.Grid>
          </Card>
        </div>
      </div>

      <div className={styles.article}>
        <Tabs
          defaultActiveKey="1"
          tabBarExtraContent={[
            <IconText text="排序" />]}
        >
          <TabPane tab="个人文章" key="1">
            {
              _.map(dataSource.data, function (item, x) {
                return (
                  <div key={x}>
                    <Row className={styles.card}>
                      <Col>
                        <Card
                          type="inner"
                          title={<h4>来自板块：{item.plateNameReal}</h4>}
                          extra={<h3>{item.postDate}</h3>}
                          bordered={false}
                        >
                          <div className={styles.articleName}>
                            <Link target="_blank" to={`userPostings/articleDetail/${item.id}`}><h1>{item.articleName}</h1></Link>
                          </div>
                          <div className="text-card">
                            <div className={styles.imageRight}>
                              <Avatar shape="square" size="large" src={image} />
                            </div>
                            <h3>{item.userName}</h3>
                            <p>{item.userDescription}</p>
                          </div>
                          <div className={styles.content} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                        </Card>
                        <Card noHovering={true} key="4" bordered={false} className={styles.operateCard}>
                          <Comments commentList={replyComment[x]} index={x} handleSubmit={handleSubmit} handleActiveKeyId={handleActiveKeyId} />
                          <Card.Grid style={gridStyleOperate}><Icon type="like-o" /> {item.upvoteList.length}</Card.Grid>
                          <Card.Grid style={gridStyleOperate}><Icon type="eye-o" /> {item.hits}</Card.Grid>
                          <Card.Grid style={gridStyleOperate}><Icon type="ellipsis" /></Card.Grid>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )
              })
            }
          </TabPane>
          <TabPane tab="个人资源" key="2">

            {
              _.map(dataSource_resource.data, function (item) {
                return (
                  <Card key={item.id} bodyStyle={{ color: 'black', fontSize: '14px' }}>
                    <Row>
                      <Col >
                        <div>
                          <Row>
                            <Col >
                              <div style={{ float: 'left' }} >
                                <Link target="_blank" to={`share/field/${item.fieldName}`}>
                                  {'[' + item.fieldNameReal + ']'}
                                </Link>
                                &nbsp;&nbsp;
                                                    <Link target="_blank" to={`userPostings/resourceDetail/${item.id}`}>
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
              defaultCurrent={1} defaultPageSize={10} total={dataSource_resource.length} />

          </TabPane>
          <TabPane tab="更多" key="3">More Content</TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default connect(({ posting, loading }) => ({ posting, loading }))(UserPosting)

import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { message } from 'antd'
import Comment from '../../forum/Comment.js'
import styles from './index.less'
import { Row, Col, Button, Popconfirm, Card, Icon, Avatar, Tabs, Menu, Dropdown, Radio, Tooltip, Modal } from 'antd'
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8, fontSize: 25 }} />
    {text}
  </span>
)

const commentProps = {
  handleSubmit(e) {
    dispatch({
      type: 'articleDetail/createComment',
      payload: {
        e,
        replyComment
      }

    })
  },
  handleActiveKeyId(e) {
    dispatch({
      type: 'articleDetail/changeActiveKeyId',
      payload: {
        key: e.key,
        index: e.index,
        replyComment
      }

    })
  }
}

const Detail = ({ articleDetail, dispatch }) => {

  // const { data, userName, image, postState } = articleDetail
  const { data, replyComment, postState } = articleDetail
  function deleteConfirm(postState) {
    confirm({
      title: '删除文章',
      content: '确定要删除这篇文章吗',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        postState = "3"
        dispatch({
          type: 'articleDetail/editPSById',
          payload: postState,
        })
        dispatch(routerRedux.push({
          pathname: '/userPostings',
        }))
        message.info("删除成功");
      },
      onCancel() {
      },
    });
  }

  return (
    <div className={styles.all}>
      <div className={styles.topBar}>
        <div className={styles.topBarRight}>
          <a href="/writearticle"><h1>写文章</h1></a>
        </div>
        <div className={styles.topBarLeft}>
          <a href="/forum"><h1>云</h1></a>
        </div>
      </div>
      <div className={styles.article}>
        <Row key={data.userId}>
          <Col>
            <Card
              key="1"
              bordered={false}
              title={<h1>{data.articleName}</h1>}
              extra={[
                <Tooltip placement="bottom" title="删除">
                  <a onClick={deleteConfirm}><IconText type="delete" /></a>
                </Tooltip>
              ]}
            >
              <div className={styles.articleTitle}>
                <div className={styles.imageRight}>
                  <Avatar shape="square" size="large" src={data.image} />
                  <h5>{data.userName} | 发表于：{data.postDate}</h5>
                  <br />
                </div>
              </div>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </Card>
            <div className={styles.comment}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<h2>评论</h2>} key="1">
                  {_.map(replyComment, function (item, x) {
                    return (
                      <Card
                        key={x}
                        className={styles.commentCard}
                        bordered={false}
                        type="inner">
                        <Comment commentList={replyComment[x]} index={x} {...commentProps} />
                      </Card>
                    )
                  })
                  }
                </TabPane>
                <TabPane key="2">More Content</TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

Detail.propTypes = {
  articleDetail: PropTypes.object,
}

export default connect(({ articleDetail, loading }) => ({ articleDetail, loading: loading.models.articleDetail }))(Detail)

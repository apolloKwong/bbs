import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row, Col, Button, Card, Tabs} from 'antd'
import { createDataForm } from 'utils'
import { Link } from 'react-router-dom'
import { routerRedux } from 'dva/router'
const TabPane = Tabs.TabPane;



const Detail = ({ resourceDetail, dispatch }) => {
  const { data, userName, image, dataDownloader } = resourceDetail
  const onClickpublish = () => {
    const downloadDate = getNowFormatDate()
    function getNowFormatDate() {
      let date = new Date();
      return date;
    }
    const data1 = {}
    data1.userId = dataDownloader.userId
    data1.resourceId = data.id
    data1.downloadDate = downloadDate

    dispatch({
      type: 'resourceDetail/create',
      payload: data1
    })
    dispatch({
      type: 'resourceDetail/downloadsPlusOne',
    })
    dispatch(routerRedux.push({
      pathname: ``,
    }))
  }

  function fileSizeCalculator(size) {

    const isKB = size / 1024 / 1024 < 1;
    if (isKB) {
      return (size / 1024).toFixed(2) + "KB";
    }
    return (size / 1024 / 1024).toFixed(2) + "MB";
  }

  return (
    <div className={styles.all}>
      <div className={styles.contentRight}>
        <Row key={data.userId}>
          <Col>
            <Card
              key="1"
              bordered="false"
              title={<div style={{ fontSize: '18px' }}>{data.resourceName}</div>}
            >
              <div className={styles.content}>
                领域范围:{data.fieldNameReal}
              </div>
              <div className={styles.content}>
                资源类型:{data.resourceTypeName}
              </div>
              <div className={styles.content}>
                文件大小:{fileSizeCalculator(data.size)}
              </div>
              <div className={styles.content}>
                下载次数:{data.downloads}
              </div>
              <div className={styles.content}>
                上传日期:{data.lastUpdateDate}
              </div>
              <div className={styles.content}>
                上传者:{'<' + userName + '>'}
              </div>
              <div>
                <div className={styles.content} style={{ float: 'left' }}>
                  说明:
              </div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }}></div>
              </div>
              <br />
              <Link target="_blank" to={`${data.url}`}>
                <Button onClick={onClickpublish} style={{ fontSize: '14px' }}>下载地址</Button>
              </Link>

            </Card>

            {/* <Card style={{ fontSize: '14px' }}>
              评论:&nbsp;<Button style={{ fontSize: '14px' }}>我要评论</Button>
            </Card> */}

          </Col>
        </Row>
      </div>
      <div className={styles.contentLeft}>
        <div className={styles.uploadSource}>
          <Link target="_blank" to={`/upload/resourceUpload`}>
            <Button type="primary"><h1>上传资源</h1></Button>
          </Link>
        </div>
        {/* <div>
          <Avatar shape="square" size="large" src={image} />
        </div>
        <div style={{ fontSize: '16px' }}>
          {userName}
        </div> */}
      </div>
    </div>
  )
}

Detail.propTypes = {
  resourceDetail: PropTypes.object,
}

export default connect(({ resourceDetail, loading }) => ({ resourceDetail, loading: loading.models.resourceDetail }))(createDataForm(Detail))

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
import { Row, Col, Button,  Card, Tabs } from 'antd'
import { createDataForm } from 'utils'
import { Link } from 'react-router-dom'
const TabPane = Tabs.TabPane;


const Detail = ({ trainingDetail, dispatch }) => {
  const { data, userName, organization } = trainingDetail
  return (
    <div className={styles.all}>
      <div className={styles.contentRight}>
        <Row key={data.userId}>
          <Col>
            <Card
              key="1"
              bordered="false"
            >
              <div className={styles.content} style={{ color: 'black', fontSize: '16px' }}>
                {data.title}
              </div>
              <div className={styles.content}>
              { organization }->{ userName } {data.lastUpdateDate}
              </div>
              <div>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: data.content }}></div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}


export default connect(({ trainingDetail, loading }) => ({ trainingDetail, loading }))(Detail)

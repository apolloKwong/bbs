import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import styles from './index.less'
import { Checkbox, Row, Col, Button, Card, Tabs, Icon } from 'antd'
import { Chart, Axis, Tooltip, Geom, Coord, Legend } from 'bizcharts'
import Checkbox2 from './Checkbox2.js'
import { createDataForm } from 'utils'
const TabPane = Tabs.TabPane;


function check(data) {
  if (data) {
    return true;
  } else {
    return false;
  }
}
const Detail = ({ pollDetail, dispatch }) => {
  const { data, userName, organization, checkedList, loginUserId, checkIfPolled, dataOption } = pollDetail
  let hasPolled = check(checkIfPolled.data)
  const limit = data.hits
  const onClickpublish = () => {
    dispatch({
      type: 'pollDetail/create',
      payload: checkedList,
      pollId: data.id
    }).then(() => {
      dispatch(routerRedux.push({
        pathname: `${data.id}`,
      }))
    });
  }
  const checkProps = {
    onClickpublish,
    hasPolled,
    dataOption,
    limit,
    getCheckedList(data) {
      dispatch({
        type: 'pollDetail/getCheckedList',
        payload: data
      })

    }
  }
  const data1 = []
  for (let i in dataOption) {
    data1.push({ content: Number(i)+1+"."+dataOption[i].content, voteCount: dataOption[i].voteCount })
  }
    console.log("data1", data1)
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
                <Icon type="user" />{organization}->{userName}
              </div>
              <div className={styles.content}>
                <Icon type="calendar" />{data.lastUpdateDate}
                &nbsp;(最多选{data.hits}项)
              </div>
              <div className={styles.content}>
                {hasPolled||!data.status ?
                  <Chart height={window.innerHeight/2} data={data1} forceFit>
                    <Coord type='polar' innerRadius={0.2} />
                    <Tooltip />
                    <Legend
                      position='right'
                      offsetY={-window.innerHeight / 2 + 390}
                      offsetX={-160} />
                    <Geom
                      type="interval"
                      color="content"
                      position="content*voteCount"
                      style={{ lineWidth: 1, stroke: '#fff' }}
                    >
                    </Geom>
                  </Chart> : <Checkbox2 {...checkProps} />}
              </div>
              <div className={styles.content}>
                截止时间:{data.deadline}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}


export default connect(({ pollDetail, loading }) => ({ pollDetail, loading }))(Detail)

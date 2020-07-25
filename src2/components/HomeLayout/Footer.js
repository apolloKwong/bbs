import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover,Row,Col } from 'antd'
import styles from './Footer.less'


const Footer = () => {
  
  return (
    <div className={styles.footer}>
      <div className={styles.footer_info}>
          <br/>
          <Row className={styles.list} type="flex" justify="space-around">
              <Col span={3}>项目团队</Col>
              <Col span={4}>开发框架</Col>
              <Col span={5}>问题咨询</Col>
              <Col span={6}>报告Bug</Col>
          </Row>
         
          <Row className={styles.list}type="flex" justify="space-around">
              <Col span={3}> 举 报 </Col>
              <Col span={4}>隐私权政策</Col>
              <Col span={5}>权益保障说明书</Col>
              <Col span={6}>鄂ICP证030173号-1</Col>
          </Row>
    </div>
    <div className={styles.footer_copyright}>
      <br/>
     <p>Copyright © 武汉烽火云创软件技术有限公司</p>
    </div>
    </div>
  )
}

Footer.propTypes = {
  
}

export default Footer

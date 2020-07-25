import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { color } from 'utils'
import { Menu, Icon, Popover,Input,Badge,Row,Col,Button } from 'antd'
import styles from './Header.less'




const Search = Input.Search;


const Header = () => {
  let clickforum = e => {
        window.open("forum")
    }
  return (

    <div className={styles.header}>
        <div className={styles.header_info}>
            <div className={styles.logo}>
            </div>
            
            <div className={styles.search}>
                <Search 
                    placeholder="全站搜索"
                    onSearch={value => console.log(value)}
                    style={{ height:35,}}/>
            </div>
            <div className={styles.message}>
                <Badge count={5}><Icon type='message' style={{fontSize:42,color:'#00d9ff'}}/></Badge>
            </div>
            <div className={styles.user}>             
            </div>
            <div className={styles.help}>
             帮助
            </div>
          
        </div>


        <div className={styles.navigation}>
           <Row className={styles.nav} type="flex" justify="start" align="middle">
                <Col  xs={{ span: 3}} sm={{ span: 3, offset: 0 }}md={{ span: 2, }} xl={{ span: 2, }}><a href='/home'>首页</a></Col>
                <Col  xs={{ span:3 }} sm={{ span: 3, offset: 0 }}md={{ span:3 , }} xl={{ span: 2, offset: 1}}><a href='/forum'>论坛</a></Col>
                <Col  xs={{ span:4 }}sm={{ span: 4, offset: 0}}md={{ span: 3, }} xl={{ span: 2, offset: 1 }}>资源共享</Col>
                <Col  xs={{ span:3}} sm={{ span: 3, offset: 0 }}md={{ span: 3,  }} xl={{ span: 2, offset: 1}}>问吧</Col>
                <Col  xs={{ span:4}} sm={{ span: 4, offset: 0 }}md={{ span: 3, }} xl={{ span: 2, offset: 1 }}>员工心声</Col>
                <Col  xs={{ span: 4}} sm={{ span: 4, offset: 0 }}md={{ span: 3,  }} xl={{ span: 2, offset: 1 }}>团队建设</Col>
            </Row>       
        </div>
         
         
    </div>
  )
}

Header.propTypes = {
  
}

export default Header

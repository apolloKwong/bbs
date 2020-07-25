import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { color } from 'utils'
import { Menu, Icon, Popover, Input, Badge, Row, Col, Button, Dropdown, Avatar, Tabs, Card } from 'antd'
import { Link } from 'react-router-dom'
import styles from './Header.less'
import { stompClientSubscription } from 'services/socket';
// import { connect } from 'dva'
const Search = Input.Search;
const TabPane = Tabs.TabPane;

class Header extends React.Component {
    state = {
        Upvote:{}, Collect:{}, Reply:{}
      };
// const Header = ({ setSingleRead,Upvote, Collect, Reply, user, logout, feed }) => {
    // console.log("UpVote",UpVote)
    // console.log("Reply",Reply)
    // console.log("Collect",Collect)
    //   handleSubmit = (data) => {
    //     this.setState({ id: data });
    //     this.props.setSingleRead(this.props.id);
    //   }
    handleSubmit = () => {
        fetch(`http://localhost:8000/bbs/upvote/getByUserId/${this.props.user.userId}`, {
            method: 'GET',
            credentials: 'include',
          })
          .then((response) => response.json()) //下一步操作
            .then((responseData) => {
                this.setState({ Upvote:responseData})
              console.log(responseData); //打印出来
              // alert(responseData);
            })
            .catch((error) => {
              alert(error);
            })
            fetch(`http://localhost:8000/bbs/collect/getByUserId/${this.props.user.userId}`, {
                method: 'GET',
                credentials: 'include',
              })
              .then((response) => response.json()) //下一步操作
                .then((responseData) => {
                    this.setState({ Collect:responseData})
                  console.log(responseData); //打印出来
                  // alert(responseData);
                })
                .catch((error) => {
                  alert(error);
                })
                fetch(`http://localhost:8000/bbs/reply/getByTargetUserId/${this.props.user.userId}`, {
                method: 'GET',
                credentials: 'include',
              })
              .then((response) => response.json()) //下一步操作
                .then((responseData) => {
                    this.setState({ Reply:responseData})
                  console.log(responseData); //打印出来
                  // alert(responseData);
                })
                .catch((error) => {
                  alert(error);
                })
      }

    render() {
        const {setSingleRead, logout} = this.props;
    const menu = (
        <Menu >
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href='/userPostings' style={{ fontSize: '18px', fontFamily: '微软雅黑' }}>个人主页</a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href='/personal' style={{ fontSize: '18px', fontFamily: '微软雅黑' }}>设置中心</a>
            </Menu.Item>
            <Menu.Item key="logout">
                <a target="_blank" rel="noopener noreferrer" onClick={logout} style={{ fontSize: '18px', fontFamily: '微软雅黑' }}>退出</a>
            </Menu.Item>
        </Menu>
    )
    const content = (
        <Card bordered={false} noHovering bodyStyle={{ padding: '0px' }} style={{ width: '234px', zIndex: 999 }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="like" /></span>} key="1">{
                    _.map(this.state.Upvote, function (item) {
                        return (

                            <div key={item.id} style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                {item.senderName}赞了你的文章
                                
                                <Link target="_blank" to={`userPostings/articleDetail/${item.articleId}`}>
                                <Badge dot = {!item.status} onClick={() => setSingleRead(item.id)}>
                                {item.articleName}
                                </Badge>
                                </Link>
                                
                            </div>

                        )
                    })
                }
                    <div style={{  fontSize: '14px' }}>
                        <Link target="_blank" to={`notifications`}>查看全部</Link>
                    </div>  </TabPane>
                <TabPane tab={<span><Icon type="star" /></span>} key="2">{
                    _.map(this.state.Collect, function (item) {
                        return (
                            <div key={item.id} style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                {item.senderName}收藏了你的文章
                                
                                 <Link target="_blank" to={`userPostings/articleDetail/${item.articleId}`}>
                                 <Badge dot = {!item.status} onClick={() => setSingleRead(item.id)} >
                                 {item.articleName}
                                 </Badge>
                                 </Link>
                                 
                            </div>

                        )
                    })
                }
                    <div  style={{  fontSize: '14px' }}>
                        <Link target="_blank" to={`notifications`}>查看全部</Link>
                    </div>  </TabPane>
                <TabPane tab={<span><Icon type="message" /></span>} key="3">{
                    _.map(this.state.Reply, function (item) {
                        return (
                            <div key={item.id} style={{ margin: '4px', fontSize: '14px', color: 'black' }}  >
                                {item.replyUserName}在
                                
                                <Link target="_blank" to={`userPostings/articleDetail/${item.articleId}`}>
                                <Badge dot = {!item.status} onClick={() => setSingleRead(item.id)}>
                                {item.articleName}
                                </Badge>
                                </Link>
                                
                                回复了你
                                
                                 </div>

                        )
                    })
                }
                    <div style={{  fontSize: '14px' }}>
                        <Link target="_blank" to={`notifications`}>查看全部</Link>
                    </div>  </TabPane>
            </Tabs>
        </Card>
    );
    return (

        <div className={styles.header}>
            <div className={styles.header_info}>
                <div className={styles.logo}>云创俱乐部</div>

                <div className={styles.search}>
                    <Search
                        placeholder="全站搜索"
                        onSearch={value => console.log(value)}
                        style={{ height: 35, }} />
                </div>
                <div className={styles.message}>
                    <Popover placement="topLeft" content={content} trigger="click">
                        <Badge count={this.props.feed} onClick={this.handleSubmit}><Icon type='message' style={{ fontSize: 42, color: '#00d9ff' }} /></Badge>
                    </Popover>
                </div>
                <div className={styles.user}>
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                            <Avatar src={this.props.user.userImage} alt="" style={{ width: '50px', height: '50px', borderRadius: '25px 25px 25px 25px' }} />
                        </a>
                    </Dropdown>
                </div>
                <div className={styles.help}>
                    帮助
                </div>

            </div>


            <div className={styles.navigation}>
                <Row className={styles.nav} type="flex" justify="start" align="middle">
                    <Col xs={{ span: 3 }} sm={{ span: 3, offset: 0 }} md={{ span: 2, }} xl={{ span: 2, }}><a href='/home'>首页</a></Col>
                    <Col xs={{ span: 3 }} sm={{ span: 3, offset: 0 }} md={{ span: 3, }} xl={{ span: 2, offset: 1 }}><a href='/forum'>论坛</a></Col>
                    <Col xs={{ span: 4 }} sm={{ span: 4, offset: 0 }} md={{ span: 3, }} xl={{ span: 2, offset: 1 }}><a href='/share'>资源共享</a></Col>
                    <Col xs={{ span: 3 }} sm={{ span: 3, offset: 0 }} md={{ span: 3, }} xl={{ span: 2, offset: 1 }}><a href='/questionbar/question'>问吧</a></Col>
                    <Col xs={{ span: 4 }} sm={{ span: 4, offset: 0 }} md={{ span: 3, }} xl={{ span: 2, offset: 1 }}><a href='/laborVoice/hot'>员工心声</a></Col>
                    <Col xs={{ span: 4 }} sm={{ span: 4, offset: 0 }} md={{ span: 3, }} xl={{ span: 2, offset: 1 }}><a href='/teamBuilding/activity'>团队建设</a></Col>
                </Row>
            </div>


        </div>
    );
}
}

Header.propTypes = {
    user: PropTypes.object,
}

export default Header
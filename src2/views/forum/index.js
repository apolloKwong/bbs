import React from 'react'
import { Card, Icon, Collapse, Pagination, Button, } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'dva'
import { Header, Module, Footer } from '../../components/HomeLayout'
import Comment from './Comment.js'
import styles from './index.less'

const Panel = Collapse.Panel;


const Forum = ({ forum, dispatch }) => {

    let { plateList, articleDetailsList, IsVisible, replyComment, Q, pagination } = forum
    const { pageSize } = pagination
    // 总文章条数
    const articleTotal = articleDetailsList.length
    articleDetailsList = articleDetailsList.data

    // let pageSize = 10
    //阅读全文和收起的操作
    function extendsArticle(value) {
        let x = value
        let res = IsVisible
        res[x] = (IsVisible[x] == "inline" ? "none" : "inline")
        dispatch({
            type: 'forum/extendsArticle',
            payload: {
                IsVisible: res
            }
        })
    }

    //根据选择的板块显示文章
    function selectPlate(value) {
        dispatch({
            type: 'forum/query',
            payload: {
                Q: 'plateNameReal_LK=' + value,
                // page: 1,
                // pageSize,
            }
        })
    }


    function onChangePage(pageNumber, pageSize) {
        dispatch({
            type: 'forum/query',
            payload: {
                Q,
                page: pageNumber,
                pageSize,
            }
        })
    }

    function onShowSizeChange(current, pageSize) {
        dispatch({
            type: 'forum/query',
            payload: {
                Q,
                page: current,
                pageSize,
            }
        })
    }

    const commentProps = {
        handleSubmit(e) {
            dispatch({
                type: 'forum/createComment',
                payload: {
                    e,
                    replyComment
                }

            })
        },
        handleActiveKeyId(e) {
            dispatch({
                type: 'forum/changeActiveKeyId',
                payload: {
                    key: e.key,
                    index: e.index,
                    replyComment
                }

            })
        }
    }

    function handleUpvote(articleId, index) {
        dispatch({
            type: 'forum/handleUpvote',
            payload: { articleId, index }
        })
    }

    function handleCollect(articleId, index) {
        dispatch({
            type: 'forum/handleCollect',
            payload: { articleId, index }
        })
    }

    return (
        <div className={styles.forum}>
            <div className={styles.content}>
                <div className={styles.content_list}>
                    <div className={styles.post}>
                        <div className={styles.posting}>
                            <Button type='primary' className={styles.postbtn}>
                                <a href='/writearticle'>我要发帖</a>
                            </Button>
                        </div>
                        {articleTotal == 0 && <div>
                            <br />
                            <Card className={styles.card}> <br /> <br />
                                该板块没有文章 !!
                                <br /> <br /> <br />
                            </Card>
                        </div>}
                        {_.map(articleDetailsList, function (item, x) {
                            return (
                                <div key={x}>
                                    <Card className={styles.card}>
                                        <div>
                                            <h5>来自板块：{item.plateNameDesp}</h5>
                                            <img className={styles.img} src={item.userImage} />
                                            <span>{item.userName}   <div className={styles.postdate}>发表于：{item.postDate}</div></span>
                                            <h4>{item.userDescription}</h4>
                                        </div>
                                        <Link to={`userPostings/articleDetail/${item.id}`}><h3>{item.articleName}</h3></Link>
                                        <div style={{ display: IsVisible[x], position: 'relative' }}>
                                            <div style={{ "height": "70px", overflow: 'scroll' }}>
                                                <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                            </div>
                                            <button className={styles.button} onClick={() => { extendsArticle(x) }}>阅读全文<Icon type="down" /></button>
                                        </div>
                                        <div style={{ display: IsVisible[x] === "inline" ? "none" : "inline" }}>
                                            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                                            <button className={styles.button} onClick={() => { extendsArticle(x) }}>收起  <Icon type="up" /></button>
                                        </div>
                                        <br /> <br />
                                        <div className={styles.iconp}>
                                            <div className={styles.comment}>
                                                <div className={styles.commentIcon} ><Icon type='message' /> </div>
                                                <Collapse bordered={false} Icon="message" style={{ background: '#fff' }} >
                                                    <Panel showArrow={false} header={'评论(' + replyComment[x].length + ')'} style={{ fontSize: '14px', }} >
                                                        <div style={{ background: '#fff' }}>
                                                            <Comment commentList={replyComment[x]} index={x} {...commentProps} /><br />
                                                        </div>
                                                    </Panel>
                                                </Collapse>
                                            </div>
                                            <div className={styles.operate}>
                                                <div className={styles.a} >
                                                    <div onClick={() => handleUpvote(item.id, x)} style={{ cursor: 'pointer', width: '140px', Zindex: 100 }}>
                                                        <Icon type="like" />
                                                        {item.upvoteFlag?'取消赞':'赞'}
                                                        ({item.upvoteList.length})
                                                    </div>
                                                </div>
                                                <div className={styles.a} >
                                                    <div onClick={() => handleCollect(item.id, x)} style={{ cursor: 'pointer', width: '140px', Zindex: 100 }}>
                                                        <Icon type="star" />
                                                        {item.collectFlag?'取消收藏':'收藏'}
                                                        ({item.collectList.length})
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })
                        }
                        <br />  <br />
                        <Pagination height='120px'
                            showQuickJumper onChange={onChangePage}
                            showSizeChanger onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1} defaultPageSize={10} total={articleTotal} />
                    </div>
                </div>
            </div>

            <div className={styles.side}>

                <div className={styles.plate}>
                    <div className={styles.title}>
                        <br /><p>板块分类</p>
                    </div>
                    {
                        _.map(plateList, function (item, x) {
                            return (
                                <div key={x} className={styles.side_list}>
                                    <br /><p value={item.plateName} onClick={() => { selectPlate(item.plateName) }}>{item.plateName}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.focus}>
                    <br />
                    <div className={styles.f}>
                        <div className={styles.a}>关注问题</div>
                        <div className={styles.b}>换一换</div>
                    </div>
                    <div> <hr style={{ border: '1 dashed' }} /></div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>技术之家</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>职场人生</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>运营管理</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>售前市场</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>研发管理</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                    <div className={styles.g}>
                        <div className={styles.c}><img src={require('../../views/images/首页/u13.png')} alt="" style={{ width: '50px', height: '50px' }} /></div><div className={styles.e}>质量保证</div>
                        <div className={styles.d}><Icon type="plus" />关注</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default connect(({ loading, forum }) => ({ loading, forum }))(Forum)

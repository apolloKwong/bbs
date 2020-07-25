import modelExtend from 'dva-model-extend'
import { config } from 'utils'
import { query } from 'services/app'
import * as plate from 'services/plate'
import * as notification from 'services/notification'
import * as comment from 'services/comment'
import * as article from 'services/article'
import * as articleDetails from 'services/articleDetails'
import { pageModel } from './common'
import { message } from 'antd'

const { prefix } = config


export default modelExtend(pageModel, {
    namespace: 'forum',

    state: {
        plateList: [],
        articleList: [],
        IsVisible: [],
        articleDetailsList: [],
        replyComment: [],
        Q: '',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/forum') {
                    dispatch({
                        type: 'query',
                        payload: location.query || {},
                    })
                }
            })
        },
    },


    effects: {
        *query({ payload = {} }, { call, put }) {

            const authInfo = yield call(query)
            const { userId } = authInfo.data
            payload.Q_postState_EQ = 1
            let articleDetailsList = yield call(articleDetails.query, payload)
            let { success, message, status, data } = articleDetailsList
            if (undefined != payload.Q) {
                data.Q = payload.Q
            }
            let replyComment = []
            let IsVisible = []
            if (success) {
                for (let x in data.data) {
                    replyComment[x] = (undefined != data.data[x].replyComment ? data.data[x].replyComment : [])
                    let upvoteList = data.data[x].upvoteList
                    upvoteList = (undefined != upvoteList ? upvoteList : [])
                    let upvoteFlag = false
                    for (let y in upvoteList) {
                        if (upvoteList[y].userId == userId && upvoteList[y].articleId == data.data[x].id) {
                            upvoteFlag = true
                            break
                        }
                    }
                    data.data[x].upvoteList = upvoteList
                    data.data[x].upvoteFlag = upvoteFlag

                    let collectList = data.data[x].collectList
                    collectList = (undefined != collectList ? collectList : [])
                    let collectFlag = false
                    for (let y in collectList) {
                        if (collectList[y].userId == userId && collectList[y].articleId == data.data[x].id) {
                            collectFlag = true
                            break
                        }
                    }
                    data.data[x].collectList = collectList
                    data.data[x].collectFlag = collectFlag

                    replyComment[x].articleId = data.data[x].id
                    replyComment[x].activeKeyId = ''
                    IsVisible[x] = 'inline'
                }
                data.replyComment = replyComment  
                data.IsVisible = IsVisible
                yield put({
                    type: 'getArticle',
                    payload: data
                })
            } else {
                throw articleDetailsList
            }
            let plateList = yield call(plate.query, {})
            success = plateList.success
            data = plateList.data
            if (success) {
                yield put({
                    type: 'getPlate',
                    payload: data.data,
                })
            } else {
                throw plateList
            }
        },
        * create({ payload }, { call, put, select }) {
            const { data } = yield call(plate.create, payload)
            message.info("新增成功");
            yield put({ type: 'hideModal' })
            yield put({ type: 'query' })

        },
        * update({ payload }, { call, put, select }) {
            //获取命名空间为plate的所有状态，select本来就是获取state的状态
            const data1 = yield select(_ => _.plate)
            const id = yield select(({ plate }) => plate.currentItem.id)
            console.log(id);

            const newPlate = { ...payload, id }
            const data = yield call(plate.update, newPlate)
            message.info("修改成功")
            yield put({ type: 'hideModal' })
            yield put({ type: 'query' })
        },

        *delete({ payload }, { call, put, select }) {
            let { success, data } = yield call(plate.remove, { id: payload.id })
            yield put({ type: 'query' })
        },
        * createComment({ payload }, { call, put, select }) {

            const replyComment = payload.replyComment
            payload = payload.e

            const authInfo = yield call(query)
            const { userId, lastname } = authInfo.data

            payload.replyUserId = userId
            payload.replyUserName = lastname
            payload.replyDate = new Date()
            const meme = yield call(articleDetails.get,{id:payload.articleId})
            const articleAuthorId = meme.data.userId
            if(!payload.targetId) {
                payload.targetUserId = articleAuthorId
            }
            const commentId  = yield call(comment.create, payload)
            message.info("评论成功！")
            //添加信息到t_notification表
            if(payload.targetUserId!=payload.replyUserId)
            yield call(notification.create,{type:1,senderId:payload.replyUserId,recipientId:payload.targetUserId,status:0,tId:commentId.data,articleId:payload.articleId})
            
            const { data } = yield call(comment.freshReply, payload.articleId)
            data.articleId = payload.articleId
            data.activeKeyId = ''
            replyComment[payload.index] = data
            yield put({
                type: 'createCommentSuccess',
                payload: replyComment
            })
        },
        * changeActiveKeyId({ payload }, { put }) {
            const replyComment = payload.replyComment
            replyComment[payload.index].activeKeyId = payload.key
            yield put({
                type: 'createCommentSuccess',
                payload: replyComment
            })
        },
        * handleUpvote({ payload }, { call, select, put }) {
            const authInfo = yield call(query)
            const { userId } = authInfo.data
            let articleDetailsList = yield select(({ forum }) => (forum.articleDetailsList))
            //判断是否为取消点赞操作
            
            if (articleDetailsList.data[payload.index].upvoteFlag) {
                //data:articleId
                const{data} = yield call(articleDetails.getUpvoteId, { userId: userId, articleId: articleDetailsList.data[payload.index].id })
                yield call(articleDetails.cancelUpvote, { userId: userId, articleId: articleDetailsList.data[payload.index].id })
                message.info('取消成功！')

                yield call(notification.deleteByTwoIds, { type: 2, tId: data })
                //刷新页面评论数量
                articleDetailsList.data[payload.index].upvoteFlag = false
                let upvoteList = articleDetailsList.data[payload.index].upvoteList
                for (var i = upvoteList.length - 1; i >= 0; i--) {
                    if (upvoteList[i].userId == userId && upvoteList[i].articleId == articleDetailsList.data[payload.index].id)
                        upvoteList.splice(i, 1);
                }
                articleDetailsList.data[payload.index].upvoteList = upvoteList
            } else {
                payload.userId = userId
                payload.upvote = '1'
                payload.upvoteDate = new Date()
                const meme = yield call(articleDetails.get,{id:payload.articleId})
                const articleAuthorId = meme.data.userId

                const upvoteId = yield call(articleDetails.doUpvote, payload)
                message.info('点赞成功！')

                if(articleAuthorId!=payload.userId){
                    yield call(notification.create,{type:2,senderId:payload.userId,recipientId:articleAuthorId,status:0,tId:upvoteId.data,articleId:payload.articleId})
                }
                //刷新页面评论数量
                articleDetailsList.data[payload.index].upvoteFlag = true
                articleDetailsList.data[payload.index].upvoteList.push(payload)
            }
            yield put({
                type: 'handleUpvoteSuccess',
                payload: articleDetailsList
            })
        },
        * handleCollect({ payload }, { call, select, put }) {
            const authInfo = yield call(query)
            const { userId } = authInfo.data

            let articleDetailsList = yield select(({ forum }) => (forum.articleDetailsList))
            //判断是否为取消收藏操作
            if (articleDetailsList.data[payload.index].collectFlag) {
                const {data} = yield call(articleDetails.getCollectId, { userId: userId, articleId: articleDetailsList.data[payload.index].id })
                yield call(articleDetails.cancelCollect, { userId: userId, articleId: articleDetailsList.data[payload.index].id })
                message.info('取消成功！')

                yield call(notification.deleteByTwoIds, { type: 3, tId: data })
                //刷新页面评论数量
                articleDetailsList.data[payload.index].collectFlag = false
                let collectList = articleDetailsList.data[payload.index].collectList
                for (var i = collectList.length - 1; i >= 0; i--) {
                    if (collectList[i].userId == userId && collectList[i].articleId == articleDetailsList.data[payload.index].id)
                        collectList.splice(i, 1);
                }
                articleDetailsList.data[payload.index].collectList = collectList
            } else {
                payload.userId = userId
                payload.collect = '1'
                payload.collectDate = new Date()
                const meme = yield call(articleDetails.get,{id:payload.articleId})
                const articleAuthorId = meme.data.userId

                const collectId = yield call(articleDetails.doCollect, payload)
                message.info('收藏成功！')
                //刷新页面评论数量
                if(articleAuthorId!=payload.userId){
                    yield call(notification.create,{type:3,senderId:payload.userId,recipientId:articleAuthorId,status:0,tId:collectId.data,articleId:payload.articleId})
                }
                articleDetailsList.data[payload.index].collectFlag = true
                articleDetailsList.data[payload.index].collectList.push(payload)
            }
            yield put({
                type: 'handleCollectSuccess',
                payload: articleDetailsList
            })
        }
    },





    reducers: {
        openModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true }
        },

        extendsArticle(state, { payload }) {
            return { ...state, IsVisible: payload.IsVisible }
        },

        getArticle(state, { payload }) {
            return { ...state, articleDetailsList: payload, Q: payload.Q, IsVisible: payload.IsVisible, replyComment: payload.replyComment }
        },

        getPlate(state, { payload }) {
            return { ...state, plateList: payload }
        },

        createCommentSuccess(state, { payload }) {
            return { ...state, replyComment: payload }
        },

        handleUpvoteSuccess(state, { payload }) {
            return { ...state, articleDetailsList: payload }
        },

        handleCollectSuccess(state, { payload }) {
            return { ...state, articleDetailsList: payload }
        },


    },

})

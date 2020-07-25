import { rpc, request, apiPrefix } from 'utils'

const articleDetails = rpc('bbs/articleDetails')
const upvote = rpc('bbs/upvote')
export async function query({ page = 1, pageSize = 10, ...qs }) {
    return articleDetails.path('get', `getDetails/list/${page}/${pageSize}`, qs)
}

export async function get({ id }) {
    return articleDetails.get(id)
}

export async function getUpvoteByUserId({userId}){
    return request({
       url: `${apiPrefix}/bbs/upvote/getByUserId/${userId}`,
       method:'GET'
   })
}

export async function doUpvote(params) {
    return request({
        url: `${apiPrefix}/bbs/upvote/single`,
        method: 'POST',
        data: params
    })
}
export async function getCollectByUserId({userId}){
    return request({
       url: `${apiPrefix}/bbs/collect/getByUserId/${userId}`,
       method:'GET'
   })
}
export async function doCollect(params) {
    return request({
        url: `${apiPrefix}/bbs/collect/single`,
        method: 'POST',
        data: params
    })
}

export async function cancelUpvote({ userId, articleId }) {
    return request({
        url: `${apiPrefix}/bbs/upvote/cancelUpvote/${userId}/${articleId}`,
        method: 'DELETE',
    })
}

export async function getUpvoteId({ userId, articleId }) {
    return request({
        url: `${apiPrefix}/bbs/upvote/getId/${userId}/${articleId}`,
        method: 'GET',
    })
}

export async function getCollectId({ userId, articleId }) {
    return request({
        url: `${apiPrefix}/bbs/collect/getId/${userId}/${articleId}`,
        method: 'GET',
    })
}

export async function cancelCollect({ userId, articleId }) {
    return request({
        url: `${apiPrefix}/bbs/collect/cancelCollect/${userId}/${articleId}`,
        method: 'DELETE',
    })
}


// export async function create(params) {
//     return articleDetails.create(params);
// }

// export async function update(params) {
//     return articleDetails.update(params);
// }

// export async function remove ({ id }) {
//     return request({
//         url: `${apiPrefix}/bbs/plate/single/${id}`,
//         method:'DELETE'
//     })
// }

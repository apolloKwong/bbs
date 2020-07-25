import { rpc, request, apiPrefix } from 'utils'

const reply = rpc('bbs/reply')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return reply.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return reply.get(id)
}

export async function getReplyByTargetUserId({targetUserId}){
    return request({
       url: `${apiPrefix}/bbs/reply/getByTargetUserId/${targetUserId}`,
       method:'GET'
   })
}
export async function create(params) {
    return reply.create(params);
}

export async function update(params) {
    return reply.update(params);
}

export async function remove({ id }) {
    return request({
        url: `${apiPrefix}/bbs/reply/single/${id}`,
        method: 'DELETE'
    })
}

export async function freshReply(articleId) {
    return request({
        url: `${apiPrefix}/bbs/reply/getReplyDetails/${articleId}`,
        method: 'GET'
    })
}
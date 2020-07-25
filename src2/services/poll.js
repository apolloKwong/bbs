import { rpc, request, apiPrefix } from 'utils'

const poll = rpc('bbs/poll')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return poll.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return poll.get(id)
}


export async function create(params) {
    return poll.create(params);
}

export async function update(params) {
    return poll.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/poll/single/${id}`,
        method:'DELETE'
    })
}


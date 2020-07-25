import { rpc, request, apiPrefix } from 'utils'

const activity = rpc('bbs/activity')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return activity.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return activity.get(id)
}


export async function create(params) {
    return activity.create(params);
}

export async function update(params) {
    return activity.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/activity/single/${id}`,
        method:'DELETE'
    })
}
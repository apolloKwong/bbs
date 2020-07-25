import { rpc, request, apiPrefix } from 'utils'

const downloadRecord = rpc('bbs/downloadRecord')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return downloadRecord.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return downloadRecord.get(id)
}


export async function create(params) {
    return downloadRecord.create(params);
}

export async function update(params) {
    return downloadRecord.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/downloadRecord/single/${id}`,
        method:'DELETE'
    })
}
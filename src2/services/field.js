import { rpc, request, apiPrefix } from 'utils'

const field = rpc('bbs/field')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return field.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return field.get(id)
}


export async function create(params) {
    return field.create(params);
}

export async function update(params) {
    return field.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/field/single/${id}`,
        method:'DELETE'
    })
}
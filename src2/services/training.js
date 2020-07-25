import { rpc, request, apiPrefix } from 'utils'

const training = rpc('bbs/training')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return training.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return training.get(id)
}


export async function create(params) {
    return training.create(params);
}

export async function update(params) {
    return training.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/training/single/${id}`,
        method:'DELETE'
    })
}
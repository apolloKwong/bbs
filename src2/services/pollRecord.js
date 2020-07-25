import { rpc, request, apiPrefix } from 'utils'

const pollRecord = rpc('bbs/pollRecord')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return pollRecord.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return pollRecord.get(id)
}


export async function create(params) {
    return pollRecord.create(params);
}

export async function update(params) {
    return pollRecord.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/pollRecord/single/${id}`,
        method:'DELETE'
    })
}
export async function checkIfPolled({pollId,userId}) {
    return request({
      url: `${apiPrefix}/bbs/pollRecord/checkIfPolled/list/${pollId}/${userId}`,
      method: 'GET',
    
  })
}
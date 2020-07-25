import { rpc, request, apiPrefix } from 'utils'

const pollOption = rpc('bbs/pollOption')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return pollOption.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return pollOption.get(id)
}

export async function create(params) {
    return pollOption.create(params);
}

export async function update(params) {
    return pollOption.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/pollOption/single/${id}`,
        method:'DELETE'
    })
}
export async function getPollOptionsByPollId(pollId){
    return request({
        url: `${apiPrefix}/bbs/pollOption/getPollOptionsByPollId/${pollId}`,
        method:'GET',
    })
}
export async function voteCountPlusOne({id}) {
    return request({
      url: `${apiPrefix}/bbs/pollOption/voteCountPlusOne/${id}`,
      method: 'PUT',
    
  })
}
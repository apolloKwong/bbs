import { rpc, request, apiPrefix } from 'utils'

const user1 = rpc('bbs/person')

export async function update (params) {
    return user1.update(params);
}

export async function get({id}) {
    return user1.get(id)
}


export async function create(params) {
    return user1.create(params);
}

export async function getAllInfoByUserId({userId}){
    return request({
        url:`${apiPrefix}/bbs/person/getAllInfoByUserId/${userId}`,
        method:'get'
    })
}
export async function getIdByUId({userId}){
    return request({
        url:`${apiPrefix}/bbs/person/getIdByUId/${userId}`,
        method:'get'
    })
}
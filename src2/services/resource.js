import { rpc, request, apiPrefix } from 'utils'

const resource = rpc('bbs/resource')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return resource.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return resource.get(id)
}


export async function create(params) {
    return resource.create(params);
}

export async function update(params) {
    return resource.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/resource/single/${id}`,
        method:'DELETE'
    })
}

export async function getByUserId({userId,page = 1, pageSize = 10}){
    return request({
       url: `${apiPrefix}/bbs/resource/getByUserId/list/${userId}/${page}/${pageSize}`,
       method:'GET'
   })
}
export async function getByFieldName({fieldName}){
    return request({
       url: `${apiPrefix}/bbs/resource/getByFieldName/list/${fieldName}`,
       method:'GET'
   })
}
export async function getByFieldName2({ fieldName,page = 1, pageSize = 10 }) {
    return request({
        url: `${apiPrefix}/bbs/resource/getByFieldName2/list/${fieldName}/${page}/${pageSize}`,
        method: 'GET'
    })
}

export async function search(payload){
    const tmp ={}
    tmp.keyword = payload.keyword
    tmp.field = payload.field
    tmp.resourceType = payload.resourceType
    return request({
       url: `${apiPrefix}/bbs/resource/search/${payload.page}/${payload.pageSize}`,
       method:'GET',
       data: tmp
   })
}
export async function topEveryDay(){
    return request({
       url: `${apiPrefix}/bbs/resource/topEveryDay/list`,
       method:'GET'
   })
}

export async function topEveryWeek(){
    return request({
       url: `${apiPrefix}/bbs/resource/topEveryWeek/list`,
       method:'GET'
   })
}

export async function topEveryMonth(){
    return request({
       url: `${apiPrefix}/bbs/resource/topEveryMonth/list`,
       method:'GET'
   })
}

export async function topEveryYear(){
    return request({
       url: `${apiPrefix}/bbs/resource/topEveryYear/list`,
       method:'GET'
   })
}

export async function top24h(){
    return request({
       url: `${apiPrefix}/bbs/resource/top24h/list`,
       method:'GET'
   })
}

export async function latest24h(){
    return request({
       url: `${apiPrefix}/bbs/resource/latest24h/list`,
       method:'GET'
   })
}

export async function downloadsPlusOne({id}) {
    return request({
      url: `${apiPrefix}/bbs/resource/downloadsPlusOne/${id}`,
      method: 'PUT',
    
  })
}
// export async function getAllByDate(){
//     return request({
//        url: `${apiPrefix}/bbs/resource/getAllByDate/list`,
//        method:'GET'
//    })
// }
// export async function getAllByDownloads(){
//     return request({
//        url: `${apiPrefix}/bbs/resource/getAllByDownloads/list`,
//        method:'GET'
//    })
// }
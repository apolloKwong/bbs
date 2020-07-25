import { rpc, request, apiPrefix } from 'utils'

const notification = rpc('bbs/notification')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return notification.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return notification.get(id)
}


export async function create(params) {
    return notification.create(params);
}

export async function update(params) {
    return notification.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/notification/single/${id}`,
        method:'DELETE'
    })
}

export async function getByUserId({userId,page = 1, pageSize = 10}){
    return request({
       url: `${apiPrefix}/bbs/notification/getByUserId/list/${userId}/${page}/${pageSize}`,
       method:'GET'
   })
}

export async function getBadgeNumber({recipientId}){
    return request({
       url: `${apiPrefix}/bbs/notification/getBadgeNumber/${recipientId}`,
       method:'GET'
   })
}


export async function deleteByTwoIds({ type, tId }) {
    return request({
        url: `${apiPrefix}/bbs/notification/deleteByTwoIds/${type}/${tId}`,
        method: 'DELETE',
    })
}

export async function setRead({id}) {
    return request({
      url: `${apiPrefix}/bbs/notification/setRead/${id}`,
      method: 'PUT',
    
  })
}

export async function setSingleRead({id}) {
    return request({
      url: `${apiPrefix}/bbs/notification/setSingleRead/${id}`,
      method: 'PUT',
    
  })
}
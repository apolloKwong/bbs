import { rpc, request, apiPrefix } from 'utils'

const article = rpc('bbs/article')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return article.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return article.get(id)
}


export async function create(params) {
    return article.create(params);
}

export async function update(params) {
    return article.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/article/single/${id}`,
        method:'DELETE'
    })
}

export async function getByUserId({userId}){
     return request({
        url: `${apiPrefix}/bbs/article/getByUserId/list/${userId}`,
        method:'GET'
    })
}
//改变文章状态
export async function editPSById({id,postState}) {
      return request({
        url: `${apiPrefix}/bbs/article/editPSById/${id}/${postState}`,
        method: 'PUT',
    })
}

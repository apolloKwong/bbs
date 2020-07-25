import { rpc, request, apiPrefix } from 'utils'

const plate = rpc('apollo/internet')

// export async function query({ page = 1, pageSize = 10, ...qs }) {
//     return plate.listPage(page, pageSize, qs)
// }
export async function query ({  }) {
    return request({
        url: `http://localhost:8080/apollo/services/apollo/internet/list`,
        method:'GET'
    })
}
export async function get({ id }) {
    return plate.get(id)
}


export async function create(params) {
    return plate.create(params);
}

export async function update(params) {
    return plate.update(params);
}

export async function remove ({ id }) {
    return request({
        url: `${apiPrefix}/bbs/plate/single/${id}`,
        method:'DELETE'
    })
}
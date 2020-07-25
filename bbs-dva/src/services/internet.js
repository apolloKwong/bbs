import { rpc, request, apiPrefix } from 'utils'

const internet = rpc('apollo/internet')


export async function query({ page = 1, pageSize = 10, ...qs }) {
    return internet.listPage(page, pageSize, qs)
   

}

export async function get({ id }) {
    return internet.get(id)
}


export async function create(params) {
    return internet.create(params);
}

export async function update(params) {
    return internet.update(params);
}

export async function querytest({}) {
     //http://localhost:8080/apollo/services/apollo/user/list/1/10
    return request({
            url: `${apiPrefix}/apollo/internet/list`,
            method:'GET',
    })
}
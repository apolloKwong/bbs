import { rpc, request, apiPrefix } from 'utils'

const user = rpc('security/user')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return user.listPage(page,pageSize,qs)
}

export async function get({id}) {
    return user.get(id)
}

export async function create (params) {
    return user.create(params);
}

export async function update (params) {
    return user.update(params);
}

// 用户设置 自定义方法
//修改用户
export async function modify(payload) {
    return request({
        url: `${apiPrefix}/security/user/modify`,
        method: 'put',
        data: payload
    })
}
//修改密码
export async function modifyPwd(payload) {
    return request({
        url: `${apiPrefix}/security/user/modifyPwd`,
        method: 'put',
        data: payload
    })
}


export async function getAuthInfo(){
    return request({
        url: `${apiPrefix}/security/authInfo`,
        method: 'get',
        
    })
}



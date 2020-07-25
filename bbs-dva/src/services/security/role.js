import { rpc,request, apiPrefix } from 'utils'

const role = rpc('security/role')
const user = rpc('security/user')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return role.listPage(page,pageSize,qs)
}

export async function get({id}) {
    return role.get(id)
}

export async function perScanall(){
    return request({
       url: `${apiPrefix}/security/permission/scanall`,
	   method: 'get',
    })
}

export async function getPernByRoleID({id}){
    return request({
       url: `${apiPrefix}/security/permission/role/${id}`,
	   method: 'get',
    })
}

export async function getRoleUser({id}){
    return request({
       url: `${apiPrefix}/security/role/roleUser/${id}`,
	   method: 'get',
    })
}

export async function getRoleUserByID({page,pageSize,userIDs}) {
    let qs={};
    qs.Q_id_L_IN=[...userIDs];
    return user.listPage(page,pageSize,qs)
}
export async function getUnauthorRoleUserByID({userIDs,unauthorizedPage,unauthorizedPageSize,userfilter}) {
    if(typeof userfilter=="undefined"){
       let qs={};
       qs.Q_id_L_NI=[...userIDs];
       return user.listPage(unauthorizedPage,unauthorizedPageSize,qs)
    }else{
       userfilter.Q_id_L_NI=[...userIDs]; 
       return user.listPage(unauthorizedPage,unauthorizedPageSize,userfilter)
    } 
}



export async function getUserByRoleID ({id}) {
   return  request({
	   url: `${apiPrefix}/security/role/roleUser/${id}`,
	   method: 'get',
   })
}

export async function delRoleUsersByIds (payload) {
   return  request({
	   url: `${apiPrefix}/security/role/roleUser/${payload.roleId}/${payload.userIDs}`,
	   method: 'DELETE',
   })
}

export async function bindRoleUsers ({roleId,userIds}) {
    return  request({
	   url: `${apiPrefix}/security/role/roleUser/${roleId}`,
	   method: 'POST',
       data: userIds,
   })
}


export async function remove ({id}) {
	return  request({
	   url: `${apiPrefix}/security/role/deleteRoleAndPermsById/${id}`,
	   method: 'DELETE',
   })
}

export default role


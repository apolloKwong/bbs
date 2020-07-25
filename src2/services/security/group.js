import { rpc,request, apiPrefix  } from 'utils'

const group = rpc('security/group')
const user = rpc('security/user')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return group.listPage(page,pageSize,qs)
}

export async function get({id}) {
    return group.get(id)
}

export async function create (params) {
    return group.create(params);
}

export async function update (params) {
    return group.update(params);
}

export async function getGroupByGroupID ({id}) {
   return  request({
	   url: `${apiPrefix}/security/group/groupUser/${id}`,
	   method: 'get',
   })
}

export async function remove ({id}) {
	return  request({
	   url: `${apiPrefix}/security/group/single/${id}`,
	   method: 'DELETE',
   })
}

export async function getGroupUserByID({userIDs,userPage,userPageSize}) {
    let qs={};
    qs.Q_id_L_IN=[...userIDs];
    return user.listPage(userPage,userPageSize,qs)
}

export async function removeGroupUser ({groupId,userId}) {
	return  request({
	   url: `${apiPrefix}/security/group/groupUser/${groupId}/${userId}`,
	   method: 'DELETE',
   })
}

export async function getUnauthorizedUsers({userIDs,unauthorizedPage,unauthorizedPageSize,userfilter}) {
    if(typeof userfilter=="undefined"){
       let qs={};
       qs.Q_id_L_NI=[...userIDs];
       return user.listPage(unauthorizedPage,unauthorizedPageSize,qs)
    }else{
       userfilter.Q_id_L_NI=[...userIDs]; 
       return user.listPage(unauthorizedPage,unauthorizedPageSize,userfilter)
    }   
}

export async function insertGroupUsers ({groupId,userIds}) {
    return  request({
	   url: `${apiPrefix}/security/group/groupUser/${groupId}`,
	   method: 'POST',
       data: userIds,
   })
}

export default group
import { rpc,request, apiPrefix } from 'utils'

const workflowType = rpc('workflow/def')

export async function list(qs){
    return workflowType.list(qs)
}

export async function getUser(userId) {
   return  request({
	   url: `${apiPrefix}/security/user/single/${userId}`,
	   method: 'get',
   })
}

export async function getUsersByGroup(groupId) {
   return  request({
	   url: `${apiPrefix}/security/group/groupUser/${groupId}`,
	   method: 'get',
   })
}

export async function getUsers(userIds) {
   return  request({
	   url: `${apiPrefix}/security/user/batch/${userIds}`,
	   method: 'get',
   })
}


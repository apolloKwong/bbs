import { rpc,request, apiPrefix } from 'utils'

const workflow = rpc('workflow/def')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return workflow.listPage(page,pageSize,qs)
}
export async function list(qs){
    return workflow.list(qs)
}
export async function get({id}) {
    return workflow.get(id)
}
export async function showForm(procDefId) {
   return  request({
	   url: `${apiPrefix}/workflow/def/diagram/${procDefId}`,
	   method: 'get',
   })
}

export default workflow;


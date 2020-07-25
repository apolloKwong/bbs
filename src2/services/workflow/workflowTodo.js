import { rpc,request, apiPrefix } from 'utils'

const workflow = rpc('workflow/space/todo')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return workflow.listPage(page,pageSize,qs)
}

export async function get({id}) {
    return workflow.get(id)
}

export async function todoList({page,pageSize}) {
   return  request({
	   url: `${apiPrefix}/workflow/space/todo/list/${page}/${pageSize}`,
	   method: 'get',
   })
}



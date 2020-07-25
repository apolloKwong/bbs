import { rpc,request, apiPrefix } from 'utils'

const job = rpc('job')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return job.listPage(page,pageSize,qs)
}
export async function startJob({id}) {
    return  request({
	   url: `${apiPrefix}/job/resume/${id}`,
	   method: 'post',
   })
}
export async function stopJob({id}) {
   return  request({
	   url: `${apiPrefix}/job/pause/${id}`,
	   method: 'post',
   })
}

export default job


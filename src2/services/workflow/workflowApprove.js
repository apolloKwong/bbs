import { rpc,request, apiPrefix } from 'utils'

const approveForm = rpc('simple/wf/process/instances/')
const approveWfLog = rpc('simple/wf/process/log')

export async function getInstance({id}) {
   return  request({
	   url: `${apiPrefix}/simple/wf/process/inst/${id}`,
	   method: 'get',
   })
}
export async function list(qs){
    return approveWfLog.list(qs)
}
export default approveWfLog;


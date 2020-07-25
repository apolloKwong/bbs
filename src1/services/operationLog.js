import { rpc,request, apiPrefix  } from 'utils'

const operLog = rpc('security/action')

export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return operLog.listPage(page,pageSize,qs)
}

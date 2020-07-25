import { rpc,request, apiPrefix  } from 'utils'

export async function query() {
    return  request({
	   url: `${apiPrefix}/devops/service/all`,
	   method: 'get',
    })
}

export async function updatePermission(item){
    return  request({
	   url: `${apiPrefix}/devops/permission/sync/single/${item.serviceName}`,
	   method: 'get',
    })
}

export async function refreshCache(item){
    return  request({
	   url: `${apiPrefix}/devops/dev/refesh/cache/${item.serviceName}`,
	   method: 'get',
    })
}
import { rpc,request, apiPrefix } from 'utils'

const lookup = rpc('lookup')
export async function query({page = 1 , pageSize = 10 , ...qs}) {
    qs.Q_parentId_L_EQ="0";
    return lookup.listPage(page,pageSize,qs)
}
export async function remove(id){
    return lookup.remove(id);
}
export async function create(data){
    return lookup.create(data);
}
export async function update(data){
    return lookup.update(data);
}
export async function get({id}) {
    return lookup.get(id);
}
export async function list (groupCode) {
   return  request({
	   url: `${apiPrefix}/lookup/init/${groupCode}`,
	   method: 'get',
   })
}

export default lookup
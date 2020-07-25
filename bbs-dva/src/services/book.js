import { rpc,request, apiPrefix } from 'utils'

const wfBook = rpc('simple/book')

export async function get({id}) {
    return wfBook.get(id)
}
export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return wfBook.listPage(page,pageSize,qs)
}
export async function create(data){
    return wfBook.create(data);
}
export async function update(data){
    return wfBook.update(data);
}
export async function remove(id){
    return wfBook.remove(id);
}
export default wfBook;


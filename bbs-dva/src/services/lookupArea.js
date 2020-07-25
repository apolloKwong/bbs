import { rpc } from 'utils'

const singleLayerData = rpc('lookup')

export async function tree() {
    return singleLayerData.list()
}
export async function get({id}) {
    return singleLayerData.get(id)
}
export async function remove(id){
    return singleLayerData.remove(id);
}
export async function list(qs){
    return singleLayerData.list(qs)
}
export async function update(data){
    return singleLayerData.update(data);
}
export async function create(data){
    return singleLayerData.create(data);
}

export default singleLayerData
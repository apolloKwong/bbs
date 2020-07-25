import { rpc } from 'utils'

const i18n = rpc('i18n')
export async function query({page = 1 , pageSize = 10 , ...qs}) {
    return i18n.listPage(page,pageSize,qs)
}
export async function remove(id){
    return i18n.remove(id);
}
export async function create(data){
    return i18n.create(data);
}
export async function update(data){
    return i18n.update(data);
}
export async function getByLang(lang){
    return i18n.path('get',`init2/${lang}`);
}

export default i18n
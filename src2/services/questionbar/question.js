import { rpc, request, apiPrefix } from 'utils'

const question = rpc('bbs/question')

export async function query({ page = 1, pageSize = 10, ...qs }) {
    return question.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return question.get(id)
}


export async function create(params) {
    return question.create(params);
}

export async function update(params) {
    return question.update(params);
}

// export async function CorrespondingQuestion({ page = 1, pageSize = 10, ...qs }) {
//     return question.listPage(page, pageSize, qs)
// }
// export async function CorrespondingQuestion(classId){
//     return request({
//         url: `${apiPrefix}/bbs/question/getQuestionsByClassId/${classId}`,
//         method:'GET',
//     })
// }


// export async function remove ({ id }) {
//     return request({
//         url: `${apiPrefix}/bbs/question/single/${id}`,
//         method:'DELETE'
//     })
// }

// export async function getByUserId({userId}){
//      return request({
//         url: `${apiPrefix}/bbs/question/getByUserId/list/${userId}`,
//         method:'GET'
//     })
// }
// //改变文章状态
// export async function editPSById({id,postState}) {
//       return request({
//         url: `${apiPrefix}/bbs/question/editPSById/${id}/${postState}`,
//         method: 'PUT',
//     })
// }




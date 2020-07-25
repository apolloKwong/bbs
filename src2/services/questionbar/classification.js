import { rpc, request, apiPrefix } from 'utils'

const classification = rpc('bbs/classification')

export async function query({ page = 1, pageSize = 20, ...qs }) {
    return classification.listPage(page, pageSize, qs)
}

export async function get({ id }) {
    return classification.get(id)
}

export async function create(params) {
    return classification.create(params);
}

export async function CorrespondingQuestion({ page = 1, pageSize = 20, ...qs }) {
    return request({
            url: `${apiPrefix}/bbs/classification/getCorrespondingQuestions/list/${page}/${pageSize}`,
            method:'GET',
    })

}
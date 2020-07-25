import { request, config } from 'utils'

const { api } = config
const { dashboard } = api

export async function query (params) {
  return request({
    url: dashboard,
    method: 'get',
    data: params,
  })
}


const { APIV1 } = config

export async function weather (params) {
  params.key = 'i7sau1babuzwhycn'
  return request({
    url: `${APIV1}/weather/now.json`,
    method: 'get',
    data: params,
  })
}

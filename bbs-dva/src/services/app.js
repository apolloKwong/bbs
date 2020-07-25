import { request, config } from 'utils'

const { api } = config
const { authInfo, userLogout, userLogin, menus } = api

export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout (params) {
  return request({
    url: userLogout,
    method: 'post',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: authInfo,
    method: 'get',
    data: params,
  })
}

export async function menusQuery (params) {
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}


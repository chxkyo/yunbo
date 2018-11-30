import request from '@/utils/request'

export function getManufactorList(params) {
  return request({
    url: '/manufactor',
    method: 'get',
    params
  })
}
export function addManufactor(params) {
  return request({
    url: '/manufactor',
    method: 'post',
    data:params
  })
}
export function updateManufactor(params,id) {
  return request({
    url: '/manufactor/'+id,
    method: 'put',
    data:params
  })
}
export function deleteManufactor(id) {
  return request({
    url: '/manufactor/'+id,
    method: 'delete'
  })
}
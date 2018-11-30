import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}
export function updateList(params,uuid){
	return request({
    url: '/user/'+uuid,
    method: 'put',
    data:Object.assign({}, params)
  })
}
export function deleteList(uuid){
	return request({
    url: '/user/'+uuid,
    method: 'delete'
  })
}
import request from '@/utils/request'

export function getCameraAuhorityList(params) {
  return request({
    url: '/camera_users',
    method: 'get',
    params
  })
}
export function addCameraAuhority(params){
	return request({
    url: '/camera_users',
    method: 'post',
    data:params
  })
}
export function updateCameraAuhority(params,id){
	return request({
    url: '/camera_users/'+id,
    method: 'put',
    data:params
  })
}
export function deleteCameraAuhority(id){
	return request({
    url: '/camera_users/'+id,
    method: 'delete'
  })
}
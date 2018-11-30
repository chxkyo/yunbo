import request from '@/utils/request'

export function getCameraList(params) {
  return request({
    url: '/camera_devices',
    method: 'get',
    params
  })
}
export function addCamera(params){
	return request({
    url: '/camera_devices',
    method: 'post',
    data:params
  })
}
export function updateCamera(params,serial_number){
	return request({
    url: '/camera_devices/'+serial_number,
    method: 'put',
    data:params
  })
}
export function deleteCamera(serial_number){
	return request({
    url: '/camera_devices/'+serial_number,
    method: 'delete'
  })
}


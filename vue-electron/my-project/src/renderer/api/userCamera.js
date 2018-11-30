import request from '@/utils/request'
export function getCameraList(){
	return request({
	    url: '/user_cameras',
	    method: 'get'
    })
}
export function getCameraReplayList(params) {
  return request({
    url: '/user_cameras/replay',
    method: 'get',
    params
  })
}
import request from '@/utils/request'

export function login(email, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      "email":email,
      "password":password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/profile',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}



import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/controller/info',
    method: 'get',
    params: query
  })
}

export function getSwichList(query) {
  return request({
    url: '/device/info',
    method: 'get',
    params: query
  })
}

export function submitCamera(params) {
  return request({
    url: '/camera/add',
    method: 'POST',
    params
  })
}

export function cameraList(query) {
  return request({
    url: '/camera/info',
    method: 'get',
    params: query
  })
}

export function cameraEdit(params) {
  return request({
    url: '/camera/edit',
    method: 'put',
    params
  })
}

export function cameraDelete(params) {
  return request({
    url: '/camera/delete',
    method: 'delete',
    params
  })
}

export function getUserList(query) {
  return request({
    url: '/user/info',
    method: 'get',
    params: query
  })
}

export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    params
  })
}

export function editUser(params) {
  return request({
    url: '/user/edit',
    method: 'put',
    params
  })
}

export function userDelete(params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params
  })
}

export function permissionList(query) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: query
  })
}

export function getStaticData(params) {
  return request({
    url: '/dashboard/statistic',
    method: 'get',
    params
  })
}

export function getCamera(params) {
  return request({
    url: '/map/camera',
    method: 'get',
    params
  })
}


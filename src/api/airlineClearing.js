import request from '@/utils/request'

//航司清算
// 上传
export function uploadFile(file) {
  return request({
    url: '/airline/clear/importExcel',
    method: 'post',
    data: file
  })
}

//分页查询
export function getClearPage(params) {
  return request({
    url: '/airline/clear/page',
    method: 'get',
    params
  })
}

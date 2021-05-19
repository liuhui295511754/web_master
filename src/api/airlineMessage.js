import request from '@/utils/request'

//机号信息
// 查询
export function getMessagePage(params) {
  return request({
    url: '/airline/machine/page',
    method: 'get',
    params
  })
}
// 保存
export function messageSave(data) {
  return request({
    url: '/airline/machine/save',
    method: 'post',
    data
  })
}
//删除
  export function messageDelete(data) {
  return request({
    url: '/airline/machine/del',
    method: 'post',
    data
  })
}
//通过url查看附件
export function downloadByUrl(params) {
  return request({
    url: '/airline/machine/downloadByUrl',
    method: 'get',
    params
  })
}

//下载附件模板
export function downloadTmp() {
  return request({
    url: '/airline/machine/downloadTmp',
    method: 'get'
  })
}
//上传文件
export function uploadFile(data) {
  return request({
    url: '/airline/machine/importExcel',
    method: 'post',
    data
  })
}
// 详情
export function messageDetails(params) {
  return request({
    url: '/airline/machine/view',
    method: 'get',
    params
  })
}
// 查询航空公司
export function getAirline(params) {
  return request({
    url: '/airline/master/selectList',
    method: 'get',
    params
  })
}

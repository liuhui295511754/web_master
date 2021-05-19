import request from '@/utils/request'
// 分页
export function DataList(params) {
  return request({
    url: 'stored/move/page',
    method: 'get',
    params
  })
}
// 详情
export function Detail(params) {
  return request({
    url: 'stored/move/view',
    method: 'get',
    params
  })
}
// 保存
export function Save(data) {
  return request({
    url: 'stored/move/save',
    method: 'post',
    data
  })
}
// 删除
export function Delete(data) {
  return request({
    url: 'stored/move/del',
    method: 'post',
    data
  })
}

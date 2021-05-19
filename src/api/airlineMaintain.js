import request from '@/utils/request'

//航空公司维护主表
// 查询
export function getPage(params) {
  return request({
    url: '/airline/master/page',
    method: 'get',
    params
  })
}
// 保存
export function Save(data) {
  return request({
    url: '/airline/master/save',
    method: 'post',
    data
  })
}

//删除
export function Delete(data) {
  return request({
    url: '/airline/master/del',
    method: 'post',
    data
  })
}

// 详情
export function Details(params) {
  return request({
    url: '/airline/master/view',
    method: 'get',
    params
  })
}




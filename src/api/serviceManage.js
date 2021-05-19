import request from '@/utils/request'
// 服务管理

// 查询
export function serviceList(params) {
  return request({
    url: 'basics/service/page',
    method: 'get',
    params
  })
}
// 查询子服务
export function serviceItem(params) {
  return request({
    url: 'basics/basics_service/views',
    method: 'get',
    params
  })
}
// 保存
export function Save(data) {
  return request({
    url: 'basics/service/save',
    method: 'post',
    data
  })
}

// 详情
export function Detail(params) {
  return request({
    url: 'basics/service/view',
    method: 'get',
    params
  })
}

// 删除
export function Delete(data) {
  return request({
    url: 'basics/service/del',
    method: 'post',
    data
  })
}


// 客户类型
export function CustomerType() {
  return request({
    url: 'component/pubTable/list?tableName=zh_ct_customer',
    method: 'get',
  })
}

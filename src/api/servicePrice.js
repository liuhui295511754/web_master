import request from '@/utils/request'


// 查询
export function DataList(params) {
  return request({
    url: 'basics/price/page',
    method: 'get',
    params
  })
}

// 详情
export function Detail(params) {
  return request({
    url: 'basics/price/view',
    method: 'get',
    params
  })
}

// 保存
export function Save(data) {
  return request({
    url: 'basics/price/save',
    method: 'post',
    data
  })
}

// 删除
export function Delete(data) {
  return request({
    url: 'basics/price/del',
    method: 'post',
    data
  })
}
// 服务类型
export function serviceType() {
  return request({
    url: 'basics/service/listsp',
    method: 'get',
  })
}

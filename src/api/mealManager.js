import request from '@/utils/request'


// 查询
export function DataList(params) {
  return request({
    url: 'base/package/page',
    method: 'get',
    params
  })
}

// 详情
export function Detail(params) {
  return request({
    url: 'base/package/view',
    method: 'get',
    params
  })
}

// 保存
export function Save(data) {
  return request({
    url: 'base/package/save',
    method: 'post',
    data
  })
}

// 停用/启用套餐
export function Stop(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}



// 删除
export function Delete(data) {
  return request({
    url: 'base/package/del',
    method: 'post',
    data
  })
}

// 客户类型
export function serviceType(params) {
  return request({
    url: 'basics/service/list',
    method: 'get',
    params
  })
}

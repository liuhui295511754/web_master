import request from '@/utils/request'


// 查询
export function DataList(params) {
  return request({
    url: 'base/remind/page',
    method: 'get',
    params
  })
}

// 详情
export function Detail(params) {
  return request({
    url: 'base/remind/view',
    method: 'get',
    params
  })
}

// 保存
export function Save(data) {
  return request({
    url: 'base/remind/save',
    method: 'post',
    data
  })
}

// 删除
export function Delete(data) {
  return request({
    url: 'base/remind/del',
    method: 'post',
    data
  })
}

// 根据 录入位置分组 获取所有的 服务
export function listByAll() {
  return request({
    url: 'basics/service/listByAll',
    method: 'get',
  })
}

import request from '@/utils/request'
// 服务管理



// 查询
export function HallList(params) {
  return request({
    url: 'base/hall/page',
    method: 'get',
    params
  })
}

// 保存
export function Save(data) {
  return request({
    url: 'base/hall/save',
    method: 'post',
    data
  })
}
// 详情
export function Details(params) {
  return request({
    url: 'base/hall/view',
    method: 'get',
    params
  })
}

// 删除
export function Delete(data) {
  return request({
    url: 'base/hall/del ',
    method: 'post',
    data
  })
}


// 厅房下拉框
export function SelectList() {
  return request({
    url: 'base/hall/list',
    method: 'get',
  })
}

// 厅房区域下拉

export function HallRegion() {
  return request({
    url: 'base/room/list',
    method: 'get',
  })
}

// 

// 
import request from '@/utils/request'

//查询服务下拉
export function serviceList(params) {
  return request({
    url: '/basics/service/listsp',
    method: 'get',
    params
  })
}

// 两舱登记 查询
export function SearchPageOne(params) {
  return request({
    url: 'order/info/pageOne',
    method: 'get',
    params
  })
}

// 厅房服务 查询
export function SearchPageThree(params) {
  return request({
    url: 'order/info/pageThree',
    method: 'get',
    params
  })
}

// 接待登记 查询
export function SearchPageTwo(params) {
  return request({
    url: 'order/info/pageTwo',
    method: 'get',
    params
  })
}
// 保存
export function Save(data) {
  return request({
    url: 'order/info/save',
    method: 'post',
    data
  })
}

// 详情
export function Detail(params) {
  return request({
    url: 'order/info/view',
    method: 'get',
    params
  })
}

// 离舱
export function Leave(params) {
  return request({
    url: 'order/info/leave',
    method: 'get',
    params
  })
}


// 客户类型查询
export function customerTypeList(params) {
  return request({
    url: 'component/pubTable/list?tableName=zh_ct_customer',
    method: 'get',
    params
  })
}
// 根据 接待单位 结算类型 查询 客户类型
export function customerList(params) {
  return request({
    url: 'order/info/listGetReceptionUnit ',
    method: 'get',
    params
  })
}
// 接待单位 查询
export function unitType(params) {
  return request({
    url: 'order/info/listGetReception',
    method: 'get',
    params
  })
}
// 会员卡卡种查询
export function cardType(params) {
  return request({
    url: 'base/card/getList',
    method: 'get',
    params
  })
}

// 查询登机牌是否已存在
export function verification(data) {
  return request({
    url: 'order/info/verification',
    method: 'post',
    data
  })
}
// 预约记录
// 查询
export function reserveSearch(params) {
  return request({
    url: 'subscribe/info/page',
    method: 'get',
    params
  })
}
// 删除
export function reserveDelete(data) {
  return request({
    url: 'subscribe/info/del',
    method: 'post',
    data
  })
}
// 保存
export function reserveSave(data) {
  return request({
    url: 'subscribe/info/save',
    method: 'post',
    data
  })
}
// 接待登记

export function reserveUpdatState(params) {
  return request({
    url: 'subscribe/info/updatState',
    method: 'get',
    params
  })
}
// 详情
export function reserveDetail(params) {
  return request({
    url: 'subscribe/info/view',
    method: 'get',
    params
  })
}


// 厅房服务
// 调度
export function Dispatch(data) {
  return request({
    url: 'order/info/dispatch',
    method: 'post',
    data
  })
}

// 机号维护管理

// 获取航空公司下拉
export function airplaneList(params) {
  return request({
    url: 'airline/master/list',
    method: 'get',
  })
}

// 查询
export function airplaneData(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
// 删除
export function airplaneDelete(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
// 保存
export function airplaneSave(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
// 上传
export function airplaneUpload(data) {
  return request({
    url: 'rrule/info/execute',
    method: 'post',
    data
  })
}
// 详情
export function airplaneDetail(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}

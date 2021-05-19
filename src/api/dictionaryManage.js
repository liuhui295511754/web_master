import request from '@/utils/request'

//查询
export function dictionaryList(params) {
  return request({
    url: '/base/room/page',
    method: 'get',
    params
  })
}

// 删除
export function dictionaryDel(data) {
    return request({
      url: '/base/room/del',
      method: 'post',
      data
    })
  }


// 保存
export function dictionarySave(data) {
    return request({
      url: '/base/room/save',
      method: 'post',
      data
    })
  }

  //编辑
  export function dictionaryEdit(params) {
    return request({
      url: '/base/room/view',
      method: 'get',
      params
    })
  }

  //合同到期接口
  //分页查询
  export function dictionaryDateList(params) {
    return request({
      url: '/base/contract/page',
      method: 'get',
      params
    })
  }
  //删除
  export function dictionaryDateDel(data) {
    return request({
      url: '/base/contract/del',
      method: 'delete',
      data
    })
  }

   //编辑
   export function dictionaryDateEdit(params) {
    return request({
      url: '/base/contract/view',
      method: 'get',
      params
    })
  }

  // 保存
export function dictionaryDateSave(data) {
  return request({
    url: '/base/contract/save',
    method: 'post',
    data
  })
}

//调度任务类型
//分页查询
export function SchedulingList(params) {
  return request({
    url: '/base/scheduling/page',
    method: 'get',
    params
  })
}
//删除
export function SchedulingDel(data) {
  return request({
    url: '/base/scheduling/del',
    method: 'post',
    data
  })
}

 //编辑
 export function SchedulingEdit(params) {
  return request({
    url: '/base/scheduling/view',
    method: 'get',
    params
  })
}

// 保存
export function SchedulingSave(data) {
return request({
  url: '/base/scheduling/save',
  method: 'post',
  data
})
}

 //获取子表
 export function SchedulingSonList(params) {
  return request({
    url: '/basics/service/list',
    method: 'get',
    params
  })
}
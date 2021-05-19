import request from '@/utils/request'

//查询
export function businessBeforeList(params) {
  return request({
    url: '/contract/stored/page',
    method: 'get',
    params
  })
}

//保存
export function businessBeforeSave(data) {
    return request({
      url: '/contract/stored/save',
      method: 'post',
      data
    })
  }


//删除
export function businessBeforeDel(data) {
    return request({
      url: '/contract/stored/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function businessBeforeEdit(params) {
    return request({
      url: '/contract/stored/view',
      method: 'get',
      params
    })
  }


//合同延期
export function businessBeforeDelay(data) {
    return request({
      url: '/contract/stored/updatEndDate',
      method: 'post',
      data
    })
  }

//储值
export function businessStored(data) {
  return request({
    url: '/contract/stored/stored',
    method: 'post',
    data
  })
}

 //获取服务子表
 export function SchedulingSonList(params) {
    return request({
      url: '/basics/service/list',
      method: 'get',
      params
    })
  }

//获取厅房管理接口
export function hallList(params) {
  return request({
    url: '/base/hall/list',
    method: 'get',
    params
  })
}

//获取套餐管理接口
export function packageList(params) {
  return request({
    url: '/base/package/page',
    method: 'get',
    params
  })
}

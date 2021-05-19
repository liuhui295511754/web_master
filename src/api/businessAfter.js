import request from '@/utils/request'

//查询
export function businessAfterList(params) {
  return request({
    url: '/contract/bussiness/page',
    method: 'get',
    params
  })
}

//保存
export function businessAfterSave(data) {
    return request({
      url: '/contract/bussiness/save',
      method: 'post',
      data
    })
  }


//删除
export function businessAfterDel(data) {
    return request({
      url: '/contract/bussiness/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function businessAfterEdit(params) {
    return request({
      url: '/contract/bussiness/view',
      method: 'get',
      params
    })
  }


//合同延期
export function businessAfterDelay(data) {
    return request({
      url: '/contract/bussiness/updatEndDate',
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



    //获取服务价格接口
 export function hallList(params) {
    return request({
      url: '/basics/price/listByName',
      method: 'get',
      params
    })
  }

//   //获取结算类型接口
//  export function settlementList(params) {
//     return request({
//       url: '/airline/settlement/list',
//       method: 'get',
//       params
//     })
//   }


//获取代码表 客户名称
// export function pubTableList(params) {
//   return request({
//     url: '/component/pubTable/list',
//     method: 'get',
//     params
//   })
// }
// 根据 结算类型 查询 接待单位 （0 后结算 1 预储值）
export function receptionListType(params) {
  return request({
    url: '/reception/unit/listByType',
    method: 'get',
    params
  })
}

export function getReception(params) {
  return request({
    url: '/reception/unit/page',
    method: 'get',
    params
  })
}

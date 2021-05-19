import request from '@/utils/request'

//查询
export function airlinesList(params) {
  return request({
    url: '/contract/airline/page',
    method: 'get',
    params
  })
}

//保存
export function airlinesSave(data) {
    return request({
      url: '/contract/airline/save',
      method: 'post',
      data
    })
  }


//删除
export function airlinesDel(data) {
    return request({
      url: '/contract/airline/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function airlinesEdit(params) {
    return request({
      url: '/contract/airline/view',
      method: 'get',
      params
    })
  }

//航司合同汇总
export function airlineTotal(data) {
    return request({
      url: '/contract/airline/summary',
      method: 'post',
      data
    })
  }

//合同延期
export function contractDelay(data) {
    return request({
      url: '/contract/airline/updatEndDate',
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

  //获取结算类型接口
 export function settlementList(params) {
    return request({
      url: '/airline/settlement/list',
      method: 'get',
      params
    })
  }
    //获取航空公司接口
 export function airlineList(params) {
    return request({
      url: '/airline/master/listAll',
      method: 'get',
      params
    })
  }

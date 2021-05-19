import request from '@/utils/request'

//查询
export function settlementList(params) {
  return request({
    url: '/airline/settlement/page',
    method: 'get',
    params
  })
}

//保存
export function settlementSave(data) {
    return request({
      url: '/airline/settlement/save',
      method: 'post',
      data
    })
  }
  

//删除
export function settlementDel(data) {
    return request({
      url: '/airline/settlement/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function settlementEdit(params) {
    return request({
      url: '/airline/settlement/view',
      method: 'get',
      params
    })
  }
  
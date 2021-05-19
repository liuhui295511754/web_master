import request from '@/utils/request'

//查询
export function procurementList(params) {
  return request({
    url: '/contract/purchase/page',
    method: 'get',
    params
  })
}

//保存
export function procurementSave(data) {
    return request({
      url: '/contract/purchase/save',
      method: 'post',
      data
    })
  }
  

//删除
export function procurementDel(data) {
    return request({
      url: '/contract/purchase/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function procurementEdit(params) {
    return request({
      url: '/contract/purchase/view',
      method: 'get',
      params
    })
  }
  
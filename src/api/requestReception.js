import request from '@/utils/request'

//查询
export function receptionList(params) {
  return request({
    url: '/reception/unit/page',
    method: 'get',
    params
  })
}

//保存
export function receptionSave(data) {
    return request({
      url: '/reception/unit/save',
      method: 'post',
      data
    })
  }


//删除
export function receptionDel(data) {
    return request({
      url: '/reception/unit/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function receptionEdit(params) {
    return request({
      url: '/reception/unit/view',
      method: 'get',
      params
    })
  }

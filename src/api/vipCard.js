import request from '@/utils/request'

//查询
export function cardList(params) {
  return request({
    url: '/base/card/page',
    method: 'get',
    params
  })
}

//保存
export function cardSave(data) {
    return request({
      url: '/base/card/save',
      method: 'post',
      data
    })
  }
  

//删除
export function cardDel(data) {
    return request({
      url: '/base/card/del',
      method: 'post',
      data
    })
  }

  //编辑查询
  export function cardEdit(params) {
    return request({
      url: '/base/card/view',
      method: 'get',
      params
    })
  }
  
 //获取子表
 export function cardSonList(params) {
    return request({
      url: '/basics/service/list',
      method: 'get',
      params
    })
  }
  
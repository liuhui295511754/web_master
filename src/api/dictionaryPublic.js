import request from '@/utils/request'

//查询
export function publicList(params) {
  return request({
    url: '/component/pubTable/page',
    method: 'get',
    params
  })
}

//保存
export function publicSave(data) {
    return request({
      url: '/component/pubTable/save',
      method: 'post',
      data
    })
  }
  

//删除
export function publicDel(data) {
    return request({
      url: '/component/pubTable/del',
      method: 'post',
      data
    })
  }

  //编辑查询
 export function publicEdit(params) {
    return request({
      url: '/component/pubTable/view',
      method: 'get',
      params
    })
  }
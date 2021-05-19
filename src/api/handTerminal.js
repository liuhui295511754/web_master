import request from '@/utils/request'

//分页查询
export function terminalList(params) {
  return request({
    url: '/base/terminal/page',
    method: 'get',
    params
  })
}



//保存
export function terminalSave(data) {
    return request({
      url: '/base/terminal/save',
      method: 'post',
      data
    })
  }

//删除
export function terminalDel(data) {
  return request({
    url: '/base/terminal/del',
    method: 'post',
    data
  })
}



//id查询
export function terminalEdit(params) {
  return request({
    url: '/base/terminal/view',
    method: 'get',
    params
  })
}
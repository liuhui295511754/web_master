import request from '@/utils/request'

//查询
export function getBusinessTotalList(data) {
  return request({
    url: '/contract/bussiness/tradeCaravanHz',
    method: 'post',
    data
  })
}

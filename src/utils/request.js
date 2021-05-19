import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, //跨域请求时发送Cookie
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 上传配置请求头
    if (config.url == 'number/info/upload') {
      config.headers = {
        'Content-Type': 'multipart/form-data'
      }
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 处理错误请求
    console.log(error) // for debug
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('timeout请求超时')
    }
    // 需要重定向到错误页面
    const errorInfo = error.response
    if (errorInfo && errorInfo.status == '401' || errorInfo.status == '404') {
      error = errorInfo.data // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      // 401 404
      router.push({
        path: `/error/${errorStatus}`
      })
    }
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  //   response => {
  //     const res = response.data
  //     //如果自定义代码不是200，则判断为错误。.
  //     if (res.code !== 200) {
  //       Message({
  //         message: res.message || 'Error',
  //         type: 'error',
  //         duration: 5 * 1000
  //       })

  //     //   50008:非法token;
  //     //   50012:已登录的其他客户;
  //     //   50014:令牌过期;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         // 重新登录
  //         MessageBox.confirm('您已经退出登录, 您可以取消以留在本页面，或重新登录', '确认退出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('user/resetToken').then(() => {
  //             location.reload()
  //           })
  //         })
  //       }
  //       return Promise.reject(new Error(res.message || 'Error'))
  //     } else {
  //       return res
  //     }
  //   },
  response => {
    if (response.status === 200) {
      return response.data;
    } else if (response.status == 404) {
      Message.error('请求的资源未找到,请稍后重试');
      return Promise.reject(new Error(res.message || 'Error'))
    } else if (response.status == 500) {
      Message.error('请求服务器失败');
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      Promise.reject();
    }
  },
  error => {
    console.log('err' + error) // for debug
    // 返回错误处理
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error) // 返回接口返回的错误信息
  }
)

export default service

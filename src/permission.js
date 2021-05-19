import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'

import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 设置网页标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      //已登录
      next({
        path: '/'
      })
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          //删除token，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          //   next(`/login?redirect=${to.path}`)
          next()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      //   next(`/login?redirect=${to.path}`)
      next()
    }
  }
})

router.afterEach(() => {})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '首页',
        icon: 'dashboard'
      }
    }]
  },
  {
    path: '/serverCenter',
    component: Layout,
    redirect: '/serverCenter',
    name: '服务中心',
    meta: {
      title: '服务中心',
      icon: 'el-icon-menu'
    },
    children: [{
        path: 'cabin',
        name: 'cabin',
        component: () => import('@/views/serverCenter/cabin'),
        meta: {
          title: '两舱服务'
        }
      },
      {
        path: 'regist',
        name: 'regist',
        component: () => import('@/views/serverCenter/regist'),
        meta: {
          title: '接待登记'
        }
      },
      {
        path: 'hall',
        name: 'hall',
        component: () => import('@/views/serverCenter/hall'),
        meta: {
          title: '厅房服务'
        }
      },
      {
        path: 'reserve',
        name: 'reserve',
        component: () => import('@/views/serverCenter/reserve'),
        meta: {
          title: '预约记录'
        }
      },
      {
        path: 'reserveHistory',
        name: 'reserveHistory',
        component: () => import('@/views/serverCenter/reserveHistory'),
        meta: {
          title: '预约历史'
        }
      },
      {
        path: 'recording',
        name: 'recording',
        component: () => import('@/views/serverCenter/recording'),
        meta: {
          title: '记录复核'
        }
      },
      {
        path: 'airplaneManager',
        name: 'airplaneManager',
        component: () => import('@/views/serverCenter/airplaneManager'),
        meta: {
          title: '机号维护管理'
        }
      }
    ]
  },
  {
    path: '/dispatchCenter',
    component: Layout,
    redirect: '/dispatchCenter',
    name: '调度中心',
    meta: {
      title: '调度中心',
      icon: 'el-icon-sort'
    },
    children: [{
        path: 'operatingStatus',
        name: 'operatingStatus',
        component: () => import('@/views/dispatchCenter/operatingStatus'),
        meta: {
          title: '运行状态'
        }
      },
      {
        path: 'reserveRecording',
        name: 'reserveRecording',
        component: () => import('@/views/dispatchCenter/reserveRecording'),
        meta: {
          title: '全流程预约记录'
        }
      },
      {
        path: 'staffScheduling',
        name: 'staffScheduling',
        component: () => import('@/views/dispatchCenter/staffScheduling'),
        meta: {
          title: '人员排班'
        }
      },
      {
        path: 'scheduleHistory',
        name: 'scheduleHistory',
        component: () => import('@/views/dispatchCenter/scheduleHistory'),
        meta: {
          title: '历史排班记录'
        }
      },
      {
        path: 'dispatchRecording',
        name: 'dispatchRecording',
        component: () => import('@/views/dispatchCenter/dispatchRecording'),
        meta: {
          title: '调度任务记录'
        }
      },
      {
        path: 'vipRecording',
        name: 'vipRecording',
        component: () => import('@/views/dispatchCenter/vipRecording'),
        meta: {
          title: '贵宾保障记录'
        }
      },
      {
        path: 'template',
        name: 'template',
        component: () => import('@/views/dispatchCenter/template'),
        meta: {
          title: '模板管理'
        }
      },
    ]
  },
  {
    path: '/contractCenter',
    component: Layout,
    redirect: '/contractCenter',
    name: '合同管理',
    meta: {
      title: '合同管理',
      icon: 'el-icon-s-order'
    },
    children: [{
        path: 'airlines',
        name: 'airlines',
        component: () => import('@/views/contractCenter/airlines'),
        meta: {
          title: '航司合同'
        }
      },
      {
        path: 'businessAfter',
        name: 'businessAfter',
        component: () => import('@/views/contractCenter/businessAfter'),
        meta: {
          title: '商旅合同（后结算）'
        }
      },
      {
        path: 'businessSave',
        name: 'businessSave',
        component: () => import('@/views/contractCenter/businessSave'),
        meta: {
          title: '商旅合同（预储值）'
        }
      },
      {
        path: 'special',
        name: 'special',
        component: () => import('@/views/contractCenter/special'),
        meta: {
          title: '特殊合同'
        }
      },
      {
        path: 'procurement',
        name: 'procurement',
        component: () => import('@/views/contractCenter/procurement'),
        meta: {
          title: '采购合同'
        }
      },
      {
        path: 'businessTotal',
        name: 'businessTotal',
        component: () => import('@/views/contractCenter/businessTotal'),
        meta: {
          title: '商务合同汇总'
        }
      },
      {
        path: 'airlineTotal',
        name: 'airlineTotal',
        component: () => import('@/views/contractCenter/airlineTotal'),
        meta: {
          title: '航司合同汇总'
        }
      }
    ]
  },
  {
    path: '/settlement',
    component: Layout,
    redirect: '/settlement',
    name: '结算中心',
    meta: {
      title: '结算中心',
      icon: 'el-icon-s-data'
    },
    children: [{
        path: 'financeReview',
        name: 'financeReview',
        component: () => import('@/views/settlement/financeReview'),
        meta: {
          title: '财务审核'
        }
      },
      {
        path: 'savingWater',
        name: 'savingWater',
        component: () => import('@/views/settlement/savingWater'),
        meta: {
          title: '预储值流水'
        }
      }
    ]
  },
  {
    path: '/report',
    component: Layout,
    redirect: '/report',
    name: '财务报表',
    meta: {
      title: '财务报表',
      icon: 'el-icon-s-marketing'
    },
    children: [{
        path: 'businessServinceExcel',
        name: 'businessServinceExcel',
        component: () => import('@/views/report/businessServinceExcel'),
        meta: {
          title: '商旅客户服务明细表'
        }
      },
      {
        path: 'businessCostMoneyExcel',
        name: 'businessCostMoneyExcel',
        component: () => import('@/views/report/businessCostMoneyExcel'),
        meta: {
          title: '商旅客户费用汇总表'
        }
      },
      {
        path: 'businessTotalClearExcel',
        name: 'businessTotalClearExcel',
        component: () => import('@/views/report/businessTotalClearExcel'),
        meta: {
          title: '商旅公司结算单'
        }
      },
      {
        path: 'PPcardPeopleExcel',
        name: 'PPcardPeopleExcel',
        component: () => import('@/views/report/PPcardPeopleExcel'),
        meta: {
          title: 'PP卡人数汇总'
        }
      },
      {
        path: 'firstClassExcel',
        name: 'firstClassExcel',
        component: () => import('@/views/report/firstClassTotalExcel'),
        meta: {
          title: '头等舱汇总表'
        }
      },
      {
        path: 'PPcardTotalExcel',
        name: 'PPcardTotalExcel',
        component: () => import('@/views/report/PPcardTotalExcel'),
        meta: {
          title: 'PP卡使用头等舱登记表'
        }
      },
      {
        path: 'firstClassTotalExcel',
        name: 'firstClassTotalExcel',
        component: () => import('@/views/report/firstClassTotalExcel'),
        meta: {
          title: '头等舱旅客使用登记表'
        }
      },
      {
        path: 'firstClassIncomeExcel',
        name: 'firstClassIncomeExcel',
        component: () => import('@/views/report/firstClassIncomeExcel'),
        meta: {
          title: '头等舱收入汇总表'
        }
      },
      {
        path: 'twoTankCustomerExcel',
        name: 'twoTankCustomerExcel',
        component: () => import('@/views/report/twoTankCustomerExcel'),
        meta: {
          title: '两舱航司客户账单'
        }
      },
      {
        path: 'airlinesClearExcel',
        name: 'airlinesClearExcel',
        component: () => import('@/views/report/airlinesClearExcel'),
        meta: {
          title: '航司清算报表'
        }
      }
    ]
  },
  {
    path: '/vip',
    component: Layout,
    redirect: '/vip',
    name: '会员中心',
    meta: {
      title: '会员中心',
      icon: 'el-icon-s-custom'
    },
    children: [{
        path: 'customerInfo',
        name: 'customerInfo',
        component: () => import('@/views/vip/customerInfo'),
        meta: {
          title: '会员信息'
        }
      },
      {
        path: '401',
        name: '401',
        component: () => import('@/views/401.vue'),
        meta: {
          title: '401页面'
        }
      },
      {
        path: '404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
          title: '404页面'
        }
      },
    ]
  },
  {
    path: '/assetsCenter',
    component: Layout,
    redirect: '/assetsCenter',
    name: '资产中心',
    meta: {
      title: '资产中心',
      icon: 'el-icon-coin'
    },
    children: [{
        path: 'stock',
        name: 'stock',
        component: () => import('@/views/assetsCenter/stock'),
        meta: {
          title: '物料库存'
        }
      },
      {
        path: 'stockManager',
        name: 'stockManager',
        component: () => import('@/views/assetsCenter/stockManager'),
        meta: {
          title: '物资管理'
        }
      },
      {
        path: 'library',
        name: 'library',
        component: () => import('@/views/assetsCenter/library'),
        meta: {
          title: '出入库记录'
        }
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/assetsCenter/report'),
        meta: {
          title: '库存盘点报表'
        }
      },
      {
        path: 'assets',
        name: 'assets',
        component: () => import('@/views/assetsCenter/assets'),
        meta: {
          title: '固定资产'
        }
      },

    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    name: '基础设置',
    meta: {
      title: '基础设置',
      icon: 'el-icon-setting'
    },
    children: [{
        path: 'terminal',
        name: 'terminal',
        component: () => import('@/views/system/terminal'),
        meta: {
          title: '手持终端'
        }
      },
      {
        path: 'dictionary',
        name: 'dictionary',
        component: () => import('@/views/system/dictionary'),
        meta: {
          title: '字典管理'
        }
      },
      {
        path: 'servicePrice',
        name: 'servicePrice',
        component: () => import('@/views/system/servicePrice'),
        meta: {
          title: '服务价格'
        }
      },
      {
        path: 'mealManager',
        name: 'mealManager',
        component: () => import('@/views/system/mealManager'),
        meta: {
          title: '套餐管理'
        }
      },
      {
        path: 'settleType',
        name: 'settleType',
        component: () => import('@/views/system/settleType'),
        meta: {
          title: '结算类型'
        }
      },
      {
        path: 'airplaneInfo',
        name: 'airlineCompanyManger',
        component: () => import('@/views/system/airplaneInfo'),
        meta: {
          title: '航司管理'
        }
      },
      {
        path: 'receptionUnit',
        name: 'receptionUnit',
        component: () => import('@/views/system/receptionUnit'),
        meta: {
          title: '接待单位'
        }
      },
      {
        path: 'toastManger',
        name: 'toastManger',
        component: () => import('@/views/system/toastManger'),
        meta: {
          title: '通知预警管理'
        }
      },
      {
        path: 'serviceManger',
        name: 'serviceManger',
        component: () => import('@/views/system/serviceManger'),
        meta: {
          title: '服务管理'
        }
      },
      {
        path: 'hallManager',
        name: 'hallManager',
        component: () => import('@/views/system/hallManager'),
        meta: {
          title: '厅房管理'
        }
      },
      {
        path: 'vipManager',
        name: 'vipManager',
        component: () => import('@/views/system/vipManager'),
        meta: {
          title: '会员卡卡种管理'
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission',
    name: 'permission',
    meta: {
      title: '权限设置',
      icon: 'el-icon-menu'
    },
    children: [{
        path: 'role',
        name: 'role',
        component: () => import('@/views/permission/role'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/permission/account'),
        meta: {
          title: '用户账号'
        }
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('@/views/permission/password'),
        meta: {
          title: '修改密码'
        }
      },
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

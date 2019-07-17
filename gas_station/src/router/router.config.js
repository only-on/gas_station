// 路由配置
const router = [
  {
    path: '/home',
    component: resolve => require(['../pages/home.vue'], resolve),
    children: [
      {
        path: '/oil_nozzle',
        name: 'oil_nozzle',
        component: resolve => require(['../view/oilGun/index.vue'], resolve)
      },
      {
        path: '/oil_tank',
        name: 'oil_tank',
        component: resolve => require(['../view/oilTank/index.vue'], resolve)
      },
      {
        path: '/alarm_index',
        name: 'alarm_index',
        component: resolve => require(['../view/alarm/index.vue'], resolve)
      },
      {
        path: '/oliGas_index',
        name: 'oliGas_index',
        component: resolve => require(['../view/oliGasConcent/index.vue'], resolve)
      },
      {
        path: '/press_index',
        name: 'press_index',
        component: resolve => require(['../view/pressDates/index.vue'], resolve)
      },
      {
        path: '/fluid_resistance_index',
        name: 'fluid_resistance_index',
        component: resolve => require(['../view/fluidResistance/index.vue'], resolve)
      },
      {
        path: '/nozzle_index',
        name: 'nozzle_index',
        component: resolve => require(['../view/nozzleDates/index.vue'], resolve)
      },
      {
        path: '/user_index',
        name: 'user_index',
        component: resolve => require(['../view/user/index.vue'], resolve)
      },
      {
        path: '/user_creat',
        name: 'user/creat',
        component: resolve => require(['../view/user/creat.vue'], resolve)
      },
      {
        path: '/user_edit',
        name: 'user/edit',
        component: resolve => require(['../view/user/edit.vue'], resolve)
      },
      {
        path: '/user_details',
        name: 'user/details',
        component: resolve => require(['../view/user/detail.vue'], resolve)
      },
      {
        path: '/tank_analyse',
        name: 'tank_analyse',
        component: resolve => require(['../view/tankAnalyse/index.vue'], resolve)
      },
      {
        path: '/environment_analyse',
        name: 'environment_analyse',
        component: resolve => require(['../view/environmentAnalyse/index.vue'], resolve)
      },
      {
        path: '/gun_data',
        name: 'gun_data',
        component: resolve => require(['../view/statisticalAnaly/gunData.vue'], resolve)
      },
      {
        path: '/alarm_data',
        name: 'alarm_data',
        component: resolve => require(['../view/statisticalAnaly/alarmData.vue'], resolve)
      },
      {
        path: '/videos_index',
        name: 'videos_index',
        component: resolve => require(['../view/videos/index.vue'], resolve)
      },
    ]
  },
  {
    path: '/station',
    name: 'station',
    component: resolve => require(['../pages/stations.vue'], resolve)
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: resolve => require(['../view/monitor/index.vue'], resolve)
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['../pages/login.vue'], resolve)
  }
]

export default router

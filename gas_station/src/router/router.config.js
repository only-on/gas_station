// 路由配置
const router = [
  {
    path: '/home',
    component: resolve => require(['../pages/home.vue'], resolve),
    children: [
      {
        path: '/oil_gun',
        name: 'oil_gun',
        component: resolve => require(['../view/oilGun/index.vue'], resolve)
      }
    ]
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

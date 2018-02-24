import ProjectRoutes from './projects/routes'
import TemplateRoutes from './templates/routes'
import SystemRoutes from './system/routes'
import RbacRoutes from './rbac/routes'

// 一些杂项路由
const baseRoutes = [
  { path: '/', name: 'index', meta: {accessType: 'guest'}, redirect: '/projects' },
  { path: '/error', name: 'error', meta: {accessType: 'guest'}, component: () => import('./Error.vue') },
  { path: '/test', name: 'test', meta: {accessType: 'guest'}, component: () => import('./Test.vue') },
  { path: '/login', name: 'login', meta: {accessType: 'guest'}, component: () => import('./Login.vue') },
  { path: '/xlogin', name: 'xlogin', component: () => import('./XLogin.vue') },
  { path: '/timesheet', name: 'timesheet', component: () => import('./Timesheet.vue') }
]

// 模块路由，存放于store里用于顶部menu
const moduleRoutes = [
  ProjectRoutes,
  TemplateRoutes,
  SystemRoutes,
  RbacRoutes,
]

// 所有的public路由
const PublicRoutes = [
  ...baseRoutes,
  ...moduleRoutes
]

export { moduleRoutes, PublicRoutes }

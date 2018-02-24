export default {
  title: '系统管理',
  path: '/system',
  name: 'system',
  redirect: '/system/config',
  component: () => import('@/view/layout/Layout.vue'),
  children: [
    { title: '配置管理', path: 'config', name: 'system-config', icon: 'ios-copy', component: () => import('./Config.vue') },
    // { title: '新建模板', path: 'new', name: 'templates-new', icon: 'ios-color-wand', component: () => import('./New.vue') },
    // { title: '修改模板', path: 'edit/:id', name: 'templates-edit', icon: 'ios-compose', meta: { hidden: true }, component: () => import('./New.vue') },
  ]
}

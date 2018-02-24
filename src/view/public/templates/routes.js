export default {
  title: '模板管理',
  path: '/templates',
  name: 'templates',
  redirect: '/templates/list',
  component: () => import('@/view/layout/Layout.vue'),
  children: [
    { title: '所有模板', path: 'list', name: 'templates-list', icon: 'ios-copy', component: () => import('./List.vue') },
    { title: '新建模板', path: 'new', name: 'templates-new', icon: 'ios-color-wand', component: () => import('./New.vue') },
    { title: '修改模板', path: 'edit/:id', name: 'templates-edit', icon: 'ios-compose', meta: { hidden: true }, component: () => import('./New.vue') },
  ]
}

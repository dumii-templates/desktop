export default {
  title: '用户管理',
  path: '/rbac',
  name: 'rbac',
  redirect: '/rbac/users',
  component: () => import('@/view/layout/Layout.vue'),
  children: [
    { title: '所有用户', path: 'users', name: 'rbac-users', icon: 'person-stalker', component: () => import('./Users.vue') },
    // { title: '新建模板', path: 'new', name: 'templates-new', icon: 'ios-color-wand', component: () => import('./New.vue') },
    // { title: '修改模板', path: 'edit/:id', name: 'templates-edit', icon: 'ios-compose', meta: { hidden: true }, component: () => import('./New.vue') },
  ]
}

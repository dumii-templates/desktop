export default {
  title: '项目管理',
  path: '/projects',
  name: 'projects',
  redirect: '/projects/list',
  component: () => import('@/view/layout/Layout.vue'),
  children: [
    { title: '所有项目', path: 'list', name: 'projects-list', icon: 'ios-copy', component: () => import('./List.vue') },
    { title: '新建项目', path: 'new', name: 'projects-new', icon: 'ios-color-wand', component: () => import('./New.vue') },
    { title: '项目详情', path: ':id', name: 'projects-detail', icon: 'ios-eye', meta: { hidden: true }, component: () => import('./Detail.vue') },
  ]
}

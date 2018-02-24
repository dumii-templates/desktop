import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/utils/auth'

import { PublicRoutes } from '@/view/public/routes'
import AdminRoutes from '@/view/admin/routes'

Vue.use(Router)

const router = new Router({
  routes: [
    ...PublicRoutes,
    ...AdminRoutes,
  ]
})

router.beforeEach((to, from, next) => {
  Auth.requireAuth(to, from, next)
})

export default router

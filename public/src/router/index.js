import Vue from 'vue'
import Router from 'vue-router'

// Components
import Landing from '@/components/Landing'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router

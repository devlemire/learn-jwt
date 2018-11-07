import Vue from 'vue'
import Router from 'vue-router'

// Components
import Landing from '@/components/Landing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    }
  ]
})

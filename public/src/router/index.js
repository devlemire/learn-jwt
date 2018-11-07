import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import api from '@/api'
import axios from 'axios'

// Components
import Landing from '@/components/Landing'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
      meta: {
        requires_auth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requires_auth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requires_auth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requires_auth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = store.getters.user

  if (to.meta.requires_auth) {
    if (user === undefined) {
      try {
        const { data: user } = await axios.get(api.user.me)
        store.commit('setUser', user)
        return next()
      } catch (err) {
        if (!err.response || err.response.status !== 403) {
          console.log(
            'beforeEach failed in router when attempting to fetch the user:',
            err
          )
        }

        return next('/')
      }
    }

    return next()
  }

  return next()
})

export default router

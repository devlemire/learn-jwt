<template>
  <section id="login-container" class="black-page v-h-center-page">
    <div class="card">
      <p>Login</p>
      <form @submit.prevent="login">
        <input v-model="username" name="username" type="text" placeholder="Username" required />
        <input v-model="password" name="password" type="password" placeholder="Password" required />

        <button class="button-blue">Login</button>
        <router-link to="/">
          Cancel
        </router-link>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import api from '@/api'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const { username, password } = this

        await axios.post(api.user.login, { username, password })
        this.$router.push('/dashboard')
      } catch (err) {
        if (err.response && err.response.status === 406) {
          this.$toasted.error(err.response.data.message)
        }

        console.error('login failed in Login.vue:', err)
      }
    }
  }
}
</script>

<style scoped>
p {
  margin-top: 0px;
}

input {
  margin-bottom: 16px;
}

a {
  color: var(--black);
  margin-left: 8px;
}
</style>

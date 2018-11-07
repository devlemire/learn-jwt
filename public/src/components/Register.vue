<template>
  <section id="register-container" class="black-page v-h-center-page">
    <div class="card">
      <p>Register</p>

      <form @submit.prevent="register">
        <input v-model="user.first_name" name="fname" placeholder="First Name" type="text" required />
        <input v-model="user.last_name" name="lname" placeholder="Last Name" type="text" required />
        <input v-model="user.username" name="username" placeholder="Username" type="text" required />
        <input v-model="user.password" name="password" placeholder="Password" type="password" required />
        <input v-model="user.confirm_password" name="password" placeholder="Confirm Password" type="password" required />

        <div id="actions">
          <button class="button-blue" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import api from '@/api'
import axios from 'axios'

export default {
  data() {
    return {
      user: {
        first_name: 'Test',
        last_name: 'McGee',
        username: 'testmcgee',
        password: 'test',
        confirm_password: 'test'
      }
    }
  },
  methods: {
    async register() {
      try {
        const { data: user } = await axios.post(api.user.register, this.user)
        this.$store.commit('setUser', user)
        this.$router.push('/dashboard?registration=success')
      } catch (err) {
        console.error('register failed in Register.vue:', err.response || err)

        if (err.response.status === 406) {
          this.$toasted.error(err.response.data.message)
        } else if (err.response.status === 500 || err.response.status === 504) {
          this.$toasted.error(
            'Sorry! We could not register you at this time. Please try again later.'
          )
        }
      }
    }
  }
}
</script>

<style scoped>
input {
  margin-bottom: 16px;
}
</style>

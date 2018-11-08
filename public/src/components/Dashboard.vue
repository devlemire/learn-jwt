<template>
  <section id="dashboard-container">
    <p>You are authed!</p>
    <a :href="logoutUrl">
      <button class="button-blue">Logout</button>
    </a>
  </section>
</template>

<script>
import axios from 'axios'
import api from '@/api'

export default {
  created() {
    if (this.$route.query.registration === 'success') {
      this.$toasted.success('Thanks for registering!')
    }
  },
  data() {
    return {
      logoutUrl: api.user.logout
    }
  }
}
</script>

<style scoped>
</style>



<template>
  <section class="landing-container">
    <h1>Hello world</h1>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.testApi()
  },
  methods: {
    testApi() {
      axios
        .get('/api/user/me')
        .then(r => {
          console.log('hit', r)
        })
        .catch(err => {
          console.error('not authenticated')
        })
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <section id="dashboard-container">
    <p>You are authed!</p>
  </section>
</template>

<script>
export default {
  created() {
    console.log('test')
    if (this.$route.query.registration === 'success') {
      this.$toasted.success('Thanks for registering!')
    }
  }
}
</script>

<style scoped>
</style>



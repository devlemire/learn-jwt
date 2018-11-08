<template>
  <section id="landing-container" class="black-page v-h-center-page">
    <div class="card">
      <p>JWT Auth Example</p>

      <section id="landing-actions">
        <button @click="$router.push('/login')">Login</button>
        <button @click="$router.push('/register')">Register</button>
      </section>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  created() {
    this.checkForUser()
  },
  methods: {
    async checkForUser() {
      if (this.$store.getters.user === undefined) {
        try {
          const { data: user } = await axios.get('/api/user/me')
          this.$store.commit('setUser', user)
          this.$router.push('/dashboard')
        } catch (err) {}
      } else {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style scoped>
#landing-actions {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

button:not(:last-child) {
  margin-right: 16px;
}

p {
  margin-top: 0px;
}

button {
  background-color: var(--blue);
  color: var(--white);
  border: none;
  padding: 8px 16px;
  border-radius: 3px;
}
</style>

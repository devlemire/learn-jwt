<template>
  <section id="landing-container">
    <div id="landing-card">
      <p>JWT Auth Example</p>
      <button>Login</button>
      <button>Register</button>
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
#landing-container {
  width: 100%;
  min-height: 100vh;
  background-color: var(--black);
  padding: 24px;

  display: flex;
  justify-content: center;
  align-items: center;
}

#landing-card {
  width: 300px;
  padding: 24px;
  background-color: var(--white);
}

button:not(:last-child) {
  margin-right: 24px;
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

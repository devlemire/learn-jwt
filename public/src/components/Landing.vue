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

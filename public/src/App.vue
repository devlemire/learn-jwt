<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

:root {
  --black: #252525;
  --dark-black: #181818;
  --white: #fff;
  --light-grey: #f2f2f2;
  --grey: #cccccc;
  --dark-grey: #555555;
  --blue: #2aabe2;
  --dark-blue: #0473a3;
  --green: #07af41;
  --red: #cb2331;
  --box-shadow-small: 0 3px 6px 1px rgba(51, 51, 51, 0.14);
}

.black-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--black);
  color: var(--white);
  padding: 24px;
}

.v-h-center-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  width: 300px;
  padding: 24px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 5px;
}

input {
  border: 1px solid var(--blue);
  color: var(--black);
  padding: 8px 16px;
  border-radius: 3px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.button-blue {
  background-color: var(--blue);
  color: var(--white);
}

.Toasted {
  font-size: 50px;
  padding: 8px 16px;
}

/* Use important to ignore Vue Toasted styles */
.success {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: var(--blue) !important;
  font-size: 24px !important;
  padding: 8px 16px !important;
}

.error {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background-color: var(--red) !important;
  font-size: 24px !important;
  padding: 8px 16px !important;
}
</style>

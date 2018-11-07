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
  --box-shadow-small: 0 3px 6px 1px rgba(51, 51, 51, 0.14);
}
</style>

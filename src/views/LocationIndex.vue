<template>
  <div class="location-index">
    <div class="reference">This will be the index of locations. It is comparable to <a href="https://libraries.mit.edu/barker/">https://libraries.mit.edu/barker/</a>.</div>
    <h1>Library locations</h1>
    <ul>
      <li><router-link to="/location/barker">Barker library</router-link></li>
      <li><router-link to="/location/dewey">Dewey library</router-link></li>
      <li><router-link to="/location/rotch">Rotch library</router-link></li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LocationIndex',
  components: {
  }
}
</script>

<style scoped>
</style>

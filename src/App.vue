<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><img alt="MIT Libraries" src="@/assets/logo.png"></li>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/grid">Grid</router-link></li>
        <li><router-link to="/study">Study spaces</router-link></li>
        <li><router-link to="/location">Locations</router-link></li>
        <li><router-link to="/department">Department page</router-link></li>
        <li><router-link to="/data">Source data</router-link></li>
      </ul>
    </div>
    <div class="status">Current status: {{ store.state.status }}<br>
      Current date: {{ store.state.currentDate }}<br>
      Current semester: {{ store.state.currentTerm }}<br>
      Debugging: {{ store.debug }}<br>
      Data length: {{ store.state.data.length }}
    </div>
    <p>Welcome to the Vue Hours application. This is an attempt to replicate the code responsible for displaying library hours across libraries.mit.edu. The code for this application can be found at <a href="https://github.com/matt-bernhardt/vue-hours">https://github.com/matt-bernhardt/vue-hours</a>.</p>
    <router-view/>
    <footer class="footer-outer">
      <div id="footer-inner">
        This would be the footer.
      </div>
    </footer>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'App',
  data () {
    return {
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting App')
  }
}
</script>

<style lang="scss">
body {
  background: #fafafa;
}

footer {
  background: #eaeaea;
  margin: 1rem -1rem -1rem -1rem;
}

#app {
  background: #fff;
  border: 1px solid #eaeaea;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

#nav {
  margin: 0 0 1rem 0;

  ul {
    list-style-type: none;
    margin: 0 0 1rem 0;
    padding: 0;

    li {
      display: inline-block;
      margin-right: 0.5rem;
      padding-right: 0.5rem;
      border-right: 1px solid black;

      &:last-child {
        border-right: none;
      }
    }
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.reference {
  background: #fff6cd;
  border: 1px solid #ffe56a;
  padding: 0.5rem;
  margin: auto -0.5rem;
}

#footer-inner {
  padding: 1rem;
}
</style>

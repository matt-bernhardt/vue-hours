<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li><img alt="MIT Libraries" src="@/assets/logo.png"></li>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/grid">Grid</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </div>
    <router-view/>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'App',
  params: {
    foo: 'bar'
  },
  methods: {
    loadSheets () {
      console.log('Loading data...')
      this.axios
        .get('https://spreadsheets.google.com/feeds/worksheets/1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg/public/basic?alt=json')
        .then(response => (this.sheets = response.data.feed.entry))
    }
  },
  data () {
    return {
      spreadsheetId: '1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg',
      sheets: []
    }
  },
  mounted () {
    console.log('App was mounted')
    this.loadSheets()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  ul {
    list-style-type: none;

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
</style>

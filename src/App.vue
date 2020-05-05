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

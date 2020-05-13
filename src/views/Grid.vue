<template>
  <div class="grid">
    <div class="reference">This will be the grid display. It is comparable to <a href="https://libraries.mit.edu/hours/">https://libraries.mit.edu/hours/</a>.</div>
    <h1>Hours grid</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting Grid')
  }
}
</script>

<style scoped>
</style>

<template>
  <div class="location">
    <div class="reference">This will be the display for a single location. It is comparable to <a href="https://libraries.mit.edu/barker/">https://libraries.mit.edu/barker/</a>.</div>
    <h1>{{ $route.params.id }}</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Location',
  components: {
  },
  data () {
    return {
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting Location ' + this.$route.params.id)
  }
}
</script>

<style scoped>
</style>

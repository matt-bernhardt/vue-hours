<template>
  <div class="study">
    <div class="reference">This will be the study spaces display. It is comparable to <a href="https://libraries.mit.edu/study/">https://libraries.mit.edu/study/</a>.</div>
    <h1>Study spaces</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Study',
  components: {
  },
  data () {
    return {
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting Study')
  }
}
</script>

<style scoped>
</style>

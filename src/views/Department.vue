<template>
  <div class="department">
    <div class="reference">This will be the department. It is comparable to <a href="https://libraries.mit.edu/docs/">https://libraries.mit.edu/docs/</a> or <a href="https://libraries.mit.edu/distinctive-collections/">https://libraries.mit.edu/distinctive-collections/</a>.</div>
    <h1>Department</h1>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Department',
  components: {
  },
  data () {
    return {
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting Department')
  }
}
</script>

<style scoped>
</style>

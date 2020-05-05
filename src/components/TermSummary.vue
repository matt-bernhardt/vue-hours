<template>
  <div class="term-summary">
    <h2>{{ index }}. {{ term.title.$t }}</h2>
    <p>{{ term }}</p>

  </div>
</template>

<script>
export default {
  name: 'TermSummary',
  props: {
    index: Number,
    term: String
  }
}
</script>

<style scoped lang="scss">
.term-summary {
  border-top: 1px solid red;
  margin-top: 1rem;
  padding-top: 1rem;
  text-align: left;
}
</style>

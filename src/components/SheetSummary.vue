<template>
  <div class="sheet-summary">
    <h2>{{ index }}. {{ sheet.title.$t }}</h2>
    <pre>{{ sheet }}</pre>

  </div>
</template>

<script>
export default {
  name: 'SheetSummary',
  props: {
    index: Number,
    sheet: String
  }
}
</script>

<style scoped lang="scss">
.sheet-summary {
  border-top: 1px solid red;
  margin-top: 1rem;
  padding-top: 1rem;
  text-align: left;
}
</style>

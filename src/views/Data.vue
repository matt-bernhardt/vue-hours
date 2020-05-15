<template>
  <div class="data">
    <div class="reference">This page has no reference to a current information display. It exists to surface the data from the API in a different, less processed, way.</div>
    <SheetSummary
      v-for="(sheet, index) in store.state.data"
      :index="index"
      :key="sheet.id"
      :sheet="sheet" />
    {{ sheets }}
  </div>
</template>

<script>
// @ is an alias to /src
import SheetSummary from '@/components/SheetSummary.vue'

export default {
  name: 'Data',
  components: {
    SheetSummary
  },
  data () {
    return {
      store: this.$root.$data,
      sheets: ''
    }
  },
  computed: {
  },
  mounted () {
    this.store.setStatus('Mounting Data')
  }
}
</script>

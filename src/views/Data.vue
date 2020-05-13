<template>
  <div class="data">
    <div class="reference">This page has no reference to a current information display. It exists to surface the data from the API in a different, less processed, way.</div>
    <TermSummary
      v-for="(term, index) in terms"
      :index="index"
      :key="term.id"
      :term="term" />
    {{ terms }}
  </div>
</template>

<script>
// @ is an alias to /src
import TermSummary from '@/components/TermSummary.vue'

export default {
  name: 'Home',
  components: {
    TermSummary
  },
  data () {
    return {
      store: this.$root.$data,
      terms: ''
    }
  },
  computed: {
  },
  mounted () {
    this.store.setStatus('Mounting Data')
    console.log('Home was mounted.')
    this.axios
      .get('https://spreadsheets.google.com/feeds/worksheets/1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg/public/basic?alt=json')
      .then(response => (this.terms = response.data.feed.entry))
  }
}
</script>

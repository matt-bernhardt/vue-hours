<template>
  <div class="home">
    <LocationCard
      v-for="(location) in locations"
      :key="location.name"
      :location="location"/>
    <TermSummary
      v-for="(term, index) in sheets"
      :index="index"
      :key="term.id"
      :term="term" />
    {{ terms }}
  </div>
</template>

<script>
// @ is an alias to /src
import LocationCard from '@/components/LocationCard.vue'
import TermSummary from '@/components/TermSummary.vue'

export default {
  name: 'Home',
  components: {
    LocationCard,
    TermSummary
  },
  props: {
    sheets: Array,
    foo: Array,
    spreadsheetId: String
  },
  data () {
    return {
      terms: '',
      locations: [
        {
          name: 'Barker Library',
          study24x7: true,
          open: '8:00 AM',
          close: '2:00 PM'
        },
        {
          name: 'Dewey Library'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {
    console.log('Home was mounted.')
  }
}
</script>

<template>
  <div class="home">
    <div class="reference">This will be the homepage. It is comparable to the list of locations normally found in a sidebar at <a href="https://libraries.mit.edu/">https://libraries.mit.edu/</a>.</div>
    <LocationCard
      v-for="(location) in locations"
      :key="location.name"
      :location="location"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LocationCard from '@/components/LocationCard.vue'

export default {
  name: 'Home',
  components: {
    LocationCard
  },
  data () {
    return {
      spreadsheetId: '1hK_4p-jx7dxW3RViRcBDSF_4En2QGgxx-Zy7zXkNIQg',
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

  }
}
</script>

<template>
  <div class="home">
    <div class="reference">This will be the homepage. It is comparable to the list of locations normally found in a sidebar at <a href="https://libraries.mit.edu/">https://libraries.mit.edu/</a>.</div>
    <h2>Library hours for {{ store.state.currentDate.toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }} </h2>
    <p>({{ store.state.currentTerm }})</p>
    <LocationCard
      v-for="(location) in store.state.locations"
      :key="location.name"
      :location="location"/>
    <hr>
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
      store: this.$root.$data
    }
  },
  mounted () {
    this.store.setStatus('Mounting Home')
  },
  computed: {

  }
}
</script>

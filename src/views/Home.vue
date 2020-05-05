<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <LocationCard />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import LocationCard from '@/components/LocationCard.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LocationCard
  },
  mounted () {
    console.log('Home was mounted.')
  }
}
</script>

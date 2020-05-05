<template>
  <div class="location-card">
    <div class="wrap-loc-info">
      <h3><a href="#">{{ location.name }}</a></h3>
      <div class="study24x7">{{ study24x7 }}</div>
      <div class="hours">{{ hours }} today</div>
      <div class="location-info">
        <a href="#">{{ location.address }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Location',
  props: {
    location: Object
  },
  computed: {
    hours: function () {
      if (this.location.open && this.location.close) {
        return this.location.open + ' - ' + this.location.close
      }
      return 'closed'
    },
    study24x7: function () {
      return (this.location.study24x7 ? 'Study 24x7' : '')
    }
  }
}
</script>

<style scoped lang="scss">
.location-card {
  background: #eaeaea;
  border: 1px solid #545454;
  margin: 0.5rem 0;
  padding: 0.5rem;
  h3 {
    margin: 0;
    padding: 0;
  }
}
</style>

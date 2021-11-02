<template>
  <div>
    <h1>Profile</h1>
    {{ getUser }}
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "User",
  computed: {
    ...mapGetters(["getUser"])
  }
}
</script>

<style scoped>

</style>
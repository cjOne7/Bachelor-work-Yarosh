<template>
  <div>
<!--    <Navbar/>-->
    <div class="cont">
      <router-view name="jumbotron"/>
<!--      <Jumbotron/>-->
    </div>
    <router-link v-if="getAuthenticationState" :to="{name: 'Profile'}">to profile</router-link>
<!--    <router-view/>-->
    <router-view name="profile"/>
    <router-view name="calendar"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
// import Navbar from "@/components/Navbar";
// eslint-disable-next-line no-unused-vars
import Jumbotron from "@/components/Jumbotron";

export default {
  name: 'Home',
  components: {
    // Jumbotron,
    // Navbar
  },
  computed: {
    ...mapGetters(['getAuthenticationState', 'getAuthResult'])
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.cont {
  margin : auto;
  width  : 80%;
}
</style>
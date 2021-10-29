<template>
  <div>
    <div class="cont">
      <Jumbotron/>
    </div>
    <router-link v-if="getAuthenticationState" :to="{name: 'Profile'}">to profile</router-link>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Jumbotron from "@/components/Jumbotron";

export default {
  name: 'Home',
  components: {Jumbotron},
  computed: {...mapGetters(['getAuthenticationState'])}
}
</script>

<style scoped>
.cont {
  margin: auto;
  width: 80%;
}
</style>
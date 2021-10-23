<template>
  <div>
    <div class="cont">
      <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
        <div v-if="getAuthenticationState">
          <p>Welcome, {{ getAuthResult.account.name }}!</p>
          <b-button variant="primary" href="#" @click="logout">
            <Logout/>
          </b-button>
        </div>
        <b-button variant="primary" href="#" v-else>
          <Login/>
        </b-button>
      </b-jumbotron>
    </div>
    <div>
      <p>{{ getAuthenticationState }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Login from "@/components/Login";
import Logout from "@/components/Logout";

export default {
  name: 'Home',
  components: {Logout, Login},
  computed: {
    ...mapGetters(['getAuthenticationState', 'getAuthResult', 'getUser'])
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
<template>
  <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
    <div v-if="getAuthenticationState">
      <p>Welcome, {{ getAuthResult.account.name }}!</p>
      <b-button variant="primary">
        <Logout/>
      </b-button>
    </div>
    <b-button variant="primary" v-else>
      <Login/>
    </b-button>
  </b-jumbotron>
</template>

<script>
import {mapGetters} from "vuex";
import Login from "@/components/Login";
import Logout from "@/components/Logout";

export default {
  name: "Jumbotron",
  components: {Login, Logout},
  computed: {...mapGetters(['getAuthenticationState', 'getAuthResult'])}
}
</script>
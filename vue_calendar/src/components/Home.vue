<template>
  <div>
    <div>
      <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">
        <p>For more information visit website</p>
        <b-button variant="primary" href="#" v-if="getAuthenticationState" @click="logout">Logout</b-button>
        <b-button variant="primary" href="#" v-else @click="login">Login</b-button>
      </b-jumbotron>
    </div>
    <div>
      <h1 class="header1" v-if="getAuthenticationState">Hello {{ getAuthResult.account.name }}</h1>
      <p>{{ getAuthenticationState }}</p>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters(['getAuthenticationState', 'getAuthResult', 'getUser'])
  },
  methods: {
    ...mapActions(['signIn', 'signOut', 'receiveUserInfo']),
    async login() {
      await this.signIn();
      await this.receiveUserInfo();
      console.log(this.getUser);
    },
    async logout() {
      await this.signOut();
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
$d : 10px;

.header1 {
  margin           : $d;
  background-color : $body-bg;
  color            : $body-color;
}
</style>

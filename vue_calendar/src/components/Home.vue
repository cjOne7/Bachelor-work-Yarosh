<template>
  <div>
    <div>
      <h1 class="header1" v-if="getAuthenticationState">Hello {{ getAuthResult.account.name }}</h1>
      <button v-if="getAuthenticationState" @click="logout">logout</button>
      <button v-else @click="login">login</button>
      <hr>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$d : 10px;

.header1 {
  margin           : $d;
  background-color : $body-bg;
  color            : $body-color;
}
</style>

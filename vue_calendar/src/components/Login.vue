<template>
  <span @click="login">Login</span>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "Login",
  methods: {
    ...mapActions(['signIn', 'receiveUserInfo']),
    async login() {
      this.signIn()
          .then(() => this.receiveUserInfo());
      // console.log(this.getUser);
    }
  }
}
</script>
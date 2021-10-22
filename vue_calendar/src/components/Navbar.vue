<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Vue web app</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="getAuthenticationState" href="#">Calendar</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="getAuthenticationState" text="User" right>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else @click="login">Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: "Navbar",
  computed: {
    ...mapGetters(["getUser", "getAuthenticationState"])
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

<style scoped>

</style>
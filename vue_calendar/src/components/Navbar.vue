<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">Vue web app</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'Calendar', params: {name: this.getAuthResult.account.name}}"
                      v-if="getAuthenticationState">Calendar
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="getAuthenticationState" text="User" right>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">
              <Logout/>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else>
            <Login/>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import Login from "@/components/Login";
import Logout from "@/components/Logout";

export default {
  name: "Navbar",
  components: {Logout, Login},
  computed: {
    ...mapGetters(["getUser", "getAuthenticationState", "getAuthResult"])
  },
  methods: {}
}
</script>

<style scoped>

</style>
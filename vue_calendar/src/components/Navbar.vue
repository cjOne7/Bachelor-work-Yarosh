<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Vue web app</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name: 'Calendar'}" v-if="getAuthenticationState">Calendar</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="getAuthenticationState" text="User" right>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item>
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
    ...mapGetters(["getAuthenticationState", "getAuthResult"])
  }
}
</script>

<style scoped>

</style>
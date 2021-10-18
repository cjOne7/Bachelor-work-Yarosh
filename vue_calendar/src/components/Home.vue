<template>
  <div>
<!--    <div>-->
<!--      <b-navbar toggleable="lg" type="dark" variant="info">-->
<!--        <b-navbar-brand href="#">NavBar</b-navbar-brand>-->

<!--        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>-->

<!--        <b-collapse id="nav-collapse" is-nav>-->
<!--          <b-navbar-nav>-->
<!--            <b-nav-item href="#">Link</b-nav-item>-->
<!--            <b-nav-item href="#" disabled>Disabled</b-nav-item>-->
<!--          </b-navbar-nav>-->

<!--          &lt;!&ndash; Right aligned nav items &ndash;&gt;-->
<!--          <b-navbar-nav class="ml-auto">-->
<!--            <b-nav-item-dropdown text="Lang" right>-->
<!--              <b-dropdown-item href="#">EN</b-dropdown-item>-->
<!--              <b-dropdown-item href="#">ES</b-dropdown-item>-->
<!--              <b-dropdown-item href="#">RU</b-dropdown-item>-->
<!--              <b-dropdown-item href="#">FA</b-dropdown-item>-->
<!--            </b-nav-item-dropdown>-->

<!--            <b-nav-item-dropdown right>-->
<!--              &lt;!&ndash; Using 'button-content' slot &ndash;&gt;-->
<!--              <template #button-content>-->
<!--                <em>User</em>-->
<!--              </template>-->
<!--              <b-dropdown-item href="#">Profile</b-dropdown-item>-->
<!--              <b-dropdown-item href="#">Sign Out</b-dropdown-item>-->
<!--            </b-nav-item-dropdown>-->
<!--          </b-navbar-nav>-->
<!--        </b-collapse>-->
<!--      </b-navbar>-->
<!--    </div>-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
<!--    <div>-->
<!--      <b-jumbotron header="BootstrapVue" lead="Bootstrap v4 Components for Vue.js 2">-->
<!--        <p>For more information visit website</p>-->
<!--        <b-button variant="primary" href="#">More Info</b-button>-->
<!--      </b-jumbotron>-->
<!--    </div>-->

    <div class="jumbotron">
      <h1 class="display-4">Hello, world!</h1>
      <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
      <hr class="my-4">
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>

    <div>
      <hr>
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
  data() {
    return {
      isAuthenticated: false
    }
  },
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

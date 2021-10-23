<template>
  <span @click="logout">Logout</span>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "Logout",
  methods: {
    ...mapActions(['signOut']),
    async logout() {
      await this.signOut();
    }
  }
}
</script>
<template>
  <div class="container">
    <h1>Page not found</h1>
    <p>You will be redirected to home page in {{ timeToLeave }}</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      timeToLeave: 3 //start time in seconds
    }
  },
  mounted() {
    const interval = setInterval(() => {
      this.timeToLeave--;
      if (this.timeToLeave === 0) {
        clearInterval(interval);
        this.$router.push({name: 'Home'});
      }
    }, 1000);
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
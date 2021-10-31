<template>
  <div class="flex-container mx-2">
    <div class="label mx-2">{{ fieldName }}</div>
    <div class="data">{{ fieldData }}</div>
  </div>
</template>

<script>
export default {
  name: "EventsDetailField",
  props: {
    fieldName: {
      type: String,
      required: true
    },
    fieldData: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.flex-container {
  display         : flex;
  justify-content : center;

  .label {
    text-align : left;
    width      : 40%;
  }

  .data {
    width : 100%;
  }
}
</style>
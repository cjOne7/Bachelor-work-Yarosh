<template>
  <div class="inline-time-block">
    <b-form-group :label="label" :label-for="inputID">
      <b-form-timepicker @change="changeListener" :id="inputID" v-model="inputField"/>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "TimePicker",
  data() {
    return {
      inputField: ''
    }
  },
  props: {
    label: {
      type: String,
      required: true
    },
    inputID: {
      type: String,
      required: true
    }
  },
  mounted() {

  },
  methods: {
    changeListener() {
      this.$emit('transfer-input-field', this.inputField);
    }
  }
}
</script>

<style scoped>
.inline-time-block {
  min-width: 48%;
}
</style>
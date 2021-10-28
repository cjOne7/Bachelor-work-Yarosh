<template>
  <div class="inline-time-block">
    <b-form-group :label="label" :label-for="inputID">
      <b-form-timepicker @change="changeListener" :id="inputID" v-model="inputField"/>
    </b-form-group>
  </div>
</template>

<script>
import getCurrentISODate from './script'

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
    // const date = new Date();
    // const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    this.inputField = getCurrentISODate().split('T')[1].slice(0, -5);
    this.$emit('input-data', this.inputField);
  },
  methods: {
    changeListener() {
      this.$emit('input-data', this.inputField);
    }
  }
}
</script>

<style scoped>
.inline-time-block {
  min-width: 48%;
}
</style>
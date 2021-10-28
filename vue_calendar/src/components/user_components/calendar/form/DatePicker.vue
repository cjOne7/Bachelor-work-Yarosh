<template>
  <div class="inline-time-block">
    <b-form-group :label="label" :label-for="inputID">
      <b-form-datepicker @change="changeListener" :id="inputID" v-model="inputField"/>
    </b-form-group>
  </div>
</template>

<script>
import getCurrentISODate from './script'

export default {
  name: "DatePicker",
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
    this.inputField = getCurrentISODate().split('T')[0];
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
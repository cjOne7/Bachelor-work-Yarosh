<template>
  <div class="inline-time-block">
    <b-form-group :label="label" :label-for="inputID">
      <b-form-datepicker v-if="isDateShown" @change="changeListener" :id="inputID" v-model="inputField"/>
      <b-form-timepicker v-else @change="changeListener" :id="inputID" v-model="inputField"/>
    </b-form-group>
  </div>
</template>

<script>
export default {
  name: "DateTimePicker",
  data() {
    return {
      inputField: ''
    }
  },
  computed: {
    isDateShown() {
      return this.componentName === 'datepicker';
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
    },
    componentName: {
      type: String,
      required: true
    }
  },
  mounted() {
    const date = new Date();
    const isoDateTime =  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
    const dateTime = isoDateTime.split('T');
    this.inputField = this.isDateShown ? dateTime[0] : dateTime[1].slice(0, -5);
    this.changeListener();
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
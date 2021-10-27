<template>
  <b-form-group :label="label" :label-for="inputID" valid-feedback="Correct!" :state="state"
                :invalid-feedback="invalidFeedback">
    <b-form-input @change="changeListener" :id="inputID" v-model.trim="inputField" :state="state"
                  :placeholder="placeholder"></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: "InputForm",
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
    },
    placeholder: {
      type: String,
      required: true
    }
  },
  computed: {
    state() {
      this.$emit('transfer-input-field', this.inputField);
      return this.inputField.length >= 4;
    },
    invalidFeedback() {
      if (this.inputField.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },
  methods: {
    changeListener() {
      // console.log(this.inputField);
      this.$emit('transfer-input-field', this.inputField);
    }
  }
}
</script>

<style scoped>

</style>
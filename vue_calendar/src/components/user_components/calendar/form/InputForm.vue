<template>
  <b-form-group :label="label" :label-for="inputID" valid-feedback="Correct!" :state="state"
                :invalid-feedback="invalidFeedback">
    <b-form-input @change="changeListener" :id="inputID" v-model.trim="inputField" :state="state"
                  :placeholder="placeholder"/>
  </b-form-group>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      inputField: '',
      minLength: 5
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
      this.$emit('input-data', this.inputField);
      return this.inputField.length >= this.minLength;
    },
    invalidFeedback() {
      if (this.inputField.length > 0) {
        return `Enter at least ${this.minLength} characters.`
      }
      return 'Please, enter something.'
    }
  },
  methods: {
    changeListener() {
      this.$emit('input-data', this.inputField);
    }
  }
}
</script>

<style scoped>

</style>
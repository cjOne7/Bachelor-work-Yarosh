<template>
  <b-form-group :label="label" :label-for="inputID" valid-feedback="That's enough!" :state="state"
                :invalid-feedback="invalidFeedback">
    <b-form-input @change="changeListener" :id="inputID" v-model.trim="inputField" :state="state"
                  :placeholder="placeholder" :required="requiredField"/>
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
    },
    requiredField: {
      type: String,
      required: false
    }
  },
  computed: {
    state() {
      if (this.requiredField) {
        this.changeListener();
        return this.inputField.length >= this.minLength;
      }
      return null;
    },
    invalidFeedback() {
      if (this.inputField.length > 0) {
        return `Enter at least ${this.minLength} characters.`;
      }
      return 'Please, enter something.';
    }
  },
  methods: {
    changeListener() {
      if (this.inputField.length >= this.minLength) {
        this.$emit('input-data', this.inputField);
      }
    },
    setValue(value) {
      this.inputField = value;
    }
  },
  created() {
    this.$parent.$on('update', this.setValue);
  }
}
</script>
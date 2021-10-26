<template>
  <div>
    <b-form @submit.prevent="createNewEvent">
      <b-form-group id="input-group-1" label="Subject:" label-for="input-1">
        <b-form-input id="input-1" v-model="event.subject" placeholder="Enter subject"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Location:" label-for="input-2">
        <b-form-input id="input-2" v-model="event.location.displayName" placeholder="Enter location"
        ></b-form-input>
      </b-form-group>

      <div class="time-container">
        <div class="inline-time-block start">
          <b-form-group id="input-group-3" label="Choose a start date:" label-for="input-3">
            <b-form-datepicker id="input-3" v-model="startDate"></b-form-datepicker>
          </b-form-group>
        </div>

        <div class="inline-time-block end">
          <b-form-group id="input-group-4" label="Choose a start time:" label-for="input-4">
            <b-form-timepicker id="input-4" v-model="startTime"></b-form-timepicker>
          </b-form-group>
        </div>
      </div>

      <div class="time-container">
        <div class="inline-time-block">
          <b-form-group id="input-group-5" label="Choose an end date:" label-for="input-5">
            <b-form-datepicker id="input-5" v-model="endDate"></b-form-datepicker>
          </b-form-group>
        </div>

        <div class="inline-time-block">
          <b-form-group id="input-group-6" label="Choose an end time:" label-for="input-6">
            <b-form-timepicker id="input-6" v-model="endTime"></b-form-timepicker>
          </b-form-group>
        </div>
      </div>

      <b-form-group id="input-group-5" label="Enter content:" label-for="input-5">
        <b-form-textarea id="input-5" v-model="event.body.content" placeholder="Enter content" rows="4"
                         max-rows="8"></b-form-textarea>
      </b-form-group>

      <!--      <span v-html="a"></span>-->
      <b-button variant="primary" type="submit" class="my-1 mr-2">Confirm</b-button>
      <b-button variant="danger" type="reset" class="my-1" @click="$emit('show-calendar-events')">Cancel</b-button>
    </b-form>
    <div>{{ event }}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "AddEventForm",
  data() {
    return {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      a: '<input type="text"/>',
      event: {
        subject: '',
        body: {
          contentType: 'HTML',
          content: ''
        },
        startDate: {
          dateTime: '',
          timeZone: ''
        },
        endDate: {
          dateTime: '',
          timeZone: ''
        },
        location: {
          displayName: ''
        },
        attendees: []
      }
    }
  },
  computed: {
    ...mapGetters(["getTimeZone"])
  },
  methods: {
    createNewEvent() {
      this.event.startDate.timeZone = this.event.endDate.timeZone = this.getTimeZone.value;

      this.event.startDate.dateTime = `${this.startDate}T${this.startTime}`;
      this.event.endDate.dateTime = `${this.endDate}T${this.endTime}`;
      console.log(this.event);
    }
  }

}
</script>

<style scoped lang="scss">
.time-container {
  display         : flex;
  justify-content : space-between;
}

.inline-time-block {
  min-width : 48%;
}
</style>
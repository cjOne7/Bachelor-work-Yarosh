<template>
  <div>
    <b-form @submit.prevent="createNewEvent">
      <b-form-group label="Subject:" label-for="subject-input">
        <b-form-input id="subject-input" v-model.trim="event.subject" placeholder="Enter subject"
                      required></b-form-input>
      </b-form-group>

      <b-form-group label="Location:" label-for="location-input">
        <b-form-input id="location-input" v-model.trim="event.location.displayName"
                      placeholder="Enter location"></b-form-input>
      </b-form-group>

      <b-form-group label="Attendees:" label-for="attendees-input">
        <b-form-input id="attendees-input" v-model.trim="attendees" placeholder="Add attendees"></b-form-input>
      </b-form-group>

      <div class="time-container">
        <div class="inline-time-block">
          <b-form-group label="Choose a start date:" label-for="datepicker-input-1">
            <b-form-datepicker id="datepicker-input-1" v-model="startDate" required></b-form-datepicker>
          </b-form-group>
        </div>

        <div class="inline-time-block">
          <b-form-group label="Choose a start time:" label-for="timepicker-input-1">
            <b-form-timepicker id="timepicker-input-1" v-model="startTime" required></b-form-timepicker>
          </b-form-group>
        </div>
      </div>

      <div class="time-container">
        <div class="inline-time-block">
          <b-form-group label="Choose an end date:" label-for="datepicker-input-2">
            <b-form-datepicker id="datepicker-input-2" v-model="endDate" required></b-form-datepicker>
          </b-form-group>
        </div>

        <div class="inline-time-block">
          <b-form-group label="Choose an end time:" label-for="timepicker-input-2">
            <b-form-timepicker id="timepicker-input-2" v-model="endTime" required></b-form-timepicker>
          </b-form-group>
        </div>
      </div>

      <b-form-group label="Enter content:" label-for="body-textarea">
        <b-form-textarea id="body-textarea" v-model.trim="event.body.content" placeholder="Enter content" rows="4"
                         max-rows="8" required></b-form-textarea>
      </b-form-group>

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
      attendees: '',
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
    ...mapGetters(["getTimeZone", "getGraphClient"])
  },
  methods: {
    createNewEvent() {
      this.event.startDate.timeZone = this.event.endDate.timeZone = this.getTimeZone.value;

      this.event.startDate.dateTime = `${this.startDate}T${this.startTime}`;
      this.event.endDate.dateTime = `${this.endDate}T${this.endTime}`;
      this.event.attendees = this.attendees.split(", ");
      console.log(this.event);
      this.getGraphClient.api('/me/events').post(this.event);
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
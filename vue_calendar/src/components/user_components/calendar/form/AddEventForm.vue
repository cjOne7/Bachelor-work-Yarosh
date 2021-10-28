<template>
  <div>
    <b-form @submit.prevent="createNewEvent">
      <!--      <b-form-group label="Subject:" label-for="subject-input" valid-feedback="Correct!">-->
      <!--        <b-form-input id="subject-input" v-model.trim="event.subject" placeholder="Enter subject"></b-form-input>-->
      <!--      </b-form-group>-->

      <!--      <b-form-group label="Location:" label-for="location-input">-->
      <!--        <b-form-input id="location-input" v-model.trim="event.location.displayName"-->
      <!--                      placeholder="Enter location"></b-form-input>-->
      <!--      </b-form-group>-->

      <!--      <b-form-group label="Attendees:" label-for="attendees-input">-->
      <!--        <b-form-input id="attendees-input" v-model.trim="attendees" placeholder="Add attendees"></b-form-input>-->
      <!--      </b-form-group>-->

      <!--      <div class="time-container">-->
      <!--        <div class="inline-time-block">-->
      <!--          <b-form-group label="Choose a start date:" label-for="datepicker-input-1">-->
      <!--            <b-form-datepicker id="datepicker-input-1" v-model="startDate"></b-form-datepicker>-->
      <!--          </b-form-group>-->
      <!--        </div>-->
      <!--        <div class="inline-time-block">-->
      <!--          <b-form-group label="Choose a start time:" label-for="timepicker-input-1">-->
      <!--            <b-form-timepicker id="timepicker-input-1" v-model="startTime"></b-form-timepicker>-->
      <!--          </b-form-group>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <div class="time-container">-->
      <!--        <div class="inline-time-block">-->
      <!--          <b-form-group label="Choose an end date:" label-for="datepicker-input-2">-->
      <!--            <b-form-datepicker id="datepicker-input-2" v-model="endDate"></b-form-datepicker>-->
      <!--          </b-form-group>-->
      <!--        </div>-->
      <!--        <div class="inline-time-block">-->
      <!--          <b-form-group label="Choose an end time:" label-for="timepicker-input-2">-->
      <!--            <b-form-timepicker id="timepicker-input-2" v-model="endTime"></b-form-timepicker>-->
      <!--          </b-form-group>-->
      <!--        </div>-->
      <!--      </div>-->

      <InputForm :label="'Subject:'" :inputID="'subject'" :placeholder="'Enter subject'" @input-data="setSubjectValue"/>
      <InputForm :label="'Location:'" :inputID="'location'" :placeholder="'Enter location'" @input-data="setLocationValue"/>

      <div class="time-container">
        <DatePicker :label="'Choose a start date:'" :inputID="'datepicker-input-1'" @input-data="setStartDayValue"/>
        <TimePicker :label="'Choose a start time:'" :inputID="'timepicker-input-1'" @input-data="setStartTimeValue"/>
      </div>

      <div class="time-container">
        <DatePicker :label="'Choose an end date:'" :inputID="'datepicker-input-2'" @input-data="setEndDayValue"/>
        <TimePicker :label="'Choose an end time:'" :inputID="'timepicker-input-2'" @input-data="setEndTimeValue"/>
      </div>

      <b-form-group label="Enter content:" label-for="body-textarea">
        <b-form-textarea id="body-textarea" v-model.trim="event.body.content" placeholder="Enter content" rows="4"
                         max-rows="8"></b-form-textarea>
      </b-form-group>

      <b-button variant="primary" type="submit" class="my-1 mr-2">Confirm</b-button>
      <b-button variant="danger" type="reset" class="my-1" @click="$emit('show-calendar-events')">Cancel</b-button>
    </b-form>
    <div>{{ event }}</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import InputForm from "@/components/user_components/calendar/form/InputForm";
import DatePicker from "@/components/user_components/calendar/form/DatePicker";
import TimePicker from "@/components/user_components/calendar/form/TimePicker";

export default {
  name: "AddEventForm",
  components: {TimePicker, DatePicker, InputForm},
  data() {
    return {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      // attendees: '',
      event: {
        subject: 'test1',
        body: {
          contentType: 'HTML',
          content: 'some content'
        },
        start: {
          dateTime: '',
          timeZone: ''
        },
        end: {
          dateTime: '',
          timeZone: ''
        },
        location: {
          displayName: 'Bar xxx'
        },
        attendees: [],
        allowNewTimeProposals: true
      }
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(["getTimeZone", "getGraphClient"])
  },
  methods: {
    setSubjectValue(newValue) {
      this.event.subject = newValue;
    },
    setLocationValue(newValue) {
      this.event.location.displayName = newValue;
    },
    setStartDayValue(newValue) {
      this.startDate = newValue;
    },
    setStartTimeValue(newValue) {
      this.startTime = newValue;
    },
    setEndDayValue(newValue) {
      this.endDate = newValue;
    },
    setEndTimeValue(newValue) {
      this.endTime = newValue;
    },
    buildDate(day, time) {
      return `${day}T${time}`;
    },
    async createNewEvent() {
      this.event.start.timeZone = this.event.end.timeZone = this.getTimeZone.value;

      this.event.start.dateTime = this.buildDate(this.startDate, this.startTime);
      this.event.end.dateTime = this.buildDate(this.endDate, this.endTime);
      // let attendees = this.attendees.split(", ");
      // for (let i = 0; i < attendees.length; i++) {
      //   console.log(attendees[i]);
      // }

      console.log(this.event);
      await this.getGraphClient.api('/me/events')
          .header('Prefer', `outlook.timezone="${this.getTimeZone.value}"`)
          .post(this.event);
    }
  }

}
</script>

<style scoped>
.time-container {
  display: flex;
  justify-content: space-between;
}

/*.inline-time-block {*/
/*  min-width : 48%;*/
/*}*/
</style>
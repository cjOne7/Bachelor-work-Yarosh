<template>
  <div>
    <b-form @submit.prevent="createNewEvent">
      <InputForm :label="'Subject:'" :inputID="'subject'" :placeholder="'Enter subject'" @input-data="setSubjectValue"
                 :required-field="'required'" @input-data-state="getInputDataState"/>
      <InputForm :label="'Location:'" :inputID="'location'" :placeholder="'Enter location'"
                 @input-data="setLocationValue"/>

      <div class="time-container">
        <DateTimePicker :label="'Choose a start date:'" :inputID="'start-day'" @input-data="setStartDayValue"
                        :component-name="'datepicker'"/>
        <DateTimePicker :label="'Choose a start time:'" :inputID="'start-time'" @input-data="setStartTimeValue"
                        :component-name="'timepicker'"/>
      </div>

      <div class="time-container">
        <DateTimePicker :label="'Choose an end date:'" :inputID="'end-day'" :component-name="'datepicker'"
                        @input-data="setEndDayValue"/>
        <DateTimePicker :label="'Choose an end time:'" :inputID="'end-time'" :component-name="'timepicker'"
                        @input-data="setEndTimeValue"/>
      </div>

      <transition name="fade">
        <p v-if="errorState" class="error-container">Start date can't be earlier than end date!</p>
      </transition>

      <b-form-group label="Enter content:" label-for="body-textarea">
        <b-form-textarea id="body-textarea" v-model.trim="event.body.content" placeholder="Enter content" rows="4"
                         max-rows="8"></b-form-textarea>
      </b-form-group>


      <div class="modal-alert" :class="{'modal-active': successAlert, 'modal-not-active': !successAlert}">
        <div class="modal-cont">
          <span class="close" @click="successAlert = false">&times;</span>
          <p><i class="fa fa-check"></i> Event successfully created!</p>
        </div>
      </div>

      <b-button id="confirm-add-event-btn" :class="{'forbidden-enter': errorState, 'forbidden-leave': !errorState}"
                variant="primary" type="submit" class="my-1 mr-2">Create
      </b-button>
      <b-button variant="danger" type="reset" class="my-1" @click="$emit('show-calendar-events', created)">Back
      </b-button>
    </b-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import InputForm from "@/components/user_components/calendar/form/InputForm";
import DateTimePicker from "@/components/user_components/calendar/form/DateTimePicker";

export default {
  name: "AddEventForm",
  components: {DateTimePicker, InputForm},
  data() {
    return {
      startDay: '',
      startTime: '',
      endDay: '',
      endTime: '',
      created: false,
      // attendees: '',
      event: {
        subject: '',
        body: {
          contentType: 'HTML',
          content: ''
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
          displayName: ''
        },
        attendees: [],
        allowNewTimeProposals: true
      },
      subjectState: false,
      successAlert: false
    }
  },
  computed: {
    ...mapGetters(["getTimeZone", "getGraphClient"]),
    errorState() {
      const startDate = new Date(this.buildDate(this.startDay, this.startTime));
      const endDate = new Date(this.buildDate(this.endDay, this.endTime));
      const condition = endDate < startDate;
      const confirmBtn = document.getElementById('confirm-add-event-btn');

      if (confirmBtn !== null) {
        confirmBtn.disabled = condition;
        confirmBtn.style.cursor = condition ? 'not-allowed' : 'pointer';
      }
      return condition;
    }
  },
  methods: {
    setSubjectValue(newValue) {
      this.event.subject = newValue;
    },
    setLocationValue(newValue) {
      this.event.location.displayName = newValue;
    },
    setStartDayValue(newValue) {
      this.startDay = newValue;
    },
    setStartTimeValue(newValue) {
      this.startTime = newValue;
    },
    setEndDayValue(newValue) {
      this.endDay = newValue;
    },
    setEndTimeValue(newValue) {
      this.endTime = newValue;
    },
    buildDate(day, time) {
      return `${day}T${time}`;
    },
    getInputDataState(state) {
      this.subjectState = state;
    },
    async createNewEvent() {
      this.event.start.timeZone = this.event.end.timeZone = this.getTimeZone.value;

      //todo add modal window with attendees
      // let attendees = this.attendees.split(", ");
      // for (let i = 0; i < attendees.length; i++) {
      //   console.log(attendees[i]);
      // }

      this.event.start.dateTime = this.buildDate(this.startDay, this.startTime);
      this.event.end.dateTime = this.buildDate(this.endDay, this.endTime);

      if (this.subjectState) {
        await this.getGraphClient.api('/me/events')
            .header('Prefer', `outlook.timezone="${this.getTimeZone.value}"`)
            .post(this.event)
            .then(() => {
              this.created = true;
              this.successAlert = true;
              setTimeout(() => {
                this.successAlert = false;
              }, 3000);
            })
            .catch(err => console.log(err));//add error alert

        //clear inputs in form
        this.$emit('update', '');
        this.event.body.content = '';
      }
    }
  }
}
</script>

<style scoped lang="scss">
.time-container {
  display         : flex;
  justify-content : space-between;
}

.error-container {
  font-size : 0.75em;
  color     : red;
}

$time-fading : 1s;

.forbidden-enter {
  @include disabledAnimation(not-allowed, 0.3, $time-fading);
}

.forbidden-leave {
  @include disabledAnimation(pointer, 1, $time-fading);
}

.modal-active {
  @include showAlertMessage(1, translateY(80%), 2s);
}

.modal-not-active {
  @include showAlertMessage(0, translateY(-80%), 2s);
}

$left        : 25%;
$width       : 100% - $left * 2;

.modal-alert {
  display  : block;
  position : fixed;
  z-index  : 1;
  left     : $left;
  top      : 5%;
  width    : $width;
  overflow : auto;
}

.modal-cont {
  color            : #270;
  background-color : #DFF2BF;
  @include px($indent * 2);
  @include py($indent * 2);
  width            : 100%;
  border-radius    : 0.4em;
}

p {
  margin : 0;
}

.close {
  color       : #aaa;
  float       : right;
  font-size   : 28px;
  font-weight : bold;
  line-height : 0.75;

  &:hover, &:focus {
    color           : black;
    text-decoration : none;
    cursor          : pointer;
  }
}
</style>
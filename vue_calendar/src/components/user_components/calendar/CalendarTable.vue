<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="events.length">
      <table>
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Subject</th>
          <th scope="col">Body</th>
          <th scope="col">Attendees</th>
          <th scope="col">Organizer</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
        </tr>
        </thead>
        <tbody>
        <CalendarItem v-for="event in events" :key="event.id" :event="event" @push-deleted-event-id="saveDeletedId"
                      @pop-deleted-event-id="popDeletedId"/>
        </tbody>
      </table>
      <div>
        <b-button v-if="eventIds.length" variant="danger" @click="deleteChosenEvents">Delete selected elements</b-button>
      </div>
    </div>
    <div v-else>No events</div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import CalendarItem from "@/components/user_components/calendar/CalendarItem";
import Loader from "@/components/Loader";

export default {
  name: "CalendarTable",
  components: {CalendarItem, Loader},
  data() {
    return {
      events: [],
      fields: ['subject', 'bodyPreview', 'attendees', 'organizer', 'start', 'end'],
      loading: true,
      eventIds: []
    }
  },
  methods: {
    ...mapActions(["callMsGraphApi"]),
    saveDeletedId(eventId) {
      if (!this.eventIds.includes(eventId)) {
        this.eventIds.push(eventId);
        console.log(this.eventIds)
      }
    },
    popDeletedId(eventId) {
      this.eventIds = this.eventIds.filter(id => id !== eventId);
      console.log(this.eventIds);
    },
    deleteChosenEvents() {
      // eslint-disable-next-line no-empty
      for (let i = 0; i < this.eventIds.length; i++) {

      }
      this.eventIds = [];
    }
  },
  async mounted() {
    const queryOptions = {
      path: '/me/events',
      selectedParams: this.fields.join(),
      orderByParams: 'createdDateTime DESC'
    };
    this.callMsGraphApi(queryOptions).then(resp => {
      this.events = resp.value;
      this.loading = false;
    }).catch(err => console.log(err));
  }
}
</script>

<style scoped lang="scss">
table {
  border          : $border;
  border-collapse : collapse;

  tr {
    vertical-align : top;

    //&:nth-child(odd) {
    //}
    //
    //&:nth-child(even) {
    //  //background-color : antiquewhite;
    //}
  }

  th {
    //background-color : antiquewhite;
    border  : $border;
    padding : $indent;
  }
}
</style>
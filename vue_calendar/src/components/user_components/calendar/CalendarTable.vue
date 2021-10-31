<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="events.length">
      <table>
        <tr>
          <th scope="col"></th>
          <th scope="col">Subject</th>
          <th scope="col">Body</th>
          <th scope="col">Organizer</th>
          <th scope="col">Location</th>
          <th scope="col">Start</th>
        </tr>
        <CalendarItem v-for="event in events" :key="event.id" :event="event" @push-deleted-event-id="saveDeletedId"
                      @pop-deleted-event-id="popDeletedId"/>
      </table>
      <transition name="fade">
        <b-button v-if="eventIds.length" variant="danger" @click="deleteChosenEvents" class="my-2">
          Delete selected elements
        </b-button>
      </transition>
    </div>
    <div v-else>No events!</div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import CalendarItem from "@/components/user_components/calendar/CalendarItem";
import Loader from "@/components/Loader";

export default {
  name: "CalendarTable",
  components: {CalendarItem, Loader},
  data() {
    return {
      events: [],
      fields: ['subject', 'bodyPreview', 'attendees', 'organizer', 'location', 'start', 'end'],
      loading: true,
      eventIds: []
    }
  },
  computed: {...mapGetters(["getGraphClient"])},
  methods: {
    ...mapActions(["callMsGraphApi"]),
    saveDeletedId(eventId) {
      if (!this.eventIds.includes(eventId)) {
        this.eventIds.push(eventId);
      }
    },
    popDeletedId(eventId) {
      this.eventIds = this.eventIds.filter(id => id !== eventId);
    },
    deleteChosenEvents() {
      for (let i = 0; i < this.eventIds.length; i++) {
        this.getGraphClient.api(`/me/events/${this.eventIds[i]}`).delete();
        this.events = this.events.filter(event => event.id !== this.eventIds[i]);
      }
      this.eventIds = [];
    },
    getEvents() {
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
  },
  async mounted() {
    this.getEvents();
    this.$parent.$on('updateEventsTable', this.getEvents);
  }
}
</script>

<style scoped lang="scss">
table {
  border          : $border;
  border-collapse : collapse;

  tr {
    vertical-align : top;

    &:nth-child(even) {
      background-color : antiquewhite;
    }

    &:hover:nth-child(n+2) {
      background-color : #deeef3;
    }
  }

  th {
    border  : $border;
    padding : $indent;
  }
}
</style>
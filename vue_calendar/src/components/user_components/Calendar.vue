<template>
  <div>
    <Loader v-if="loading"/>
    <table v-else-if="events.length">
      <thead>
      <tr>
        <th scope="col">Subject</th>
        <th scope="col">Body</th>
        <th scope="col">Attendees</th>
        <th scope="col">Organizer</th>
        <th scope="col">Start</th>
        <th scope="col">End</th>
      </tr>
      </thead>
      <tbody>
      <CalendarItem v-for="event in events" :key="event.id" :event="event"/>
      </tbody>
    </table>
    <b-button variant="primary" class="m-1">Add new event</b-button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import CalendarItem from "@/components/user_components/CalendarItem";
import Loader from "@/components/Loader";

export default {
  name: "Calendar",
  components: {Loader, CalendarItem},
  data() {
    return {
      events: [],
      fields: ['subject', 'bodyPreview', 'attendees', 'organizer', 'start', 'end'],
      loading: true
    }
  },
  computed: {
    ...mapGetters(["getGraphClient", "getUser", "getTimeZone"])
  },
  methods: {
    ...mapActions(["callMsGraphApi"])
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
    });
  }
}
</script>

<style scoped lang="scss">
table {
  border          : $border;
  border-collapse : collapse;

  tr {
    vertical-align : top;

    &:nth-child(odd) {
      background-color : white;
    }

    &:nth-child(even) {
      background-color : antiquewhite;
    }

    &:hover {
      background-color : #deeef3;
    }
  }

  th {
    background-color : antiquewhite;
    border           : $border;
    padding          : $indent;
  }
}
</style>
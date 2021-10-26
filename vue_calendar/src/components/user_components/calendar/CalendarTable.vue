<template>
  <!--    https://bootstrap-vue.org/docs/components/table#tables-->
  <!--    <b-table striped hover :items="items" :fields="fields"></b-table>-->
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
      loading: true
    }
  },
  methods: {
    ...mapActions(["callMsGraphApi"])
  },
  async mounted() {
    const queryOptions = {
      path: '/me/events',
      selectedParams: 'subject,bodyPreview,attendees,organizer,start,end',
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

    &:nth-child(odd) {
      background-color : white;
    }

    &:nth-child(even) {
      //background-color : antiquewhite;
    }

    &:hover {
      background-color : #deeef3;
    }
  }

  th {
    //background-color : antiquewhite;
    border           : $border;
    padding          : $indent;
    min-width: 200px;
  }
}
</style>
<template>
  <tr @click="showDetails">
    <td>
      <b-form-checkbox :id="`checkbox-${event.id}`" v-model="status" :name="`checkbox-${event.id}`"
                       value="accepted" unchecked-value="not_accepted" @change="processEventId">{{ status }}
      </b-form-checkbox>
    </td>
    <td>{{ event.subject }}</td>
    <td>{{ event.bodyPreview }}</td>
    <td>{{ event.attendees | trimAttendees }}</td>
    <td>{{ event.organizer.emailAddress.name }}</td>
    <td>{{ event.start.dateTime | moment(datePattern) }}</td>
    <td>{{ event.end.dateTime | moment(datePattern) }}</td>
  </tr>
</template>

<script>
export default {
  name: "CalendarItem",
  data() {
    return {
      datePattern: 'DD.MM.YYYY HH:mm Z',
      status: 'not_accepted'
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  filters: {
    trimAttendees: value => {
      if (value.length) {
        let attendees = [];
        for (let i = 0; i < value.length; i++) {
          attendees.push(value[i].emailAddress.name);
        }
        return attendees.join(", ");
      }
      return '-';
    }
  },
  methods: {
    processEventId() {
      if (this.status === 'accepted') {
        console.log(this.status);
        this.$emit('push-deleted-event-id', this.event.id);
      }
      if (this.status === 'not_accepted') {
        console.log(this.status);
        this.$emit('pop-deleted-event-id', this.event.id);
      }
    },
    showDetails() {
      //todo show details
    }
  }
}
</script>

<style scoped lang="scss">
td {
  border    : $border;
  padding   : $indent;
  cursor    : pointer;
  min-width : 200px;

  &:nth-child(1) {
    background-color : antiquewhite;
    //border           : none;
    min-width        : 50px;
  }

  &:hover {
    background-color : #deeef3;
  }
}
</style>
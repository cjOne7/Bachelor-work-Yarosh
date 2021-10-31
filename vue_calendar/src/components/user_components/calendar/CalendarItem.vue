<template>
  <tr @click="showDetails">
    <td>
      <b-form-checkbox class="checkbox" :id="`checkbox-${event.id}`" v-model="status" :name="`checkbox-${event.id}`"
                       value="accepted" unchecked-value="not_accepted" @change="processEventId"/>
    </td>
    <td :title="event.subject">{{ event.subject | trimSubject }}</td>
    <td>{{ event.organizer.emailAddress.name }}</td>
    <td>{{ event.start.dateTime | moment(datePattern) }}-{{ event.end.dateTime | moment(datePattern) }}</td>
  </tr>
</template>

<script>
export default {
  name: "CalendarItem",
  data() {
    return {
      datePattern: 'DD.MM.YYYY HH:mm',
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
    },
    trimSubject(value) {
      return value.length >= 20 ? value.slice(0, 20).trim() + "..." : value;
    }
  },
  methods: {
    processEventId() {
      if (this.status === 'accepted') {
        this.$emit('push-deleted-event-id', this.event.id);
      }
      if (this.status === 'not_accepted') {
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
    text-align       : center;
    min-width        : 1.5em;
  }

  &:hover {
    background-color : #deeef3;
  }
}

.checkbox {
  //margin : auto;
  //width  : 100%;
  //text-align: center;
  margin-left : $indent;
}
</style>
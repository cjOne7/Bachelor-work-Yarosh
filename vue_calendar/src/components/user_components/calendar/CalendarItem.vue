<template>
  <tr>
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
      datePattern: 'DD.MM.YYYY HH:mm Z'
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
  }
}
</script>

<style scoped lang="scss">
td {
  border  : $border;
  padding : $indent;
}
</style>
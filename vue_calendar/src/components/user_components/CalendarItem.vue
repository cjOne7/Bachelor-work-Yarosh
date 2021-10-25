<template>
  <tr>
    <td>
      {{ event.subject }}
    </td>
    <td>
      {{ event.bodyPreview }}
    </td>
    <td>
      {{ event.attendees | stylizeAttendees }}
    </td>
    <td>
      {{ event.organizer.emailAddress.name }}
    </td>
    <td>
      {{ event.start.dateTime | moment('DD.MM.YYYY HH:mm Z') }}
    </td>
    <td>
      {{ event.end.dateTime | moment('DD.MM.YYYY HH:mm Z') }}
    </td>
  </tr>
</template>

<script>
export default {
  name: "CalendarItem",
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  filters: {
    stylizeAttendees: value => {
      console.log(value);
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
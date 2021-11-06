<template>
  <div>
    <EventsDetailField :field-name="'Subject:'" :field-data="event.subject"/>
    <EventsDetailField :field-name="'Body:'" :field-data="event.bodyPreview | checkForEmpty"/>
    <EventsDetailField :field-name="'Organizer:'" :field-data="event.organizer.emailAddress.name"/>
    <EventsDetailField :field-name="'Attendees:'" :field-data="event.attendees | trimAttendees"/>
    <EventsDetailField :field-name="'Location:'" :field-data="event.location.displayName | checkForEmpty"/>
    <EventsDetailField :field-name="'Start:'" :field-data="event.start.dateTime | dateFormatter"/>
    <EventsDetailField :field-name="'End:'" :field-data="event.end.dateTime | dateFormatter"/>
  </div>
</template>

<script>
import EventsDetailField from "@/components/user_components/calendar/form/EventsDetailField";

export default {
  name: "EventsDetail",
  components: {EventsDetailField},
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
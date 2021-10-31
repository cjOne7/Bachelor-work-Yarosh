<template>
  <tr>
    <td>
      <b-form-checkbox class="checkbox" :id="`checkbox-${event.id}`" v-model="status" :name="`checkbox-${event.id}`"
                       value="accepted" unchecked-value="not_accepted" @change="processEventId"/>
    </td>
    <td v-b-modal="`event-${event.id}-details`" :title="event.subject">{{ event.subject | trimLongString }}</td>
    <td v-b-modal="`event-${event.id}-details`" :title="event.bodyPreview">
      {{ event.bodyPreview === "" ? '-' : event.bodyPreview | trimLongString }}
    </td>
    <td v-b-modal="`event-${event.id}-details`">{{ event.organizer.emailAddress.name }}</td>
    <td v-b-modal="`event-${event.id}-details`">{{
        event.location.displayName === "" ? '-' : event.location.displayName
      }}
    </td>
    <td v-b-modal="`event-${event.id}-details`">{{ event.start.dateTime | moment(datePattern) }}</td>

    <b-modal :id="`event-${event.id}-details`" hide-footer>
      <template #modal-title>Event info</template>
      <EventsDetail :event="event"/>
      <b-button variant="danger" class="m-3" @click="$bvModal.hide(`event-${event.id}-details`)">Close</b-button>
    </b-modal>
  </tr>
</template>

<script>
import EventsDetail from "@/components/user_components/calendar/form/EventsDetail";

export default {
  name: "CalendarItem",
  components: {EventsDetail},
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
    trimLongString(value) {
      const minDisplayedLength = 20;
      return value.length >= minDisplayedLength ? value.slice(0, minDisplayedLength).trim() + "..." : value;
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
    min-width : 1.5em;
  }
}

.checkbox {
  margin-left : $indent;
}
</style>
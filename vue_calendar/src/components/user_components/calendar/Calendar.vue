<template>
  <div>
    <div class="table-wrapper">
      <h1>Calendar</h1>
      <transition name="fade" appear>
        <b-button v-show="isHidden" variant="primary" class="my-1" @click="showAddingNewEventForm">Add new event
        </b-button>
      </transition>

      <transition name="fade" mode="out-in" appear>
        <!--todo update list of events when event has been added-->
        <keep-alive>
          <component :is="currentOption" @show-calendar-events="showCalendarEvents"/>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import CalendarTable from "@/components/user_components/calendar/CalendarTable";
import AddEventForm from "@/components/user_components/calendar/form/AddEventForm";

export default {
  name: "Calendar",
  components: {CalendarTable, AddEventForm},
  data() {
    return {
      currentOption: CalendarTable.name,
    }
  },
  computed: {
    isHidden() {
      return this.currentOption === CalendarTable.name;
    }
  },
  methods: {
    showAddingNewEventForm() {
      this.currentOption = AddEventForm.name;
    },
    showCalendarEvents() {
      this.currentOption = CalendarTable.name;
    }
  }
}
</script>

<style scoped lang="scss">
.table-wrapper {
  width  : 90%;
  margin : auto;
}

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
    border  : $border;
    padding : $indent;
  }
}

</style>
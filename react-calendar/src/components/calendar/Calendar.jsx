import React from 'react';
import {Container} from 'react-bootstrap'
import CalendarTable from "./calendarTable/CalendarTable";

const Calendar = () => {
    return (
        <Container>
            <h1>Calendar</h1>
            <button className={'btn btn-primary'}>Add new event</button>
            <CalendarTable/>
        </Container>
    );
};

export default Calendar;
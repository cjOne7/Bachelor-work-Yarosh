import React, {useState} from 'react';
import {Container} from 'react-bootstrap'
import CalendarTable from "./calendarTable/CalendarTable";
import TableCalendar from "./calendarTable/TableCalendar";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import '../../scss/buttonTransition.css';
import InfoMessage from "../messages/InfoMessage";
import AddingNewEventForm from "./addingNewEventForm/AddingNewEventForm";

const Calendar = () => {
    const [showAddingEventForm, setShowAddingEventForm] = useState(false);
    return (
        <Container>
            <h1>Calendar</h1>
            <TransitionGroup>
                {!showAddingEventForm
                &&
                <CSSTransition classNames={'button'} timeout={1000}>
                    <div>
                        <button className={'btn btn-primary'}
                                onClick={() => setShowAddingEventForm(true)}
                        >
                            Add new event
                        </button>
                    </div>
                </CSSTransition>
                }
            </TransitionGroup>
            {showAddingEventForm
                ?
                <AddingNewEventForm showAddingEventForm={setShowAddingEventForm}/>
                : <div>Calendar table</div>}

            {/*<CalendarTable/>*/}
            {/*<TableCalendar/>*/}
        </Container>
    );
};

export default Calendar;
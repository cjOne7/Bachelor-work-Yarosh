import React from 'react';
import CalendarItem from "./CalendarItem";

const TableBody = ({events, saveDeletedId, popDeletedId}) => {
    return (
        <tbody>
        {events.map(event =>
            <CalendarItem event={event}
                          key={event.id}
                          saveEventId={saveDeletedId}
                          popEventId={popDeletedId}
            />)
        }
        </tbody>
    );
};

export default TableBody;
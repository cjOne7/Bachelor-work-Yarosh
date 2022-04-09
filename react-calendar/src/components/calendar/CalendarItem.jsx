import React from 'react';
import {Form} from 'react-bootstrap';
import './table.css';

const CalendarItem = ({event}) => {
    return (
        <tr>
            <td>
                <Form.Check type={'checkbox'}/>
            </td>
            <td title={event.subject}>
                {event.subject}
            </td>
            <td title={event.bodyPreview}>
                {event.bodyPreview}
            </td>
            <td title={event.organizer.emailAddress.name}>
                {event.organizer.emailAddress.name}
            </td>
            <td title={event.location.displayName}>
                {event.location.displayName}
            </td>
            <td title={event.start.dateTime}>
                {event.start.dateTime}
            </td>
        </tr>
    );
};

export default CalendarItem;
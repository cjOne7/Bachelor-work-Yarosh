import React from 'react';
import {Form} from 'react-bootstrap';
import './table.css';
import moment from "moment";

const CalendarItem = ({event}) => {
    const checkForEmpty = value => value === '' ? '-' : value;
    const dateFormatter = value => moment(value).format('DD.MM.YYYY HH:mm');
    const trimLongString = value => {
        const MIN_DISPLAYED_LENGTH = 20;
        return value.length >= MIN_DISPLAYED_LENGTH ? value.slice(0, MIN_DISPLAYED_LENGTH).trim() + "..." : value;
    };
    return (
        <tr>
            <td>
                <Form.Check type={'checkbox'} className={'checkbox'}/>
            </td>
            <td title={event.subject}>
                {trimLongString(event.subject)}
            </td>
            <td title={event.bodyPreview}>
                {trimLongString(checkForEmpty(event.bodyPreview))}
            </td>
            <td title={event.organizer.emailAddress.name}>
                {trimLongString(event.organizer.emailAddress.name)}
            </td>
            <td title={event.location.displayName}>
                {trimLongString(checkForEmpty(event.location.displayName))}
            </td>
            <td title={event.start.dateTime}>
                {dateFormatter(event.start.dateTime)}
            </td>
        </tr>
    );
};

export default CalendarItem;
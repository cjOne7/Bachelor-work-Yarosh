import React from 'react';
import {Form} from 'react-bootstrap';
import './table.css';
import moment from "moment";

const MIN_DISPLAYED_LENGTH = 20;

const CalendarItem = ({event, saveEventId, popEventId}) => {
    const checkForEmpty = value => value === '' ? '-' : value;
    const dateFormatter = value => moment(value).format('DD.MM.YYYY HH:mm');
    const trimLongString = value =>
        value.length >= MIN_DISPLAYED_LENGTH ? value.slice(0, MIN_DISPLAYED_LENGTH).trim() + "..." : value;

    const processEventId = (e) => {
        if (e.target.checked) {
            saveEventId(event.id);
        } else {
            popEventId(event.id);
        }
    };

    return (
        <tr>
            <td>
                <Form.Check type={'checkbox'}
                            className={'checkbox'}
                            onChange={(e) => processEventId(e)}
                />
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
            <td>
                {dateFormatter(event.start.dateTime)}
            </td>
        </tr>
    );
};

export default CalendarItem;
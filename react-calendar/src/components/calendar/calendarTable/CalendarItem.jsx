import React, {useState} from 'react';
import {Form} from 'react-bootstrap';
import './table.css';
import EventsDetail from "../modal/EventsDetail";
import {checkForEmpty, dateFormatter, trimLongString} from "../filters";

const CalendarItem = ({event, saveEventId, popEventId}) => {
    const [modal, setModal] = useState(false);

    const processEventId = (e) => {
        if (e.target.checked) {
            saveEventId(event.id);
        } else {
            popEventId(event.id);
        }
    };

    return (
        <>
            <tr onClick={() => setModal(true)}>
                <td onClick={e => e.stopPropagation()}>
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
            <EventsDetail visible={modal} setVisible={setModal} event={event}/>
        </>
    );
};

export default CalendarItem;
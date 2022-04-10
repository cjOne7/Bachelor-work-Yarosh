import React from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import EventsDetailField from "./EventsDetailField";
import {checkForEmpty, dateFormatter, trimAttendees} from "../filters";

const EventsDetail = ({visible, setVisible, event}) => {
    const handleClose = () => setVisible(false);
    return (
        <>
            <Modal show={visible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <EventsDetailField text={'Subject:'} value={event.subject}/>
                        <EventsDetailField text={'Body:'} value={checkForEmpty(event.bodyPreview)}/>
                        <EventsDetailField text={'Organizer:'} value={event.organizer.emailAddress.name}/>
                        <EventsDetailField text={'Attendees:'} value={trimAttendees(event.attendees)}/>
                        <EventsDetailField text={'Location:'} value={checkForEmpty(event.location.displayName)}/>
                        <EventsDetailField text={'Start:'} value={dateFormatter(event.start.dateTime)}/>
                        <EventsDetailField text={'End:'} value={dateFormatter(event.end.dateTime)}/>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EventsDetail;
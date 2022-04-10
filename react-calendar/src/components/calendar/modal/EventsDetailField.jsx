import React from 'react';
import {Row, Col} from 'react-bootstrap';

const EventsDetailField = ({text, value}) => {
    return (
        <Row>
            <Col xs={4} md={4}>{text}</Col>
            <Col>{value}</Col>
        </Row>
    );
};

export default EventsDetailField;
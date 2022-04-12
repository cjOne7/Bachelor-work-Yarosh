import React, {useEffect, useState} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import '../../../scss/buttonTransition.css';
import {Form, Button} from 'react-bootstrap';
import InputField from "./formUI/InputField";
import './formUI/inputStyle.css';
import {useSelector} from "react-redux";

const AddingNewEventForm = ({showAddingEventForm}) => {
    const timeZone = useSelector(state => state.graphReducer.timeZone.value);
    const graphClient = useSelector(state => state.graphReducer.graphClient);
    const [event, setEvent] = useState({
        subject: 'Test sub',
        location: {
            displayName: 'Loc'
        },
        start: {
            dateTime: '',
            timeZone: ''
        },
        end: {
            dateTime: '',
            timeZone: ''
        },
        body: {
            contentType: 'HTML',
            content: 'Cont'
        }
    });
    const [startDay, setStartDay] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDay, setEndDay] = useState('');
    const [endTime, setEndTime] = useState('');

    const buildDate = (day, time) => `${day}T${time}`;

    async function createEvent(e) {
        e.preventDefault();
        const start = buildDate(startDay, startTime);
        const end = buildDate(endDay, endTime);

        console.log("Start: " + start);
        console.log("End: " + end);

        setEvent({
            ...event,
            start: {dateTime: start, timeZone: timeZone},
            end: {dateTime: end, timeZone: timeZone}
        });
        // event.start.timeZone = event.end.timeZone = timeZone;
        // event.start.dateTime = start;
        // event.end.dateTime = end;

        console.log(event);
        // if (event.subject.length) {
        //     await graphClient.api('/me/events')
        //         .header('Prefer', `outlook.timezone="${timeZone}"`)
        //         .post(event)
        //         .catch(err => console.log(err));
        // }
    }

    useEffect(() => {
        const date = new Date();
        const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        const dateTime = isoDateTime.split('T');
        const day = dateTime[0];
        const time = dateTime[1].slice(0, -8);
        setStartDay(day);
        setEndDay(day);
        setStartTime(time);
        setEndTime(time);

        const start = buildDate(startDay, startTime);
        const end = buildDate(endDay, endTime);

        setEvent({
            ...event,
            start: {dateTime: start, timeZone: timeZone},
            end: {dateTime: end, timeZone: timeZone}
        });
    }, []);

    const setBodyContent = e => setEvent({
        ...event, body:
            {
                ...event.body,
                content: e.target.value
            }
    });

    return (
        <>
            <TransitionGroup>
                <CSSTransition timeout={1000} classNames={'button'}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicSubject">
                            <Form.Label>Subject:</Form.Label>
                            <Form.Control placeholder="Enter subject" value={event.subject}
                                          onChange={e => setEvent({...event, subject: e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Location:</Form.Label>
                            <Form.Control placeholder="Enter subject" value={event.location.displayName}
                                          onChange={e => setEvent({...event, location: {displayName: e.target.value}})}
                            />
                        </Form.Group>

                        <div className="time-container">
                            <Form.Group className="mb-3 date-time-picker" controlId="formBasicStartDay">
                                <Form.Label>Start day:</Form.Label>
                                <Form.Control type="date" value={startDay}
                                              onChange={e => setStartDay(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 date-time-picker" controlId="formBasicStartTime">
                                <Form.Label>Start time:</Form.Label>
                                <Form.Control type="time" value={startTime}
                                              onChange={e => setStartTime(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <div className="time-container">
                            <Form.Group className="mb-3 date-time-picker" controlId="formBasicEndDay">
                                <Form.Label>End day:</Form.Label>
                                <Form.Control type="date" value={endDay}
                                              onChange={e => setEndDay(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 date-time-picker" controlId="formBasicEndTime">
                                <Form.Label>End time:</Form.Label>
                                <Form.Control type="time" value={endTime}
                                              onChange={e => setEndTime(e.target.value)}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicLocation">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control placeholder="Enter content" as="textarea" style={{height: '100px'}}
                                          value={event.body.content}
                                          onChange={e => setBodyContent(e)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginRight: 8}}
                                onClick={(e) => createEvent(e)}>
                            Create
                        </Button>
                        <Button variant="danger" type="reset" onClick={() => showAddingEventForm(false)}>
                            Back
                        </Button>
                    </Form>
                </CSSTransition>
            </TransitionGroup>
            <div>Start {event.start.dateTime}</div>
            <div>End {event.end.dateTime}</div>
        </>
    );
};

export default AddingNewEventForm;
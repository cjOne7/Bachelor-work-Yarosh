import React, {useState} from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import '../../../scss/buttonTransition.css';
import {Form, Button} from 'react-bootstrap';
import InputField from "./formUI/InputField";
import './formUI/inputStyle.css';

const AddingNewEventForm = ({showAddingEventForm}) => {
    const [event, setEvent] = useState({});

    function createEvent() {

    }

    return (
        <>
            <TransitionGroup>
                <CSSTransition timeout={1000} classNames={'button'}>
                    <Form>
                        <InputField inputName={'subject'} inputBottomText={'Please, enter something.'}/>
                        <InputField inputName={'location'}/>

                        <div className={'time-container'}>
                            <InputField inputName={'start date'} type="date" className={'date-time-picker'}/>
                            <InputField inputName={'start time'} type="time" className={'date-time-picker'}/>
                        </div>
                        <div className={'time-container'}>
                            <InputField inputName={'end date'} type="date" className={'date-time-picker'}/>
                            <InputField inputName={'end time'} type="time" className={'date-time-picker'}/>
                        </div>

                        <InputField inputName={'content'} as="textarea" style={{height: '100px'}}/>

                        <Button variant="primary" type="submit" style={{marginRight: 8}} onClick={() => createEvent()}>
                            Create
                        </Button>
                        <Button variant="danger" type="reset" onClick={() => showAddingEventForm(false)}>
                            Back
                        </Button>
                    </Form>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
};

export default AddingNewEventForm;
import React from 'react';
import '../../../scss/buttonTransition.css';
import {Form, Button} from 'react-bootstrap';
import './formUI/inputStyle.css';
import {connect} from "react-redux";
import InputField from "./formUI/InputField";
import DatePicker from "./formUI/DatePicker";
import TextArea from "./formUI/TextArea";
import InfoMessage from "../../messages/InfoMessage";
import "../../messages/messages.css";

class AddingNewEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            created: false,
            event: {
                subject: '',
                location: {
                    displayName: ''
                },
                start: {
                    dateTime: '',
                    timeZone: this.props.timeZone
                },
                end: {
                    dateTime: '',
                    timeZone: this.props.timeZone
                },
                body: {
                    contentType: 'HTML',
                    content: ''
                }
            },
            startDay: '',
            startTime: '',
            endDay: '',
            endTime: ''
        }
    }

    getCurrentDayAndTime() {
        const date = new Date();
        const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
        const dateTime = isoDateTime.split('T');
        return [dateTime[0], dateTime[1].slice(0, -8)];
    }

    componentDidMount() {
        const [day, time] = this.getCurrentDayAndTime();
        this.setStartDay(day);
        this.setEndDay(day);
        this.setStartTime(time);
        this.setEndTime(time);
        this.setStartDate(this.buildDate(day, time));
        this.setEndDate(this.buildDate(day, time));
    }

    buildDate = (day, time) => `${day}T${time}`;

    setBodyContent = value => this.setState(prevState => ({
        event: {
            ...prevState.event,
            body: {
                ...prevState.event.body,
                content: value
            }
        }
    }));
    setSubject = value => this.setState({
        event: {
            ...this.state.event,
            subject: value
        }
    })
    setLocation = value => this.setState({
        event: {
            ...this.state.event,
            location: {displayName: value}
        }
    })

    setEndDate = end => this.setState(prevState => ({
        event: {
            ...prevState.event,
            end: {
                ...prevState.event.end,
                dateTime: end
            }
        }
    }));

    setEndDay = value => this.setState({endDay: value})
    setEndTime = value => this.setState({endTime: value})

    setStartDate = start => this.setState(prevState => ({
        event: {
            ...prevState.event,
            start: {
                ...prevState.event.start,
                dateTime: start
            }
        }
    }))

    setStartDay = value => this.setState({startDay: value})
    setStartTime = value => this.setState({startTime: value})

    async createEvent(e) {
        e.preventDefault();
        const start = this.buildDate(this.state.startDay, this.state.startTime);
        const end = this.buildDate(this.state.endDay, this.state.endTime);

        this.setState(prevState => ({
            event: {
                ...prevState.event,
                start: {
                    ...prevState.event.start,
                    dateTime: start
                },
                end: {
                    ...prevState.event.end,
                    dateTime: end
                }
            }
        }), async () => {
            if (this.state.event.subject.length) {
                await this.props.graphClient.api('/me/events')
                    .header('Prefer', `outlook.timezone="${this.props.timeZone}"`)
                    .post(this.state.event)
                    .then(() => {
                        this.clearInputs();
                        this.state.created = true;
                        setTimeout(() => {
                            this.state.created = false;
                        }, 2000);
                    })
                    .catch(err => console.log(err));
            }
        });
    }

    clearInputs() {
        this.setSubject('');
        this.setLocation('');
        this.setBodyContent('');
    }

    render() {
        let {showAddingEventForm} = this.props;

        return (
            <>
                <Form>
                    <InputField inputName={'subject'} inputValue={this.state.event.subject}
                                setInputValue={this.setSubject}/>
                    <InputField inputName={'location'} inputValue={this.state.event.location.displayName}
                                setInputValue={this.setLocation}/>

                    <div className="time-container">
                        <DatePicker inputName={'StartDay'} inputLabel={'Start day:'} inputType={'date'}
                                    inputValue={this.state.startDay} setInputValue={this.setStartDay}/>
                        <DatePicker inputName={'StartTime'} inputLabel={'Start time:'} inputType={'time'}
                                    inputValue={this.state.startTime} setInputValue={this.setStartTime}/>
                    </div>
                    <div className="time-container">
                        <DatePicker inputName={'EndDay'} inputLabel={'End day:'} inputType={'date'}
                                    inputValue={this.state.endDay} setInputValue={this.setEndDay}/>
                        <DatePicker inputName={'EndTime'} inputLabel={'End time:'} inputType={'time'}
                                    inputValue={this.state.endTime} setInputValue={this.setEndTime}/>
                    </div>

                    <TextArea inputName={'Content'} inputValue={this.state.event.body.content}
                              setInputValue={this.setBodyContent}/>
                    <Button variant="primary" type="submit" style={{marginRight: 8}}
                            onClick={e => this.createEvent(e)}>
                        Create
                    </Button>
                    <Button variant="danger" type="reset" onClick={() => showAddingEventForm(false)}>
                        Back
                    </Button>
                </Form>
                {
                    !this.state.created ?
                        <InfoMessage className={'info-message'}>Event has been successfully created!</InfoMessage> :
                        <span></span>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    graphClient: state.graphReducer.graphClient,
    timeZone: state.graphReducer.timeZone.value
})

export default connect(mapStateToProps, null)(AddingNewEventForm);
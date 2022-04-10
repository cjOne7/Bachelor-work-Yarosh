import React from 'react';
import {connect} from "react-redux";
import {callMsGraphApi} from "../../store/graph/graphReducer";
import CalendarItem from "./CalendarItem";
import './table.css';
import Loader from "../loader/Loader";

class CalendarTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventIds: [],
            loading: true
        }
    }

    componentDidMount() {
        const queryFields = ['subject', 'bodyPreview', 'attendees', 'organizer', 'location', 'start', 'end'];

        const queryOptions = {
            path: '/me/events',
            selectedParams: queryFields.join(),
            orderByParams: 'createdDateTime DESC'
        };
        this.props.callMsGraphApi(queryOptions)
            .then(resp => {
                this.setState({events: resp.value});
                this.setState({loading: false});
            }).catch(err => console.log(err));
    }

    deleteChosenEvents = async () => {
        let arr = this.state.events;
        for (let i = 0; i < this.state.eventIds.length; i++) {
            const eventId = this.state.eventIds[i];
            await this.props.graphClient.api(`/me/events/${eventId}`).delete();
            arr = arr.filter(event => event.id !== eventId);
        }
        this.setState({eventIds: []});
        this.setState({events: arr});
    };

    popDeletedId = eventId => {
        this.setState({eventIds: this.state.eventIds.filter(id => id !== eventId)});
    };

    saveDeletedId = eventId => {
        if (!this.state.eventIds.includes(eventId)) {
            this.setState({eventIds: [...this.state.eventIds, eventId]});
        }
    };

    render() {
        return (
            <>
                {this.state.loading ? <Loader/>
                    : this.state.events.length
                        ? <>
                            <table>
                                <thead>
                                <tr>
                                    <th scope={'col'}></th>
                                    <th scope={'col'}>Subject</th>
                                    <th scope={'col'}>Body</th>
                                    <th scope={'col'}>Organizer</th>
                                    <th scope={'col'}>Location</th>
                                    <th scope={'col'}>Start</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.events.map(event =>
                                        <CalendarItem event={event}
                                                      key={event.id}
                                                      saveEventId={this.saveDeletedId}
                                                      popEventId={this.popDeletedId}
                                        />)
                                }
                                </tbody>
                            </table>
                            {
                                this.state.eventIds.length
                                    ?
                                    <button className={'btn btn-danger mt-2'}
                                            onClick={() => this.deleteChosenEvents()}
                                    >
                                        Delete selected elements
                                    </button>
                                    : <span></span>
                            }
                        </>
                        : <div><strong style={{fontSize: '1.2em'}}>No events!</strong></div>
                }
            </>
        );
    }
}

const mapStateToProps = state => ({
    graphClient: state.graphReducer.graphClient
})

const mapDispatchToProps = {
    callMsGraphApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTable);
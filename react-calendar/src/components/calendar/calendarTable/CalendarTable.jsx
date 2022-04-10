import React from 'react';
import {connect} from "react-redux";
import './table.css';
import '../../messages/messages.css';
import '../../../scss/buttonTransition.css';
import {callMsGraphApi} from "../../../store/graph/graphReducer";
import CalendarItem from "./CalendarItem";
import Loader from "../../loader/Loader";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import InfoMessage from "../../messages/InfoMessage";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

class CalendarTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            eventIds: [],
            loading: false,
            loadError: ''
        }
    }

    async componentDidMount() {
        const queryFields = ['subject', 'bodyPreview', 'attendees', 'organizer', 'location', 'start', 'end'];

        const queryOptions = {
            path: '/me/events',
            selectedParams: queryFields.join(),
            orderByParams: 'createdDateTime DESC'
        };
        try {
            this.setState({loading: true});
            await this.props.callMsGraphApi(queryOptions)
                .then(resp => {
                    this.setState({events: resp.value});
                });
        } catch (e) {
            this.setState({loadError: e.message});
        } finally {
            this.setState({loading: false});
        }
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

    popDeletedId = eventId => this.setState({eventIds: this.state.eventIds.filter(id => id !== eventId)});
    saveDeletedId = eventId => {
        if (!this.state.eventIds.includes(eventId)) {
            this.setState({eventIds: [...this.state.eventIds, eventId]});
        }
    };

    render() {
        if (this.state.loading) {
            return <Loader/>;
        } else if (this.state.events.length) {
            return <>
                <table>
                    <TableHead/>
                    <TableBody events={this.state.events}
                               popDeletedId={this.popDeletedId}
                               saveDeletedId={this.saveDeletedId}
                    />
                </table>
                <TransitionGroup>
                    {
                        this.state.eventIds.length
                        &&
                        <CSSTransition timeout={1000} classNames={'button'} mountOnEnter unmountOnExit>
                            <div>
                                <button className={'btn btn-danger mt-2'}
                                        onClick={() => this.deleteChosenEvents()}
                                >
                                    Delete selected elements
                                </button>
                            </div>
                        </CSSTransition>
                    }
                </TransitionGroup>
            </>
        } else if (this.state.loadError.length) {
            return <InfoMessage className={'alert-message'}>{this.state.loadError}</InfoMessage>
        } else {
            return <InfoMessage className={'info-message'}>No events!</InfoMessage>;
        }
    }
}

const mapStateToProps = state => ({
    graphClient: state.graphReducer.graphClient
})

const mapDispatchToProps = {
    callMsGraphApi
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarTable);
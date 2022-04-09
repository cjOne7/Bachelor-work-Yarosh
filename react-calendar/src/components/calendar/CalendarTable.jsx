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

    render() {
        return (
            <div>
                {this.state.loading
                    ? <Loader/>
                    : <table>
                        <tr>
                            <th scope={'col'}></th>
                            <th scope={'col'}>Subject</th>
                            <th scope={'col'}>Body</th>
                            <th scope={'col'}>Organizer</th>
                            <th scope={'col'}>Location</th>
                            <th scope={'col'}>Start</th>
                        </tr>
                        {this.state.events.map(event => <CalendarItem event={event} key={event.id}/>)}
                    </table>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {
    callMsGraphApi
}

export default connect(null, mapDispatchToProps)(CalendarTable);
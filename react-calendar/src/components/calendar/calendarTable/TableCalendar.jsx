import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {callMsGraphApi} from "../../../store/graph/graphReducer";
import Loader from "../../loader/Loader";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import InfoMessage from "../../messages/InfoMessage";
import "../../messages/messages.css";

const TableCalendar = () => {
    const dispatch = useDispatch();
    const graphClient = useSelector(state => state.graphReducer.graphClient);
    const [events, setEvents] = useState([]);
    const [eventIds, setEventIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        async function fetchEvents() {
            const queryOptions = {
                path: '/me/events',
                selectedParams: ['subject', 'bodyPreview', 'attendees', 'organizer', 'location', 'start', 'end'],
                orderByParams: 'createdDateTime DESC'
            };
            setIsLoading(true);
            dispatch(callMsGraphApi(queryOptions)).then(resp => {
                setEvents(resp.value);
                setIsLoading(false);
            });
        }

        fetchEvents().catch(err => setLoadError(err));
    }, []);

    const deleteChosenEvents = async () => {
        let arr = events;
        for (let i = 0; i < eventIds.length; i++) {
            const eventId = eventIds[i];
            await graphClient.api(`/me/events/${eventId}`).delete();
            arr = arr.filter(event => event.id !== eventId);
        }
        setEventIds([]);
        setEvents(arr);
    };

    const popDeletedId = eventId => setEventIds(eventIds.filter(id => id !== eventId));
    const saveDeletedId = eventId => {
        if (!eventIds.includes(eventId)) {
            setEventIds([...eventIds, eventId]);
        }
    };
    return (
        <>
            {
                isLoading ? <Loader/> :
                    events.length ?
                        <>
                            <table>
                                <TableHead/>
                                <TableBody events={events}
                                           saveDeletedId={saveDeletedId}
                                           popDeletedId={popDeletedId}
                                />
                            </table>
                            <TransitionGroup>
                                {
                                    eventIds.length
                                    &&
                                    <CSSTransition timeout={1000} classNames={'button'} mountOnEnter unmountOnExit>
                                        <div>
                                            <button className={'btn btn-danger mt-2'}
                                                    onClick={() => deleteChosenEvents()}
                                            >
                                                Delete selected elements
                                            </button>
                                        </div>
                                    </CSSTransition>
                                }
                            </TransitionGroup>
                        </>
                        : <InfoMessage className={'info-message'}>No events!</InfoMessage>
            }
            {loadError.length ? <InfoMessage className={'info-message'}>{loadError}</InfoMessage> : <span></span>}
        </>
    );
};

export default TableCalendar;
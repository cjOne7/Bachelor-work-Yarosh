import {SET_GRAPH_CLIENT, SET_TIMEZONE, SET_USER} from "./graphConstants";
import {Client} from '@microsoft/microsoft-graph-client'

const initialState = {
    graphClient: {},
    user: {},
    timeZone: {}
}

export const graphReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GRAPH_CLIENT:
            return {
                ...state, graphClient: Client.init({
                    authProvider: done => done('error throw by the authentication handler', action.payload)
                })
            }
        case SET_TIMEZONE:
            return {...state, timeZone: action.payload}
        case SET_USER:
            return {...state, user: action.payload}
        default:
            return state;
    }
}

export const receiveUserInfoAction = () => {
    return async (dispatch, getState) => {
        const {graphClient} = getState().graphReducer;
        const user = await graphClient.api('/me').get();
        dispatch(setUserAction(user));
        dispatch(receivePreferredTimezoneAction());
    }
}

export const receivePreferredTimezoneAction = () => {
    return async (dispatch, getState) => {
        const {graphClient} = getState().graphReducer;
        const timeZone = await graphClient.api('/me/mailboxSettings/timeZone').get();
        dispatch(setTimezoneAction(timeZone));
    }
}

export const callMsGraphApi = ({path, selectedParams, orderByParams}) => {
    return async (dispatch, getState) => {
        const {timeZone, graphClient} = getState().graphReducer;
        return await graphClient
            .api(path)
            .header('Prefer',
                `outlook.timezone="${timeZone.value || Intl.DateTimeFormat().resolvedOptions().timeZone}"`)
            .select(selectedParams)
            .orderby(orderByParams)
            .get();
    }
}

export const setGraphClientAction = accessToken => ({type: SET_GRAPH_CLIENT, payload: accessToken});
export const setTimezoneAction = timezone => ({type: SET_TIMEZONE, payload: timezone});
export const setUserAction = user => ({type: SET_USER, payload: user});
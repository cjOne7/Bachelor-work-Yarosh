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
        const {isAuthenticated} = getState().authReducer;
        console.log(isAuthenticated);
        // const user = await graphClient.api('/me').get();
    }
}

export const setGraphClientAction = accessToken => ({type: SET_GRAPH_CLIENT, payload: accessToken});
export const setTimezoneAction = timezone => ({type: SET_TIMEZONE, payload: timezone});
export const setUserAction = user => ({type: SET_USER, payload: user});
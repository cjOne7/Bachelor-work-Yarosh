import {SET_GRAPH_CLIENT} from "./graphConstants";
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
        default:
            return state;
    }
}

export const setGraphClientAction = accessToken => ({type: SET_GRAPH_CLIENT, payload: accessToken});
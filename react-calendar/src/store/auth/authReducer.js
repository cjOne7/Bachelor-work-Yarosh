import {PublicClientApplication} from "@azure/msal-browser";
import {receiveUserInfoAction, setGraphClientAction} from "../graph/graphReducer";
import {SET_AUTH_RESULT, SET_IS_AUTH, SET_MSAL_INSTANCE, SIGN_OUT} from "./authConstants";

const initialState = {
    authResult: {},
    msalInstance: {},
    isAuthenticated: false
}

const loginRequest = {
    scopes: ['User.Read', 'mailboxsettings.read', 'calendars.readwrite']
};

const config = {
    auth: {
        clientId: "c37c11b2-19c2-47da-be21-ff8db73c78ac",
        authority: "https://login.microsoftonline.com/common", //Sign in users with work and school accounts or personal Microsoft accounts.
        redirectUri: "http://localhost:3000"
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
    }
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_RESULT:
            return {...state, authResult: action.payload}
        case SET_MSAL_INSTANCE:
            return {...state, msalInstance: action.payload}
        case SET_IS_AUTH:
            return {...state, isAuthenticated: !state.isAuthenticated}
        case SIGN_OUT:
            return {...state}
        default:
            return state;
    }
}

export const signInAction = () => {
    return async dispatch => {
        try {
            const msalInstance = new PublicClientApplication(config);
            dispatch(setMsalInstanceAction(msalInstance));

            await msalInstance.loginPopup(loginRequest)
                .then(loginResponse => {
                    dispatch(setAuthResultAction(loginResponse));
                    dispatch(setIsAuthAction());
                    dispatch(setGraphClientAction(loginResponse.accessToken));
                }).then(() => {
                    dispatch(receiveUserInfoAction());
                });
        } catch (e) {
            console.log("Login error: " + e.message);
        }
    }
}

export const singOutAction = () => {
    return async (dispatch, getState) => {
        const {msalInstance, authResult} = getState().authReducer;
        try {
            const logoutRequest = {
                account: msalInstance.getAccountByUsername(authResult.account.username),
                mainWindowRedirectUri: config.auth.redirectUri
            }
            await msalInstance.logoutPopup(logoutRequest)
                .then(() => dispatch(setIsAuthAction()));
        } catch (e) {
            console.log("Logout error: " + e.message);
        }
    }
}

export const setAuthResultAction = (authResult) => ({type: SET_AUTH_RESULT, payload: authResult})
export const setMsalInstanceAction = (msalInstance) => ({type: SET_MSAL_INSTANCE, payload: msalInstance})
export const setIsAuthAction = () => ({type: SET_IS_AUTH})
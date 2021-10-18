import {PublicClientApplication} from "@azure/msal-browser";

export default {
    state: {
        isAuthenticated: false,
        loginRequest: {
            scopes: ['User.Read', 'mailboxsettings.read', 'calendars.readwrite']
        },
        config: {
            auth: {
                clientId: "e1cda4f7-1bd6-4f91-8959-5cad3e656b25",
                authority: "https://login.microsoftonline.com/common", //Sign in users with work and school accounts or personal Microsoft accounts.
                redirectUri: "http://localhost:8080"
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: false
            }
        },
        msalInstance: {},
        authResult: {}
    },
    mutations: {
        changeAuthState(state) {
            state.isAuthenticated = !state.isAuthenticated;
        },
        setAuthResult(state, authResult) {
            state.authResult = authResult;
        }
    },
    actions: {
        async signIn({commit, state}) {
            state.msalInstance = new PublicClientApplication(state.config);
            await state.msalInstance.loginPopup(state.loginRequest)
                .then(async loginResponse => {
                    commit('setAuthResult', loginResponse);
                    // console.log(loginResponse);
                    commit('changeAuthState');
                    commit('setGraphClient', loginResponse.accessToken);
                })
                .catch(err => console.log(err));
        },
        async signOut({commit, state}) {
            const logoutRequest = {
                account: state.msalInstance.getAccountByUsername(state.authResult.account.username),
                mainWindowRedirectUri: state.config.auth.redirectUri
            }
            await state.msalInstance.logoutPopup(logoutRequest).then(() => commit('changeAuthState'))
                .catch(err => console.log(err));
        }
    },
    getters: {
        getAuthenticationState: state => state.isAuthenticated,
        getAuthResult: state => state.authResult
    }
}
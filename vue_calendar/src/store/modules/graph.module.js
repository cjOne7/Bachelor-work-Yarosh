import {Client} from "@microsoft/microsoft-graph-client";

export default {
    state: {
        graphClient: {},
        user: {},
        timeZone: {}
    },
    mutations: {
        setGraphClient(state, accessToken) {
            state.graphClient = Client.init({
                authProvider: done => done("error throw by the authentication handler", accessToken)
            });
        },
        setUser(state, user) {
            state.user = user;
        },
        setTimeZone(state, timeZone) {
            state.timeZone = timeZone;
        }
    },
    actions: {
        //https://docs.microsoft.com/en-us/graph/query-parameters
        async callMsGraphApi(context, {path, selectedParams, orderByParams}) {
            return await context.state.graphClient
                .api(path)
                .header('Prefer',
                    `outlook.timezone="${context.state.timeZone.value || Intl.DateTimeFormat().resolvedOptions().timeZone}"`)
                .select(selectedParams)
                .orderby(orderByParams)
                .get();
        },
        //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
        async receiveUserInfo({state, commit, dispatch}) {
            if (state.graphClient instanceof Client) {
                const user = await state.graphClient.api('/me').get();
                commit('setUser', user);
                dispatch('receivePreferredTimeZone');
            }
        },
        async receivePreferredTimeZone({state, commit}) {
            const timeZone = await state.graphClient.api('/me/mailboxSettings/timeZone').get();
            commit('setTimeZone', timeZone);
        }
    },
    getters: {
        getGraphClient: state => state.graphClient,
        getUser: state => state.user,
        getTimeZone: state => state.timeZone
    }
}
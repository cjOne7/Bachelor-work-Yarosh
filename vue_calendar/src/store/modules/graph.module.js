import {Client} from "@microsoft/microsoft-graph-client";

export default {
    state: {
        graphClient: {},
        user: {}
    },
    mutations: {
        setGraphClient(state, accessToken) {
            state.graphClient = Client.init({
                authProvider: done => done("error throw by the authentication handler", accessToken)
            });
        },
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async callMsGraphApi(context, path, queryParams, orderByParams) {
            return await context.state.graphClient.api(path).select(queryParams).orderby(orderByParams).get();
        },
        async receiveUserInfo({state, commit}) {
            if (state.graphClient instanceof Client) {
                const user = await state.graphClient.api('/me').get();
                commit('setUser', user);
            }
        }
    },
    getters: {
        getGraphClient: state => state.graphClient,
        getUser: state => state.user
    }
}
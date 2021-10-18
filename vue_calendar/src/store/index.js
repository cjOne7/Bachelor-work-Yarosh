import Vue from 'vue';
import Vuex from 'vuex';
import auth_module from '@/store/modules/auth.module';
import graph_module from '@/store/modules/graph.module';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth_module,
        graph_module
    }
})
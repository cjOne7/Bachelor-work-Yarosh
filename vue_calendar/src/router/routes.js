import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: () => import('@/components/NotFound')
        },
        {
            path: '/',
            component: () => import('@/components/Home'),
            name: 'Home'
        },
        {
            path: '/user/:name',
            component: () => import('@/components/User'),
            name: 'User'
        }
    ]
});
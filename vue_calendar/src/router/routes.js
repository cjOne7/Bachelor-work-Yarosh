import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Navbar from "@/components/Navbar";
import Home from "@/components/Home";
import Calendar from "@/components/Calendar";
import Profile from "@/components/Profile";
import Jumbotron from "@/components/Jumbotron";

Vue.use(VueRouter);

function beforeEnterToComponent(to, from, next) {
    if (store.getters.getAuthenticationState) {
        next();
    } else {
        next({name: 'Home'});
    }
}

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            component: () => import('@/components/NotFound'),
        },
        {
            path: '/',
            component: Home,
            name: 'Home',
            components: {
                navbar: Navbar,
                home: Home
            },
            children: [
                {
                    path: 'profile',
                    component: Profile,
                    name: 'Profile',
                    beforeEnter: (to, from, next) => beforeEnterToComponent(to, from, next),
                    components: {
                        profile: Profile
                    }
                },
                {
                    path: 'calendar',
                    component: Calendar,
                    name: 'Calendar',
                    beforeEnter: (to, from, next) => beforeEnterToComponent(to, from, next),
                    components: {
                        calendar: Calendar
                    }
                },
                {
                    path: '',
                    component: Home,
                    components: {
                        jumbotron: Jumbotron
                    }
                }
            ]
        }
    ]
});
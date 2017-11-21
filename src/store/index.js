import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import resource from './modules/resource';
import getters from './getters';
import userList from "./modules/userList";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        userList,
        resource,
        permission
    },
    getters
});

export default store;

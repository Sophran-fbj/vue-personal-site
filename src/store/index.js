import Vuex from 'vuex';
import banner from './banner';
import project from './project';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        banner,
        project,
    },
    strict: true,
});
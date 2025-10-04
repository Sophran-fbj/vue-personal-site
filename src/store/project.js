import { getProjects } from '@/api/project';
export default {
    namespaced: true,
    state: {
        loading: false,
        data: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setProjects(state, payload) {
            state.data = payload;
        },
    },
    actions: {
        async fetchProjects(ctx){
            if(ctx.state.data.length){
                return;
            }
            ctx.commit('setLoading', true);
            const resp = await getProjects();
            ctx.commit('setLoading', false);
            ctx.commit('setProjects', resp);
        }
    }
}
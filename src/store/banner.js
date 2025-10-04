import { getBanners } from '@/api/banner';
export default {
    namespaced: true,
    state: {
        loading: false,
        banners: [],
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload;
        },
        setBanners(state, payload) {
            state.banners = payload;
        },
    },
    actions: {
        async fetchBanners(ctx){
            if(ctx.state.banners.length){
                return;
            }
            ctx.commit('setLoading', true);
            const resp = await getBanners();
            ctx.commit('setLoading', false);
            ctx.commit('setBanners', resp);
        }
    }
}
import Vue from "vue";
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode:'history'
});

router.afterEach((to) => {
  document.title = `${to.meta.title}-Sophran个人空间`;
});

export default router;
import Vue from 'vue';
import App from './App.vue';
import './eventBus';
import './styles/global.less';
import router from './router';
import store from './store';
import './mock';
import Loading from './directives/loading';
import Lazy from './directives/lazy';
import { showMessage } from "./utils";
Vue.prototype.$showMessage = showMessage;
Vue.directive('loading', Loading);
Vue.directive('lazy', Lazy);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

Vue.config.devtools = true;

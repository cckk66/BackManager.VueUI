import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'normalize.css/normalize.css';
import store from '@/store';
import '@/registerServiceWorker';
import '@/plugins/element.ts';
import '@/styles/index.less';
import '@/icons';
import './permission';
import '@/utils/vueExtend.ts';
//  import './mock';
// import VueRouter, { RawLocation } from 'vue-router';
// const routerPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location: RawLocation) {
//     return routerPush.call(this, location).catch(error => error);
// }


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

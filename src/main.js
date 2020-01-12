import Vue from 'vue';
import App from './App.vue';
import { router } from '@/plugins/router';
import { apolloProvider } from '@/plugins/apollo';

import '@/assets/css/tailwind.css';
import '@/plugins/logger';

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import { router } from '@/router';
import { apolloProvider } from '@/plugins/apollo';

import '@/plugins/logger';
import '@/plugins/buefy';

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css'
import keyword_full from '@/directives/keyword-full'
import keyword_simple from '@/directives/keyword-simple'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.directive('keyword_full', keyword_full)
Vue.directive('keyword_simple', keyword_simple)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

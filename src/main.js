import Vue from 'vue'
import App from './App.vue'
import { Table, TableColumn, Checkbox, CheckboxGroup, Radio, RadioGroup } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)

new Vue({
  render: h => h(App),
}).$mount('#app')

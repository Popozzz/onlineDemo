import Vue from 'vue'

import * as directives from '@/directives/index'

// 注册指令
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]))
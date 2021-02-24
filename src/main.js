/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import '@/assets/less/theme.less';
import echarts from 'echarts';
import Storage from '@/plugins/storage';
import common from '@/plugins/commons'; // 引入公共js
import regex from '@/plugins/regex';
import store from './store';
import router from './router';
import '@/api/axios.config'; // 引入正则js

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ViewUI, Storage); // 请求工具
Vue.prototype.$common = common;
Vue.prototype.$regex = regex;
// Create a global Event Bus
const EventBus = new Vue();
// Add to Vue properties by exposing a getter for $bus
Object.defineProperties(Vue.prototype, {
    $bus: {
        get() {
            return EventBus;
        },
    },
});
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
router.beforeEach((to, from, next) => { // 导航守卫
    // console.log(to, from)
    if (to.name !== 'login' && to.name !== 'loginPath' && to.name !== 'home') {
        if (Storage.get('routerArr').indexOf(to.name) === -1) { // 如果当前路由不在权限路由数组中进行提醒
            ViewUI.Message.error({
                content: '当前登录用户无该页面权限或该页面不存在，请确认后重试！',
                duration: 5,
            });
            router.push(from.name);
            next(false);
        } else {
            next();
        }
    } else {
        next();
    }
});
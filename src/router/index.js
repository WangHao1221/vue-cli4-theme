import Vue from 'vue'
import Router from 'vue-router'
import templateManage from './template.route'

Vue.use(Router)

export default new Router({
    // mode: 'history', bigDataBoard
    routes: [{
            path: '/',
            name: 'login',
            component: () =>
                import ('@/components/login'),
            meta: {
                title: '登录'
            }
        },
        {
            path: '/main',
            name: 'main',
            component: () =>
                import ('@/components/main/main'),
            redirect: { name: 'home' },
            children: [{
                    path: 'home',
                    name: 'home',
                    meta: {
                        title: '首页'
                    },
                    component: () =>
                        import ('@/views/home')
                },
                templateManage
            ]
        }
    ]
})
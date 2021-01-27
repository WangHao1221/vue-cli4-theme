import templateIndexView from '@/views/template/index'
export default {
    path: '/template',
    name: 'template',
    meta: {
        title: '模板系统'
    },
    component: templateIndexView,
    children: [{
        path: 'templateManage',
        name: 'templateManage',
        meta: {
            title: '模板管理'
        },
        component: () =>
            import ('@/views/template/templateManage.vue')
    }]
}
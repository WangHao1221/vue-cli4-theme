import parentView from '@/components/main/parent-view'
export default {
    path: '/template',
    name: 'template',
    meta: {
        title: '模板系统管理'
    },
    component: parentView,
    children: [{
        path: 'templateManage',
        name: 'templateManage',
        meta: {
            title: '模板管理'
        },
        component: () =>
            import ('@/views/template/templateManage.vue')
    }, {
        path: 'docManage',
        name: 'docManage',
        meta: {
            title: '文档管理'
        },
        component: () =>
            import ('@/views/template/docManage.vue')
    }]
}
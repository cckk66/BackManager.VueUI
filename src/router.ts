import Vue from 'vue';
import Router from 'vue-router';
import Layout from './views/layout/Layout.vue';

Vue.use(Router);
export default new Router({
    routes: [
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */'./views/login/index.vue'),
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    name: 'Home',
                    component: () => import('./views/home/index.vue'),
                    meta: { title: 'Home', icon: 'home', noCache: true },
                },
            ],
        },
        {
            path: '/sys',
            component: Layout,
            redirect: '/sys/FZGL',
            name: '系统管理',
            meta: { title: '系统管理', icon: 'example' },
            children: [
                {
                    path: 'YHGL',
                    name: '用户管理',
                    component: () => import('./views/sys/sysUser/index.vue'),
                    meta: { title: '用户管理', icon: 'table' },
                },
                {
                    path: 'FZGL',
                    name: '分组管理',
                    component: () => import('./views/sys/sysGroup/index.vue'),
                    meta: { title: '分组管理', icon: 'table' },
                },
                {
                    path: 'CCGL',
                    name: '菜单管理',
                    component: () => import('./views/sys/sysMenu/index.vue'),
                    meta: { title: '菜单管理', icon: 'table' },
                },
                {
                    path: 'XTXX',
                    name: '系统消息',
                    component: () => import('./views/sys/sysMessage/index.vue'),
                    meta: { title: '系统消息', icon: 'table' },
                },
                {
                    path: 'EJCD',
                    name: '二级菜单',
                    meta: { title: '二级菜单', icon: 'table' },
                    children: [
                        {
                            path: 'SJCD',
                            name: '三级菜单',
                            component: () => import('./views/sys/sysGroup/index.vue'),
                            meta: { title: '三级菜单', icon: 'table' },
                        },
                        ]
                }

            ]
        }

    ]
});

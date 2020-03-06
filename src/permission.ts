import router from './router';
import { Route } from 'vue-router';
import { getToken, getLocalRouter, setLocalRouter } from '@/utils/auth';
import { GlobalModule } from '@/store/modules/global';
import { UserModule } from '@/store/modules/user';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let getRouter: any; // 用来获取后台拿到的路由

router.beforeEach((to: Route, from: Route, next: any) => {
    NProgress.start();
    if (getToken()) { // 有token
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {

            if (!getRouter) {// 不加这个判断，路由会陷入死循环
                //if (!getObjArr('router')) {
                //    getRouter = UserModule.menuList;
                //    saveObjArr('router', getRouter); // 存储路由到localStorage
                //    routerGo(to, next);// 执行路由跳转方法

                //} else {// 从localStorage拿到了路由
                //    getRouter = getObjArr('router');// 拿到路由
                //    routerGo(to, next);
                //}
                let localRouter = getLocalRouter();
                if (!localRouter || localRouter.length <= 0) {
                    getRouter = UserModule.menuList;
                    setLocalRouter(getRouter)

                } else {// 从localStorage拿到了路由
                    getRouter = localRouter;// 拿到路由
                }
                routerGo(to, next);
            } else {
                next();
            }
        }
    } else { // 无token
        if (to.path === '/login') {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});



const _import = require('@/router/_import_' + process.env.NODE_ENV)// 获取组件的方法
import Layout from './views/layout/Layout.vue';

//const saveObjArr = (name: string, data: any[]) => { // localStorage 存储数组对象的方法
//    localStorage.setItem(name, JSON.stringify(data));
//};

//const getObjArr = (name: string | null) => { // localStorage 获取数组对象的方法
//    if (name) {
//        let text: string | null = window.localStorage.getItem(name);
//        if (text) {
//            return JSON.parse(text);
//        }
//    }
//    return null;
//};


const routerGo = (to: any, next: any) => {
    getRouter = filterAsyncRouter(getRouter); // 过滤路由
    GlobalModule.setRouters(getRouter);// 设置全局路由
    //{
    //    getRouter.push({ path: "*", redirect: "/404", hidden: true })
    //    getRouter.push({ path: "/404", component: () => import('./views/404.vue'), hidden: true })
    //}
    router.addRoutes(getRouter); // 动态添加路由
    next({ ...to, replace: true });
};

const filterAsyncRouter = (asyncRouterMap: any[]) => { // 遍历后台传来的路由字符串，转换为组件对象
    const accessedRouters = asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {// Layout组件特殊处理
                route.component = Layout;
            } else {
                route.component = _import(route.component);
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children);
        }
        return true;
    })

    return accessedRouters;
};
router.afterEach(() => {
    NProgress.done();
});

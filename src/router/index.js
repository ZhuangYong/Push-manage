import Vue from 'vue';
import Router from 'vue-router';

const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

import Layout from '../views/layout/Layout';
import Moban from '../views/moban';
import MobanDetail from '../views/moban/detail';
import AdminList from '../views/account/adminList';
import RoleList from '../views/account/role';
import authList from '../views/account/authManage';
import funManage from '../views/system/funManage';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
    {path: '/login', component: _import('login/index'), hidden: true},
    {path: '/404', component: _import('errorPage/404'), hidden: true},
    {path: '/401', component: _import('errorPage/401'), hidden: true},
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: '首页',
        hidden: true,
        children: [{path: 'dashboard', component: _import('dashboard/index')}]
    }
];

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
});

export const asyncRouterMap = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        name: '资源',
        icon: 'lock',
        meta: {role: ['admin']},
        noDropdown: true,
        children: []
    },
    {
        path: '/account',
        component: Layout,
        redirect: '/account/index',
        name: '账号管理',
        icon: 'component',
        children: [
            {path: 'role', component: RoleList, name: '角色管理'},
            {path: 'adminList', component: AdminList, name: '管理员列表'},
            {path: 'authManage', component: authList, name: '权限管理'}
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/index',
        name: '系统设置',
        icon: 'component',
        children: [
            {path: 'funManage', component: funManage, name: '功能管理'}
        ]
    },
    {
        path: '/icon',
        component: Layout,
        icon: 'icon',
        noDropdown: true,
        children: []
    },
    {
        path: '/moban',
        component: Layout,
        name: '模板',
        icon: 'component',
        children: [
            {
                path: 'table',
                name: '表格',
                component: Moban
            },
            {
                path: 'detail',
                name: 'detail',
                component: MobanDetail,
                hidden: true
            }
        ]
    },
    {
        path: '/charts',
        component: Layout,
        redirect: '/charts/index',
        name: '图表',
        icon: 'chart',
        children: []
    },
    {
        path: '/example',
        component: Layout,
        redirect: 'noredirect',
        name: '综合实例',
        icon: 'example',
        children: []
    },
    {
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: '错误页面',
        icon: '404',
        children: [
            {path: '401', component: _import('errorPage/401'), name: '401'},
            {path: '404', component: _import('errorPage/404'), name: '404'}
        ]
    },
    {
        path: '/errlog',
        component: Layout,
        redirect: 'noredirect',
        name: 'errlog',
        icon: 'bug',
        noDropdown: true,
        children: []
    },
    {
        path: '/excel',
        component: Layout,
        redirect: '/excel/download',
        name: 'excel',
        icon: 'excel',
        children: []
    },
    {
        path: '/zip',
        component: Layout,
        redirect: '/zip/download',
        name: 'zip',
        icon: 'zip',
        children: []
    },
    {
        path: '/theme',
        component: Layout,
        redirect: 'noredirect',
        name: 'theme',
        icon: 'theme',
        noDropdown: true,
        children: []
    },
    {
        path: '/clipboard',
        component: Layout,
        redirect: 'noredirect',
        icon: 'clipboard',
        noDropdown: true,
        children: []
    },
    {path: '*', redirect: '/404', hidden: true}
];

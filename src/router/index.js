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
import pageBuild from '../views/epgMange/pageBuild';
import publishManage from '../views/epgMange/publishManage';
import pageRender from '../views/epgMange/pageRender';
import testUpFile from '../views/test/testUpFile';
import upgradeManage from '../views/system/upgrade';
import pageManage from '../views/system/page';
import pushManage from '../views/system/push';
import defineManage from '../views/system/define';
import configManage from '../views/system/config';
import leiKeManage from '../views/system/leike';
import activateList from '../views/activate/index';
import channelList from '../views/channel/index';
import product from '../views/channel/product';
import device from '../views/channel/device';
import pay from '../views/logs/pay';
import update from '../views/logs/update';
import sync from '../views/logs/sync';
import register from '../views/logs/register';
import stbUser from "../views/userManage/stbUser";
import order from "../views/userManage/order";
import group from "../views/userManage/group";
import category from '../views/operate/category';
import search from '../views/operate/search';
import feedback from '../views/operate/feedback';
import recommend from '../views/operate/recommend';
import rank from '../views/operate/rank';
import customMenu from '../views/weixin/customMenu';
import material from '../views/weixin/material';
import push from '../views/weixin/push';
import media from '../views/operate/media';
import feedbackClassify from '../views/operate/feedbackClassify';
import actor from '../views/operate/actor';
import share from '../views/share/index';
import statistics from '../views/admin/statistics';
import actual from '../views/dataStatistics/actual';
import recordManage from "../views/recordManage";

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
        path: '/admin',
        component: Layout,
        redirect: '/admin/statistics',
        name: '主页管理',
        icon: 'people',
        children: [
            {path: 'statistics', component: statistics, name: '运营数据统计'}
        ]
    },
    {
        path: '/account',
        component: Layout,
        redirect: '/account/index',
        name: '账号管理',
        icon: 'people',
        children: [
            {path: 'role', component: RoleList, name: '角色管理'},
            {path: 'adminList', component: AdminList, name: '管理员列表'},
            {path: 'authManage', component: authList, name: '权限管理'}
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/configManage',
        name: '系统设置',
        icon: 'example',
        children: [
            {path: 'configManage', component: configManage, name: '配置管理'},
            {path: 'funManage', component: funManage, name: '功能管理'},
            {path: 'upgradeManage', component: upgradeManage, name: '升级管理'},
            {path: 'pageManage', component: pageManage, name: '页面管理'},
            {path: 'pushManage', component: pushManage, name: '推送管理'},
            {path: 'defineManage', component: defineManage, name: '数据定义'},
            {path: 'leiKeManage', component: leiKeManage, name: '雷克数据更新管理'}
        ]
    },
    {
        path: '/epgMange',
        component: Layout,
        name: 'EPG管理',
        icon: 'excel',
        children: [
            {path: 'pageBuild', component: pageBuild, name: '页面生成'},
            {path: 'publishManage', component: publishManage, name: '发布管理'},
            {path: 'pageRender', component: pageRender, name: '页面编排'}
        ]
    },
    {
        path: '/dataStatistics',
        component: Layout,
        name: '数据统计',
        icon: 'excel',
        children: [
            {path: 'actual', component: actual, name: '实时统计'}
        ]
    },
    {
        path: '/userManage',
        component: Layout,
        name: '用户管理',
        icon: 'component',
        children: [
            {path: 'stbUser', component: stbUser, name: '设备列表'},
            {path: 'userOrder', component: order, name: '订单列表'},
            {path: 'group', component: group, name: '设备组列表'}
        ]
    },
    {
        path: '/recordManage',
        component: Layout,
        name: '录音管理',
        icon: 'component',
        children: [
            {path: 'list', component: recordManage, name: '录音列表'}
        ]
    },
    {
        path: '/activate',
        component: Layout,
        redirect: '/activate/list',
        name: '激活码管理',
        icon: 'form',
        children: [
            {path: 'list', component: activateList, name: '激活码列表'}
        ]
    },
    {
        path: '/channel',
        component: Layout,
        redirect: '/channel/list',
        name: '机型管理',
        icon: 'component',
        children: [
            {path: 'list', component: channelList, name: '机型列表'},
            {path: 'product', component: product, name: '会员价格配置'},
            {path: 'device', component: device, name: '设备信息配置'}
        ]
    },
    {
        path: '/logs',
        component: Layout,
        redirect: '/logs/pay',
        name: '日志管理',
        icon: 'bug',
        children: [
            {path: 'pay', component: pay, name: '支付激活日志'},
            {path: 'sync', component: sync, name: '数据同步日志记录'},
            {path: 'register', component: register, name: '首次注册激活日志'},
            {path: 'update', component: update, name: '数据上报日志'}
        ]
    },
    {
        path: '/operate',
        component: Layout,
        redirect: '/operate/media',
        name: '运营管理',
        icon: 'theme',
        children: [
            {path: 'category', component: category, name: '分类列表'},
            {path: 'recommend', component: recommend, name: '推荐列表'},
            {path: 'rank', component: rank, name: '榜单列表'},
            {path: 'media', component: media, name: '歌曲列表'},
            {path: 'actor', component: actor, name: '歌星列表'},
            {path: 'group', component: group, name: '歌星分组'},
            {path: 'search', component: search, name: '搜索关键字管理'},
            {path: 'feedback', component: feedback, name: '意见反馈'},
            {path: 'feedbackClassify', component: feedbackClassify, name: '问题分类管理'},
        ]
    },
    {
        path: '/weixin',
        component: Layout,
        redirect: '/weixin/customMenu',
        name: '微信菜单管理',
        icon: 'tab',
        children: [
            {path: 'customMenu', component: customMenu, name: '自定义菜单'},
            {path: 'material', component: material, name: '微信素材管理'},
            {path: 'push', component: push, name: '微信推送管理'},
        ]
    },
    {
        path: '/share',
        component: Layout,
        redirect: '/share/index',
        name: '共享配置管理',
        icon: 'star',
        children: [
            {path: 'share', component: share, name: '共享配置管理'}
        ]
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
    {path: '*', redirect: '/404', hidden: true}
];

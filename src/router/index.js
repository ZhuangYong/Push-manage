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
import innerNetworksManager from '../views/system/innerNetworksManager';
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
import deviceGroup from "../views/userManage/deviceGroup";
import grayGroup from "../views/system/grayGroup";
import category from '../views/operate/category';
import search from '../views/operate/search';
import feedback from '../views/operate/feedback';
import recommend from '../views/operate/recommend';
import operateGroup from "../views/operate/group";
import rank from '../views/operate/rank';
import customMenu from '../views/weixin/customMenu';
import material from '../views/weixin/material';
import push from '../views/weixin/push';
import media from '../views/operate/media';
import feedbackClassify from '../views/operate/feedbackClassify';
import actor from '../views/operate/actor';
import statistics from '../views/admin/statistics';
import actual from '../views/dataStatistics/actual';
import album from "../views/userManage/album";
import userList from "../views/userManage/userList";
import recordManage from "../views/userManage/recordings";
import group from "../views/operate/group";
import upgradeGray from '../views/system/upgradeGray';
import application from '../views/system/application';
import vipGroup from '../views/channel/vipGroup';
import cacheManage from "../views/system/cacheManage";
import typeGroupManage from "../views/operate/typeGroupManage";
import loadManage from "../views/epgMange/loadManage";
import payStatistics from "../views/dataStatistics/pay";
import shareStatistics from "../views/dataStatistics/shareStatistics";
import operateStatistics from "../views/dataStatistics/operateStatistics";
import pwdModyfy from "../views/pwdModify/index";
import funGroup from "../views/system/funGroup";
import updateNew from "../views/logs/updateNew";
import salesStatistics from "../views/sales/statistics";
import salesList from "../views/sales/salesManage";
import salesDeviceManage from "../views/sales/salesDeviceManage";
import salesOrderManage from "../views/sales/salesOrderManage";
import salesGroupManage from "../views/sales/salesGroupManage";
import manufacturerList from "../views/manufacturer/manufacturerManage";
import languageManage from "../views/system/languages";
import languageResourceManage from "../views/system/languageResources";
import dataMigration from "../views/system/dataMigration";
import settlementManage from "../views/settlement/settlementManage";
import settlementAccountManage from "../views/settlement/settlementAccountManage";
import paymentManage from "../views/settlement/paymentManage";
import thirdMenu from "../views/third/thirdMenu";
import thirdAppId from "../views/third/thirdAppId";
import thirdOrder from "../views/third/thirdOrder";
import shareOperateStatistics2 from "../views/statisticsOperations/shareStatistics";
import manufacturerOperateStatistics from "../views/statisticsOperations/manufacturerStatistics";
import shareStatistics2 from "../views/statistics/shareStatistics";
import manufacturerStatistics from "../views/statistics/manufacturerStatistics";
import deviceManage from "../views/manufacturer/deviceManage";
import rechargeCardList from '../views/rechargeCardManage/rechargeCardList';
import createRechargeCard from '../views/rechargeCardManage/createRechargeCard';
import rechargeGroup from '../views/rechargeCardManage/rechargeGroup';
import activateStatistics from '../views/activate/activateStatistics';

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
        // children: [{path: 'dashboard', component: _import('dashboard/index')}]
        children: [{path: 'dashboard', component: statistics}]
    },
    {
        path: '/',
        component: Layout,
        name: '修改密码',
        hidden: true,
        children: [{path: 'register', component: pwdModyfy}]
    },
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
    // {
    //     path: '/admin',
    //     component: Layout,
    //     redirect: '/admin/statistics',
    //     name: '主页管理',
    //     icon: 'user',
    //     children: [
    //         {path: 'statistics', component: statistics, name: '运营数据统计'}
    //     ]
    // },
    {
        path: '/account',
        component: Layout,
        redirect: '/account/index',
        name: '账号管理',
        icon: 'lock',
        children: [
            {path: 'role', component: RoleList, name: '角色管理'},
            {path: 'adminList', component: AdminList, name: '管理员列表'},
            {path: 'authManage', component: authList, name: '权限管理'}
        ]
    },
    {
        path: '/settlement',
        component: Layout,
        redirect: '/settlement/list',
        name: '结算管理',
        icon: 'excel',
        children: [
            {path: 'list', component: settlementManage, name: '结算列表'},
            {path: 'reconciliation', component: settlementAccountManage, name: '结算对账管理'},
            {path: 'payment', component: paymentManage, name: '支付结算'},
        ]
    },
    {
        path: '/sales',
        component: Layout,
        redirect: '/sales/list',
        name: '销售方管理',
        icon: 'people',
        children: [
            {path: 'statistics', component: salesStatistics, name: '统计'},
            {path: 'list', component: salesList, name: '销售方用户'},
            {path: 'group', component: salesGroupManage, name: '设备分组管理'},
            {path: 'device', component: salesDeviceManage, name: '设备列表管理'},
            {path: 'order', component: salesOrderManage, name: '销售方订单管'},
        ]
    },
    {
        path: '/manufacturer',
        component: Layout,
        redirect: '/manufacturer/list',
        name: '渠道方管理',
        icon: 'user',
        children: [
            {path: 'list', component: manufacturerList, name: '渠道方用户'},
            {path: 'device', component: deviceManage, name: '设备管理'},
        ]
    },
    {
        path: '/third',
        component: Layout,
        redirect: '/third/menu',
        name: '第三方接口',
        icon: 'eye',
        children: [
            {path: 'menu', component: thirdMenu, name: '三方的菜单'},
            {path: 'appid', component: thirdAppId, name: '三方App Id'},
            {path: 'order', component: thirdOrder, name: '三方订单'},
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
            {path: 'languageManage', component: languageManage, name: '多语言管理'},
            {path: 'languageResources', component: languageResourceManage, name: '多语言元数据'},
            {path: 'funManage', component: funManage, name: '功能管理'},
            {path: 'funGroupManage', component: funGroup, name: '功能禁用组'},
            {path: 'upgradeManage', component: upgradeManage, name: '升级管理'},
            {path: 'group', component: grayGroup, name: '灰度分组'},
            {path: 'upgradeGray', component: upgradeGray, name: '灰度发布'},
            {path: 'pageManage', component: pageManage, name: '页面管理'},
            {path: 'application', component: application, name: '应用管理'},
            {path: 'pushManage', component: pushManage, name: '推送管理'},
            {path: 'defineManage', component: defineManage, name: '数据定义'},
            {path: 'leiKeManage', component: leiKeManage, name: '数据更新'},
            {path: 'cacheManage', component: cacheManage, name: '缓存管理'},
            {path: 'dataMigration', component: dataMigration, name: '数据迁移'},
            {path: 'innerNetworks', component: innerNetworksManager, name: '内网服务器管理'},
        ]
    },
    {
        path: '/epgMange',
        component: Layout,
        redirect: '/epgMange/pageRender',
        name: 'EPG管理',
        icon: 'excel',
        children: [
            {path: 'pageRender', component: pageRender, name: '页面编排'},
            {path: 'pageBuild', component: pageBuild, name: '页面生成'},
            {path: 'publishManage', component: publishManage, name: '发布管理'},
            {path: 'loadManage', component: loadManage, name: '广告页管理'},
        ]
    },
    {
        path: '/dataStatistics',
        component: Layout,
        redirect: '/dataStatistics/actual',
        name: '数据统计',
        icon: 'star',
        children: [
            {path: 'actual', component: actual, name: '实时统计'},
            {path: 'pay', component: payStatistics, name: '支付统计'},
            // {path: 'share', component: shareStatistics, name: '共享统计'},
            // {path: 'operate', component: operateStatistics, name: '运营统计'}
        ]
    },
    {
        path: '/statistics/operate',
        component: Layout,
        redirect: '/statistics/operate/share',
        name: '运营数据统计',
        icon: 'star',
        children: [
            {path: 'share', component: shareOperateStatistics2, name: '共享数据'},
            {path: 'manufacturer', component: manufacturerOperateStatistics, name: '渠道数据'},
        ]
    },
    {
        path: '/statistics',
        component: Layout,
        redirect: '/statistics/share',
        name: '数据统计2',
        icon: 'star',
        children: [
            {path: 'share', component: shareStatistics2, name: '共享数据'},
            {path: 'manufacturer', component: manufacturerStatistics, name: '渠道数据'},
        ]
    },
    {
        path: '/userManage',
        component: Layout,
        redirect: '/userManage/stbUser',
        name: '用户管理',
        icon: 'component',
        children: [
            {path: 'stbUser', component: stbUser, name: '设备列表'},
            {path: 'group', component: deviceGroup, name: '设备组列表'},
            {path: 'userOrder', component: order, name: '订单列表'},
            {path: 'album', component: album, name: '相册管理'},
            {path: 'recordings', component: recordManage, name: '录音列表'},
            {path: 'userList', component: userList, name: '用户列表'}
        ]
    },
    {
        path: '/activate',
        component: Layout,
        redirect: '/activate/list',
        name: '激活码管理',
        icon: 'form',
        children: [
            {path: 'list', component: activateList, name: '激活码列表'},
            {path: 'statistics', component: activateStatistics, name: '激活码统计管理'},
        ]
    },
    {
        path: '/channel',
        component: Layout,
        redirect: '/channel/list',
        name: '机型管理',
        icon: 'zip',
        children: [
            {path: 'list', component: channelList, name: '机型列表'},
            {path: 'product', component: product, name: '会员价格模板配置'},
            // {path: 'share', component: priceSettings, name: '会员价格配置'},
            {path: 'group', component: vipGroup, name: '产品包配置'},
            {path: 'device', component: device, name: '设备信息配置'},
            // {path: 'group', component: vipGroup, name: '产品分组'},
        ]
    },
    {
        path: '/logs',
        component: Layout,
        redirect: '/logs/pay',
        name: '日志管理',
        icon: 'bug',
        children: [
            // {path: 'pay', component: pay, name: '支付激活日志'},
            {path: 'sync', component: sync, name: '数据同步日志记录'},
            {path: 'register', component: register, name: '首次注册激活日志'},
            {path: 'update', component: update, name: '数据上报日志'},
            {path: 'updateNew', component: updateNew, name: '新数据上报日志'}
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
            {path: 'group', component: operateGroup, name: '歌星分组'},
            {path: 'search', component: search, name: '搜索关键字管理'},
            {path: 'feedback', component: feedback, name: '意见反馈'},
            {path: 'feedbackClassify', component: feedbackClassify, name: '问题分类管理'},
            {path: 'typeGroupManage', component: typeGroupManage, name: '分类组管理'},
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
        path: '/rechargeCardManage',
        component: Layout,
        redirect: '/rechargeCardManage/list',
        name: '充值卡管理',
        icon: 'theme',
        children: [
            {path: 'list', component: rechargeCardList, name: '充值卡列表'},
            {path: 'createRechargeCard', component: createRechargeCard, name: '生成充值卡'},
            {path: 'rechargeGroup', component: rechargeGroup, name: '控制码组管理'},
        ],
    },

    /*{
        path: '/share',
        component: Layout,
        redirect: '/share/index',
        name: '共享配置管理',
        icon: 'star',
        children: [
            {path: 'share', component: share, name: '共享配置管理'}
        ]
    },*/

    /*{
        path: '/error',
        component: Layout,
        redirect: 'noredirect',
        name: '错误页面',
        icon: '404',
        children: [
            {path: '401', component: _import('errorPage/401'), name: '401'},
            {path: '404', component: _import('errorPage/404'), name: '404'}
        ]
    },*/

    {path: '*', redirect: '/404', hidden: true}
];

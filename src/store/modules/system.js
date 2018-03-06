import {funPage, funChannelList, funPageList} from "../../api/function";
import {funGroupPage, funGroupFunListPage} from "../../api/functionGroup";
import {upPage} from "../../api/upgrade";
import {pageList} from "../../api/page";
import {pushPage, pushSeaDevice} from "../../api/push";
import {page as definePage, getAllDefine} from "../../api/define";
import {page as configPage} from "../../api/config";
import {page as leiKePage} from "../../api/leike";
import {page as applicationPage} from "../../api/application";
import {page as grayPage, getDevice, getAppRomList} from "../../api/upgradeGray";
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {groupList, groupGrayDeviceList, groupUser, stbUserList} from "../../api/grayGroup";
import {systemRedisList} from "../../api/cacheManage";
import {languagePage, languageResourcesPage} from "../../api/language";
import {migrateList} from "../../api/dataMigration";

const defaultPageData = getDefaultPageData();

export default {
    state: {
        funManage: defaultPageData, //功能管理
        funGroupPage: defaultPageData, //功能分组管理
        funGroupFunListPage: defaultPageData, //funGroupFunListPage
        funChannelList: [],
        funpageList: [],
        upgradeManage: defaultPageData, //升级管理
        pageManage: defaultPageData, //页面管理
        pushManage: defaultPageData, //页面管理
        deviceList: defaultPageData, //设备列表
        defineManage: defaultPageData,
        configManage: defaultPageData, //配置管理
        languagePage: defaultPageData, //语言管理
        languageResourcesPage: defaultPageData, //语言元数据管理
        leiKeManage: {
            data: {
                configList: [],
                judyData: [],
                media: "",
                picture: "",
                push: "",
                rank: "",
                type: "",
            },
        }, //数据更新
        grayManage: defaultPageData, //灰度发布
        deviceGroup: defaultPageData,
        defineDefineList: [],
        applicationPage: defaultPageData, //应用管理
        appAndRomList: [],
        grayGroupPage: defaultPageData, //灰度分组
        groupGrayDeviceList: defaultPageData, //灰度分组可以选择的设备
        grayGroupUserPage: defaultPageData,
        stbUserPage: defaultPageData,
        systemRedisList: {
            data: {
                keyPair: [],
                keyspace: []
            }
        }, // 缓存管理列表
        migratePage: defaultPageData, // 数据迁移列表
    },

    mutations: {
        SET_FUNCTION_LIST: (state, funManage) => {
            state.funManage = funManage;
        },
        SET_FUNCTION_GROUP_LIST: (state, data) => {
            state.funGroupPage = data;
        },
        SET_FUNCTION_GROUP_FUNCTION_LIST: (state, data) => {
            state.funGroupFunListPage = data;
        },
        SET_FUNCTION_CHANNEL: (state, funChannelList) => {
            state.funChannelList = funChannelList;
        },
        SET_FUNCTION_PAGE: (state, funpageList) => {
            state.funpageList = funpageList;
        },
        SET_UPGRADE_LIST: (state, upgradeManage) => {
            state.upgradeManage = upgradeManage;
        },
        SET_PAGE_LIST: (state, pageManage) => {
            state.pageManage = pageManage;
        },
        SET_PUSH_LIST: (state, pushManage) => {
            state.pushManage = pushManage;
        },
        SET_DEVICE_LIST: (state, deviceList) => {
            state.deviceList = deviceList;
        },
        SET_DEFINE_LIST: (state, defineManage) => {
            state.defineManage = defineManage;
        },
        SET_CONFIG_LIST: (state, configManage) => {
            state.configManage = configManage;
        },
        SET_LEIKE_LIST: (state, leiKeManage) => {
            state.leiKeManage.data = leiKeManage;
        },
        SET_LEIKE_CONFIG_LIST: (state, configList) => {
            state.leiKeManage.data.configList = configList;
        },
        SET_LEIKE_JUDYDATA: (state, judyData) => {
            state.leiKeManage.data.judyData = judyData;
        },
        SET_GRAY_DATA: (state, data) => {
            state.grayManage = data;
        },
        SET_DEVICE_GROUP: (state, data) => { //设备列表
            state.deviceGroup = data;
        },
        GET_DEFINE_DEFINE_LIST: (state, data) => { //设备列表
            state.defineDefineList = data;
        },
        SET_APPLICATION_DATA: (state, data) => { //设备列表
            state.applicationPage = data;
        },
        SET_APP_ROM_LIST: (state, data) => { //app_rom
            state.appAndRomList = data;
        },
        SET_GRAY_GROUP_DATA: (state, data) => {
            state.grayGroupPage = data;
        },
        SET_GRAY_GROUP_DEVICE_LIST_DATA: (state, data) => {
            state.groupGrayDeviceList = data;
        },
        SET_GRAY_GROUP_USER_DATA: (state, data) => {
            state.grayGroupUserPage = data;
        },
        SET_STBUSER_DATA: (state, data) => {
            state.stbUserPage = data;
        },
        SET_SYSTEM_REDIS_LIST: (state, data) => {
            state.systemRedisList = data;
        },
        SET_SYSTEM_LANGUAGE_LIST: (state, data) => {
            state.languagePage = data;
        },
        SET_SYSTEM_RESOURCE_LANGUAGE_LIST: (state, data) => {
            state.languageResourcesPage = data;
        },
        SET_MIGRATE_PAGE: (state, data) => {
            state.migratePage = data;
        },
    },

    actions: {
        ['fun/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.funManage.currentPage,
                pageSize: state.funManage.pageSize
            }, filter);

            return new Promise((resolve, reject) => {
                funPage(param).then(response => {
                    commit('SET_FUNCTION_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['fun/group/RefreshPage']: getPageFun('funGroupPage', funGroupPage, 'SET_FUNCTION_GROUP_LIST'),
        ['fun/group/funList/RefreshPage']: getPageFun('funGroupFunListPage', funGroupFunListPage, 'SET_FUNCTION_GROUP_FUNCTION_LIST'),
        ['fun/chanelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                funChannelList().then(response => {
                    commit('SET_FUNCTION_CHANNEL', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['fun/pageList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                funPageList().then(response => {
                    commit('SET_FUNCTION_PAGE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['upgrade/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.upgradeManage.currentPage,
                pageSize: state.upgradeManage.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                upPage(param).then(response => {
                    commit('SET_UPGRADE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['page/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.upgradeManage.currentPage,
                pageSize: state.upgradeManage.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                pageList(param).then(response => {
                    commit('SET_PAGE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['push/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.pushManage.currentPage,
                pageSize: state.pushManage.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                pushPage(param).then(response => {
                    commit('SET_PUSH_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['device/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.deviceList.currentPage,
                pageSize: state.deviceList.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                pushSeaDevice(param).then(response => {
                    commit('SET_DEVICE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['define/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.defineManage.currentPage,
                pageSize: state.defineManage.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                definePage(param).then(response => {
                    commit('SET_DEFINE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['config/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.configManage.currentPage,
                pageSize: state.configManage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                configPage(param).then(response => {
                    commit('SET_CONFIG_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['leike/RefreshPage']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                leiKePage().then(response => {
                    const data = response;
                    const configListConfNames = [
                        'picturesVersion',
                        'rankVersion',
                        'recommendVersion',
                        'typeVersion',
                    ];

                    const judyDataConfNames = [
                        'mediaAndActorImageUpdateStatus',
                        'rankUpdateStatus',
                        'recommendUpdateStatus',
                        'typeUpdateStatus',
                    ];

                    let configList = [];
                    let judyData = [];
                    data.configList.forEach((item, index, arr) => {
                        const configListIndex = configListConfNames.indexOf(item.confName);
                        if (configListIndex > -1) configList[configListIndex] = item;

                        const judyDataIndex = judyDataConfNames.indexOf(item.confName);
                        if (judyDataIndex > -1) judyData[configListConfNames[judyDataIndex]] = item;
                    });

                    commit('SET_LEIKE_LIST', data);
                    commit('SET_LEIKE_CONFIG_LIST', configList);
                    commit('SET_LEIKE_JUDYDATA', judyData);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['gray/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.grayManage.currentPage,
                pageSize: state.grayManage.pageSize
            }, filter);
            return new Promise((resolve, reject) => {
                grayPage(param).then(response => {
                    commit('SET_GRAY_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['define/define/list']({commit}, param) {
            return new Promise((resolve, reject) => {
                getAllDefine(param).then(response => {
                    commit('GET_DEFINE_DEFINE_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        //设备组
        ['upgradeGray/device/RefreshPage']: getPageFun('deviceGroup', getDevice, 'SET_DEVICE_GROUP'),
        ['system/application/RefreshPage']: getPageFun('applicationPage', applicationPage, 'SET_APPLICATION_DATA'),
        ['system/language/RefreshPage']: getPageFun('languagePage', languagePage, 'SET_SYSTEM_LANGUAGE_LIST'),
        ['system/language/resources/RefreshPage']: getPageFun('languageResourcesPage', languageResourcesPage, 'SET_SYSTEM_RESOURCE_LANGUAGE_LIST'),
        ['system/appAndRom/RefreshPage']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getAppRomList().then(response => {
                    commit('SET_APP_ROM_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['grayGroup/RefreshPage']: getPageFun('grayGroupPage', groupList, 'SET_GRAY_GROUP_DATA'),
        ['grayGroup/canChoose/device/RefreshPage']: getPageFun('groupGrayDeviceList', groupGrayDeviceList, 'SET_GRAY_GROUP_DEVICE_LIST_DATA'),
        ['grayGroup/user/RefreshPage']: getPageFun('grayGroupUserPage', groupUser, 'SET_GRAY_GROUP_USER_DATA'),
        // ['stbUser/RefreshPage']: getPageFun('stbUserPage', stbUserList, 'SET_STBUSER_DATA'),
        ['systemRedisList/RefreshPage']({commit}, param) {
            return new Promise((resolve, reject) => {
                systemRedisList(param).then(response => {
                    commit('SET_SYSTEM_REDIS_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['dataMigration/RefreshPage']: getPageFun('migratePage', migrateList, 'SET_MIGRATE_PAGE'),
    }
};

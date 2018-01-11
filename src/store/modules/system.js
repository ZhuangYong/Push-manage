import {funPage, funChannelList, funPageList} from "../../api/function";
import {upPage} from "../../api/upgrade";
import {pageList} from "../../api/page";
import {pushPage, pushSeaDevice} from "../../api/push";
import {page as definePage, getAllDefine} from "../../api/define";
import {page as configPage} from "../../api/config";
import {page as leiKePage} from "../../api/leike";
import {page as applicationPage} from "../../api/application";
import {page as grayPage, getDevice, getAppRomList} from "../../api/upgradeGray";
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {groupList, groupUser, stbUserList} from "../../api/grayGroup";
import {systemRedisList} from "../../api/cacheManage";

const defaultPageData = getDefaultPageData();

export default {
    state: {
        funManage: defaultPageData, //功能管理
        funChannelList: [],
        funpageList: [],
        upgradeManage: defaultPageData, //升级管理
        pageManage: defaultPageData, //页面管理
        pushManage: defaultPageData, //页面管理
        deviceList: defaultPageData, //设备列表
        defineManage: defaultPageData,
        configManage: defaultPageData, //配置管理
        leiKeManage: {
            data: [],
            judyData: []
        }, //数据更新
        grayManage: defaultPageData, //灰度发布
        deviceGroup: defaultPageData,
        defineDefineList: [],
        applicationPage: defaultPageData, //应用管理
        appAndRomList: [],
        grayGroupPage: defaultPageData, //灰度分组
        grayGroupUserPage: defaultPageData,
        stbUserPage: defaultPageData,
        systemRedisList: {
            data: {
                keyPair: []
            }
        }, // 缓存管理列表
    },

    mutations: {
        SET_FUNCTION_LIST: (state, funManage) => {
            state.funManage = funManage;
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
        SET_LEIKE_JUDYDATA: (state, judyData) => {
            state.leiKeManage.judyData = judyData;
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
        SET_GRAY_GROUP_USER_DATA: (state, data) => {
            state.grayGroupUserPage = data;
        },
        SET_STBUSER_DATA: (state, data) => {
            state.stbUserPage = data;
        },
        SET_SYSTEM_REDIS_LIST: (state, data) => {
            state.systemRedisList = data;
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
                    const dataList = [];
                    const judyData = [];
                    data.forEach((item, index, arr) => {
                        if (item.confName === 'picturesVersion') {
                            dataList[0] = item;
                            dataList[0].num = 0;
                        } else if (item.confName === 'rankVersion') {
                            dataList[1] = item;
                            dataList[1].num = 1;
                        } else if (item.confName === 'recommendVersion') {
                            dataList[2] = item;
                            dataList[2].num = 2;
                        } else if (item.confName === 'typeVersion') {
                            dataList[3] = item;
                            dataList[3].num = 3;
                        } else if (item.confName === 'mediaAndActorImageUpdateStatus') {
                            judyData[0] = item;
                            judyData[0].num = 0;
                        } else if (item.confName === 'rankImageUpdateStatus') {
                            judyData[1] = item;
                            judyData[1].num = 1;
                        } else if (item.confName === 'recommendImageUpdateStatus') {
                            judyData[2] = item;
                            judyData[2].num = 2;
                        } else if (item.confName === 'typeImageUpdateStatus') {
                            judyData[3] = item;
                            judyData[3].num = 3;
                        }
                    });
                    commit('SET_LEIKE_LIST', dataList);
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
        ['grayGroup/user/RefreshPage']: getPageFun('grayGroupUserPage', groupUser, 'SET_GRAY_GROUP_USER_DATA'),
        ['stbUser/RefreshPage']: getPageFun('stbUserPage', stbUserList, 'SET_STBUSER_DATA'),
        ['systemRedisList/RefreshPage']: getPageFun('systemRedisList', systemRedisList, 'SET_SYSTEM_REDIS_LIST'),
    }
};

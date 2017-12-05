import {funPage, funChannelList, funPageList} from "../../api/function";
import {upPage} from "../../api/upgrade";
import {pageList} from "../../api/page";
import {pushPage, pushSeaDevice} from "../../api/push";
import {page as definePage} from "../../api/define";
import {page as configPage} from "../../api/config";

export default {
    state: {
        funManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }, //功能管理
        funChannelList: [],
        funpageList: [],
        funFilter: {},
        upgradeManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }, //升级管理
        upgradeFilter: {},
        pageManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }, //页面管理
        pushManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }, //页面管理
        pushFilter: {},
        deviceList: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }, //设备列表
        defineManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        defineFilter: {},
        configManage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        } //配置管理

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
        SET_FUNCTION_FILTER: (state, filter) => {
            state.funFilter = filter;
        },
        SET_UPGRADE_LIST: (state, upgradeManage) => {
            state.upgradeManage = upgradeManage;
        },
        SET_UPGRADE_FILTER: (state, filter) => {
            state.upgradeFilter = filter;
        },
        SET_PAGE_LIST: (state, pageManage) => {
            state.pageManage = pageManage;
        },
        SET_PUSH_LIST: (state, pushManage) => {
            state.pushManage = pushManage;
        },
        SET_PUSH_FILTER: (state, filter) => {
            state.pushFilter = filter;
        },
        SET_DEVICE_LIST: (state, deviceList) => {
            state.deviceList = deviceList;
        },
        SET_DEFINE_LIST: (state, defineManage) => {
            state.defineManage = defineManage;
        },
        SET_DEFINE_FILTER: (state, defineFilter) => {
            state.defineFilter = defineFilter;
        },
        SET_CONFIG_LIST: (state, configManage) => {
            state.configManage = configManage;
        }
    },

    actions: {
        ['fun/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.funManage.currentPage,
                pageSize: state.funManage.pageSize,
                channelCode: state.funFilter.channelCode,
                name: state.funFilter.name,
                status: state.funFilter.status
            }, filter);
            if (filter.name !== undefined || filter.status !== undefined || filter.channelCode !== undefined) {
                commit('SET_FUNCTION_FILTER', filter);
            }

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
                pageSize: state.upgradeManage.pageSize,
                channelCode: state.upgradeFilter.channelCode,
                type: state.upgradeFilter.name,
            }, filter);
            if (filter.type !== undefined || filter.channelCode !== undefined) {
                commit('SET_UPGRADE_FILTER', filter);
            }
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
                pageSize: state.defineManage.pageSize,
                name: state.defineFilter.name
            }, filter);
            if (filter.name !== undefined) {
                commit('SET_DEFINE_FILTER', filter);
            }
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
    }
};

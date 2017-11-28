import {funPage, funChannelList, funPageList} from "../../api/function";
import {upPage} from "../../api/upgrade";
import {pageList} from "../../api/page";
import {pushPage} from "../../api/push";

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
        } //页面管理

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
                    commit('SET_FUNCTION_LIST', response);
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
    }
};

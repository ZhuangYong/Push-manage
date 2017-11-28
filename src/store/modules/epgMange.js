import {page as pageList, epgList} from '../../api/pageBuild';
import {list as screenList, page as screenPage} from '../../api/screen';
import {page as publishList} from '../../api/publish';

export default {
    state: {
        epgPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        screenList: {
            data: []
        },
        screenPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        publishPage: {
            data: []
        },
        epgList: {
            data: []
        }
    },
    mutations: {
        SET_PUBLISH_DATA: (state, data) => {
            state.publishPage = data;
        },
        SET_EPG_DATA: (state, data) => {
            state.epgPage = data;
        },
        SET_EPG_EPGLIST: (state, data) => {
            state.epgList = data;
        },
        SET_SCREEN_LIST: (state, data) => {
            state.screenList = data;
        },
        SET_SCREEN_PAGE: (state, data) => {
            state.screenPage = data;
        },
    },
    actions: {
        ['buildPage/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.epgPage.currentPage,
                pageSize: state.epgPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                pageList(param).then(response => {
                    commit('SET_EPG_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['buildPage/epgList']({commit}) {
            return new Promise((resolve, reject) => {
                epgList().then(response => {
                    commit('SET_EPG_EPGLIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['screen/list']({commit}) {
            return new Promise((resolve, reject) => {
                screenList().then(response => {
                    commit('SET_SCREEN_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['screen/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.screenPage.currentPage,
                pageSize: state.screenPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                screenPage(param).then(response => {
                    commit('SET_SCREEN_PAGE', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['publish/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.epgPage.currentPage,
                pageSize: state.epgPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                publishList(param).then(response => {
                    commit('SET_PUBLISH_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
    }
};

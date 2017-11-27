import {page as pageList} from '../../api/pageBuild';
import {page as screenList} from '../../api/screen';
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
        screenPage: {
            data: []
        },
        publishPage: {
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
        SET_SCREEN_DATA: (state, data) => {
            state.screenPage = data;
        }
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
        ['screen/RefreshPage']({commit}) {
            return new Promise((resolve, reject) => {
                screenList().then(response => {
                    commit('SET_SCREEN_DATA', response);
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

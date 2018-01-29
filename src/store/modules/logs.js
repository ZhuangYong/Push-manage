import {payActivateLogPage, registerLogPage, uploadLogPage, synchLogPage, upTextList} from '../../api/logs';

const defaultPageData = {
    currentPage: 0,
    pageSize: 10,
    totalPage: 0,
    totalRow: 0,
    data: []
};
export default {
    state: {
        payActivateLogPage: Object.assign({}, defaultPageData),
        registerLogPage: Object.assign({}, defaultPageData),
        uploadLogPage: Object.assign({}, defaultPageData),
        uploadNewLogPage: Object.assign({}, defaultPageData),
        synchLogPage: Object.assign({}, defaultPageData),
    },
    mutations: {
        SET_PAY_ACTIVATE_DATA: (state, data) => {
            state.payActivateLogPage = data;
        },
        SET_REGISTER_DATA: (state, data) => {
            state.registerLogPage = data;
        },
        SET_UPLOAD_DATA: (state, data) => {
            state.uploadLogPage = data;
        },
        SET_UPLOAD_NEW_DATA: (state, data) => {
            state.uploadNewLogPage = data;
        },
        SET_SYNCH_DATA: (state, data) => {
            state.synchLogPage = data;
        },
    },
    actions: {
        ['logs/payActivate/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.payActivateLogPage.currentPage,
                pageSize: state.payActivateLogPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                payActivateLogPage(param).then(response => {
                    commit('SET_PAY_ACTIVATE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['logs/register/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.registerLogPage.currentPage,
                pageSize: state.registerLogPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                registerLogPage(param).then(response => {
                    commit('SET_REGISTER_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['logs/upload/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.uploadLogPage.currentPage,
                pageSize: state.uploadLogPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                uploadLogPage(param).then(response => {
                    commit('SET_UPLOAD_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['logs/upload/new/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.uploadLogPage.currentPage,
                pageSize: state.uploadLogPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                upTextList(param).then(response => {
                    commit('SET_UPLOAD_NEW_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['logs/synch/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.synchLogPage.currentPage,
                pageSize: state.synchLogPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                synchLogPage(param).then(response => {
                    commit('SET_SYNCH_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
    }
};

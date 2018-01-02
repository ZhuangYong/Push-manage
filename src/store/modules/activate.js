import {page as pageList, getActivateCode} from '../../api/activate';

export default {
    state: {
        activatePage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        activateCode: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
    },
    mutations: {
        SET_ACTIVATE_DATA: (state, data) => {
            state.activatePage = data;
        },
        SET_ACTIVATE_CODE: (state, data) => {
            state.activateCode = data;
        }
    },
    actions: {
        ['activate/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.activatePage.currentPage,
                pageSize: state.activatePage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                pageList(param).then(response => {
                    commit('SET_ACTIVATE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['activate/code/list']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.activateCode.currentPage,
                pageSize: state.activateCode.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                getActivateCode(param).then(response => {
                    commit('SET_ACTIVATE_CODE', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
    }
};

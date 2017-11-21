import {page, detail} from '../../api/resource';

export default {
    state: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0,
        data: [],
        detail: {}
    },
    mutations: {
        SET_RESOURCE_DATA: (state, data) => {
            Object.assign(state, data);
        },
        SET_RESOURCE_DETAIL: (state, data) => {
            state.detail = data;
        }
    },
    actions: {
        ['resource/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    commit('SET_RESOURCE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },

        ['resource/detail']({commit}, id) {
            return new Promise((resolve, reject) => {
                detail(id).then(response => {
                    commit('SET_RESOURCE_DETAIL', response);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

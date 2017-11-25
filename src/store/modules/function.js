import {page} from '../../api/function';

export default {
    state: {
        page: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
    },
    mutations: {
        SET_FUNCTION_DATA: (state, data) => {
            state.page = data;
        }
    },
    actions: {
        ['function/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.page.currentPage,
                pageSize: state.page.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    console.log(response);
                    console.log('----------------');
                    commit('SET_FUNCTION_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

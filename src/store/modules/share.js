import {page as sharePage} from '../../api/share';

export default {
    state: {
        shareList: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
    },
    mutations: {
        SET_PROMOTION_SHARE_LIST: (state, data) => {
            state.shareList = data;
        }
    },

    actions: {
        ['share/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                sharePage(param).then(response => {
                    commit('SET_PROMOTION_SHARE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};


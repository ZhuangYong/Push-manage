import {page, detail, resourceTree} from '../../api/resource';

export default {
    state: {
        page: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        treeList: []
    },
    mutations: {
        SET_RESOURCE_DATA: (state, data) => {
            state.page = data;
        },
        SET_RESOURCE_TREE: (state, data) => {
            state.treeList = data;
        }
    },
    actions: {
        ['resource/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.page.currentPage,
                pageSize: state.page.pageSize,
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

        ['resource/tree']({commit}, rootId) {
            return new Promise((resolve, reject) => {
                resourceTree(rootId || 0).then(response => {
                    commit('SET_RESOURCE_TREE', response);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

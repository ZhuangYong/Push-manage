import {getUserList} from "../../api/user";

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
        SET_USER_LIST_DATA: (state, data) => {
            Object.assign(state, data);
        }
    },

    actions: {
        ['user/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                getUserList(param).then(response => {
                    commit('SET_USER_LIST_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }
    }
};

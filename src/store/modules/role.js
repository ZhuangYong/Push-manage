import {getRoleList, getTree} from '../../api/role';

const user = {
    state: {
        currentPage: 0,
        pageSize: 10,
        totalPage: 0,
        totalRow: 0,
        data: [],
        detail: {},
        roleId: ''
    },

    mutations: {
        SET_ROLE_LIST: (state, data) => {
            Object.assign(state, data);
        },
        SET_ROLE_ID: (state, roleId) => {
            state.roleId = roleId;
        },
    },

    actions: {
        ['role/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.currentPage,
                pageSize: state.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                getRoleList(param).then(response => {
                    commit('SET_ROLE_LIST', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['role/resource']({commit, state}, id) {
            const param = id;
            return new Promise((resolve, reject) => {
                getTree(param).then(response => {
                    commit('SET_ROLE_ID', id);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        }

    }
};

export default user;

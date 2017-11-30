import {page as channelPage} from '../../api/channel';
import {page as productPage} from '../../api/product';
import {page as devicePage} from '../../api/device';

export default {
    state: {
        channelPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        productPage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        },
        devicePage: {
            currentPage: 0,
            pageSize: 10,
            totalPage: 0,
            totalRow: 0,
            data: []
        }
    },
    mutations: {
        SET_ACTIVATE_DATA: (state, data) => {
            state.channelPage = data;
        },
        SET_PRODUCT_DATA: (state, data) => {
            state.productPage = data;
        },
        SET_DEVICE_DATA: (state, data) => {
            state.devicePage = data;
        },
    },
    actions: {
        ['channel/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.channelPage.currentPage,
                pageSize: state.channelPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                channelPage(param).then(response => {
                    commit('SET_ACTIVATE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['product/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.productPage.currentPage,
                pageSize: state.productPage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                productPage(param).then(response => {
                    commit('SET_PRODUCT_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['device/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
                currentPage: state.devicePage.currentPage,
                pageSize: state.devicePage.pageSize,
            }, filter);
            return new Promise((resolve, reject) => {
                devicePage(param).then(response => {
                    commit('SET_DEVICE_DATA', Object.assign({}, response, {currentPage: response.currentPage + 1}));
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
    }
};

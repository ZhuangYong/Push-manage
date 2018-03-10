import {getStatChanList} from '../../api/statistics';
import {page} from '../../api/actual';
import {page as payPage} from '../../api/pay';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        statData: defaultPageData,
        detail: [],
        statChanList: [],
        payPage: defaultPageData,
        payDetail: {}
    },
    mutations: {
        SET_STATISTICS_DATA: (state, data) => {
            state.statData = data;
        },
        SET_STATISTICS_DETAIL: (state, data) => {
            state.detail = [];
            (state.detail).push(data);
        },
        SET_STATISTICS_CHANNEL_LIST: (state, data) => {
            state.statChanList = data;
        },
        SET_PAY_PAGE_LIST: (state, data) => {
            state.payPage = data;
            state.payDetail = data.payDetail;
        },
    },

    actions: {
        ['actual/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    commit('SET_STATISTICS_DATA', response);
                    commit('SET_STATISTICS_DETAIL', response.detail);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['actual/channelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatChanList().then(response => {
                    commit('SET_STATISTICS_CHANNEL_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/pay/RefreshPage']: getPageFun('payPage', payPage, 'SET_PAY_PAGE_LIST'),
    }
};


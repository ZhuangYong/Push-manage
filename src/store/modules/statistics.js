import {
    page, getStatChanList, getStatActive, shareStatisticsList, operateStatisticsList,
    shareStatisticsList2, operateShareStatisticsList, operateShareStatisticsListDetail, operateStatisticsIndexList,
    operateStatisticsIndexDetail, statisticsList2, statisticsList, statisticsDetail, shareStatisticsDetail
} from '../../api/statistics';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        statData: {
            all: [],
            day: [],
            month: []
        },
        statChanList: [],
        statActivate: [],
        shareStatisticsList: getDefaultPageData(),
        operateStatisticsList: getDefaultPageData(),
        statisticsList: getDefaultPageData(),
        shareStatisticsList2: getDefaultPageData(),
        shareStatisticsDetail: getDefaultPageData(),
        statisticsDetail: getDefaultPageData(),
        operateShareStatisticsList: getDefaultPageData(),
        operateShareStatisticsListDetail: getDefaultPageData(),
        operateStatisticsIndexList: getDefaultPageData(),
        operateStatisticsIndexDetail: getDefaultPageData()
    },
    mutations: {
        SET_STATISTICS_DATA: (state, data) => {
            state.statData.all = [];
            state.statData.day = [];
            state.statData.month = [];

            (state.statData.all).push(data.all);
            (state.statData.day).push(data.day);
            (state.statData.month).push(data.month);
        },
        SET_STATISTICS_CHANNEL_LIST: (state, data) => {
            state.statChanList = data;
        },
        SET_STATISTICS_ACTIVATE: (state, data) => {
            state.statActivate = data;
        },
        SET_SALES_STATISTICS_SHARE_LIST: (state, data) => {
            state.shareStatisticsList = data;
        },
        SET_OPERATE_STATISTICS_SHARE_LIST: (state, data) => {
            state.operateStatisticsList = data;
        },
        SET_SALES_STATISTICS2_LIST: (state, data) => {
            state.statisticsList = data;
        },
        SET_SALES_STATISTICS2_DETAIL: (state, data) => {
            state.statisticsDetail = data;
        },
        SET_SALES_STATISTICS2_SHARE_LIST: (state, data) => {
            state.shareStatisticsList2 = data;
        },
        SET_SALES_STATISTICS2_SHARE_DETAIL: (state, data) => {
            state.shareStatisticsDetail = data;
        },
        SET_SALES_STATISTICS_OPERATE_SHARE_LIST: (state, data) => {
            state.operateShareStatisticsList = data;
        },
        SET_SALES_STATISTICS_OPERATE_SHARE_LIST_DETAIL: (state, data) => {
            state.operateShareStatisticsListDetail = data;
        },
        SET_SALES_STATISTICS_OPERATE_INDEX_LIST: (state, data) => {
            state.operateStatisticsIndexList = data;
        },
        SET_SALES_STATISTICS_OPERATE_DETAIL_LIST: (state, data) => {
            state.operateStatisticsIndexDetail = data;
        }
    },

    actions: {
        ['statistics/RefreshPage']({commit, state}, filter = {}) {
            const param = Object.assign({}, {
            }, filter);
            return new Promise((resolve, reject) => {
                page(param).then(response => {
                    commit('SET_STATISTICS_DATA', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/channelList']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatChanList().then(response => {
                    commit('SET_STATISTICS_CHANNEL_LIST', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/activate']({commit, state}, filter = {}) {
            return new Promise((resolve, reject) => {
                getStatActive().then(response => {
                    commit('SET_STATISTICS_ACTIVATE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        ['statistics/share/RefreshPage']: getPageFun('shareStatisticsList', shareStatisticsList, 'SET_SALES_STATISTICS_SHARE_LIST'),

        ['statistics2/RefreshPage']: getPageFun('statisticsList', statisticsList, 'SET_SALES_STATISTICS2_LIST'),
        ['statistics2/detail/RefreshPage']: getPageFun('statisticsDetail', statisticsDetail, 'SET_SALES_STATISTICS2_DETAIL'),
        ['statistics2/share/RefreshPage']: getPageFun('shareStatisticsList2', shareStatisticsList2, 'SET_SALES_STATISTICS2_SHARE_LIST'),
        ['statistics2/share/detail/RefreshPage']: getPageFun('shareStatisticsDetail', shareStatisticsDetail, 'SET_SALES_STATISTICS2_SHARE_DETAIL'),

        ['statistics/operate/index/RefreshPage']: getPageFun('operateStatisticsIndexList', operateStatisticsIndexList, 'SET_SALES_STATISTICS_OPERATE_INDEX_LIST'),
        ['statistics/operate/detail/RefreshPage']: getPageFun('operateStatisticsIndexDetail', operateStatisticsIndexDetail, 'SET_SALES_STATISTICS_OPERATE_DETAIL_LIST'),
        ['statistics/operate/share/RefreshPage']: getPageFun('operateShareStatisticsList', operateShareStatisticsList, 'SET_SALES_STATISTICS_OPERATE_SHARE_LIST'),
        ['statistics/operate/share/detail/RefreshPage']: getPageFun('operateShareStatisticsListDetail', operateShareStatisticsListDetail, 'SET_SALES_STATISTICS_OPERATE_SHARE_LIST_DETAIL'),
        ['statistics/operate/RefreshPage']: getPageFun('operateStatisticsList', operateStatisticsList, 'SET_OPERATE_STATISTICS_SHARE_LIST'),
    }
};


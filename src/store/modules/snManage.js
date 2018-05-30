/**
 * Created by Zed on 2018/5/12.
 */
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {getMacList, getSNList, getSNRecordList} from "../../api/snManage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        snData: defaultPageData,
        snRecordData: defaultPageData,
        macData: defaultPageData,
    },
    mutations: {
        SET_SN_PAGE: (state, data) => {
            state.snData = data;
        },
        SET_SN_RECORD_PAGE: (state, data) => {
            state.snRecordData = data;
        },
        SET_MAC_PAGE: (state, data) => {
            state.macData = data;
        },
    },
    actions: {
        ['sn/RefreshPage']: getPageFun('snData', getSNList, 'SET_SN_PAGE'),
        ['snRecord/RefreshPage']: getPageFun('snRecordData', getSNRecordList, 'SET_SN_RECORD_PAGE'),
        ['mac/RefreshPage']: getPageFun('macData', getMacList, 'SET_MAC_PAGE'),
    }
};

/**
 * Created by Zed on 2018/5/12.
 */
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {getSNList, getSNRecordList} from "../../api/snManage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        snData: defaultPageData,
        snRecordData: defaultPageData,
    },
    mutations: {
        SET_SN_PAGE: (state, data) => {
            state.snData = data;
        },
        SET_SN_RECORD_PAGE: (state, data) => {
            state.snRecordData = data;
        },
    },
    actions: {
        ['sn/RefreshPage']: getPageFun('snData', getSNList, 'SET_SN_PAGE'),
        ['snRecord/RefreshPage']: getPageFun('snRecordData', getSNRecordList, 'SET_SN_RECORD_PAGE'),
    }
};

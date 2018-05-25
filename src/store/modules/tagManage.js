import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {tagChannelPage, tagOtherChannelPage, tagPage} from "../../api/tagManage";

const defaultData = getDefaultPageData();
export default {
    state: {
        tagPageData: defaultData,
        tagChannelData: defaultData,
        tagOtherChannelData: defaultData,
    },
    mutations: {
        SET_PAGE: (state, data) => {
            state.tagPageData = data;
        },
        SET_CHANNEL_PAGE: (state, data) => {
            state.tagChannelData = data;
        },
        SET_OTHER_CHANNEL_PAGE: (state, data) => {
            state.tagOtherChannelData = data;
        },
    },
    actions: {
        ['tag/RefreshPage']: getPageFun('tagPageData', tagPage, 'SET_PAGE'),
        ['tag/channel/RefreshPage']: getPageFun('tagChannelData', tagChannelPage, 'SET_CHANNEL_PAGE'),
        ['tag/otherChannel/RefreshPage']: getPageFun('tagOtherChannelData', tagOtherChannelPage, 'SET_OTHER_CHANNEL_PAGE'),
    }
};

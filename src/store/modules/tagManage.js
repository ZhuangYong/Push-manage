import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {tagChannelPage, tagMediaPage, tagOtherChannelPage, tagOtherMediaPage, tagPage} from "../../api/tagManage";

const defaultData = getDefaultPageData();
export default {
    state: {
        tagPageData: defaultData,
        tagChannelData: defaultData,
        tagOtherChannelData: defaultData,
        tagMediaPage: defaultData,
        tagOtherMediaPage: defaultData,
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
        SET_MEDIA_PAGE: (state, data) => {
            state.tagMediaPage = data;
        },
        SET_OTHER_MEDIA_PAGE: (state, data) => {
            state.tagOtherMediaPage = data;
        },
    },
    actions: {
        ['tag/RefreshPage']: getPageFun('tagPageData', tagPage, 'SET_PAGE'),
        ['tag/channel/RefreshPage']: getPageFun('tagChannelData', tagChannelPage, 'SET_CHANNEL_PAGE'),
        ['tag/otherChannel/RefreshPage']: getPageFun('tagOtherChannelData', tagOtherChannelPage, 'SET_OTHER_CHANNEL_PAGE'),
        ['tag/media/RefreshPage']: getPageFun('tagMediaPage', tagMediaPage, 'SET_MEDIA_PAGE'),
        ['tag/otherMedia/RefreshPage']: getPageFun('tagOtherMediaPage', tagOtherMediaPage, 'SET_OTHER_MEDIA_PAGE'),
    }
};

import {menuPage as weixinMenuPage} from '../../api/weixinMenu';
import {materialPage} from '../../api/weixinMaterial';
import {pushPage} from '../../api/weixinPush';
import {getDefaultPageData, getPageFun} from "../../utils/fun";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        weixinMenuPage: Object.assign({}, defaultPageData),
        materialPage: Object.assign({}, defaultPageData),
        pushPage: Object.assign({}, defaultPageData),
    },
    mutations: {
        SET_WEIXIN_MENU_DATA: (state, data) => {
            state.weixinMenuPage = data;
        },
        SET_WEIXIN_MATERIAL_DATA: (state, data) => {
            state.materialPage = data;
        },
        SET_WEIXIN_PUSH_DATA: (state, data) => {
            state.pushPage = data;
        },
    },
    actions: {
        ['weixin/material/RefreshPage']: getPageFun('materialPage', materialPage, 'SET_WEIXIN_MATERIAL_DATA'),
        ['weixin/menu/RefreshPage']: getPageFun('weixinMenuPage', weixinMenuPage, 'SET_WEIXIN_MENU_DATA'),
        ['weixin/push/RefreshPage']: getPageFun('pushPage', pushPage, 'SET_WEIXIN_PUSH_DATA'),
    }
};

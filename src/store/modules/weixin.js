import {menuPage as weixinMenuPage, menuTree} from '../../api/weixinMenu';
import {materialPage} from '../../api/weixinMaterial';
import {pushPage} from '../../api/weixinPush';
import {getDefaultPageData, getPageFun} from "../../utils/fun";
import {wxImagePage} from "../../api/weixinImage";

const defaultPageData = getDefaultPageData();
export default {
    state: {
        weixinMenuPage: Object.assign({}, defaultPageData),
        materialPage: Object.assign({}, defaultPageData),
        pushPage: Object.assign({}, defaultPageData),
        menuTree: Object.assign({}, defaultPageData),
        wxImagePage: Object.assign({}, defaultPageData),
    },
    mutations: {
        SET_WEIXIN_IMAGE_DATA: (state, data) => {
            state.wxImagePage = data;
        },
        SET_WEIXIN_MENU_DATA: (state, data) => {
            state.weixinMenuPage = data;
        },
        SET_WEIXIN_MATERIAL_DATA: (state, data) => {
            state.materialPage = data;
        },
        SET_WEIXIN_PUSH_DATA: (state, data) => {
            state.pushPage = data;
        },
        SET_WEIXIN_MENU_TREE: (state, data) => {
            state.menuTree = data;
        },
    },
    actions: {
        ['weixin/image/RefreshPage']: getPageFun('wxImagePage', wxImagePage, 'SET_WEIXIN_IMAGE_DATA'),
        ['weixin/material/RefreshPage']: getPageFun('materialPage', materialPage, 'SET_WEIXIN_MATERIAL_DATA'),
        ['weixin/menu/RefreshPage']: getPageFun('weixinMenuPage', weixinMenuPage, 'SET_WEIXIN_MENU_DATA'),
        ['weixin/push/RefreshPage']: getPageFun('pushPage', pushPage, 'SET_WEIXIN_PUSH_DATA'),
        ['weixin/menu/tree/RefreshPage']({commit}) {
            return new Promise((resolve, reject) => {
                menuTree().then(response => {
                    commit('SET_WEIXIN_MENU_TREE', response);
                    resolve(response);
                }).catch(err => {
                    reject(err);
                });
            });
        },
    }
};

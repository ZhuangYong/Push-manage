export default {
    CODE_SUCCESS: 2000,

    CODE_NEED_LOGIN: 1004,

    // 登陆前url记录key
    BEFORE_LOGIN_URL_KEY: "BEFORE_LOGIN_URL_KEY",

    // 检查正在从雷客更新数据的状态
    CHECK_LEIKE_BETWEEN_TIME: 5000,

    // 从雷客更新数据 0： 正在更新 1：更新完成
    STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING: '0',

    BASE_API: process.env.BASE_API,

    PAGE_SET: {
        PAGE_LIST: 'list',
        PAGE_EDIT: 'edit',
        PAGE_ADD: 'add',
        PAGE_TREE: 'tree',
        PAGE_EDIT_I18N: 'editI18n',
        currentPage: location.hash ? location.hash.replace("#", "") : 'list'
    },

    //1为图片，2为文字，3为epg选择，4为load选择

    TYPE_I18N_KEY_IMG: 1,

    TYPE_I18N_KEY_TXT: 2,

    TYPE_I18N_KEY_EPG: 3,

    TYPE_I18N_KEY_LOAD: 4,

};

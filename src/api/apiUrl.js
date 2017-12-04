export default {
    API_LOGIN: 'admin/login',

    API_LOGOUT: 'admin/logout',

    API_GET_USER_INFO: 'admin/info',

    API_MODIFY_USER_INFO: 'admin/person/update',

    // 查询用户分组
    API_SEARCH_GROUP_LIST_BY_CODE: 'admin/group/searchGroupListByCode/',

    // 查询app和rom升级
    API_SEARCH_UPGRADE_BY_CODE: 'admin/publish/searchUpgradeByCode/',

    API_USER_LIST: 'system/user/page', //获取用户列表

    API_USER_DELETE: 'system/user/delete/', //删除用户

    API_USER_UPDATE: 'system/user/update', //修改

    API_USER_CREATE: 'system/user/create', //添加用户

    API_CHECK_LOGIN_NAME: 'system/user/validate/', //校验登录名是否存在

    API_ROLE_LIST: 'system/user/roleList/',

    API_MODIFY_ROLE: 'system/user/roleModify',

    API_RESETPASSWORD: 'system/user/resetPassword/',

    API_SUPER_ADMIN: 'system/user/superAdmin/',

    API_ALL_ROLE_LIST: 'system/role/page',  //角色相关获取角色列表

    API_ROLE_DELETE: 'system/role/delete/', //角色删除

    API_FORCEDELETE_ROLE: 'system/role/forceDelete/', //强制删除角色

    API_ROLE_MODIFY: 'system/role/modify', //角色修改

    API_RESOURCETREE_ROLE: 'system/role/resourceTree/',  //根据id获取资源树

    API_RESOURCETREE_DELETE: 'system/role/resourceModify',

    API_RESOURCE_DELETE: 'system/resource/delete/', //资源相关

    API_RESOURCE_FORCEDELETE: 'system/resource/forceDelete/',

    API_RESOURCE_MOIFY: 'system/resource/modify',

    API_RESOURCE_TREE: 'system/resource/tree',

    API_RESOURCES_PAGE: 'system/resource/page',

    API_FUNCTION_ADD: 'system/function/add', //功能接口先关

    API_FUNCTION_DELETE: 'system/function/delete/',

    API_FUNCTION_EDIT: 'system/function/edit/',

    API_FUNCTION_PAGE: 'system/function/list',

    API_FUNCTION_SAVE: 'system/function/save',

    // ------------- 机型管理接口 -----------------
    API_FUNCTION_CHANNLE: 'admin/channel/channelList',

    // 获取分页数据
    API_CHANNEL_LIST: 'admin/channel/list',

    API_CHANNEL_SAVE: 'admin/channel/save',

    API_CHANNEL_SAVE_IMAGE: 'admin/channel/saveImg/',

    API_FUNCTION_PAGELIST: 'system/page/pageList',

    API_UPGRADE_ADD: 'system/upgrade/add', //升级管理,

    API_UPGRADE_DELETE: 'system/upgrade/delete/',

    API_UPGRADE_EDIT: 'system/upgrade/edit/',

    API_UPGRADE_PAGE: 'system/upgrade/list',

    API_UPGRADE_SAVE: 'system/upgrade/save',

    API_UPGRADE_SAVE_IMG: 'system/upgrade/saveImg',

    API_UPGRADE_SEARCH: 'system/upgrade/search/',

    API_PAGE_LIST: 'system/page/list', //页面相关

    API_PAGE_ADD: 'system/page/add',

    API_PAGE_EDIT: 'system/page/edit/',

    API_PAGE_SAVE: 'system/page/save',

    API_PUSH_ADD: 'system/push/add', //推送先关

    API_PUSH_PAGE: 'system/push/list',

    API_PUSH_SAVE: 'system/push/save',

    API_PUSH_SEADEVICE: 'system/push/searchDevice',

    API_PUSH_SEAPAGE: 'system/push/searchPage',

    API_GROUP_GROUPLIST: 'admin/group/groupList',

    API_EPG_LIST: 'admin/epg/list',

    API_EPG_EPGLIST: 'admin/epg/epgList',

    API_EPG_ADD: 'admin/epg/saveAdd',

    API_EPG_EDIT: 'admin/epg/saveEdit',

    API_EPG_DEL: 'admin/epg/delete/',

    API_SCREEN_LIST: 'admin/screen/screenList',

    API_PUBLISH_LIST: 'admin/publish/list',

    API_PUBLISH_SAVE: 'admin/publish/save',

    API_PUBLISH_DELETE: 'admin/publish/delete/',

    API_SCREEN_PAGE: 'admin/screen/list',

    API_SCREEN_SAVE: 'admin/screen/save',

    API_SCREEN_DELETE: 'admin/screen/delete/',

    API_SCREEN_SAVE_IMAGE: 'admin/screen/saveImg/',

    // 激活码管理接口
    API_ACTIVATE_LIST: 'admin/activate/list',

    // 获取分页数据
    API_PRODUCT_LIST: 'admin/product/list',

    // 保存产品模块
    API_PRODUCT_SAVE: 'admin/product/save',

    // 删除产品模块
    API_PRODUCT_DELETE: 'admin/product/delete/',

    // 保存产品图片模块
    API_PRODUCT_SAVE_IMAGE: 'admin/product/saveImg',

    API_DEVICE_LIST: 'admin/device/list',

    API_DEVICE_DEVICE_LIST: 'admin/device/deviceList',

    API_DEVICE_SAVE: 'admin/device/save',

    API_DEVICE_USER: 'admin/device/user/',

    API_DEVICE_SAVE_USER: 'admin/device/saveUser/',

    API_DEVICE_SAVE_EXCEL: 'admin/device/saveExcel/',

    API_DEVICE_SAVE_IMG: 'admin/device/saveImg',

    API_DEVICE_DELETE: 'admin/device/delete/',

    //数据定义管理

    API_DEFINE_ADD: 'system/define/add',

    API_DEFINE_DEFINELIST: 'system/define/defineList',

    API_DEFINE_DELETE: 'system/define/delete/',

    API_DEFINE_EDIT: 'system/define/edit/',

    API_DEFINE_LIST: 'system/define/list',

    API_DEFINE_SAVE: 'system/define/save',

    //系统管理下的配置管理

    API_CONFIG_LIST: 'system/config/list',

    API_CONFIG_SAVE: 'system/config/save'

};

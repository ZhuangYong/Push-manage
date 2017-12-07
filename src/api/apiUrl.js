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

    API_DEVICE_DELETE_USER: 'admin/device/deleteUser/',

    //数据定义管理
    API_DEFINE_ADD: 'system/define/add',

    API_DEFINE_DEFINELIST: 'system/define/defineList',

    API_DEFINE_DELETE: 'system/define/delete/',

    API_DEFINE_EDIT: 'system/define/edit/',

    API_DEFINE_LIST: 'system/define/list',

    API_DEFINE_SAVE: 'system/define/save',

    // 支付激活日志管理接口
    API_LOG_PAY_ACTIVATE_LIST: 'admin/payActivateLog/list',

    // 首次注册日志管理接口
    API_LOG_REGISTER_LIST: 'admin/registerLog/list',

    //雷克数据更新管理

    API_LEIKE_LIST: 'system/leike/list',

    API_LEIKE_UPDATE_PIC: 'system/leike/updateSongsAndArtistsDBResource', //更新图片数据

    API_LEIKE_UPDATERANK: 'system/leike/updateRankDBResource', //更新榜单数据

    API_LEIKE_UPDATERECOMMEND: 'system/leike/updateRecommendDBResource', //更新推荐数据

    API_LEIKE_UPDATE_CLASS: 'system/leike/updateTypeDBResource', //更新分类

    API_LEIKE_SAVE: 'system/leike/save',

    API_CONFIG_SAVE: 'system/config/save',

    // 数据上报
    API_LOG_UPLOAD_LIST: 'admin/upLog/list',

    // 数据同步日志管理接口
    API_LOG_SYNCH_LIST: 'admin/synchLog/list',

    // 分类列表
    API_TYPE_LIST: 'admin/type/list',

    // 歌曲列表模块
    API_TYPE_MEDIA_LIST: 'admin/type/mediaList/',

    // 保存分类模块
    API_TYPE_SAVE: 'admin/type/save',

    // 保存分类图片模块
    API_TYPE_SAVE_IMG: 'admin/type/saveImg/',

    // 获取分页数据
    API_RECOMMEND_LIST: 'admin/recommand/list',

    // 歌曲列表模块
    API_RECOMMEND_MEDIA_LIST: 'admin/recommand/mediaList/',

    // 保存推荐模块
    API_RECOMMEND_SAVE: 'admin/recommand/save',

    // 保存图片
    API_RECOMMEND_SAVE_IMG: 'admin/recommand/saveImg/',

    // 榜单列表管理接口
    // 获取分页数据
    API_RANK_LIST: 'admin/rank/list',

    // 歌曲列表模块
    API_RANK_MEDIA_LIST: 'admin/rank/mediaList/',


    API_RANK_SAVE: 'admin/rank/save',

    // 保存分类图片模块
    API_RANK_SAVE_IMG: 'admin/rank/saveImg/',

    // 查询歌星分组下的歌星列表
    API_GROUP_ACTOR_LIST: 'admin/cotegory/actorList/',

    // 保存分类图片模块
    API_GROUP_DELETE: 'admin/cotegory/delete/',

    // 获取分页数据
    API_GROUP_LIST: 'admin/cotegory/list',

    // 查询歌星下的歌曲列表
    API_GROUP_MEDIA: 'admin/cotegory/media/',

    // 保存歌星分组模块
    API_GROUP_SAVE: 'admin/cotegory/save',

    // 保存歌星分组图片模块
    API_GROUP_SAVE_IMG: 'admin/cotegory/saveImg/',

    // 删除关键字模块
    API_SEARCH_DELETE: 'admin/search/delete/',

    // 获取分页数据
    API_SEARCH_LIST: 'admin/search/list',

    // 保存关键字模块
    API_SEARCH_SAVE: 'admin/search/save',

    // 问题分类管理模块
    API_FEEDBACK_CLASSIFY: 'admin/feedback/classify',

    // 删除问题分类模块
    API_FEEDBACK_CLASSIFY_DELETE: 'admin/feedback/classifyDelete/',

    // 保存问题分类管理模块
    API_FEEDBACK_CLASSIFY_SAVE: 'admin/feedback/classifySave',

    // 删除意见反馈模块
    API_FEEDBACK_DELETE: 'admin/feedback/delete/',

    // 获取分页数据
    API_FEEDBACK_LIST: 'admin/feedback/list',

    // 查询回复内容列表模块
    API_FEEDBACK_REPLY: 'admin/feedback/reply/',

    // 保存意见反馈模块
    API_FEEDBACK_SAVE: 'admin/feedback/save',

    // 删除菜单模块
    API_WEIXIN_MENU_DELETE: 'admin/wxmenu/delete/',

    // 获取分页数据
    API_WEIXIN_MENU_LIST: 'admin/wxmenu/list',

    API_WEIXIN_MENU_TREE: 'admin/wxmenu/tree',

    API_WEIXIN_MENU_SAVE: 'admin/wxmenu/save',

    // 微信素材接口
    API_WEIXIN_MATERIAL_LIST: 'admin/wxmaterial/list',

    API_WEIXIN_MATERIAL_SAVE: 'admin/wxmaterial/save',

    API_WEIXIN_MATERIAL_DELETE: 'admin/wxmaterial/delete/',

    API_WEIXIN_MATERIAL_DELETE_SINGLE: 'admin/wxmaterial/deleteSingle/',

    API_WEIXIN_MATERIAL_SAVE_IMG: 'admin/wxmaterial/saveImg',

    // 微信推送接口
    API_WEIXIN_PUSH_LIST: 'admin/wxpush/list',

    API_WEIXIN_PUSH_SAVE: 'admin/wxpush/save',

    API_WEIXIN_PUSH_DELETE: 'admin/wxpush/delete/',

    // 歌星管理接口
    API_ACTOR_LIST: 'admin/actor/list',

    API_ACTOR_SAVE: 'admin/actor/save',

    API_ACTOR_SAVE_IMG: 'admin/actor/saveImg/',

    // 歌曲管理接口
    API_MEDIA_LIST: 'admin/media/list',

    API_MEDIA_SAVE: 'admin/media/save',

    API_MEDIA_SAVE_IMG: 'admin/media/saveImg/',


    //共享

    API_PROMOTION_SHARE_LIST: 'admin/promotion/list',

    API_PROMOTION_SHARE_SAVE: 'admin/promotion/save',

    API_PROMOTION_SHARE_DELETE: 'admin/promotion/delete/',

    API_PROMOTION_SHARE_SAVE_MARKET: 'admin/promotion/saveMarket',

    API_PORMOTION_SHARE_DELETE_MARKET: 'admin/promotion/deleteMarket/',

    API_PORMOTION_SHARE_MARKET_LIST: 'admin/promotion/getMarketList/',

    //保存共享图片

    API_PROMOTION_SAVE_IMG: 'admin/promotion/saveImg'


};

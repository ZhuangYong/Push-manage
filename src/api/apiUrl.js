export default {
    API_LOGIN: 'admin/login',

    API_LOGOUT: 'admin/logout',

    API_GET_USER_INFO: 'admin/info',

    API_MODIFY_USER_INFO: 'admin/person/update',

    // 修改用户昵称、密码
    API_SYSTEM_USER_MODIFY_PASSWORD: 'system/user/modifyPassword',

    // 查询用户分组
    // API_SEARCH_GROUP_LIST_BY_CODE: 'admin/group/searchGroupListByCode/',

    // 查询app和rom升级
    API_SEARCH_UPGRADE_BY_CODE: 'admin/publish/searchUpgradeByCode/',

    API_USER_LIST: 'system/user/page', //获取用户列表

    API_USER_DELETE: 'system/user/delete/', //删除用户

    API_USER_UPDATE: 'system/user/update', //修改

    API_USER_CREATE: 'system/user/create', //添加用户

    API_CHECK_LOGIN_NAME: 'system/user/validate/', //校验登录名是否存在

    API_ROLE_LIST: 'system/user/roleList/',

    // 根据用户uuid获取渠道方列表模块
    API_USER_MANUFACTURER_LIST: 'system/user/manufacturerList/',

    // 根据用户uuid获取销售方列表模块
    API_USER_SALES_LIST: 'system/user/salesList/',

    API_MODIFY_ROLE: 'system/user/roleModify',

    API_RESETPASSWORD: 'system/user/resetPassword/',

    API_SUPER_ADMIN: 'system/user/superAdmin/',

    API_ALL_ROLE_LIST: 'system/role/page',  //角色相关获取角色列表

    API_ROLE_DELETE: 'system/role/delete/', //角色删除

    API_FORCEDELETE_ROLE: 'system/role/forceDelete/', //强制删除角色

    API_ROLE_MODIFY: 'system/role/modify', //角色修改

    API_RESOURCETREE_ROLE: 'system/role/resourceTree/',  //根据id获取资源树

    API_RESOURCETREE_DELETE: 'system/role/resourceModify',

    API_ROLE_SAVE_CHANNEL: 'system/role/saveChannel',

    // 根据角色id获取渠道列表
    API_ROLE_CHANNEL_LIST: 'system/role/channelList/',

    API_ROLE_GROUP_LIST: 'system/role/groupList/',

    API_ROLE_SAVE_USER_GROUP: 'system/role/saveUserGroup',

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

    API_FUNCTION_CHANNEL_DELETE: 'admin/channel/delete/',

    // 获取分页数据
    API_CHANNEL_LIST: 'admin/channel/list',

    API_CHANNEL_SAVE: 'admin/channel/save',

    API_CHANNEL_SAVE_IMAGE: 'admin/channel/saveImg/',

    //机型列表检测唯一值
    API_CHANNEL_CHECK_UNIQUE: 'admin/channel/check/',

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

    // 切换机型列表
    API_PUBLISH_CHANGE_CHANNEL_LIST: '/admin/publish/changeChannelList',

    //单独发布管理的机型-机型列表
    API_PUBLISH_CHANNEL_LIST: 'admin/publish/channelList',

    API_SCREEN_PAGE: 'admin/screen/list',

    API_SCREEN_SAVE: 'admin/screen/save',

    API_SCREEN_DELETE: 'admin/screen/delete/',

    API_SCREEN_SAVE_IMAGE: 'admin/screen/saveImg/',

    // 查询模板下面的子模块
    API_SCREEN_TEMPLATE_LIST: 'admin/screen/template/',

    API_SCREEN_TEMPLATE_SAVE: 'admin/screen/saveTemplate/',

    API_SCREEN_DELETE_TEMPLATE: 'admin/screen/deleteTemplate/',

    /**
     * 用户管理模块
     */

    // 设备列表
    API_STBUSER_LIST: 'admin/stbUser/list/',

    // 设置设备状态模块
    API_STBUSER_SAVE_VIEW: 'admin/stbUser/saveView/',

    // 恢复/禁用vip模块
    API_STBUSER_DISABLE_VIP: 'admin/stbUser/disableVip/',

    // 恢复/禁用过滤模块
    API_STBUSER_FILTER: 'admin/stbUser/filter/',

    // 保存激活模块
    API_STBUSER_SAVE_ACTIVATE: 'admin/stbUser/saveActivate/',

    // 当前登录用户信息模块
    API_STBUSER_LOGIN: 'admin/stbUser/login/',

    // 绑定设备（微信点歌模块）模块
    API_STBUSER_USER: 'admin/stbUser/user/',

    // 支付记录模块
    API_STBUSER_ORDER: 'admin/stbUser/order/',

    // 设备录音数据模块
    API_STBUSER_USER_SOUND: 'admin/stbUser/userSound/',

    // 激活码记录模块
    API_STBUSER_ACTIVATE_RECORD: 'admin/stbUser/activateRecord/',

    // 激活码设置模块
    API_STBUSER_ACTIVATE_RECORD_EDIT: 'admin/stbUser/saveActivateEdit/',

    //获取激活码
    API_SYSTEM_GET_ACTIVATE_CODE: 'system/leike/getActivateCode',

    // 消息列表模块
    API_STBUSER_MESSAGE: 'admin/stbUser/message/',
    // 消息列表模块

    API_STBUSER_SAVE: 'admin/stbUser/save',


    // 订单列表
    API_ORDER_LIST: 'admin/order/list/',

    // 处理未付款订单
    API_ORDER_SAVE: 'admin/order/save/',


    // 获取设备分组列表
    API_DEVICE_GROUP_LIST: 'admin/group/list/',

    // 查询除设备组里面的设备列表
    API_DEVICE_GROUP_DEVICE_LIST: 'admin/group/deviceList',

    // 删除设备分组模块(path: id)
    API_DEVICE_GROUP_DELETE: 'admin/group/delete/',

    // 批量删除设备列表模块(path: id)
    API_DEVICE_GROUP_DELETE_USER: 'admin/group/deleteUser/',

    // 查询所有分组列表模块
    API_DEVICE_GROUP_GROUP_LIST: 'admin/group/groupList/',

    // 保存设备分组模块
    API_DEVICE_GROUP_SAVE: 'admin/group/save/',

    // 保存设备列表模块(path: id)
    API_DEVICE_GROUP_SAVE_USER: 'admin/group/saveUser/',

    // 根据机型code查询机型分组模块(path: channelCode)
    // API_DEVICE_GROUP_SEARCH_GROUP_LIST_BY_CODE: '/admin/group/searchGroupListByCode/',

    // 获取设备列表模块(path: id)
    API_DEVICE_GROUP_USER: 'admin/group/user/',

    /**
     * 系统设置-灰度分组
     */

    // 获取设备分组列表
    API_GRAY_GROUP_LIST: 'admin/groupGray/list/',

    // 查询除灰度组里面能选择的设备列表
    API_GRAY_GROUP_DEVICE_LIST: 'admin/groupGray/deviceList/',

    // 删除设备分组模块(path: id)
    API_GRAY_GROUP_DELETE: 'admin/groupGray/delete/',

    // 批量删除设备列表模块(path: id)
    API_GRAY_GROUP_DELETE_USER: 'admin/groupGray/deleteUser/',

    // 查询所有分组列表模块
    API_GRAY_GROUP_GROUP_LIST: 'admin/groupGray/groupList/',

    // 保存设备分组模块
    API_GRAY_GROUP_SAVE: 'admin/groupGray/save/',

    // 保存设备列表模块(path: id)
    API_GRAY_GROUP_SAVE_USER: 'admin/groupGray/saveUser/',

    // 根据机型code查询机型分组模块(path: channelCode)
    API_GRAY_GROUP_SEARCH_GROUP_LIST_BY_CODE: 'admin/groupGray/searchGroupListByCode/',

    // 获取设备列表模块(path: id)
    API_GRAY_GROUP_USER: 'admin/groupGray/user/',

    /**
     * 系统设置-redis缓存管理模块
     */
    // 获取缓存列表模块
    API_SYSTEM_REDIS_LIST: 'system/redis/list',
    // 删除单行缓存模块
    API_SYSTEM_REDIS_CLEAR_CACHE: 'system/redis/clearCache',
    // 修改单行缓存模块
    API_SYSTEM_REDIS_SAVE_CACHE: 'system/redis/saveCache',
    // 重建es搜索索引
    API_SYSTEM_REDIS_DELETE_AND_CREATE_INDEX: 'system/redis/deleteAndCreateIndex',
    // 清空所有缓存
    API_SYSTEM_REDIS_CLEAR_ALL_CACHE: 'system/redis/clearAllCache',
    // 查询下载地址
    API_SYSTEM_REDIS_GET_CACHE_DOWNLOAD_URL: '/system/redis/getCacheDownloadUrl',

    /**
     * 系统设置-迁移数据
     */
    // 迁移数据列表
    API_ADMIN_MIGRATE_LIST: 'admin/migrate/list',

    // 更新迁数据列表
    API_ADMIN_MIGRATE_UPDATE_MIGRATE: 'admin/migrate/updateMigrate',

    // 批量同步
    API_ADMIN_MIGRATE_DO_MIGRATE: 'admin/migrate/doMigrate',

    /**
     * 录音管理模块
     */

    // 删除录音模块(path: id)
    API_SOUND_DELETE: 'admin/sound/delete/',

    // 禁用录音模块(path: id)
    API_SOUND_DISABLE: 'admin/sound/disable/',

    // 获取分页数据(path: id)
    API_SOUND_LIST: 'admin/sound/list/',

    // 查看分享该录音的用户列表
    API_SOUND_USER: 'admin/sound/user/',

    /**
     * 激活码管理模块
     */

    // 激活码管理接口
    API_ACTIVATE_LIST: 'admin/activate/list',

    // 获取激活码天数列表
    API_ACTIVATE_DAY_LIST: 'admin/activate/dayList',

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

    API_CONFIG_LIST: 'system/config/list',

    API_CONFIG_DELETE: 'system/config/delete/',

    API_CONFIG_SAVE: 'system/config/save',

    //雷客数据更新管理

    API_LEIKE_LIST: 'system/leike/list',

    API_LEIKE_UPDATE_PIC: 'system/leike/updateSongsAndArtistsDBResource', //更新图片数据

    API_LEIKE_UPDATERANK: 'system/leike/updateRankDBResource', //更新榜单数据

    API_LEIKE_UPDATERECOMMEND: 'system/leike/updateRecommendDBResource', //更新推荐数据

    API_LEIKE_UPDATE_CLASS: 'system/leike/updateTypeDBResource', //更新分类

    API_LEIKE_SAVE: 'system/leike/save',

    // 获取“歌星歌曲数据库版本”下载链接
    API_LEIKE_GET_MEDIA_DB: 'system/leike/getMediaDb',

    // 数据上报
    API_LOG_UPLOAD_LIST: 'admin/upLog/list',

    // 数据同步日志管理接口
    API_LOG_SYNCH_LIST: 'admin/synchLog/list',

    // 分类列表
    API_TYPE_LIST: 'admin/type/list',

    // 歌曲列表模块
    API_TYPE_MEDIA_LIST: 'admin/type/mediaList/',

    // 获取所有语言类型列表，不分页
    API_ADMIN_MEDIA_LANGUAGE_LIST: 'admin/media/languageList/',

    // 保存分类模块
    API_TYPE_SAVE: 'admin/type/save',

    API_TYPE_SAVE_SONGS: 'admin/type/saveSongs/',

    API_TYPE_DELETE_SONGS: 'admin/type/deleteSongs/',

    // 保存分类模块

    API_TYPE_DELETE: 'admin/type/delete/',

    // 保存分类图片模块
    API_TYPE_SAVE_IMG: 'admin/type/saveImg/',

    // 获取分页数据
    API_RECOMMEND_LIST: 'admin/recommand/list',

    // 歌曲列表模块
    API_RECOMMEND_MEDIA_LIST: 'admin/recommand/mediaList/',

    // 保存推荐模块
    API_RECOMMEND_SAVE: 'admin/recommand/save',


    API_RECOMMEND_SAVE_SONGS: 'admin/recommand/saveSongs/',


    // 删除自定义推荐模块
    API_RECOMMEND_DELETE: 'admin/recommand/delete/',

    API_RECOMMEND_DELETE_SONGS: 'admin/recommand/deleteSongs/',

    // 保存图片
    API_RECOMMEND_SAVE_IMG: 'admin/recommand/saveImg/',

    // 榜单列表管理接口
    // 获取分页数据
    API_RANK_LIST: 'admin/rank/list',

    // 歌曲列表模块
    API_RANK_MEDIA_LIST: 'admin/rank/mediaList/',


    API_RANK_SAVE: 'admin/rank/save',

    API_RANK_SAVE_SONGS: 'admin/rank/saveSongs/',

    API_RANK_DELETE: 'admin/rank/delete/',

    API_RANK_DELETE_SONGS: 'admin/rank/deleteSongs/',
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

    API_GROUP_SAVE_LANGUAGE: 'admin/cotegory/saveLanguage',


    API_GROUP_SAVE_ACTORS: 'admin/cotegory/saveActors/',

    API_GROUP_DELETE_ACTORS: 'admin/cotegory/deleteActors/',

    // 保存歌星分组图片模块
    API_GROUP_SAVE_IMG: 'admin/cotegory/saveImg/',

    API_GROUP_DELETE_IMG: 'admin/cotegory/deleteImg/',

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

    API_FEEDBACK_CLASSIFY_LIST: 'admin/feedback/classifyList',

    /**
     * 运营管理-分类组管理
     */
    // 查询分类组所有列表模块
    API_ADMIN_TYPE_GROUP_GROUP_LIST: 'admin/typeGroup/groupList/',

    // 分类组管理接口
    API_ADMIN_TYPE_GROUP_LIST: 'admin/typeGroup/list/',

    // 保存分类组模块
    API_ADMIN_TYPE_GROUP_SAVE: 'admin/typeGroup/save/',

    // 删除分类组模块(path: id)
    API_ADMIN_TYPE_GROUP_DELETE: 'admin/typeGroup/delete/',


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
    API_ACTOR_LIST: 'admin/actor/list/',

    API_ACTOR_SAVE: 'admin/actor/save',

    API_ACTOR_SAVE_IMG: 'admin/actor/saveImg/',

    /**
     * 共享配置管理模块
     */

    /**
     * 旧版接口
     */

    API_PROMOTION_SHARE_LIST: 'admin/promotion/list',

    API_PROMOTION_SHARE_SAVE: 'admin/promotion/save',

    API_PROMOTION_SHARE_DELETE: 'admin/promotion/delete/',

    API_PROMOTION_SHARE_SAVE_MARKET: 'admin/promotion/saveMarket',

    API_PORMOTION_SHARE_DELETE_MARKET: 'admin/promotion/deleteMarket/',

    API_PORMOTION_SHARE_MARKET_LIST: 'admin/promotion/getMarketList/',

    //保存共享图片

    API_PROMOTION_SAVE_IMG: 'admin/promotion/saveImg',

    /**
     * 新版接口
     */
    // 删除产品模块（path: id)
    API_PRODUCT_DISCOUNT_DELETE: 'admin/productDiscount/delete/',

    // 获取分页数据
    API_PRODUCT_DISCOUNT_LIST: 'admin/productDiscount/list/',

    // 获取模板产品列表
    API_PRODUCT_DISCOUNT_PRODUCT_LIST: 'admin/productDiscount/productList/',

    // 保存产品模块
    API_PRODUCT_DISCOUNT_SAVE: 'admin/productDiscount/save/',


    // 歌曲管理接口
    API_MEDIA_LIST: 'admin/media/list/',

    API_MEDIA_SAVE: 'admin/media/save',

    API_MEDIA_SAVE_IMG: 'admin/media/saveImg/',

    //运营数据统计

    API_ADMIN_STATISTICS: 'admin/statistics/index',

    //查询当前登录用户的机型列表

    API_STATISTICS_CHANNEL_LIST: 'admin/statistics/channelList',

    // 查询当前登录用户的机型列表和设备组列
    API_STATISTICS_SEARCH_CHANNEL_DEVICE_GROUP: 'admin/statistics/searchChannelAndDeviceGroup',

    //激活码统计列表

    API_STATISTICS_ACTIVATE: 'admin/statistics/activate',

    //数据统计-实时统计

    API_ACTUAL_SATAISTICS: 'admin/statistics/detail',

    API_PAY_SATAISTICS: 'admin/statistics/pay',

    API_PAY_SATAISTICS_PAY_DETAIL: 'admin/statistics/payDetail',

    //用户管理-相册管理

    API_ALBUM_LIST: 'admin/album/list/',

    API_ALBUM_DISABLE: 'admin/album/disable/', //启用或禁用相册列表,

    API_ALBUM_DELETE: 'admin/album/delete/',

    //用户管理-用户列表

    API_USER_LSIT: 'admin/user/list', //用户列表

    API_USER_BIND: 'admin/user/bind', //绑定登录记录

    // 从雷客跟新数据
    API_UPDATE_RANK_INFO: 'system/leike/updateRankInfo',

    // 从雷客数据库更新本地歌星歌手数据（非图片）
    API_UPDATE_MEDIA_ACTOR_EXTRA: 'system/leike/updateMediaActorExtra',

    // 根据雷客数据库更新本地歌星下的歌曲数据库
    API_UPDATE_TB_ACTOR_ON_MEDIA: 'system/leike/updateTbActorOnMedia',

    API_UPDATE_ACTOR_CATEGORY_DB: 'system/leike/updateActorCategoryDB',

    //系统管理-灰度发布

    API_UPGRADE_GRAY_DELETE: 'system/upgradeGray/delete/',

    API_UPGRADE_GRAY_ID: 'system/upgradeGray/id/',

    API_UPGRADE_GRAY_LIST: 'system/upgradeGray/list',

    API_UPGRADE_GRAY_SAVE: 'system/upgradeGray/save',

    API_UPGRADE_GRAY_SAVEIMG: 'system/upgradeGray/saveImg',

    //查询app和rom
    API_UPGRADE_GRAY_APP_ROM: 'system/upgradeGray/searchRomAndApp',

    // 功能分组管理分页接口
    API_FUNCTION_GROUP_LIST: 'system/functionGroup/list',

    // 分组功能列表分页模块
    API_FUNCTION_GROUP_FUNCTION_LIST: 'system/functionGroup/functionList',

    // 获取所有功能列表，不分页
    API_FUNCTION_GROUP_GROUP_LIST: 'system/functionGroup/groupList',

    // 保存功能列表管理接口
    API_FUNCTION_GROUP_SAVE_FUNCTION: 'system/functionGroup/saveFunction',

    API_FUNCTION_GROUP_DELETE_FUNCTION: 'system/functionGroup/deleteFunction',

    // 保存功能组模块
    API_FUNCTION_GROUP_SAVE: 'system/functionGroup/save',

    // 删除功能组模块
    API_FUNCTION_GROUP_DELETE: 'system/functionGroup/delete/',

    // 应用列表
    API_APPLY_LIST: 'admin/apply/list',

    API_APPLY_SAVE: 'admin/apply/save',

    API_APPLY_DELETE: 'admin/apply/delete/',

    API_APPLY_SAVE_IMG: 'admin/apply/saveImg/',

    //机型管理-会员价格配置-保存机型

    API_DISCOUNT_CHANNEL_SAVE: 'admin/productDiscount/saveChannel',

    //机型管理-产品分组
    API_VIP_GROUP_LIST: 'admin/vipGroup/list', //产品分组管理接口

    API_VIP_GROUP_SAVE: 'admin/vipGroup/save',

    API_VIP_GROUP_DELETE: 'admin/vipGroup/delete/',

    API_VIP_GROUP_PRODUCT: 'admin/vipGroup/product', //查询子产品模块

    API_VIP_GROUP_SAVE_PRODUCT: 'admin/vipGroup/saveProduct',

    AP_VIP_GROUP_DELETE_PRODUCT: 'admin/vipGroup/deleteProduct/',

    API_VIP_GROUP_SAVE_IMG: 'admin/vipGroup/saveImg',

    //查询产品包下的机型模块

    API_VIP_GROUP_CHANNEL_LIST: 'admin/vipGroup/channelList/',

    // 获取模板产品列表
    API_PRODUCT_PRODUCT_LIST: 'admin/product/productList/',

    //产品价格模板详情

    API_VIP_GROUP_SEARCH_PRODUCT: 'admin/vipGroup/searchProduct/',

    //查询产品包列表模块

   API_VIP_GROUP_VIPGROUP_LIST: 'admin/vipGroup/vipGroupList',

    //用户管理下的设备列表【查询该机型下的共享产品列表模块

    API_STB_USER_SHARE_PRODCUT: 'admin/stbUser/product/',

    //
    API_LANGUAGE_LIST: 'admin/language/languageList',

    // 获取分页数据
    API_LANGUAGE_PAGE: 'admin/language/list',

    // 保存语言数据
    API_LANGUAGE_SAVE: 'admin/language/save',

    // 多语言中的图片等元数据
    API_LANGUAGE_RESOURCE_LIST: '/admin/languageResource/list',

    // 获取设备分组列表
    API_STB_USER_DEVICE_BOOT_LIST: 'admin/stbUser/location/',


    API_LOAD_LIST: 'admin/load/list',

    API_LOAD_LOAD_LIST: 'admin/load/loadList',

    API_LOAD_SAVE: 'admin/load/save',

    API_LOAD_DELETE: 'admin/load/delete/',

    // 上报文件管理接口
    API_UP_TEXT_LIST: 'admin/upText/list',

    // 数据上报接口
    API_UP_LOG_UPLOAD: 'admin/upLog/upload',

    // 数据上报接口
    API_UP_TEXT_UPLOAD: 'admin/upText/upload',

    // 销售方管理
    // 获取分页数据
    API_ADMIN_SALES_LIST: 'admin/sales/list',

    API_ADMIN_SALES_SAVE: 'admin/sales/save',

    API_ADMIN_SALES_DELETE: 'admin/sales/delete/',

    // 获取所有子模块数据
    // 参数{“salesUuid”：“销售方的uuid”}
    API_ADMIN_SALES_GROUP_LIST: 'admin/sales/groupList',

    // 保存销售方的设备组模块
    API_ADMIN_SALES_GROUP_SAVE: 'admin/sales/saveGroup',

    // 删除销售方的设备组模块
    API_ADMIN_SALES_GROUP_DELETE: 'admin/sales/deleteGroup/',


    // 销售方设备分组管理接口
    API_ADMIN_SALES_AND_GROUP_LIST: 'admin/salesGroup/list',

    API_ADMIN_SALES_AND_GROUP_SAVE: 'admin/salesGroup/save',

    API_ADMIN_SALES_AND_GROUP_DELETE: 'admin/salesGroup/delete/',

    // 获取所有子模块数据
    // 参数{“salesUuid”：“销售方的uuid”}
    API_ADMIN_SALES_AND_GROUP_USER_LIST: 'admin/salesGroup/user',

    // 保存销售方的设备组模块
    API_ADMIN_SALES_AND_GROUP_SAVE_USER: 'admin/salesGroup/saveUser',

    // 删除销售方的设备组模块
    API_ADMIN_SALES_AND_GROUP_DELETE_USER: 'admin/salesGroup/deleteUser',

    // 销售方设备列表管理接口
    API_ADMIN_SALES_STB_USER_LIST: 'admin/salesStbuser/list',

    // 销售方订单管理接口
    API_ADMIN_SALES_ORDER_LIST: 'admin/salesOrder/list',

    // 查询该销售方下的设备组列表{salesUuid}
    API_ADMIN_SALES_SEARCH_DEVICE_GROUP_BY_SALES_UUID: 'admin/saleStatistics/searchDeviceGroupBySalesUuid/',

    // 查询当前登录用户的设备组列表和销售方列表:
    API_ADMIN_SALES_SEARCH_SALES_AND_DEVICE_GROUP: 'admin/saleStatistics/searchSalesAndDeviceGroup',

    // 整体概况
    API_ADMIN_SALES_STATISTICS_INDEX: 'admin/saleStatistics/index',

    // 根据时间查询详情数据
    API_ADMIN_SALES_STATISTICS_DETAIL: 'admin/saleStatistics/detail',

    // ------------------------------------------------------//
    //                       渠道方管理                       //
    // ------------------------------------------------------//
    // 获取分页数据
    API_ADMIN_MANUFACTURER_LIST: 'admin/manufacturer/list',

    API_ADMIN_MANUFACTURER_SAVE: 'admin/manufacturer/save',

    API_ADMIN_MANUFACTURER_DELETE: 'admin/manufacturer/delete/',

    // 获取所有子模块数据
    // 参数{“manufacturerUuid”：“销售方的uuid”}
    API_ADMIN_MANUFACTURER_CHANNEL_LIST: 'admin/manufacturer/channelList',

    // 保存销售方的设备组模块
    API_ADMIN_MANUFACTURER_CHANNEL_SAVE: 'admin/manufacturer/saveChannel',

    // 删除销售方的设备组模块
    API_ADMIN_MANUFACTURER_CHANNEL_DELETE: 'admin/manufacturer/deleteChannel/',

    // 共享统计主页接口
    API_ADMIN_STATISTICS_SHARE_LIST: 'admin/shareStatistics/list',

    // 查询共享机型列表
    API_ADMIN_CHANNEL_SHARE_CHANNEL_LIST: 'admin/channel/shareChannelList',

    // 结算列表管理
    API_ADMIN_SETTLE_MENT_LIST: 'admin/settleMent/list',

    // 查看详情
    API_ADMIN_SETTLE_MENT_DETAILS: 'admin/settleMent/details',

    // 结算对账管理
    API_ADMIN_SETTLE_ACCOUNT_LIST: 'admin/settleAccount/list',

    // 查看订单
    API_ADMIN_SETTLE_ACCOUNT_ORDER: 'admin/settleAccount/order',

    // 支付结算管理
    API_ADMIN_PAY_MENT_LIST: 'admin/payMent/list',

    // 保存接口
    API_ADMIN_PAY_MENT_SAVE: 'admin/payMent/save',

};

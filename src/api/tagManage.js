import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

/*************************************
 * 标签管理
 ************************************/
// 查询标签关联的分类组分页列表： /admin/tag/rankGroupList  参数：tag,rankGroupName封装在请求体内
export function tagRankGroupPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_RANK_GROUP_LIST,
        method: 'post',
        data
    });
}

// 查询未跟指定标签关联的分类组 分页列表：/admin/tag/otherRankGroupList 参数tag,rankGroupName封装在请求体内
export function tagOtherRankGroupPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_OTHER_RANK_GROUP_LIST,
        method: 'post',
        data
    });
}

// 批量删除关联分类组：/admin/tag/deleteRankGroup 参数ids(标签分类组关联列表id字符串，以逗号隔开)，封装在请求体内
export function tagDeleteRankGroup(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE_RANK_GROUP,
        method: 'post',
        data
    });
}

// 批量保存分组关联 /admin/tag/saveRankGroup 参数 tagCode，groupUuids（分类组uuid，多选，以逗号隔开） 封装在请求体内
export function tagSaveRankGroup(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE_RANK_GROUP,
        method: 'post',
        data
    });
}

// 查询标签关联的歌星分页列表：/admin/tag/actorList 参数：actorName
export function tagActorPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_ACTOR_LIST,
        method: 'post',
        data
    });
}

// 查询未跟指定标签关联的歌星列表，分页 ：/admin/tag/otherActorList  参数：actorName
export function tagOtherActorPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_OTHER_ACTOR_LIST,
        method: 'post',
        data
    });
}

// 批量删除关联歌星：/admin/tag/deleteActor 参数ids(歌星tag关联列表id字符串，以逗号隔开)，封装在请求体内
export function tagDeleteActor(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE_ACTOR,
        method: 'post',
        data
    });
}

// 批量保存歌星关联：/admin/tag/saveActor 参数 tagCode，actorNos（歌星编号，多选，以逗号隔开） 封装在请求体内
export function tagSaveActor(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE_ACTOR,
        method: 'post',
        data
    });
}

// 标签分页列表  筛选条件参数：tagName标签名，tagCode标签值，封装在请求体中
export function tagPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_LIST,
        method: 'post',
        data
    });
}

// 保存/编辑 标签 参数：tagName，tagCode，isEnabled(1-生效 2-禁用)，封装在请求体内
export function tagSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE,
        method: 'post',
        data
    });
}

// 禁用/启用标签   参数id(标签id)，封装在请求体内
export function tagSwitchEnable(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SWITCH_ENABLE,
        method: 'post',
        data
    });
}

// 批量删除标签：参数ids（标签id字符串以逗号隔开），封装在请求体内
export function tagDelete(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE,
        method: 'post',
        data
    });
}

// 标签机型关联 分页列表 筛选条件参数：channelCode机型值，channelName机型名，封装在请求体内
export function tagChannelPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_CHANNEL_LIST,
        method: 'post',
        data
    });
}

// 禁用/启用标签机型关联  参数id(标签机型关联列表id)，封装在请求体内
    export function tagSwitchChannelEnabled(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SWITCH_CHANNEL_ENABLED,
        method: 'post',
        data
    });
}

// 批量删除标签机型关联：参数ids(标签机型关联列表id字符串，以逗号隔开)，封装在请求体内
export function tagDeleteChannels(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE_CHANNEL,
        method: 'post',
        data
    });
}

// 批量保存标签机型关联 参数：tagCode标签值，channelCodes（机型值，多选，以逗号隔开） 封装在请求体内
export function tagSaveChannel(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE_CHANNEL,
        method: 'post',
        data
    });
}

// 判断标签值是否重复 参数 tagCode封装在请求体内  返回参数 codeExist(0-不存在 1-已存在)封装在返回data数据中
 export function tagCodeExist(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_CODE_EXIST,
        method: 'post',
        data
    });
}

// 查询未跟指定标签关联的机型列表，分页 参数 tagCode
export function tagOtherChannelPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_OTHER_CHANNEL_LIST,
        method: 'post',
        data
    });
}

// 查询标签关联的歌曲分页列表 参数：tagCode标签值，mediaName歌曲名，serialNo歌曲编号， 封装在请求体内
export function tagMediaPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_MEDIA_LIST,
        method: 'post',
        data
    });
}

// 查询未跟指定标签关联的歌曲分页 参数：tagCode标签值，mediaName歌曲名，serialNo歌曲编号， 封装在请求体内
export function tagOtherMediaPage(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_OTHER_MEDIA_LIST,
        method: 'post',
        data
    });
}

// 批量删除关联歌曲 参数ids(标签歌曲关联列表id字符串，以逗号隔开)，封装在请求体内
export function tagDeleteMedia(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_DELETE_MEDIA,
        method: 'post',
        data
    });
}

// 批量保存歌曲 参数：tagCode标签值，serialNos（歌曲编号，多选，以逗号隔开） 封装在请求体内
export function tagSaveMedia(data) {
    return fetch({
        url: apiUrl.API_ADMIN_TAG_SAVE_MEDIA,
        method: 'post',
        data
    });
}

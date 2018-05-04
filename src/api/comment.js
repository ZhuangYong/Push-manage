/**
 * Created by Zed on 2018/5/4.
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 获取评论分页 条件筛选参数nameNorm（歌曲名），content（内容）封装在请求体内
export function getCommentList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_COMMENT_LIST,
        method: 'post',
        data
    });
}

// 获取回复分页 参数uuid(评论表唯一uuid),筛选参数content(内容)，等装在请求体内
export function getReplyList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_COMMENT_COMMENT_LIST,
        method: 'post',
        data
    });
}

// 禁用/启用回复或评论 参数:type（1-评论 2-回复），operate（1-生效 2-禁用），uuid(type=1时表示评论唯一uuid,type=2时表示回复唯一uuid)
export function commentSwitchEnable(data) {
    return fetch({
        url: apiUrl.API_ADMIN_COMMENT_SWITCH_ENABLE,
        method: 'post',
        data
    });
}

// 过滤/不过滤回复或评论 参数:type（1-评论 2-回复），operate（1-过滤 2-不过滤），uuid(type=1时表示评论唯一uuid,type=2时表示回复唯一uuid)
export function commentFilter(data) {
    return fetch({
        url: apiUrl.API_ADMIN_COMMENT_SWITCH_FILTER,
        method: 'post',
        data
    });
}

// 删除回复或评论 参数:type（1-评论 2-回复），uuid(type=1时表示评论唯一uuid,type=2时表示回复唯一uuid)
export function deleteComment(data) {
    return fetch({
        url: apiUrl.API_ADMIN_COMMENT_DELETE,
        method: 'post',
        data
    });
}

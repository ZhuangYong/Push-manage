import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 获取分页数据：
export function wxImagePage(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_IMAGE_LIST,
        method: 'post',
        data
    });
}
// 保存图片素材模块：
export function wxImageSave(data) {
    return fetch({
        url: apiUrl.API_WEIXIN_IMAGE_SAVE,
        method: 'post',
        data
    });
}
// 删除图片素材模块：
export function wxImageDelete(id) {
    return fetch({
        url: apiUrl.API_WEIXIN_IMAGE_DELETE + id,
        method: 'post'
    });
}

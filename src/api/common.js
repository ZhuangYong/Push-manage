import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 获取上传进度 progressKey
export function getUploadProgress(data) {
    return fetch({
        url: apiUrl.API_UPGRADE_GET_UPLOAD_PROGRESS,
        method: 'post',
        data
    });
}


import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

export function feedbackPage(data) {
    return fetch({
        url: apiUrl.API_FEEDBACK_LIST,
        method: 'post',
        data
    });
}

export function feedbackClassifyPage(data) {
    return fetch({
        url: apiUrl.API_FEEDBACK_CLASSIFY,
        method: 'post',
        data
    });
}

export function feedbackSave(data) {
    return fetch({
        url: apiUrl.API_FEEDBACK_SAVE,
        method: 'post',
        data
    });
}

export function feedbackClassifySave(data) {
    return fetch({
        url: apiUrl.API_FEEDBACK_CLASSIFY_SAVE,
        method: 'post',
        data
    });
}

export function feedbackDelete(id) {
    return fetch({
        url: `${apiUrl.API_FEEDBACK_DELETE}${id}`,
        method: 'post'
    });
}

export function feedbackClassifyDelete(id) {
    return fetch({
        url: `${apiUrl.API_FEEDBACK_CLASSIFY_DELETE}${id}`,
        method: 'post'
    });
}

export function feedbackReply(data) {
    return fetch({
        url: apiUrl.API_FEEDBACK_REPLY,
        method: 'post',
        data
    });
}



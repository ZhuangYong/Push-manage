import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 微信发消息给用户模块:/admin/user/sendMsg
export function userSendMsg(data) {
    return fetch({
        url: apiUrl.API_USER_SEND_MSG,
        method: 'post',
        data
    });
}
// 后台申请退款模块：参数：{ id：订单id，refundReason：退款理由 }
export function orderApplyRefund(data) {
    return fetch({
        url: apiUrl.API_ORDER_APPLY_REFUND,
        method: 'post',
        data
    });
}

// 审核接口 参数orderNos[], status:8：审核通过，9：审核失败
export function orderReview(data) {
    return fetch({
        url: apiUrl.API_ADMIN_REFUND_EXAMINE,
        method: 'post',
        data
    });
}

// 退款接口 参数orderNos[]
export function orderRefund(data) {
    return fetch({
        url: apiUrl.API_ADMIN_REFUND_REFUND,
        method: 'post',
        data
    });
}

// 导出订单
export function orderSaveExcel(data) {
    return fetch({
        url: apiUrl.API_ORDER_SAVE_EXCEL,
        method: 'post',
        data
    });
}

export function stbUserReset(data) {// 设备重置
    return fetch({
        url: apiUrl.API_STBUSER_RESET,
        method: 'post',
        data
    });
}

export function stbUserList(data) {//设备列表
    return fetch({
        url: apiUrl.API_STBUSER_LIST,
        method: 'post',
        data
    });
}

export function stbUserSaveActivate(data) {// 保存激活模块
    return fetch({
        url: apiUrl.API_STBUSER_SAVE_ACTIVATE,
        method: 'post',
        data
    });
}

/**
 * 设置设备状态模块
 * @param data 三个参数id, status(1启用, -1永久禁用, -2时间禁用), frozenTime
 * @returns {*}
 */
export function setDeviceStatus(data) {
    return fetch({
        url: apiUrl.API_STBUSER_SAVE_VIEW,
        method: 'post',
        data
    });
}

export function banVIP(id) {// 恢复/禁用vip模块
    return fetch({
        url: apiUrl.API_STBUSER_DISABLE_VIP + id,
        method: 'post'
    });
}

export function setDeviceFilter(id) {// 恢复/禁用过滤模块
    return fetch({
        url: apiUrl.API_STBUSER_FILTER + id,
        method: 'post'
    });
}

export function stbUserLogin(id) {//设备登录信息
    return fetch({
        url: apiUrl.API_STBUSER_LOGIN + id,
        method: 'post'
    });
}

export function stbUserLoginPage(data) {//设备登录信息
    return fetch({
        url: apiUrl.API_STBUSER_LOGIN,
        method: 'post',
        data
    });
}

export function stbUserUser(data) {//绑定设备（微信点歌模块）模块
    return fetch({
        url: apiUrl.API_STBUSER_USER,
        method: 'post',
        data
    });
}

export function stbUserOrder(data) {//支付记录模块
    return fetch({
        url: apiUrl.API_STBUSER_ORDER,
        method: 'post',
        data
    });
}

export function stbUserUserSound(data) {//设备录音数据模块
    return fetch({
        url: apiUrl.API_STBUSER_USER_SOUND,
        method: 'post',
        data
    });
}

export function stbUserActivateRecord(data) {//激活码记录模块
    return fetch({
        url: apiUrl.API_STBUSER_ACTIVATE_RECORD,
        method: 'post',
        data
    });
}

export function stbUserActivateRecordEdit(data) {//激活码设置模块

    return fetch({
        url: apiUrl.API_STBUSER_ACTIVATE_RECORD_EDIT,
        method: 'post',
        data
    });
}

export function stbUserMessage(data) {//消息列表模块
    return fetch({
        url: apiUrl.API_STBUSER_MESSAGE,
        method: 'post',
        data
    });
}

export function orderList(data) {//订单列表
    return fetch({
        url: apiUrl.API_ORDER_LIST,
        method: 'post',
        data
    });
}

export function orderSave(data) {//处理未付款订单
    return fetch({
        url: apiUrl.API_ORDER_SAVE,
        method: 'post',
        data
    });
}

export function groupList(data) {//设备组列表
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_LIST,
        method: 'post',
        data
    });
}

export function deviceBootInfoPage(data) {// 设备开机日志
    return fetch({
        url: apiUrl.API_STB_USER_DEVICE_BOOT_LIST,
        method: 'post',
        data
    });
}

export function groupDeviceCanChooseList(data) {//查询除设备组里面的设备列表
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_DEVICE_LIST,
        method: 'post',
        data
    });
}

export function groupListSave(data) {// 保存设备分组模块
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_SAVE,
        method: 'post',
        data
    });
}

export function groupListDelete(id) {// 删除设备分组模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_DELETE + id,
        method: 'post'
    });
}

export function groupUser(data) {// 获取设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_USER,
        method: 'post',
        data
    });
}

export function groupDeleteUser(id, data) {// 批量删除设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_DELETE_USER + id,
        method: 'post',
        data
    });
}

export function groupSaveUser(id, data) {// 保存设备列表模块(path: id)
    return fetch({
        url: apiUrl.API_DEVICE_GROUP_SAVE_USER + id,
        method: 'post',
        data
    });
}

export function getShareProduct(id) {// 查询共享设备模块(path: id)
    return fetch({
        url: apiUrl.API_STB_USER_SHARE_PRODCUT + id,
        method: 'post'
    });
}

export function save(data) {
    return fetch({
        url: apiUrl.API_STBUSER_SAVE,
        method: 'post',
        data
    });
}

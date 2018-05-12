/**
 * Created by Zed on 2018/5/12.
 */
import fetch from '../utils/fetch';
import apiUrl from "./apiUrl";

// 1.获取sn分页数据：参数：sn，mac，random，startTime，endTime，recordUuid（查询生成记录对应的sn列表时需要带此参数），封装在请求体内
export function getSNList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SN_LIST,
        method: 'post',
        data,
    });
}

// 2.获取sn生成记录分页数据  参数：batch,startTime，endTime,封装在请求体内
export function getSNRecordList(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SN_RECORD_LIST,
        method: 'post',
        data,
    });
}

// 3.批量生成sn  参数：number数量，manufacturer生产厂家，productModel产品型号，wifimacType（wifimac类型：1-真实 2-虚拟 3-不生成），macType（mac类型：1-真实 2-虚拟），remark备注 封装在请求体内
export function snSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SN_SAVE,
        method: 'post',
        data,
    });
}

// 4.导出sn  参数：recordUuid生成记录uuid 封装在请求体内
export function snExport(data) {
    return fetch({
        url: apiUrl.API_ADMIN_SN_EXPORT,
        method: 'post',
        data,
    });
}

// 5.批量生成虚拟mac  参数number 封装在请求体内
export function macSave(data) {
    return fetch({
        url: apiUrl.API_ADMIN_MAC_SAVE,
        method: 'post',
        data,
    });
}

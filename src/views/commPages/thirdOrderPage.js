/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdOrderPage.js @author: walljack@163.com @date: 18-3-23 下午4:25 @version: 1.0
 */

import BasePage from "../../components/common/BasePage";
import {del as delThirdMenu} from "../../api/third";
import {State} from "vuex-class/lib/index";
import {Component} from "vue-property-decorator";

@Component({name: "ThirdOrderPage"})
export default class ThirdOrderPage extends BasePage {

    tableAction = 'third/order/RefreshPage';
    viewRule = [
        {columnKey: 'id', label: 'ID', minWidth: 40, inDetail: true},
        {columnKey: 'productName', label: '名称', minWidth: 90},
        {columnKey: 'dealPrice', label: '价格', minWidth: 90},
        {columnKey: 'orderNo', label: '订单号', minWidth: 120},
        {columnKey: 'salesUuid', label: '销售方UUID', minWidth: 140},
        // 1:已发出(支付成功)，2：异常失败，200：已成功接收，400参数key缺失，403验证失败或请求方式错误
        {columnKey: 'status', label: '状态', minWidth: 140, formatter: r => {
                if (r.status === 1) return "已发出(支付成功)";
                if (r.status === 2) return "异常失败";
                if (r.status === 200) return "已成功接收";
                if (r.status === 400) return "参数key缺失";
                if (r.status === 403) return "验证失败或请求方式错误";
            }},
        {columnKey: 'subscribeTime', label: '支付成功时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
    ];
    tableActionSearch = [
        {column: 'name', label: '请输入接口名称', type: 'input', value: ''},
    ];
    delItemFun = delThirdMenu;
    @State(state => state.third.pageOrder) tableData;

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }
}

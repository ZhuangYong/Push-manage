/*
 * 销售方订单管理
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesOrderManage.js @author: walljack@163.com @date: 18-3-1 下午4:31 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delSales} from "../../api/sales";
import {State} from "vuex-class/lib/index";

@Component({name: "salesOrderManageView"})
export default class salesOrderManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'sales/order/RefreshPage';
    viewRule = [
        {columnKey: 'headImg', label: '头像', formatter: (r, h) => {
                if (r.headImg) return (<img src={r.headImg} style="height: 30px; margin-top: 6px;"/>);
                return '';
            }, inDetail: true},
        {columnKey: 'nickname', label: '昵称', minWidth: 140, sortable: true},
        {columnKey: 'productName', label: '产品名', minWidth: 120, sortable: true},
        {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 160, sortable: true},
        {columnKey: 'payStatus', label: '付款状态', formatter: r => {
            if (r.payStatus === 1) return '创建';
            if (r.payStatus === 2) return '已完成';
        }},
        {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
            if (r.orderStatus === 1) return '未付款';
            if (r.orderStatus === 2) return '已付款';
        }},
        {columnKey: 'payType', label: '支付方式', formatter: r => {
            if (r.payType === 1) return '支付宝';
            if (r.payType === 2) return '微信';
        }},
        {columnKey: 'orderNo', label: '订单号', minWidth: 280, inDetail: true},
        {columnKey: 'deviceId', label: '设备编号', minWidth: 280, inDetail: true},
        {columnKey: 'channelName', label: '机型名称', minWidth: 110},
        {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170, sortable: true},
        {columnKey: 'transactionid', label: '支付流水号', minWidth: 170, inDetail: true},
    ];

    tableActionSearch = [
        {column: 'orderNo', label: '请输入订单号', type: 'option', value: '', options: []},
        {column: 'productName', label: '请输入支付套餐名称', type: 'input', value: ''},
        {column: 'payStatus', label: '请选择付款状态', type: 'option', value: '', options: [
            {value: 1, label: '创建'},
            {value: 2, label: '完成'},
        ]}
    ];

    delItemFun = delSales;

    @State(state => state.sales.orderPage) tableData;

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

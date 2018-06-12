/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: settlementManage.js @author: walljack@163.com @date: 18-3-7 下午5:19 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";
import {OrderPage} from "./settlementAccountManage";
import SettlementManagePage from "./paymentManage";

@Component({name: "SettlementManageView"})
export default class SettlementManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <DetailPage/>, <OrderPage />, <SettlementManagePage />]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'settlement/RefreshPage';
    viewRule = [
        {columnKey: 'amountDate', label: '结算日期', minWidth: 120},
        {columnKey: 'amount', label: '结算金额（元）', minWidth: 170},
        // {columnKey: 'status', label: '结算状态', minWidth: 170, sortable: true},
        // {columnKey: 'method', label: '结算方式', minWidth: 140, sortable: true},
        {label: '操作', buttons: [{label: '查看详情', type: 'details'}, {label: '查看订单', type: 'orderList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'startTime,endTime', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption
    }];

    @State(state => state.settlement.settlementPage) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container" style={{paddingBottom: '15px'}}>
            <el-button type="primary" onClick={f => {
                this.goPage('SettlementManagePage');
            }}>
                支付结算
            </el-button>
        </div>;
    }

    handelDetails(row) {
        this.goPage("DetailPage", {formData: row});
    }

    handelOrderList(row) {
        this.goPage("OrderPage", {formData: row});
    }
}

@Component({name: "DetailPage"})
class DetailPage extends BasePage {
    tableAction = 'settlement/detail/RefreshPage';
    viewRule = [
        {columnKey: 'salesGroupName', label: '设备组', minWidth: 120},
        {columnKey: 'salesName', label: '所属销售方', minWidth: 120},
        {columnKey: 'orderNo', label: '结算金额（元）', minWidth: 170},
        {columnKey: 'status', label: '结算状态', minWidth: 170, formatter: r => {
            if (r.status === 1) return '结算成功';
            if (r.status === 2) return '结算中';
            if (r.status === 3) return '结算失败';
            if (r.status === 4) return '未结算';
        }},
        {columnKey: 'lastChildFlag', label: '结算方式', minWidth: 140, formatter: r => {
            if (r.lastChildFlag === 1) return '线下';
            if (r.lastChildFlag === 2) return '线上';
        }},
    ];

    // 结算状态.1:结算成功，2结算中，3结算失败，4未结算
    // 结算方式.1:手动，2：自动
    tableActionSearch = [
        {column: 'groupName', label: '请输入设备组名称', type: 'input', value: ''},
        { column: 'status', label: '请输选择结算状态', type: 'option', value: '', options: [
            {value: 1, label: '结算成功'},
            {value: 2, label: '结算中'},
            {value: 3, label: '结算失败'},
            {value: 4, label: '未结算'},
        ]},
        { column: 'method', label: '请输选择结算方式', type: 'option', value: '', options: [
            {value: 1, label: '手动'},
            {value: 2, label: '自动'},
        ]},
    ];

    @State(state => state.settlement.settleMentDetails) tableData;

    created() {
        this.tableActionSearchColumn = [{uuid: this.formData.uuid}];
    }

    render(h) {
        return <div>
            {this.pageBackFormHtml(h)}
            {
                this.tableHtml(h)
            }
        </div>;
    }
}

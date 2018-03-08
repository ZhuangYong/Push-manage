/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: settlementAccountManage.js @author: walljack@163.com @date: 18-3-7 下午6:43 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import Const from "../../utils/const";
import {searchSalesAndDeviceGroup} from "../../api/sales";
import SalesOrderPage from "../commPages/salesOrderPage";
import {settleAccountOrderPage} from "../../api/settle";

@Component({name: "SettlementManageView"})
export default class SettlementManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <OrderPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'settlement/account/RefreshPage';
    viewRule = [
        {columnKey: 'amountDate', label: '日期', minWidth: 120},
        {columnKey: 'amount', label: '结算金额', minWidth: 170},
        {label: '操作', buttons: [{label: '查看订单', type: 'orderList'}], minWidth: 236}
    ];

    tableActionSearch = [
        {column: 'salesUuid', label: '请选择销售方', type: 'option', value: '', options: []},
    ];

    @State(state => state.settlement.settleAccountPage) tableData;

    render(h) {
        return <div>
            {
                this.tableHtml(h)
            }
        </div>;
    }

    handelOrderList(row) {
        this.goPage("OrderPage", {formData: row});
    }
}

@Component({name: "OrderPage"})
class OrderPage extends SalesOrderPage {
    tableAction = 'settlement/account/order/RefreshPage';
    @State(state => state.settlement.settleAccountOrderPage) tableData;
    created() {
        this.tableActionSearchColumn = [{uuid: this.formData.uuid}];
    }
    render(h) {
        return <div>
            {
                this.pageBackFormHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }
}

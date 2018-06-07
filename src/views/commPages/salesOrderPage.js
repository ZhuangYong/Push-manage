/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesOrderPage.js @author: walljack@163.com @date: 18-3-8 上午10:46 @version: 1.0
 */

import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {State} from "vuex-class/lib/index";
import {OrderListPage} from "../orderManage/order";

@Component({name: "SalesOrderPage"})
export default class SalesOrderPage extends OrderListPage {
    tableAction = 'sales/order/RefreshPage';
    @State(state => state.sales.orderPage) tableData;
    operateViewRule = [];
    optionsChannel = [];
    deviceGroup = [];
    salesUuid = "";

    created() {
        this.tableActionSearchColumn = [{productType: 2}];
    }

    topButtonHtml(h) {
        return '';
    }

}

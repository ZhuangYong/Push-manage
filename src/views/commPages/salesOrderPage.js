/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesOrderPage.js @author: walljack@163.com @date: 18-3-8 上午10:46 @version: 1.0
 */

import {Component, Watch} from "vue-property-decorator/lib/vue-property-decorator";
import {searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import {State} from "vuex-class/lib/index";
import OrderPage from "./orderPage";

@Component({name: "SalesOrderPage"})
export default class SalesOrderPage extends OrderPage {
    tableAction = 'sales/order/RefreshPage';
    tableActionSearch = [
        {column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []},
        {column: 'groupUuid', label: '请选择设备组', type: 'option', value: '', options: []},
        {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
        {column: 'productName', label: '请输入产品名称', type: 'input', value: ''},
        {column: 'transactionId', label: '请输入流水号', type: 'input', value: ''},
        {column: 'payStatus', label: '请选择订单状态', type: 'option', value: '', options: [
                {value: 1, label: '创建'},
                {value: 2, label: '完成'},
            ]}
    ];
    @State(state => state.sales.orderPage) tableData;
    optionsChannel = [];
    deviceGroup = [];
    salesUuid = "";

    @Watch('optionsChannel', {immediate: true, deep: true})
    onOptionsChannelChange() {
        this.tableActionSearch[0].options = [];
        this.optionsChannel.map(i => this.tableActionSearch[0].options.push(i));
    }

    @Watch('deviceGroup')
    onDeviceGroupChange() {
        this.tableActionSearch[1].options = [];
        this.tableActionSearch[1].value = "";
        this.deviceGroup.map(i => this.tableActionSearch[1].options.push({label: i.name, value: i.uuid}));
    }

    @Watch('tableActionSearch', {immediate: true, deep: true})
    onTableActionSearchColumnChange() {
        const channelCode = this.tableActionSearch[0].value;
        this.refreshDeviceGroup(channelCode);
    }

    created() {
        this.refreshChanel();
    }

    refreshChanel() {
        this.loading = true;
        searchSalesAndDeviceGroup().then(res => {
            this.optionsChannel = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }

    refreshDeviceGroup(salesUuid) {
        if (this.salesUuid === salesUuid || !salesUuid) return;
        this.loading = true;
        searchDeviceGroupBySalesUUID({salesUuids: [salesUuid]}).then(res => {
            this.deviceGroup = res;
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
        this.salesUuid = salesUuid;
    }
}

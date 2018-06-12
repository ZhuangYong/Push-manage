/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesDevicePage.js @author: walljack@163.com @date: 18-3-28 下午7:02 @version: 1.0
 */

import {searchDeviceGroupBySalesUUID, searchSalesAndDeviceGroup} from "../../api/sales";
import {State} from "vuex-class/lib/index";
import {Watch, Component} from "vue-property-decorator";
import DevicePage from "./devicePage";

@Component({name: "SalesDevicePage"})
export default class SalesDevicePage extends DevicePage {
    tableAction = 'sales/stbuser/RefreshPage';

    /*tableActionSearch = [
        {column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []},
        {column: 'groupUuid', label: '请选择设备组', type: 'option', value: '', options: []},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'sn', label: '请输入SN号', type: 'input', value: ''}
    ];*/
    optionsChannel = [];
    deviceGroup = [];
    salesUuid = "";

    @State(state => state.sales.stbUserPage) tableData;

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

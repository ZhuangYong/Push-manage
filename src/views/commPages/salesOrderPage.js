/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesOrderPage.js @author: walljack@163.com @date: 18-3-8 上午10:46 @version: 1.0
 */

import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {State} from "vuex-class/lib/index";
import OrderPage from "./orderPage";
import Const from "../../utils/const";
import {searchSalesAndDeviceGroup} from "../../api/sales";

@Component({name: "SalesOrderPage"})
export default class SalesOrderPage extends OrderPage {
    tableAction = 'sales/order/RefreshPage';
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {
            column: 'notChannelCodes', label: '请选择不包含的机型', type: 'option', multiple: true, value: '', options: []
        },
        {
            column: 'salesUuid', label: '请选择销售方', type: 'optionTree', multiple: false, valueKey: 'uuid', value: '', options: []
        },
        // {
        //     column: 'gxggk', label: '是否包含共享K1机型', type: 'option', value: 2, options: [
        //         {value: 1, label: '包含共享K1机型'},
        //         {value: 2, label: '不包含共享K1机型'},
        //     ]
        // },
        {
            column: 'orderStatu', label: '请选择订单状态', type: 'option', value: '', options: [
                {value: 1, label: '未付款'},
                {value: 2, label: '已付款'},
                {value: 3, label: '已退款'},
                {value: 4, label: '订单出错'},
                {value: 5, label: '退款中'},
                {value: 6, label: '退款失败'},
                {value: 7, label: '审核中'},
                {value: 8, label: '审核通过'},
                {value: 9, label: '审核失败'},
            ]
        },
        {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'productName', label: '请输入产品名', type: 'input', value: ''},
        {
            column: 'productType', label: '请选择产品类型', type: 'option', value: '', options: [
                {value: 1, label: 'VIP会员'},
                {value: 2, label: '共享'},
            ]
        },
        {
            column: 'payType', label: '请选择付款方式', type: 'option', value: '', options: [
                {value: 1, label: '支付宝'},
                {value: 2, label: '微信'},
            ]
        },
        {
            column: 'payStatus', label: '请选择付款状态', type: 'option', value: '', options: [
                {value: 1, label: '创建'},
                {value: 2, label: '完成'},
            ]
        },
        {
            column: 'isOpen', label: '请选择开票状态', type: 'option', value: '', options: [
                {value: 0, label: '未开票'},
                {value: 1, label: '已开票'},
                {value: 2, label: '开票中'},
                {value: 3, label: '开票失败'},
            ]
        },
        {
            column: 'startTime,endTime', label: '请选择时间', type: 'daterange', value: '', option: Const.dataRangerOption
        }
    ];
    @State(state => state.sales.orderPage) tableData;
    optionsChannel = [];
    deviceGroup = [];
    salesUuid = "";

    created() {
        this.tableActionSearchColumn = [{productType: 2}];
        this.tableActionSearch.map(i => i.handelChange = this.tableActionSearchHandelChange);
        this.refreshSalesChanel();
    }

    tableActionSearchHandelChange(v) {
        // console.log(v);
        this.exportFormData = {};
        v.map(o => {
            const {column, value} = o;
            if (column.indexOf(",") > 0) {
                const columns = column.split(",");
                columns.map((c, i) => {
                    if (value[i]) this.exportFormData[c] = value[i];
                });
            } else {
                if (value) this.exportFormData[column] = value;
            }
        });
    }

    refreshChanel() {
        this.loading = true;
        this.$store.dispatch("fun/chanelList").then(res => {
            this.loading = false;
            this.tableActionSearch[0].options = [];
            res.map(f => this.tableActionSearch[0].options.push({value: f.code, label: `${f.name}(${f.code})`}));
            this.tableActionSearch[1].options = [];
            res.map(f => this.tableActionSearch[1].options.push({value: f.code, label: `${f.name}(${f.code})`}));
        }).catch(err => {
            this.loading = false;
        });
    }

    refreshSalesChanel() {
        this.loading = true;
        searchSalesAndDeviceGroup().then(res => {
            this.tableActionSearch[2].options = [];
            res.map(i => this.tableActionSearch[2].options.push(i));
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    }

}

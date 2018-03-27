/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: SalesPage.js @author: walljack@163.com @date: 18-3-15 下午4:47 @version: 1.0
 */

import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {del as delSales} from "../../api/sales";

/**
 * 销售方列表页面
 */
@Component({name: "SalesPage"})
export default class SalesPage extends BasePage {
    tableAction = 'sales/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '销售名称', minWidth: 120},
        {columnKey: 'alipayAccount', label: '销售方支付账号', minWidth: 190},
        {columnKey: 'cycle', label: '结算周期', minWidth: 120, formatter: r => r.cycle && ('T + ' + r.cycle)},
        {columnKey: 'method', label: '结算方式', minWidth: 120, formatter: r => {
                if (r.method === 1) return '手动';
                if (r.method === 2) return '自动';
            }},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '设备列表', type: 'deviceList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入销售名称', type: 'input', value: ''
    }];

    delItemFun = delSales;

    @State(state => state.sales.salesPage) tableData;

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


    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditSalesPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditSalesPage", {formData: row});
    }

    handelDeviceList(row) {
        this.goPage("DevicePage", {formData: row});
    }

}

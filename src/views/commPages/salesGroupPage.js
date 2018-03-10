/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesGroupPage.js @author: walljack@163.com @date: 18-3-7 下午2:44 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {del as delSalesGroup} from "../../api/salesGroup";

@Component({name: "SalesGroupPage"})
export default class SalesGroupPage extends BasePage {
    tableAction = 'salesGroup/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '设备分组名称', minWidth: 120},
        {columnKey: 'deviceCount', label: '设备数', minWidth: 90},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '设备列表', type: 'deviceList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入设备分组名称', type: 'input', value: ''
    }];

    delItemFun = delSalesGroup;

    @State(state => state.sales.salesGroupPage) tableData;

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
                    this.goPage("EditSaleDeviceGroupPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelDeviceList(row) {
        this.goPage("DeviceGroupPage", {formData: row});
    }

    handelEdit(row) {
        this.goPage("EditSaleDeviceGroupPage", {formData: row});
    }
}
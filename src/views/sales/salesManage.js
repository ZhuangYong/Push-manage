/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesManage.js @author: walljack@163.com @date: 18-2-26 上午10:56 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delSales, delGroup} from "../../api/sales";
import {State} from "vuex-class/lib/index";
import EditSalesPage from "./editPages/editSalePage";
import EditSaleGroupPage from "./editPages/editSaleGroupPage";
import SalesGroupPage from "../commPages/salesGroupPage";
import _ from "lodash";
import salesDeviceGroupPage from "../commPages/salesDeviceGroupPage";

@Component({name: "salesView"})
export default class salesView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditSalesPage/>, <EditSaleGroupPage/>, <GroupPage/>, <ChooseGroupPage/>, <DeviceGroupPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
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
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '分组列表', type: 'groupList'}], minWidth: 236}
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

    handelGroupList(row) {
        this.goPage("GroupPage", {formData: row});
    }

}

@Component({name: "GroupPage"})
class GroupPage extends BasePage {
    salesUuid = '';
    tableAction = 'sales/group/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '分组名称', minWidth: 120},
        {columnKey: 'parentProportions', label: '结算比例', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '查看设备', type: 'deviceList'}, {label: '结算设置', type: 'edit'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入分组名称', type: 'input', value: ''
    }];

    delItemFun = delGroup;

    @State(state => state.sales.groupPage) tableData;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.salesUuid = uuid;
            this.tableActionSearchColumn = [{salesUuid: uuid}];
        }
    }

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
            <el-button class="filter-item" onClick={this.pageBack} type="primary">
                返回
            </el-button>
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditSaleGroupPage", {formData: {salesUuid: this.salesUuid}});
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditSaleGroupPage", {formData: row});
    }

    handelDeviceList(row) {
        this.goPage("DeviceGroupPage", {formData: row});
    }
}

@Component({name: "DeviceGroupPage"})
class DeviceGroupPage extends salesDeviceGroupPage {
    created() {
        this.tableActionSearchColumn = [{groupUuid: this.formData.groupUuid}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
        </div>;
    }
}

@Component({name: "ChooseGroupPage"})
class ChooseGroupPage extends SalesGroupPage {
    tableCanSelect = true;
    created() {
        this.viewRule = this.viewRule.filter(v => _.isEmpty(v.buttons));
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
        </div>;
    }

    handleSelectionChange(selectedItems) {
        if (selectedItems.length === 1) {
            const {name, uuid} = selectedItems[0];
            this.changePrePageData({
                groupUuid: uuid,
                groupName: name
            });
            this.pageBack();
        }
    }
}

/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerManage.js @author: walljack@163.com @date: 18-2-27 下午4:08 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delManufacturer, delChannel} from "../../api/manufacturer";
import {State} from "vuex-class/lib/index";
import EditManufacturerPage from "./editPages/editManufacturerPage";
import EditManufacturerChannelPage from "./editPages/editManufacturerChannelPage";

@Component({name: "manufacturerManageView"})
export default class manufacturerManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditManufacturerPage/>, <EditManufacturerChannelPage/>, <ChannelPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'manufacturer/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '销售名称', minWidth: 120},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '分组列表', type: 'channelList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入销售名称', type: 'input', value: ''
    }];

    delItemFun = delManufacturer;

    @State(state => state.manufacturer.manufacturerPage) tableData;

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
                    this.goPage("EditManufacturerPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditManufacturerPage", {formData: row});
    }

    handelChannelList(row) {
        this.goPage("ChannelPage", {formData: row});
    }

}

@Component({name: "ChannelPage"})
class ChannelPage extends BasePage {
    salesUuid = '';
    tableAction = 'manufacturer/channel/RefreshPage';
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
        column: 'name', label: '请输入销售名称', type: 'input', value: ''
    }];

    delItemFun = delChannel;

    @State(state => state.manufacturer.channelPage) tableData;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.manufacturerUuid = uuid;
            this.tableActionSearchColumn = [{manufacturerUuid: uuid}];
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
                    this.goPage("EditManufacturerChannelPage", {formData: {manufacturerUuid: this.manufacturerUuid}});
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditManufacturerChannelPage", {formData: row});
    }

}

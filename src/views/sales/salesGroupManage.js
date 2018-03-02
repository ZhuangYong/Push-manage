/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesGroupManage.js @author: walljack@163.com @date: 18-3-1 下午2:20 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delSalesGroup, delUser, saveUser} from "../../api/salesGroup";
import {State} from "vuex-class/lib/index";
import EditSaleGroupPage from "./editPages/editSaleGroupPage";
import EditSaleDeviceGroupPage from "./editPages/editSaleDeviceGroupPage";
import DevicePage from "../commPages/devicePage";

@Component({name: "salesGroupManageView"})
export default class salesGroupManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditSaleDeviceGroupPage/>, <EditSaleGroupPage/>, <DeviceGroupPage/>, <ChooseDevicePage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
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

@Component({name: "DeviceGroupPage"})
class DeviceGroupPage extends BasePage {
    groupUuid = '';
    deviceids = [];
    tableCanSelect = true;
    tableAction = 'salesGroup/user/RefreshPage';
    viewRule = [
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        {columnKey: 'isShare', label: '是否共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
        }},
        {columnKey: 'nickname', label: '别名', minWidth: 90},
        {columnKey: 'deviceUuid', label: '设备编号', minWidth: 190},
    ];

    tableActionSearch = [
        {column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                {value: 0, label: '非共享'},
                {value: 1, label: '共享'},
            ]},
        {column: 'status', label: '请选择设备状态', type: 'option', value: '', options: [
                {value: 1, label: '已开启'},
                {value: -1, label: '设备永久禁用'},
                {value: -2, label: '到时间禁用'},
            ]},
        {column: 'nickname', label: '请输入设备别名', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''}
    ];

    @State(state => state.sales.salesGroupUserPage) tableData;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.groupUuid = uuid;
            this.tableActionSearchColumn = [{groupUuid: uuid}];
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
                    this.goPage("ChooseDevicePage", {defaultData: {groupUuid: this.groupUuid}});
                }
            } type="primary" icon="edit">
                添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDel} type="danger" disabled={!this.deviceids.length}>
                批量删除
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditSaleGroupPage", {formData: row});
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.formData.deviceids = [];
        if (selectedItems.length > 0) {
            let deviceids = [];
            selectedItems.map(s => {
                deviceids.push(s.id);
            });
            this.deviceids = deviceids;
        }
    }

    /**
     * 删除自定义分类中歌曲
     */
    submitDel() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            delUser({ids: this.deviceids}).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
                this.deviceids = [];
            }).catch(() => this.submitLoading = false);
        };
    }
}

/**
 * 选择歌曲页面
 */
@Component({name: "ChooseDevicePage"})
class ChooseDevicePage extends DevicePage {
    targetId = "";
    tableCanSelect = true;

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveDevices} type="primary">
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveDevices() {
        this.submitLoading = true;
        saveUser({deviceUuids: this.formData.deviceUuids, groupUuid: this.groupUuid}, this.targetId).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(() => this.submitLoading = false);
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.formData.deviceUuids = [];
        if (selectedItems.length > 0) {
            let deviceUuids = [];
            selectedItems.map(s => {
                deviceUuids.push(s.deviceUuid);
            });
            this.formData.deviceUuids = deviceUuids;
        }
    }
}

/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesGroupManage.js @author: walljack@163.com @date: 18-3-1 下午2:20 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import {delUser, moveGroup, saveMoveGroup as save, saveUser} from "../../api/salesGroup";
import {State} from "vuex-class/lib/index";
import EditSaleGroupPage from "./editPages/editSaleGroupPage";
import EditSaleDeviceGroupPage from "./editPages/editSaleDeviceGroupPage";
import DevicePage from "../commPages/devicePage";
import SalesGroupPage from "../commPages/salesGroupPage";
import SalesPage from "../commPages/salesPage";
import JSelect from "../../components/select/select";

@Component({name: "salesGroupManageView"})
export default class salesGroupManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditSaleDeviceGroupPage/>, <ChooseSalesPage/>, <EditSaleGroupPage/>, <DeviceGroupPage/>, <ChooseDevicePage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends SalesGroupPage {}

@Component({name: "DeviceGroupPage"})
class DeviceGroupPage extends DevicePage {
    groupUuid = '';
    deviceids = [];
    moveGroupShow = false;
    moveGroupList = [];
    moveGroupUuid = '';
    tableCanSelect = true;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.groupUuid = uuid;
            this.tableActionSearchColumn = [{groupUuid: uuid}];
            this.refreshMoveGroup();
        }
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("ChooseDevicePage", {defaultData: {groupUuid: this.groupUuid}});
                }
            } type="primary" icon="edit">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDel} type="danger" disabled={!this.deviceids.length}>
                批量删除
            </el-button>
            {
                this.moveGroupList.length ? <el-button class="filter-item" onClick={() => this.moveGroupShow = true} type="danger" disabled={!this.deviceids.length}>
                    批量移动到其他分组
                </el-button> : ""
            }
            <el-dialog title="批量移动到其他分组" visible={this.moveGroupShow} onClose={this.closeMoveGroup} width="350px">
                <el-form class="small-space" label-position="right" label-width="90px">
                    <el-form-item label="选择分组">
                        <JSelect placeholder="请选择" value={this.moveGroupUuid} handelSelectChange={v => this.moveGroupUuid = v} options={this.moveGroupList.map(item => {return {label: item.name, value: item.uuid};})}/>
                    </el-form-item>
                    <el-form-item label="" >
                        <el-button class="filter-item" onClick={() => this.moveGroupShow = false}>
                            取消
                        </el-button>
                        <el-button class="filter-item" onClick={() => this.saveMoveGroup(() => this.moveGroupShow = false)} type="primary" icon="edit" disabled={!this.moveGroupUuid}>
                            确定
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>;
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.deviceids = [];
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

    refreshMoveGroup() {
        moveGroup({groupUuid: this.groupUuid}).then(res => this.moveGroupList = res);
    }

    saveMoveGroup(callback) {
        this.submitLoading = true;
        save({ids: this.deviceids, groupUuid: this.moveGroupUuid}).then(res => {
            this.submitLoading = false;
            callback && callback();
            this.refreshTable();
        }).catch(e => {
            this.submitLoading = false;
        });
    }

    closeMoveGroup() {
        this.moveGroupShow = false;
    }
}

@Component({name: "ChooseDevicePage"})
class ChooseDevicePage extends DevicePage {
    tableAction = "salesGroup/device/list/RefreshPage";
    @State(state => state.sales.groupDevicePage) tableData;

    targetId = "";
    tableCanSelect = true;
    deviceUuids = [];

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveDevices} type="primary" disabled={!this.deviceUuids.length}>
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveDevices() {
        this.submitLoading = true;
        saveUser({deviceUuids: this.deviceUuids, groupUuid: this.groupUuid}, this.targetId).then(res => {
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
        this.deviceUuids = [];
        if (selectedItems.length > 0) {
            let deviceUuids = [];
            selectedItems.map(s => {
                deviceUuids.push(s.deviceUuid);
            });
            this.deviceUuids = deviceUuids;
        }
    }
}

@Component({name: "ChooseSalesPage"})
class ChooseSalesPage extends SalesPage {
    salesUuid = "";
    salesName = "";
    tableCanSelect = true;
    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
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

    handleSelectionChange(selectedItems) {
        if (selectedItems.length === 1) {
            const {name, uuid} = selectedItems[0];
            this.changePrePageData({
                salesUuid: uuid,
                salesName: name
            });
            this.pageBack();
        } else {
            this.salesUuid = '';
            this.salesName = '';
        }
    }
}

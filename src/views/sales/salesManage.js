/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesManage.js @author: walljack@163.com @date: 18-2-26 上午10:56 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {delGroup, salesSaveBack, saveDevice} from "../../api/sales";
import {State} from "vuex-class/lib/index";
import EditSalesPage from "./editPages/editSalePage";
import EditSaleGroupPage from "./editPages/editSaleGroupPage";
import SalesGroupPage from "../commPages/salesGroupPage";
import _ from "lodash";
import salesDeviceGroupPage from "../commPages/salesDeviceGroupPage";
import SalesPage from "../commPages/salesPage";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import uploadExcel from '../../components/Upload/singleExcel.vue';
import {OrderListPage} from "../orderManage/order";
import DevicePage from "../commPages/devicePage";
import {delUser} from "../../api/salesGroup";

@Component({name: "salesView"})
export default class salesView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditSalesPage/>, <EditSaleGroupPage/>, <SalesDevicePage/>, <ChooseDevicePage/>, <ChooseGroupPage/>, <DeviceGroupPage/>, <FindOrderPage />]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends SalesPage {}

@Component({name: 'FindOrderPage'})
class FindOrderPage extends OrderListPage {
    operateViewRule = [];
    orderNos = [];
    tableCanSelect = true;

    created() {
        this.tableActionSearch[7].value = 2;
        this.tableActionSearch[7].disabled = true;
    }

    topButtonHtml(h) {

        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.loading = true;
                    salesSaveBack({orderNos: this.orderNos, salesUuid: this.salesUuid}).then(res => {
                        this.loading = false;
                        this.successMsg('操作成功');
                        this.pageBack();
                    }).catch(err => this.loading = false);
                }
            } type="primary" icon="edit" disabled={this.orderNos.length <= 0}>确定</el-button>
        </div>;
    }
}

@Component({name: "SalesDevicePage", components: {uploadExcel}})
class SalesDevicePage extends DevicePage {
    importExcelShow = false;
    importExcelIng = false;
    importExcelSuccess = false;
    importErrMsg = '';
    salesUuid = '';
    deviceids = [];
    tableCanSelect = true;

    created() {
        const {uuid} = this.param || {};
        if (uuid) {
            this.salesUuid = uuid;
            this.tableActionSearchColumn = [{salesUuid: uuid}];
        }
    }


    topButtonHtml(h) {
        const uploadExcelApi = Const.BASE_API + '/' + apiUrl.API_ADMIN_SALES_SAVE_EXCEL + this.salesUuid;
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("ChooseDevicePage", {formData: {salesUuid: this.salesUuid}});
                }
            } type="primary" icon="edit">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDel} type="danger" disabled={!this.deviceids.length}>
                批量删除
            </el-button>
            <el-button class="filter-item" onClick={() => this.importExcelShow = true} type="primary" icon="edit">
                从Excel导入设备
            </el-button>
            <el-dialog title="从Excel导入设备" visible={this.importExcelShow} onClose={this.closeImportExcel}>
                <el-form>
                    {
                        this.importErrMsg
                    }
                    <el-form-item label="选择文件" label-width="formLabelWidth">
                        {
                            !this.importErrMsg && this.importExcelSuccess && "导入成功 !"
                        }
                        <uploadExcel uploadSuccess={() => {
                            this.importExcelIng = false;
                            this.importExcelSuccess = true;
                            this.refreshTable();
                        }} uploadFail={() => this.importExcelIng = false} beforeUpload={() => {
                            this.importExcelIng = true;
                            this.importErrMsg = "";
                        }} uploadFail={this.uploadFail} handelEmpty={() => {
                            this.importExcelIng = false;
                            this.importErrMsg = "";
                        }} actionUrl={uploadExcelApi}/>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>;
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

    closeImportExcel() {
        this.importErrMsg = "";
        this.importExcelIng = false;
        this.importExcelShow = false;
        this.importExcelSuccess = false;
    }

    uploadFail(e) {
        const msg = `导入失败！` + e;
        this.importErrMsg = msg;
        this.importExcelIng = false;
        this.$message.error(msg);
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
}

@Component({name: "ChooseDevicePage"})
class ChooseDevicePage extends SalesDevicePage {
    tableAction = "salesGroup/device/list/RefreshPage";
    @State(state => state.sales.groupDevicePage) tableData;
    deviceUuids = [];

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveDevices} type="primary" disabled={this.deviceUuids.length <= 0}>
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveDevices() {
        this.submitLoading = true;
        saveDevice({deviceUuids: this.deviceUuids, salesUuid: this.formData.salesUuid}).then(res => {
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

@Component({name: "GroupPage", components: {uploadExcel}})
class GroupPage extends BasePage {

    importExcelShow = false;
    importExcelIng = false;
    importExcelSuccess = false;
    importErrMsg = '';
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
        const uploadExcelApi = Const.BASE_API + '/' + apiUrl.API_ADMIN_SALES_SAVE_EXCEL + this.salesUuid;
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.pageBack} type="primary">
                返回
            </el-button>
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditSaleGroupPage", {formData: {salesUuid: this.salesUuid}});
                }
            } type="primary" icon="edit">
                添加
            </el-button>
            <el-button class="filter-item" onClick={() => this.importExcelShow = true} type="primary" icon="edit">
                导入Excel配置
            </el-button>
            <el-dialog title="导入Excel配置" visible={this.importExcelShow} onClose={this.closeImportExcel}>
                <el-form>
                    {
                        this.importErrMsg
                    }
                    <el-form-item label="选择文件" label-width="formLabelWidth">
                        {
                            !this.importErrMsg && this.importExcelSuccess && "导入成功 !"
                        }
                        <uploadExcel uploadSuccess={() => {
                            this.importExcelIng = false;
                            this.importExcelSuccess = true;
                        }} uploadFail={() => this.importExcelIng = false} beforeUpload={() => {
                            this.importExcelIng = true;
                            this.importErrMsg = "";
                        }} uploadFail={this.uploadFail} handelEmpty={() => {
                            this.importExcelIng = false;
                            this.importErrMsg = "";
                        }} actionUrl={uploadExcelApi}/>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>;
    }

    closeImportExcel() {
        this.importErrMsg = "";
        this.importExcelIng = false;
        this.importExcelShow = false;
        this.importExcelSuccess = false;
    }

    uploadFail(e) {
        const msg = `导入失败！` + e;
        this.importErrMsg = msg;
        this.importExcelIng = false;
        this.$message.error(msg);
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
        this.tableActionSearchColumn = [{groupUuid: this.formData.uuid}];
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
                uuid: uuid,
                name: name
            });
            this.pageBack();
        }
    }
}

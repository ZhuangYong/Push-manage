/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesManage.js @author: walljack@163.com @date: 18-2-26 上午10:56 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as delSales, delGroup, salesDevicePage} from "../../api/sales";
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

@Component({name: "salesView"})
export default class salesView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditSalesPage/>, <EditSaleGroupPage/>, <DevicePage/>, <ChooseGroupPage/>, <DeviceGroupPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends SalesPage {}

@Component({name: "DevicePage", components: {uploadExcel}})
class DevicePage extends salesDeviceGroupPage {
    importExcelShow = false;
    importExcelIng = false;
    importExcelSuccess = false;
    importErrMsg = '';
    salesUuid = '';

    tableAction = 'sales/device/RefreshPage';

    @State(state => state.sales.salesDevicePage) tableData;

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

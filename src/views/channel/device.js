import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import BaseView from "../../components/common/BaseView";
import EditI18nPage from "../commPages/editI18nPage";
import {del as delDevice, delDeviceUser} from "../../api/device";
import EditDevicePage from "./editPage/editDevicePage";
import DevicePage from "../commPages/devicePage";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import uploadExcel from '../../components/Upload/singleExcel.vue';
import {channelMoveGroups, saveMoveChannelDeviceGroups, saveSelectedDeviceToChannelGroups} from "../../api/channel";
import JSelect from "../../components/select/select";

/**
 * 主视图
 */
@Component({name: "DeviceView"})
export default class DeviceView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditDevicePage/>, <DeviceListPage/>, <ChooseDevicePage/>, <EditI18nPage/>]);
    }
}

@Component({
    name: 'IndexPage'
})
class IndexPage extends BasePage {
    tableAction = 'channel/device/RefreshPage';
    viewRule = [
        {columnKey: 'groupName', label: '分组名称', minWidth: 160, sortable: true},
        {columnKey: 'codeAutoDay', label: '邀请码自动分配天数', minWidth: 110, sortable: true},
        {columnKey: 'image', label: '免费激活背景图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'deviceCount', label: '分组设备数量', minWidth: 100},
        {columnKey: 'vipCount', label: '已激活数量'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '设备列表', type: 'devList'}], minWidth: 236}
    ];
    tableActionSearch = [{
        column: 'groupName', label: '请输入分组名称', type: 'input', value: ''
    }];

    delItemFun = delDevice;

    @State(state => state.channel.devicePage) tableData;

    topButtonHtml(h) {
        return (
            <div class="filter-container table-top-button-container">
                <el-button class="filter-item" onClick={
                    () => {
                        this.goPage("EditDevicePage");
                    }
                } type="primary" icon="edit">添加
                </el-button>
            </div>
        );
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

    submitAddOrUpdate () {
        this.$refs.addForm.validate((valid) => {
            if (valid) this.submitFormI18n();
        });
    }

    /**
     * 跳向修改分类页面
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditDevicePage", {formData: row});
    }


    /**
     *
     * @param row
     */
    handelDevList(row) {
        this.goPage("DeviceListPage", {defaultData: {deviceConfigId: row.id}});
    }
}


@Component({
    name: 'DeviceListPage',
    components: {
        JSelect,
        uploadExcel
    }
})
class DeviceListPage extends BasePage {
    deviceConfigId = "";
    importExcelShow = false;
    importExcelIng = false;
    importExcelSuccess = false;
    importErrMsg = '';
    deviceids = [];
    moveGroupUuid = '';
    tableCanSelect = true;
    moveGroupShow = false;
    moveGroupList = [];
    tableAction = 'channel/device/user/RefreshPage';
    viewRule = [
        {columnKey: 'sn', label: 'SN', minWidth: 170},
        {columnKey: 'mac', label: 'MAC', minWidth: 140},
        {columnKey: 'wifimac', label: 'WIFIMAC', minWidth: 190},
        {columnKey: 'isUsed', label: '是否已领取', minWidth: 90, formatter: r => {
                if (r.isUsed === 1) return '是';
                return '否';
            }},
        {columnKey: 'ranmdoncode', label: '随机码', minWidth: 190},
        {columnKey: 'channelName', label: '机型名', minWidth: 100},
        {columnKey: 'createTime', label: '创建时间', minWidth: 100},
        {columnKey: 'updateTime', label: '领取时间', minWidth: 100},
    ];
    pageActionSearch = [{
        column: 'SN', label: '请输入SN', type: 'input', value: ''
    }];

    tableActionSearch = [
        {column: 'sn', label: '请输入SN号', type: 'input', value: ''},
    ];

    delItemFun = delDevice;

    @State(state => state.channel.deviceUserPage) tableData;

    created() {
        this.tableActionSearchColumn = [{deviceConfigId: this.deviceConfigId}];
        this.refreshMoveGroup();
    }

    topButtonHtml(h) {
        return (
            <div class="filter-container table-top-button-container">
                {
                    this.pageBackHtml(h)
                }
                <el-button class="filter-item" onClick={
                    () => {
                        this.goPage("ChooseDevicePage", {defaultData: {deviceConfigId: this.deviceConfigId}});
                    }
                } type="primary" icon="edit">添加
                </el-button>
                <el-button class="filter-item" onClick={() => this.importExcelShow = true} type="primary" icon="edit">
                    导入Excel配置
                </el-button>
                <el-button class="filter-item" onClick={this.submitDel} type="danger" disabled={!this.deviceids.length}>
                    批量删除
                </el-button>
                {
                    this.moveGroupList.length ? <el-button class="filter-item" onClick={() => this.moveGroupShow = true} type="danger" disabled={!this.deviceids.length}>
                        批量移动到其他分组
                    </el-button> : ""
                }
            </div>
        );
    }

    render(h) {
        const uploadExcelApi = Const.BASE_API + '/' + apiUrl.API_DEVICE_SAVE_EXCEL + this.deviceConfigId;
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
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
            <el-dialog title="批量移动到其他分组" visible={this.moveGroupShow} onClose={this.closeMoveGroup} width="350px">
                <el-form class="small-space" label-position="right" label-width="90px">
                    <el-form-item label="选择分组">
                        <JSelect placeholder="请选择" value={this.moveGroupUuid} handelSelectChange={v => this.moveGroupUuid = v} options={this.moveGroupList.map(item => {return {label: item.groupName, value: item.id};})}/>
                    </el-form-item>
                    <el-form-item label="" >
                        <el-button class="filter-item" onClick={() => this.moveGroupShow = false}>
                            取消
                        </el-button>
                        <el-button class="filter-item" onClick={() => this.saveMoveGroup(() => this.moveGroupShow = false)} type="primary" icon="edit">
                            确定
                        </el-button>
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

    refreshMoveGroup() {
        channelMoveGroups({groupUuid: this.groupUuid}).then(res => this.moveGroupList = res);
    }

    saveMoveGroup(callback) {
        this.submitLoading = true;
        saveMoveChannelDeviceGroups({ids: this.deviceids, deviceConfigId: this.moveGroupUuid}).then(res => {
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

    /**
     * 删除自定义分类中歌曲
     */
    submitDel() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            delDeviceUser({ids: this.deviceids}).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
                this.deviceids = [];
            }).catch(() => this.submitLoading = false);
        };
    }

}

@Component({name: "ChooseDevicePage"})
class ChooseDevicePage extends DevicePage {
    tableAction = "salesGroup/device/list/RefreshPage";
    @State(state => state.sales.groupDevicePage) tableData;

    targetId = "";
    tableCanSelect = true;

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveDevices} type="primary">
                选定
            </el-button>
        </div>;
    }

    submitSaveDevices() {
        this.submitLoading = true;
        saveSelectedDeviceToChannelGroups({ids: this.formData.deviceUuids, deviceConfigId: this.deviceConfigId}, this.targetId).then(res => {
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

/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: salesDeviceGroupPage.js @author: walljack@163.com @date: 18-3-7 下午4:30 @version: 1.0
 */

import BasePage from "../../components/common/BasePage";
import {delUser, moveGroup, saveMoveGroup} from "../../api/salesGroup";
import {State} from "vuex-class/lib/index";
import {Component} from "vue-property-decorator";
import JSelect from "../../components/select/select";

@Component({name: "SalesDeviceGroupPage"})
export default class salesDeviceGroupPage extends BasePage {
    groupUuid = '';
    moveGroupUuid = '';
    deviceids = [];
    tableCanSelect = true;
    moveGroupShow = false;
    moveGroupList = [];
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
        // {column: 'status', label: '请选择设备状态', type: 'option', value: '', options: [
        //         {value: 1, label: '已开启'},
        //         {value: -1, label: '设备永久禁用'},
        //         {value: -2, label: '到时间禁用'},
        //     ]},
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
                        <el-button class="filter-item" onClick={() => this.saveMoveGroup(() => this.moveGroupShow = false)} type="primary" icon="edit">
                            确定
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
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

    refreshMoveGroup() {
        moveGroup({groupUuid: this.groupUuid}).then(res => this.moveGroupList = res);
    }

    saveMoveGroup(callback) {
        this.submitLoading = true;
        saveMoveGroup({ids: this.deviceids, groupUuid: this.moveGroupUuid}).then(res => {
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

/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: manufacturerManage.js @author: walljack@163.com @date: 18-2-27 下午4:08 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {delAppInGroup, delGroup, saveGroup, saveGroupApp} from "../../api/application";
import JPanel from "../../components/panel/JPanel";
import {rechargeGroupDeleteChannels} from "../../api/rechargeCardManage";
import {delDeviceUser} from "../../api/device";

@Component({name: "manufacturerManageView"})
export default class manufacturerManageView extends BaseView {
    created() {
            this.initialPages([<IndexPage/>, <EditGroupPage/>, <ApplicationPage/>, <ChooseApplicationPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'system/application/group/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '分组名称', minWidth: 120},
        {columnKey: 'flag', label: 'flag', minWidth: 120, inDetail: true},
        {columnKey: 'remark', label: '备注', minWidth: 170},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '查看应用', type: 'applicationList'}], minWidth: 236}
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入分组名称', type: 'input', value: ''}];

    delItemFun = delGroup;

    @State(state => state.system.groupPage) tableData;

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
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('EditGroupPage');
            }}>
                添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage('EditGroupPage', {formData: row});
    }

    handelApplicationList(row) {
        this.goPage('ApplicationPage', {formData: row});
    }
}

@Component({name: "EditGroupPage", components: {JPanel}})
class EditGroupPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入名称'}
        ],
        uuid: [
            {required: true, message: '请输入控制码'},
            {validator: (rule, value, callback) => {
                    const v = parseInt(value, 10);
                    if (!isNaN(v) && v > 0 && value.length === 4) {
                        callback();
                    } else {
                        callback(new Error('请输入大于0的4位数字'));
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = saveGroup;

    constructor() {
        super();
    }

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}应用分组`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" rows={2} placeholder="请输入备注" value={this.formData.remark} name='remark'/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }

}

@Component({name: "ApplicationPage"})
class ApplicationPage extends BasePage {
    groupUuid = "";
    appsUuids = [];
    tableCanSelect = true;
    tableAction = 'system/application/group/apply/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '应用名称', minWidth: 140, sortable: true},
        {columnKey: 'versionName', label: '版本号', minWidth: 140, sortable: true},
        {columnKey: 'iconUrl', label: 'ICON图标', imgColumn: 'iconUrl'},
        {columnKey: 'size', label: '文件大小', minWidth: 120, sortable: true, formatter: r => r.size && (r.size / (1024 * 1024)).toFixed(4) + " M"},
        {columnKey: 'bgUrl', label: '应用图片', imgColumn: 'bgUrl', inDetail: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入分组名称', type: 'input', value: ''}];

    delItemFun = delGroup;

    @State(state => state.system.groupApplyPage) tableData;

    created() {
        this.groupUuid = this.formData.uuid;
        this.tableActionSearchColumn = [{groupUuid: this.groupUuid}];
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
            {
                this.pageBackHtml(h)
            }
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage("ChooseApplicationPage", {formData: this.formData});
            }}>
                添加
            </el-button>
            <el-button className="filter-item" type="danger" disabled={!this.appsUuids.length} onClick={this.submitDel}>
                移除
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage('EditGroupPage', {formData: row});
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let appsUuids = [];
            selectedItems.map(s => {
                appsUuids.push(s.uuid);
            });
            this.appsUuids = appsUuids;
        } else {
            this.appsUuids = [];
        }
    }

    submitDel() {
        this.dialogVisible = true;
        this.tipTxt = "确定要移除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            delAppInGroup({appsUuids: this.appsUuids, groupUuid: this.groupUuid}).then(res => {
                this.submitLoading = false;
                this.successMsg("移除成功");
                this.refreshTable();
                this.appsUuids = [];
            }).catch(() => this.submitLoading = false);
        };
    }
}


@Component({name: "ChooseApplicationPage"})
class ChooseApplicationPage extends BasePage {
    targetId = "";
    appsUuids = [];
    tableCanSelect = true;
    tableAction = 'system/application/RefreshPage';
    @State(state => state.system.applicationPage) tableData;
    viewRule = [
        {columnKey: 'name', label: '应用名称', minWidth: 140, sortable: true},
        {columnKey: 'versionName', label: '版本号', minWidth: 140, sortable: true},
        {columnKey: 'iconUrl', label: 'ICON图标', imgColumn: 'iconUrl'},
        {columnKey: 'size', label: '文件大小', minWidth: 120, sortable: true, formatter: r => r.size && (r.size / (1024 * 1024)).toFixed(4) + " M"},
        {columnKey: 'bgUrl', label: '应用图片', imgColumn: 'bgUrl', inDetail: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];
    tableActionSearch = [{column: 'name', label: '请输入应用名称', type: 'input', value: ''}];

    created() {
        this.targetId = this.formData.rankId;
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
            {
                this.pageBackHtml(h)
            }
            <el-button class="filter-item" onClick={this.submitSaveApps} type="primary" disabled={this.appsUuids.length <= 0}>
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveApps() {
        this.submitLoading = true;
        saveGroupApp({appsUuids: this.appsUuids, groupUuid: this.formData.uuid}).then(res => {
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
        if (selectedItems.length > 0) {
            let appsUuids = [];
            selectedItems.map(s => {
                appsUuids.push(s.uuid);
            });
            this.appsUuids = appsUuids;
        } else {
            this.appsUuids = [];
        }
    }
}

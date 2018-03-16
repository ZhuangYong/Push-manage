/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenu.js @author: walljack@163.com @date: 18-3-15 上午11:06 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {delUser, delUserKey, editUser, editUserKey} from "../../api/third";
import {State} from "vuex-class";
import JPanel from "../../components/panel/JPanel";
import JSelect from "../../components/select/select";
import Const from "../../utils/const";
import {getUserType} from "../../utils";
import SalesPage from "../commPages/salesPage";
import _ from "lodash";
import ManufacturerPage from "../commPages/manufacturerPage";
import ThirdMenuPage from "../commPages/thirdMenuPage";

@Component({name: "salesOrderManageView"})
export default class salesOrderManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditAppIdPage/>, <ChooseSalesPage/>, <ChooseManufacturerPage/>, <ChildPage/>, <EditKey/>, <ChooseApi/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'third/app/id/RefreshPage';
    viewRule = [
        {columnKey: 'id', label: 'ID', minWidth: 90, inDetail: true},
        {columnKey: 'name', label: '名称', minWidth: 90},
        {columnKey: 'appid', label: 'APP ID', minWidth: 90},
        {columnKey: 'type', label: '用户类型', minWidth: 90, formatter: r => {
            if (r.type === Const.USER_TYPE_JMAKE) return '金麦客';
            if (r.type === Const.USER_TYPE_SALES) return '销售方';
            if (r.type === Const.USER_TYPE_MANUFACTURER) return '渠道方';
        }},
        {columnKey: 'viewName', label: '用户名称', minWidth: 90},
        {columnKey: 'viewUuid', label: '用户UUID', minWidth: 90},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 90, formatter: r => {
            if (r.isEnabled === 1) return '是';
            return '否';
        }},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'remark', label: '备注', minWidth: 140, inDetail: true},
        {label: '操作', buttons: [{label: '子模块', type: 'childList'}, {label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}], minWidth: 176}
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入接口名称', type: 'input', value: ''},
    ];

    delItemFun = delUser;

    @State(state => state.third.thirdAppIdPage) tableData;

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
                    this.goPage("EditAppIdPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditAppIdPage", {formData: row});
    }

    handelChildList(row) {
        this.goPage("ChildPage", {defaultData: {appid: row.appid}});
    }
}

@Component({name: "EditAppIdPage", components: {JPanel, JSelect}})
class EditAppIdPage extends BasePage {
    defaultFormData = {
        id: '',
        name: '',
        appid: '',
        type: Const.USER_TYPE_SALES,
        viewName: '',
        isEnabled: Const.IS_ENABLE_TRUE,
        viewUuid: '',
        remark: '',
    };
    validateRule = {
        name: [
            {required: true, message: '请输入接口名称'}
        ],
        appid: [
            {required: true, message: '请输入url'}
        ],
        viewUuid: [
            {required: true, message: '请选择销售方或渠道方'}
        ],
    };

    editFun = editUser;

    render() {
        const userTypes = getUserType();
        userTypes.shift();
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}接口名称`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="名称：" prop="name">
                        <el-input value={this.formData.name} name="name"/>
                    </el-form-item>
                    <el-form-item label="APP ID：" prop="appid">
                        <el-input value={this.formData.appid} name="appid"/>
                    </el-form-item>
                    <el-form-item label="类型：" prop="type">
                        <JSelect placeholder="请选择" value={this.formData.type} vModel="type" options={userTypes} handelSelectChange={f => {
                            this.salesUuid = f;
                            this.formData.viewName = "";
                            this.formData.viewUuid = "";
                        }}/>
                    </el-form-item>
                    {
                        this.formData.type === Const.USER_TYPE_SALES ? <el-form-item label="选择销售方：" prop="viewUuid">
                            {
                                this.formData.viewUuid ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                    this.selectItem = null;
                                    this.formData.viewName = '';
                                    this.formData.viewUuid = '';
                                }}>
                                    {this.formData.viewName}
                                </el-tag> : <el-button type="primary" onClick={f => {
                                    this.goPage("ChooseSalesPage");
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }
                    {
                        this.formData.type === Const.USER_TYPE_MANUFACTURER ? <el-form-item label="选择渠道方：" prop="viewUuid">
                            {
                                this.formData.viewUuid ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                    this.selectItem = null;
                                    this.formData.viewName = '';
                                    this.formData.viewUuid = '';
                                }}>
                                    {this.formData.viewName}
                                </el-tag> : <el-button type="primary" onClick={f => {
                                    this.goPage("ChooseManufacturerPage");
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={Const.IS_ENABLE_TRUE} label={Const.IS_ENABLE_TRUE}>是</el-radio>
                            <el-radio value={Const.IS_ENABLE_FALSE} label={Const.IS_ENABLE_FALSE}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input rows={2} type="textarea" value={this.formData.remark} name="remark"/>
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

@Component({name: "ChooseSalesPage"})
class ChooseSalesPage extends SalesPage {
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
                viewUuid: uuid,
                viewName: name
            });
            this.pageBack();
        }
    }
}

@Component({name: "ChooseManufacturerPage"})
class ChooseManufacturerPage extends ManufacturerPage {
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
                viewUuid: uuid,
                viewName: name
            });
            this.pageBack();
        }
    }
}

@Component({name: "ChildPage"})
class ChildPage extends BasePage {
    tableAction = 'third/app/id/child/RefreshPage';
    viewRule = [
        {columnKey: 'id', label: 'ID', minWidth: 90, inDetail: true},
        {columnKey: 'apiUuid', label: 'API UUID', minWidth: 90},
        {columnKey: 'appid', label: 'APP ID', minWidth: 90},
        {columnKey: 'appkey', label: 'APP KEY', minWidth: 90},
        {columnKey: 'appsecret', label: 'APP SECRET', minWidth: 90},
        {columnKey: 'count', label: '每天调用次数', minWidth: 90},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}], minWidth: 176}
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入接口名称', type: 'input', value: ''},
    ];

    delItemFun = delUserKey;

    @State(state => state.third.pageUserChildPage) tableData;

    created() {
        this.tableActionSearchColumn = [{appid: this.appid}];
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
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditKey", {formData: {appid: this.appid}});
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage("EditKey", {formData: row});
    }
}

@Component({name: "EditKey", components: {JPanel, JSelect}})
class EditKey extends BasePage {
    defaultFormData = {
        id: '',
        appid: '',
        count: '',
        apiUuids: [],
    };
    validateRule = {
        count: [
            {required: true, message: '请输入调用次数'},
            {type: 'number', message: '必须为数字'},
        ],
        apiUuids: [
            {required: true, message: '请选择接口'}
        ],
    };

    editFun = editUserKey;

    render() {
        const userTypes = getUserType();
        userTypes.shift();
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}KEY`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="调用次数：" prop="count">
                        <el-input value={this.formData.count} name="count" number/>
                    </el-form-item>
                    <el-form-item label="选择接口：" prop="apiUuids">
                        {
                            !_.isEmpty(this.formData.apiUuids) ? this.formData.apiUuids.map(i => <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                this.formData.apiUuids = this.formData.apiUuids.filter(ai => ai.apiUuid !== i.apiUuid);
                                }}>
                                    {i.apiName}
                                </el-tag>
                            ) : <el-button type="primary" onClick={f => {
                                this.goPage("ChooseApi");
                            }}>点击选择</el-button>
                        }
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


@Component({name: "ChooseApi"})
class ChooseApi extends ThirdMenuPage {

    selectedApi = [];

    tableCanSelect = true;
    created() {
        this.viewRule = this.viewRule.filter(v => _.isEmpty(v.buttons));
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
            <el-button class="filter-item" onClick={this.submitChoose} type="primary">
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitChoose() {
        this.changePrePageData({apiUuids: this.selectedApi});
        this.pageBack();
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.selectedApi = [];
        if (selectedItems.length > 0) {
            selectedItems.map(s => {
                const {name, uuid} = s;
                this.selectedApi.push({
                    apiUuid: uuid,
                    apiName: name
                });
            });
        }
    }

}

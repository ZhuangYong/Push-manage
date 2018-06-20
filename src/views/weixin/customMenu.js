/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: thirdMenu.js @author: walljack@163.com @date: 18-3-15 上午11:06 @version: 1.0
 */

import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State, Action} from "vuex-class";
import JPanel from "../../components/panel/JPanel";
import {menuDelete, save as saveFun} from "../../api/weixinMenu";
import {listTree} from "../../utils";
import ChooseMaterialPage from "./ChooseMaterialPage";
import {EditWXMaterialPage} from "./material";

@Component({name: "WXCustomMenu"})
export default class WXCustomMenu extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditWXCustomPage/>, <ChooseMaterialPage />, <EditWXMaterialPage/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    isTree = false;
    tableAction = 'weixin/menu/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '菜单名称', minWidth: 170},
        {columnKey: 'url', label: '级别/所属一级', minWidth: 200, formatter: r => {
                if (r.parentId === 0) return '一级';
                if (r.parentId !== 0) return r.parentName + '/二级';
            }},
        {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
        {columnKey: 'targetType', label: '类型', minWidth: 90, formatter: r => {
                if (r.targetType === 1) return '发送消息';
                if (r.targetType === 2) return '跳转连接';
                if (r.targetType === 3) return '层级菜单';
            }},
        {columnKey: 'content', label: '内容', minWidth: 170},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 80, formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }},
        {
            label: '操作',
            buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}],
            width: 144
        }
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入菜单名称', type: 'input', value: ''
    }];

    delItemFun = menuDelete;

    @State(state => state.weixin.weixinMenuPage) tableData;
    @Action('weixin/menu/tree/RefreshPage') treeAction;
    @State(state => state.weixin.menuTree) treeData;

    created() {
        this.refreshTree();
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.isTree ? this.renderTreeHtml(h) : this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditWXCustomPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
            <el-button className="filter-item" onClick={
                () => this.isTree = !this.isTree
            } type="primary" icon="edit">{this.isTree ? '列表' : '树形结构'}
            </el-button>
        </div>;
    }

    handelDel(row) {
        this.submitDel(row, 'id', res => this.refreshTree());
    }

    handelEdit(row) {
        this.goPage('EditWXCustomPage', {formData: row});
    }

    refreshTree() {
        this.loading = true;
        this.treeAction().then((res) => {
            this.loading = false;
        }).catch((err) => {
            this.loading = false;
        });
    }

    renderTreeHtml(h) {
        if (!this.treeData || !this.treeData.length) return "";
        return (
            <div className="table" style="padding: 14px; background-color:white; border-radius: 4px; clear: both;">
                <el-tree
                    v-loading={this.submitLoading || this.loading}
                    data={(this.treeData) || []}
                    props={{
                        children: 'children',
                        label: 'name'
                    }}
                    node-key={"id"}
                    default-expand-all
                    expand-on-click-node={false}
                    render-content={this.renderTreeContent}>
                </el-tree>
            </div>
        );
    }

    /**
     * 树模板
     * @param h
     * @param data
     * @returns {*}
     */
    renderTreeContent(h, {data}) {
        return (
            <span class="hover-show">
                    <span>
                        <span>
                            {data.name}
                        </span>
                        <span class="hover-show-item">
                            <i class="el-icon-edit" style={{margin: '0 .5rem 0 1.5rem'}} onClick={() => {
                                this.goPage('EditWXCustomPage', {formData: data});
                            }}/>
                            <i class="el-icon-plus" style={{margin: '0 .5rem'}} onClick={() => {
                                this.goPage('EditWXCustomPage', {formData: {parentId: data.id}});
                            }}/>
                            <i class="el-icon-delete" style={{margin: '0 .5rem'}} onClick={() => {
                                this.submitDel(data, 'id', res => this.refreshTree());
                            }}/>
                        </span>
                    </span>
                </span>
        );
    }
}

@Component({name: "EditWXCustomPage"})
class EditWXCustomPage extends BasePage {
    defaultFormData = {
        name: '',
        targetType: 1,
        isEnabled: 1,
        msgType: 1,
        parentId: 0,
        sort: 1,
        materialId: '',
        materialTitle: '',
        content: ''
    };
    validateRule = {
        name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
        ],
        permission: [
            {required: true, message: '请输入资源权限符', trigger: 'blur'},
            {min: 1, max: 100, message: '请输入2-16昵称', trigger: 'blur'}
        ]
    };

    editFun = saveFun;
    @Action('weixin/menu/tree/RefreshPage') treeAction;
    @State(state => state.weixin.menuTree) treeData;

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "新增"}自定义菜单`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="父级：" prop="parentId">
                        <el-select placeholder={(!this.formData.parentId && !this.formData.id) ? "根目录" : "请选择"} value={this.formData.parentId} name='parentId'>
                            <el-option label={'根目录'} value={0} key={0}/>
                            {
                                listTree({children: this.treeData}).map(item => (
                                    <el-option label={item.name} value={item.id} key={item.id}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称：" prop="name">
                        <el-input value={this.formData.name} name='name'/>
                    </el-form-item>
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                        <el-input value={this.formData.sort} onChange={v => this.formData.sort = parseInt(v, 10)} number/>
                    </el-form-item>
                    <el-form-item label="菜单类型：">
                        <el-radio-group value={this.formData.targetType} name="targetType">
                            <el-radio value={1} label={1}>发送消息</el-radio>
                            <el-radio value={2} label={2}>跳转连接</el-radio>
                            <el-radio value={3} label={3}>层级菜单</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="消息类型：" style={{display: this.formData.targetType === 1 ? '' : 'none' }}>
                        <el-radio-group value={this.formData.msgType} name="msgType">
                            <el-radio value={1} label={1}>图文消息</el-radio>
                            <el-radio value={2} label={2}>文字消息</el-radio>
                            {/*<el-radio value={3} label={3}>图片消息</el-radio>*/}
                        </el-radio-group>
                    </el-form-item>
                    {
                        (this.formData.targetType === 1 && this.formData.msgType === 2) ? <el-form-item label="文字内容：">
                            <el-input value={this.formData.content} onChange={v => this.formData.content = v}/>
                        </el-form-item> : ''
                    }
                    {
                        (this.formData.targetType === 1 && this.formData.msgType === 1) ? <el-form-item label="从图文管理选择：">
                            {
                                this.formData.materialTitle ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                    this.formData.materialId = '';
                                    this.formData.materialTitle = '';
                                }}>
                                    {this.formData.materialTitle}
                                </el-tag> : <el-button type="primary" size="mini" onClick={f => {
                                    this.goPage('ChooseMaterialPage');
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }

                    {
                        this.formData.targetType === 2 ? <el-form-item label="URL地址：" prop="content">
                            <el-input value={this.formData.content} onChange={v => this.formData.content = v}/>
                        </el-form-item> : ''
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.treeAction();
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

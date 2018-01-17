import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {bindData, listTree} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {menuDelete, menuTree, save as saveFun} from "../../api/weixinMenu";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '菜单名称', minWidth: 170},
        {columnKey: 'url', label: '级别/所属一级', minWidth: 200, formatter: r => {
            if (r.parentId === 0) return '一级';
            if (r.parentId !== 0) return r.parentName + '/二级';
        }},
        {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
        {columnKey: 'targetType', label: '类型', minWidth: 70, formatter: r => {
            if (r.targetType === 1) return '发送消息';
            if (r.targetType === 2) return '跳转连接';
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
    ],

    defaultFormData: {
        name: '',
        targetType: 1,
        isEnabled: 1,
        msgType: 1,
        parentId: 0,
        sort: '',
        materialId: '',
        materialTitle: '',
        content: ''

    },
    listDataGetter: function() {
        return this.weixin.weixinMenuPage;
    },
    pageAction: 'weixin/menu/RefreshPage'
};

const chooseMaterialData = {
    viewRule: [
        {columnKey: 'name', label: '图文消息名称', minWidth: 140},
        {columnKey: 'ossImage', label: '头图', minWidth: 80, imgColumn: 'ossImage'},
        {columnKey: 'title', label: '头图标题', minWidth: 100},
        {columnKey: 'url', label: 'URL', minWidth: 180},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
    ],
    listDataGetter: function() {
        return this.weixin.materialPage;
    },
    pageAction: 'weixin/material/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '请输入名称', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ],
    permission: [
        {required: true, message: '请输入资源权限符', trigger: 'blur'},
        {min: 1, max: 100, message: '请输入2-16昵称', trigger: 'blur'}
    ]
};
export default {
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: "list",
            preStatus: [],
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItem: null, // 选择列
            formData: _defaultData.defaultFormData, // 表单数据
            viewRule: _defaultData.viewRule,
            treeData: [],
            roles: [],
            owned: [],
            tipTxt: "",
            dialogVisible: false,
            sureCallbacks: f => f,
            defaultCurrentPage: 1,
            rules: validRules,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearch: [{
                column: 'name', label: '请输入菜单名称', type: 'input', value: ''
            }],
        };
    },
    watch: {
        status: function (v, ov) {
            if (v === 'list') {
                const _defaultData = Object.assign({}, defaultData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            } else if (v === 'chooseMaterial') {
                const _defaultData = Object.assign({}, chooseMaterialData);
                this.viewRule = _defaultData.viewRule;
                this.listDataGetter = _defaultData.listDataGetter;
            }
        }
    },
    computed: {
        ...mapGetters(['weixin'])
    },
    created() {
        this.refreshTree();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        const tableData = this.listDataGetter() || {};
        return (
            <el-row v-loading={this.submitLoading}>
               {
                   (this.status === "list" || this.status === "tree") ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.preStatus.push("list");
                                    this.formData = Object.assign({}, defaultData.defaultFormData);
                                    this.selectItem = null;
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                       {
                           this.status === "tree" ? <el-button class="filter-item" onClick={
                               () => {
                                   this.status = "list";
                               }
                           } type="primary">
                            列表
                        </el-button> : ""
                       }
                       {
                           this.status === "list" ? <el-button class="filter-item" onClick={
                               () => {
                                   this.status = "tree";
                               }
                           } type="primary">
                            树形结构
                        </el-button> : ""
                       }
                    </div> : (
                       <div class="filter-container">
                           {
                               this.status === "chooseMaterial" ? <el-button class="filter-item" onClick={
                               () => {
                                   this.status = this.preStatus.pop();
                               }
                           } type="primary">
                                返回
                            </el-button> : ''
                           }
                       </div>
                   )
               }
                {
                    this.status === "tree" ? this.treeHtml(h) : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={defaultData.pageAction} data={tableData} pageActionSearch={this.pageActionSearch}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={this.viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : (this.status === "chooseMaterial" ? <Vtable ref="Vtable" pageAction={chooseMaterialData.pageAction} data={tableData}
                    defaultCurrentPage={1} select={true} viewRule={this.viewRule} filter-multiple={false}
                    handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h))
                }
                <ConfirmDialog
                    visible={this.dialogVisible}
                    tipTxt={this.tipTxt}
                    handelSure={this.sureCallbacks}
                    handelCancel={() => {
                        this.dialogVisible = false;
                    }}
                />
            </el-row>
        );
    },
    methods: {
        treeHtml: function (h) {
            return (
                <el-tree
                    style="margin-top: 60px;"
                    v-loading={this.submitLoading || this.loading}
                    data={(this.treeData) || []}
                    props={{
                        children: 'children',
                        label: 'name'
                    }}
                    node-key={"id"}
                    default-expand-all
                    expand-on-click-node={false}
                    render-content={this.renderContent}>
            </el-tree>
            );
        },

        renderContent: function(h, {data}) {
            return (
                <span class="hover-show">
                    <span>
                        <span>
                            {data.name}
                        </span>
                        <span class="hover-show-item">
                            <i class="el-icon-edit" style={{margin: '0 .5rem 0 1.5rem'}} onClick={() => {
                                this.formData = data;
                                this.status = "edit";
                                this.preStatus.push("tree");
                            }}/>
                            <i class="el-icon-plus" style={{margin: '0 .5rem'}} onClick={() => {
                                this.formData = Object.assign({}, defaultData.defaultFormData, {pid: data.id});
                                this.status = "add";
                                this.preStatus.push("tree");
                            }}/>
                            <i class="el-icon-delete" style={{margin: '0 .5rem'}} onClick={() => {
                                this.submitDel(data);
                            }}/>
                        </span>
                    </span>
                </span>
            );
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            if (this.status === "add" || this.status === "edit") {
                return (
                    <el-form v-loading={this.loading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="120px">
                        <el-form-item label="父级：" prop="parentId">
                             <el-select placeholder={(!this.formData.parentId && this.status === "edit") ? "根目录" : "请选择"} value={this.formData.parentId} name='parentId'>
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
                            <el-input value={this.formData.sort} name='sort' number/>
                        </el-form-item>
                        <el-form-item label="菜单类型：">
                             <el-radio-group value={this.formData.targetType} name="targetType">
                                <el-radio value={1} label={1}>发送消息</el-radio>
                                <el-radio value={2} label={2}>跳转连接</el-radio>
                             </el-radio-group>
                         </el-form-item>
                        <el-form-item label="消息类型：" style={{display: this.formData.targetType === 1 ? '' : 'none' }}>
                            <el-radio-group value={this.formData.msgType} name="msgType">
                                <el-radio value={1} label={1}>图文消息</el-radio>
                                <el-radio value={2} label={2}>文字消息</el-radio>
                             </el-radio-group>
                        </el-form-item>
                        {
                            (this.formData.targetType === 1 && this.formData.msgType === 2) ? <el-form-item label="文字内容：">
                                                              <el-input value={this.formData.content} name='content'/>
                                                          </el-form-item> : ''
                         }
                        {
                            (this.formData.targetType === 1 && this.formData.msgType === 1) ? <el-form-item label="从素材管理里面选择：">
                                {
                                    this.selectItem ? <el-tag key="tag" closable disable-transitions={false} onClose={f => this.selectItem = null}>
                                        {this.selectItem.name}
                                        <el-input type="hidden" style="display: none;" name="materialId" value={this.selectItem.id}/>
                                        <el-input type="hidden" style="display: none;" name="materialTitle" value={this.selectItem.name}/>
                                    </el-tag> : <el-button type="primary" onClick={f => {
                                        this.preStatus.push(this.status);
                                        this.status = "chooseMaterial";
                                    }}>点击选择</el-button>
                                }
                                </el-form-item> : ''
                        }

                        {
                            this.formData.targetType === 2 ? <el-form-item label="URL地址：" prop="content">
                                                                <el-input value={this.formData.content} name='content' number/>
                                                            </el-form-item> : ''
                        }
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={f => this.status = this.preStatus.pop()}>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                );
            }
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    saveFun(this.formData).then(res => {
                        this.$message({
                            message: "操作成功！",
                            type: "success"
                        });
                        this.refreshTree();
                        this.$refs.Vtable && this.$refs.Vtable.refreshData({
                            currentPage: this.defaultCurrentPage
                        });
                        this.submitLoading = false;
                        this.status = 'list';
                    }).catch(e => {
                        console.log(e);
                        this.submitLoading = false;
                    });
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            if (selectedItems.length === 1) {
                this.selectItem = selectedItems[0];
                const {name, id} = this.selectItem;
                this.formData.materialTitle = name;
                this.formData.materialId = id;
                this.status = this.preStatus.pop();
            } else {
                this.selectItem = null;
                this.formData.materialId = '';
                this.formData.materialTitle = '';
            }
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const menuId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                menuDelete(menuId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.refreshTree();
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        refreshTree() {
            this.loading = true;
            menuTree().then((res) => {
                this.treeData = res;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'tree':

                    break;
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.preStatus.push('list');
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                case 'add':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },
    }
};

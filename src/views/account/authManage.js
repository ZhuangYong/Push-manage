import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    resourceTree, resouceModify, resourceForceDelete, resourceDelete
} from "../../api/resource";
import {bindData, listTree} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'name', label: '名字', minWidth: 170},
    {columnKey: 'url', label: '路径', minWidth: 200},
    {columnKey: 'permission', label: '权限', minWidth: 140},
    {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
        if (r.status === 1) return '启用';
        if (r.status === 0) return '未启用';
    }},
    {columnKey: 'description', label: '描述'},
    {
        label: '操作',
        buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}],
        width: 170
    }
];
const defaultFormData = {
    pid: '',
    seq: '',
    status: 1,
    description: '',
    name: '',
    permission: '',
    url: ''

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
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            formData: Object.assign({}, defaultFormData), // 表单数据
            roleData: {},
            treeData: [],
            roles: [],
            owned: [],
            tipTxt: "",
            dialogVisible: false,
            sureCallbacks: f => f,
            defaultCurrentPage: 1,
            preStatus: '',
            rules: validRules,
        };
    },
    computed: {
        ...mapGetters(['resource'])
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
        return (
            <el-row>
               {
                   (this.status === "list" || this.status === "tree") ? <div class="filter-container">
                        <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger"
                                   onClick={this.forceDelete}>
                            强制删除
                        </el-button>
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, defaultFormData);
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
                    </div> : ""
               }
                {
                    this.status === "tree" ? this.treeHtml(h) : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'resource/RefreshPage'} data={this.resource.page}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule}
                                                     handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
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
                    v-loading={this.submitLoading || this.loading}
                    data={(this.resource && this.resource.treeList.children) || []}
                    props={{
                        children: 'children',
                        label: 'label'
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
                                this.preStatus = "tree";
                            }}/>
                            <i class="el-icon-plus" style={{margin: '0 .5rem'}} onClick={() => {
                                this.formData = Object.assign({id: data.id}, defaultFormData);
                                this.status = "add";
                                this.preStatus = "tree";
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
                    <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="70px">
                        <el-form-item label="父级" prop="pid">
                             <el-select placeholder={(!this.formData.pid && this.status === "edit") ? "根目录" : "请选择"} value={this.formData.pid} name='pid' disabled={this.status !== 'add'}>
                                 {
                                     listTree(this.resource.treeList).map(item => (
                                         <el-option label={item.name} value={item.id} key={item.id}/>
                                     ))
                                 }
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名称" prop="name">
                            <el-input value={this.formData.name} name='name'/>
                        </el-form-item>
                        <el-form-item label="权限" prop="permission">
                            <el-input value={this.formData.permission} name='permission' disabled={this.status !== 'add'}/>
                        </el-form-item>
                        <el-form-item label="url" prop="url">
                            <el-input value={this.formData.url} name='url'/>
                        </el-form-item>
                        <el-form-item label="状态" prop="status">
                            <el-select placeholder="请选择" value={this.formData.status} name='status'>
                                <el-option label="未启用" value={0} key={0}/>
                                <el-option label="启用" value={1} key={1}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="排序" prop="seq">
                            <el-input value={this.formData.seq} name='seq'/>
                        </el-form-item>
                        <el-form-item label="描述" prop="description">
                            <el-input value={this.formData.description} name='description'/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={this.doReturn}>取消
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
                    if (this.formData.status === "未启用") this.formData.status = 0;
                    resouceModify(this.formData).then(res => {
                        this.$message({
                            message: this.status === 'add' ? "添加成功" : "修改成功",
                            type: "success"
                        });
                        this.refreshTree();
                        this.$refs.Vtable && this.$refs.Vtable.refreshData({
                            currentPage: this.defaultCurrentPage
                        });
                        this.submitLoading = false;
                        this.doReturn();
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
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const userId = row.id;
            this.sureCallbacks = () => {
                resourceDelete(userId).then(response => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.refreshTree();
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.dialogVisible = false;
                });
            };
        },

        refreshTree() {
            this.loading = true;
            this.$store.dispatch("resource/tree", {rootId: null}).then((res) => {
                this.treeData = res;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },

        /**
         * 重置密码
         */
        forceDelete: function () {
            this.dialogVisible = true;
            this.tipTxt = "确定要强制删除吗？";
            this.sureCallbacks = () => {
                resourceForceDelete(this.selectItems[0]['id']).then(res => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                });
            };
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

        doReturn: function () {
            if (this.preStatus) {
                this.status = this.preStatus;
                this.preStatus = '';
            } else {
                this.status = 'list';
            }
        }
    }
};

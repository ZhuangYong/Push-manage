import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    checkLoginName, createUser, deleteUser, getRoleList, resetPassword, roleModify, superAdminApi,
    updateUser
} from "../../api/user";
import {getUserType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {add as addPage, edit as editPage, del as delPage} from '../../api/pageBuild';

const viewRule = [
    {columnKey: 'versionName', label: '版本名称', minWidth: 220},
    {columnKey: 'status', label: '状态', formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }},
    {columnKey: 'remark', label: '备注信息', minWidth: 120},
    {columnKey: 'createName', label: '创建人'},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultAddData = {
    screenIds: []
};
const validRules = {
    versionName: [
        {required: true, message: '请输入版本名称', trigger: 'blur'},
        {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
    ]
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            addData: defaultAddData, // 表单数据
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
        };
    },
    computed: {
        ...mapGetters(['epgMange'])
    },
    created() {
        this.loading = true;
        this.$store.dispatch("screen/list").then((res) => {
            this.loading = false;
        }).catch(err => {
            this.loading = false;
        });
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.addData.screenIds = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'buildPage/RefreshPage'} data={this.epgMange.epgPage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule}
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

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <div>
                     {
                         this.status === 'add' ? <el-row>
                             <el-col xs={24} sm={12}>
                                <el-card class="box-card" style="margin: .5rem;">
                                    <div slot="header" class="clearfix">
                                        <span>选择模板：</span>
                                    </div>
                                    <div key={JSON.stringify(this.addData.screenIds)}>
                                        {
                                            this.epgMange.screenList && this.epgMange.screenList.map(screen => (
                                                <el-checkbox checked={!!this.addData.screenIds.find(_id => _id === screen.id)} style="min-width: 7rem; margin: .5rem 0; float: left; " label={screen.id} onChange={(e) => {
                                                    let {value, checked} = e.target;
                                                    value = parseInt(value, 11);
                                                    if (checked) {
                                                        if (!this.addData.screenIds.find(v => v === value)) {
                                                            this.addData.screenIds.push(value);
                                                        }
                                                    } else {
                                                        this.addData.screenIds = this.addData.screenIds.filter(v => v !== value);
                                                    }
                                                }}>
                                                    {screen.name}
                                               </el-checkbox>
                                            ))
                                        }
                                   </div>
                                </el-card>
                            </el-col>

                            <el-col xs={24} sm={12}>
                                <el-card class="box-card" style="margin: .5rem;">
                                    <div slot="header" class="clearfix">
                                        <span>排序后的顺序：</span>
                                    </div>
                                    <div class="text item">
                                        {
                                            this.addData.screenIds && this.addData.screenIds.map((id, index) => (
                                                <el-tag
                                                    closable
                                                    disable-transitions="false"
                                                    style="color: black; background-color: white; margin: .5rem; border: 1px solid gray;"
                                                    onClose={f => {
                                                        this.addData.screenIds = this.addData.screenIds.filter(_id => _id !== id);
                                                    }}
                                                >
                                                    {index + 1}.
                                                    {(this.epgMange.screenList.find(s => s.id === id) || {}).name || ""}
                                                </el-tag>
                                            ))
                                        }
                                    </div>
                                </el-card>
                            </el-col>
                         </el-row> : <el-row>
                             <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                      ref="addForm" rules={this.rules} label-position="right" label-width="70px">
                                <el-form-item label="版本名称" prop="versionName">
                                    <el-input value={this.formData.versionName} name='versionName'/>
                                </el-form-item>
                                <el-form-item label="Json Data" prop="data">
                                    <el-input value={this.formData.data} name='data' disabled={true}/>
                                </el-form-item>
                                <el-form-item label="备注信息" prop="remark">
                                    <el-input value={this.formData.remark} name='remark'/>
                                </el-form-item>
                            </el-form>
                         </el-row>
                     }
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.status = "list";
                        }
                    }>取消
                    </el-button>
                </div>
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.submitLoading = true;
            if (this.status === 'edit') {
                editPage(this.formData).then(res => {
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.submitLoading = false;
                    this.status = 'list';
                }).catch(err => {
                    this.submitLoading = false;
                });
            } else if (this.status === 'add') {
                addPage(this.addData).then(res => {
                    this.$message({
                        message: "添加成功",
                        type: "success"
                    });
                    this.submitLoading = false;
                    this.status = 'list';
                }).catch(err => {
                    this.submitLoading = false;
                });
            }
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
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                delPage(id).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
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
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        }
    }
};

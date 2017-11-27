import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    checkLoginName, createUser, deleteUser, getRoleList, resetPassword, roleModify, superAdminApi,
    updateUser
} from "../../api/user";
import {getUserType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'channelName', label: '渠道名称', minWidth: 140},
    {columnKey: 'remark', label: '备注'},
    {columnKey: 'status', label: '状态'},
    {columnKey: 'epgVersionName', label: '首页生成版本名称'},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultFormData = {
    loginName: '',
    password: '',
    userName: '',
    type: 1
};
const validRules = {
    loginName: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                checkLoginName(value).then(response => {
                    return response.result === false ? callback(new Error('此名已被占用')) : callback();
                });
            }, trigger: 'blur'
        },
    ],
    password: [
        {required: true, message: '请输入6-16位密码', trigger: 'blur'},
        {min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur'}
    ],
    userName: [
        {required: true, message: '请输入2-16昵称', trigger: 'blur'},
        {min: 2, max: 16, message: '请输入2-16昵称', trigger: 'blur'}
    ]
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            formData: defaultFormData, // 表单数据
            roleData: {},
            roles: [],
            owned: [],
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
        this.refreshChanel();
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
                    this.status === "list" ? <div class="filter-container">
                        {
                            <el-button class="filter-item" plain disabled={this.selectItems.length !== 1} onClick={this.superAdmin}>
                                授予/取消超级管理员
                            </el-button>
                        }
                        <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger"
                                   onClick={this.resetPassword}>
                            重置密码
                        </el-button>
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = defaultFormData;
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'publish/RefreshPage'} data={this.epgMange.publishPage}
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

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="left" label-width="70px">
                    <el-form-item>
                        <el-select placeholder={(!this.formData.pid && this.status === "edit") ? "根目录" : "请选择"} value={this.formData.pid} name='pid' disabled={this.status !== 'add'}>
                                 <el-option label={'根目录'} value="" key=""/>
                            {

                            }
                            </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit') {
                        updateUser(this.formData).then(res => {//修改用户
                            roleModify({id: this.formData.id, newIds: this.owned}).then(json => {
                                this.$message({
                                    message: "修改成功",
                                    type: "success"
                                });
                                this.submitLoading = false;
                                this.status = 'list';
                            }).catch(err => {
                                this.submitLoading = false;
                            });
                        });
                    } else if (this.status === 'add') {
                        createUser(this.formData).then(response => {
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
                } else {
                    return false;
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
                this.dialogVisible = false;
                deleteUser(userId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("fun/chanelList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
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
                            this.loading = true;
                            getRoleList(row['id']).then(response => {//获取角列表
                                this.owned = response.owned;
                                this.roles = response.data;
                                this.loading = false;
                            }).catch(() => {
                                this.loading = false;
                            });
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
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        }
    }
};

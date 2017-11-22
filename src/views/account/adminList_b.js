import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    checkLoginName, createUser, deleteUser, resetPassword, roleModify, superAdminApi,
    updateUser
} from "../../api/user";
import {getUserType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'userName', label: '用户名', width: 140},
    {columnKey: 'loginName', label: '登录名'},
    {columnKey: 'type', label: '类型'},
    {columnKey: 'createTime', label: '创建日期', width: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], width: 120}
];
const defaultFormData = {
    loginName: '',
    password: '',
    userName: '',
    type: '1'
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false,
            selectItems: [],
            formData: defaultFormData,
            roleData: {},
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: {
                loginName: [
                    {validator: (rule, value, callback) => {
                        if (!value) return callback(new Error('请输入用户名'));
                        checkLoginName(value).then(response => {
                            if (response.result === false) {
                                return callback(new Error('此名已被占用'));
                            } else {
                                return callback();
                            }
                        });
                    }, trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '请输入6-16位密码', trigger: 'blur'},
                    {min: 6, max: 16, message: '请输入6-16位密码', trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请输入2-16昵称', trigger: 'blur'},
                    {min: 2, max: 16, message: '请输入2-16昵称', trigger: 'blur'}
                ]
            },
        };
    },
    computed: {
        ...mapGetters(['userList'])
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
                        <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger" onClick={this.resetPassword}>
                            重置密码
                        </el-button>
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'user/RefreshPage'} data={this.userList} defaultCurrentPage={this.defaultCurrentPage} select={true} viewRule={viewRule} handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
                }
                <ConfirmDialog visible={this.dialogVisible} tipTxt={this.tipTxt} handelSure={this.sureCallbacks} handelCancel={() => {
                    this.dialogVisible = false;
                }}/>
            </el-row>
        );
    },
    methods: {
        cruHtml: function(h) {
            return (
                <el-form v-loading={this.submitLoading} class="small-space" model={this.formData} ref="addForm" rules={this.rules} label-position="left" label-width="70px">
                    <el-form-item label="登录名" prop={this.status === 'add' ? "loginName" : ""}>
                        <el-input value={this.formData.loginName} name='loginName'/>
                    </el-form-item>
                    {
                        this.status === 'add' ? <el-form-item label="密码" prop="password">
                            <el-input value={this.formData.password} type="password" name='password'/>
                        </el-form-item> : ""
                    }
                    <el-form-item label="昵称" prop="userName">
                        <el-input value={this.formData.userName} name='userName'/>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type'>
                            {
                                getUserType().map(userType => (
                                    <el-option
                                        key={userType.value}
                                        label={userType.label}
                                        value={userType.value}
                                        onClick={
                                            () => {
                                                console.log(1111);
                                                this.formData.type = userType.value;
                                            }
                                        }>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAdd}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消</el-button>
                    </el-form-item>
                </el-form>
            );
        },

        submitAdd: function() {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit') {
                        updateUser(this.formData).then(res => {//修改用户
                            roleModify(this.roleData).then(json => {
                                this.$message({
                                    message: "修改成功",
                                    type: "success"
                                });
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
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const userId = row.id;
            this.sureCallbacks = () => {
                deleteUser(userId).then(response => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.dialogVisible = false;
                });
            };
        },

        resetPassword: function() {
            this.dialogVisible = true;
            this.tipTxt = "确定要重置密码为初始密码吗？";
            this.sureCallbacks = () => {
                resetPassword(this.selectItems[0]['id']).then(res => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "重置成功",
                        type: "success"
                    });
                });
            };
        },
        superAdmin: function() {
            superAdminApi(this.selectItems[0]['id']).then(res => {
                this.$message({
                    message: "授权/取消成功",
                    type: 'success'
                });
            });
        },
        updateView: function() {
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
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        }
    }
};

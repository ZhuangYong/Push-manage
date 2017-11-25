import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    checkLoginName, createUser, deleteUser, getRoleList, resetPassword, roleModify, superAdminApi,
    updateUser
} from "../../api/user";
import {getUserType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'name', label: '名称', minWidth: 140},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultFormData = {
};
const validRules = {
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
        ...mapGetters(['functions'])
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        console.log(this.functions);
        return (
            <el-row>
                {

                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'function/RefreshPage'} data={this.functions.page}
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
                    <el-form-item label="登录名" prop={this.status === 'add' ? "loginName" : ""}>
                        <el-input value={this.formData.loginName} name='loginName' disabled={this.status !== 'add'}/>
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
                                        value={userType.value}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    {
                        (!this.loading && this.status === "edit") ? <el-form-item label="类型" prop="role">
                            {
                                this.roles.map(role => (
                                    <el-checkbox label={role.id} checked={this.owned.indexOf(role.id) >= 0} onChange={(e) => {
                                        let {value, checked} = e.target;
                                        value = (parseInt(value, 10));
                                        if (checked) {
                                            if (this.owned.indexOf(role.id) < 0) {
                                                this.owned.push(value);
                                            }
                                        } else {
                                            this.owned = this.owned.filter(id => {
                                                return id !== value;
                                            });
                                        }
                                    }}>
                                        {role.roleName}
                                    </el-checkbox>
                                ))
                            }
                        </el-form-item> : ""
                    }
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

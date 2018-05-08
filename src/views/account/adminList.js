import {mapGetters} from "vuex";
import {
    checkLoginName,
    createUser,
    getRoleList,
    resetPassword,
    roleModify,
    superAdminApi,
    updateUser,
    deleteUser, userManufacturerList, userSalesList
} from "../../api/user";
import BaseListView from "../../components/common/BaseListView";
import md5 from "md5";
import {getUserType} from "../../utils";
import JSelect from "../../components/select/select";
import Const from "../../utils/const";
import JPanel from "../../components/panel/JPanel";

const defaultData = {
    defaultFormData: {
        loginName: '',
        password: '',
        userName: '',
        type: 1,
        viewUuid: ''
    },
    viewRule: [
        {columnKey: 'userName', label: '用户名', minWidth: 140, sortable: true},
        {columnKey: 'loginName', label: '登录名', minWidth: 140, sortable: true},
        {columnKey: 'superFlag', label: '超级管理员', minWidth: 140, sortable: true, formatter: r => {
            if (r.superFlag === 1) return '是';
            return '否';
        }},
        // {columnKey: 'type', label: '类型', formatter: r => {
        //     if (r.type === 1) return '金麦客';
        //     if (r.type === 2) return '销售方';
        //     if (r.type === 3) return '渠道方';
        // }},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit', role: Const.ACCOUNT.ACCOUNT_EDIT}, {label: '删除', type: 'del', role: Const.ACCOUNT.ACCOUNT_DELETE}], minWidth: 144}
    ],
    validRules: {
        loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {
                validator: (rule, value, callback) => {
                    if (value.length >= 3 && value.length <= 20 && (/[0-9a-zA-Z]+[!@#$]*$/).test(value)) {
                        checkLoginName({loginName: value}).then(response => {
                            return response.result === false ? callback(new Error('此名已被占用')) : callback();
                        });
                    } else if (value.length < 3 || value.length > 20) {
                        callback(new Error('请输入3-20位字符'));
                    } else if (!(/[0-9a-zA-Z]+[!@#$]*$/).test(value)) {
                        callback(new Error('请输入合法特殊符号'));
                    }
                }, trigger: 'blur'
            },
        ],
        password: [
            {required: true, message: '请输入6-16位密码', trigger: 'blur'},
            {
                validator: (rule, value, callback) => {
                    if (value.length >= 6 && value.length <= 16 && (/[0-9a-zA-Z]+[!@#$]*$/).test(value)) {
                        callback();
                    } else if (value.length < 6 || value.length > 16) {
                        callback(new Error('请输入6-16位密码'));
                    } else if (!(/[0-9a-zA-Z]+[!@#$]*$/).test(value)) {
                        callback(new Error('请输入合法特殊符号'));
                    }
                }, trigger: 'blur'
            },
        ],
        userName: [
            {required: true, message: '请输入2-16昵称', trigger: 'blur'},
            {min: 2, max: 16, message: '请输入2-16昵称', trigger: 'blur'}
        ]
    },
    pageActionSearch: [
        {column: 'userName', label: '请输入用户名', type: 'input', value: ''},
        {
            column: 'type', label: '请选择类型', type: 'option', value: '', options: [
                {value: Const.USER_TYPE_JMAKE, label: '金麦客'},
                {value: Const.USER_TYPE_SALES, label: '销售方'},
                {value: Const.USER_TYPE_MANUFACTURER, label: '渠道方'},
            ]
        },
    ],
};
export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            roleData: {},
            roles: [],
            owned: [],
            selectItems: [], // 选择列
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            viewRule: _defaultData.viewRule,
            validRules: _defaultData.validRules,
            pageActionSearch: _defaultData.pageActionSearch,
            manufacturerList: [],
            userSalesList: [],
            listDataGetter: function() {
                return this.userList;
            },
            tableCanSelect: true,
            pageAction: 'user/RefreshPage',
            editFun: updateUser,
            delItemFun: deleteUser
        };
    },
    computed: {
        ...mapGetters(['userList'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <JPanel title={`${this.formData.id ? "修改" : "添加"}账号`}>
                    <el-form class="small-space" model={this.formData}
                             ref="addForm" rules={this.validRules} label-position="right" label-width="90px">
                        <el-form-item label="登录名：" prop={this.currentPage === this.PAGE_ADD ? "loginName" : ""}>
                            <el-input value={this.formData.loginName} name='loginName' disabled={this.currentPage !== this.PAGE_ADD}/>
                        </el-form-item>
                        {
                            this.currentPage === this.PAGE_ADD ? <el-form-item label="密码：" prop="password">
                                <el-input value={this.formData.password} type="password" name='password'/>
                            </el-form-item> : ""
                        }
                        <el-form-item label="昵称：" prop="userName">
                            <el-input value={this.formData.userName} name='userName'/>
                        </el-form-item>

                        {
                            this.superRoles() && ((!this.loading && this.currentPage === this.PAGE_EDIT) ? <el-form-item label="类型：" prop="type">
                                <JSelect placeholder="请选择" value={this.formData.type} vModel="type" options={getUserType()}/>
                            </el-form-item> : "")
                        }

                        {
                            (!this.loading && this.currentPage === this.PAGE_EDIT && this.formData.type === 2) ? <el-form-item label="销售方：" prop="viewUuid">
                                <JSelect placeholder="请选择" vModel="viewUuid" value={this.formData.viewUuid} options={this.userSalesList.map(item => {return {label: item.name, value: item.uuid};})}/>
                            </el-form-item> : ""
                        }

                        {
                            (!this.loading && this.currentPage === this.PAGE_EDIT && this.formData.type === 3) ? <el-form-item label="渠道方：" prop="viewUuid">
                                <JSelect placeholder="请选择" vModel="viewUuid" value={this.formData.viewUuid} options={this.manufacturerList.map(item => {return {label: item.name, value: item.uuid};})}/>
                            </el-form-item> : ""
                        }

                        {
                            (!this.loading && this.currentPage === this.PAGE_EDIT) ? <el-form-item label="系统角色：" prop="role">
                                {
                                    this.roles.map(role => (
                                        <el-checkbox label={role.id} checked={this.owned.indexOf(role.id) >= 0} onChange={checked => {
                                            if (checked) {
                                                if (this.owned.indexOf(role.id) < 0) {
                                                    this.owned.push(role.id);
                                                }
                                            } else {
                                                this.owned = this.owned.filter(id => {
                                                    return id !== role.id;
                                                });
                                            }
                                        }} style="margin-left: 0; margin-right: 30px;">
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
                                    this.pageBack();
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </JPanel>
            );
        },

        topButtonHtml: function (h) {
            const superMan = this.selectItems[0] && this.selectItems[0].superFlag;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        this.hasRole(Const.ACCOUNT.ACCOUNT_SUPER_MANAGE_TOGGLE) && (this.selectItems.length === 1 ? <el-button class="filter-item" plain disabled={this.selectItems.length !== 1} onClick={this.superAdmin}>
                            {
                                superMan ? '取消超级管理员' : '授予超级管理员'
                            }
                        </el-button> : <el-button class="filter-item" plain disabled={true} onClick={this.superAdmin}>
                                    授予/取消超级管理员
                        </el-button>)
                    }
                    {
                        this.hasRole(Const.ACCOUNT.ACCOUNT_RESET_PWD) && <el-button class="filter-item" disabled={this.selectItems.length !== 1} type="danger"
                                                                                              onClick={this.resetPassword}>
                            重置密码
                        </el-button>
                    }

                    {
                        this.hasRole(Const.ACCOUNT.ACCOUNT_ADD) ? <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, this.defaultFormData);
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button> : ""
                    }
                </div> : ""
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.currentPage === this.PAGE_EDIT) {
                        updateUser(this.formData)
                            .then(res => {//修改用户
                                roleModify({id: this.formData.id, newIds: this.owned});
                            })
                            .then(json => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.pageBack();
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    } else if (this.currentPage === this.PAGE_ADD) {
                        createUser(Object.assign({}, this.formData, {password: md5(this.formData.password)})).then(response => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.pageBack();
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
         * 重置密码
         */
        resetPassword: function () {
            this.dialogVisible = true;
            this.tipTxt = "确定要重置密码为初始密码吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                resetPassword(this.selectItems[0]['id']).then(res => {
                    this.$message({
                        message: "重置成功",
                        type: "success"
                    });
                    this.submitLoading = false;
                }).catch(e => this.submitLoading = false);
            };
        },

        /**
         * toggle 超级管理员权限
         */
        superAdmin: function () {
            superAdminApi(this.selectItems[0]['id']).then(res => {
                this.$message({
                    message: "操作成功",
                    type: 'success'
                });
                this.refreshTable();
            });
        },

        /**
         * 修改管理员账号
         * @param row
         */
        async handelEdit(row) {
            this.formData = row;
            if (!this.superRoles()) this.formData.type = this.user.type;
            this.goPage(this.PAGE_EDIT);
            this.loading = true;
            await getRoleList(row['id']).then(response => {//获取角列表
                this.owned = response.owned;
                this.roles = response.data;
            });
            await userManufacturerList(row['uuid']).then(response => {
                this.manufacturerList = response || [];
            });
            await userSalesList(row['uuid']).then(response => {
                this.userSalesList = response || [];
            });
            this.loading = false;
        },
    }
});

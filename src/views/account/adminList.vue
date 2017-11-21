<template>
    <div>
        <div v-if="flag">
            <div class="filter-container">
                <el-button class="filter-item" style="margin-left: 10px;" plain @click="superAdmin"
                          >授予/取消超级管理员
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger" @click="resetPassword"
                           >重置密码
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="addUserInfo = true " type="primary"
                           icon="edit">添加
                </el-button>
            </div>

            <Tabletemp :field="field" :dataList="dataList" :operField="operField" @deleteInfo="deleteInfo"
                       @modifyInfo="modifyInfo" @handleRowClick="handleRowClick"></Tabletemp>
            <Pager :totalRow="totalRow" :listParam="listParam" @updateData="updateData"></Pager>
        </div>
        <el-dialog title="添加信息" :visible.sync="addUserInfo">
            <el-form class="small-space" :model="addForm" ref="addForm" :rules="rules" label-position="left"
                     label-width="70px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item label="登录名" prop="loginName">
                    <el-input v-model="addForm.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="userName">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择">
                        <el-option
                            v-for="item in userType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAdd('addForm')">提交</el-button>
                    <el-button @click="addUserInfo = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑信息" :visible.sync="editUserInfo">
            <el-form :model="editForm" label-width="100px" :rules="rules">
                <el-form-item label="id:">
                    <span> {{ editForm.id }}</span>
                </el-form-item>
                <el-form-item label="登录名:">
                    <el-input v-model="editForm.loginName" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="昵称:">
                    <el-input v-model="editForm.userName" auto-complete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型:">
                    <el-select v-model="editForm.type" placeholder="请选择">
                        <el-option
                            v-for="item in userType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色:">
                    <el-checkbox-group
                        v-model="owned">
                        <el-checkbox v-for="role in roles" :key="role.id" :label="role.id">
                            {{ role.roleName }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editUserInfo = false">取 消</el-button>
                <el-button type="primary" @click="sumbitModify">确 定</el-button>
            </div>
        </el-dialog>
        <ConfirmDialog :dialogVisible="dialogVisibles" :tipTxt="tipTxts" :sureCallback="sureCallbacks"
                       @cancelConfirm="cancelConfirm"></ConfirmDialog>
    </div>
</template>
<script>
    import {getUserType} from 'utils/index';
    import Tabletemp from 'components/table/views';
    import Pager from 'components/pager';
    import ConfirmDialog from 'components/confirm';
    import {
        getUserList,
        checkLoginName,
        createUser,
        deleteUser,
        resetPassword,
        getRoleList,
        updateUser,
        roleModify,
        superAdminApi
    } from 'api/user';
    import md5 from 'md5';
    export default {
        name: 'layout',
        components: {
            Tabletemp,
            Pager,
            ConfirmDialog
        },
        data() {
            var checkLogin = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('登录名不能为空'));
                }
                checkLoginName(value).then(response => {
                    var data = response;
                    if (data.result === false) {
                        return callback(new Error('此名已被占用'));
                    }


                });
            };
            return {
                id: '', //只有选中一行时用到这个
                field: [
                    "id",
                    "loginName",
                    "type",
                    "userName"
                ],
                operField: [
                    {
                        name: "编辑",
                        fn: "modifyInfo",
                        type: "success"
                    },
                    {
                        name: "删除",
                        fn: "deleteInfo",
                        type: "danger"
                    }
                ],
                dataList: [],
                listParam: {
                    currentPage: 1,
                    pageSize: 10
                },
                totalRow: 0,
                flag: false,
                addUserInfo: false,
                userType: [],
                addForm: {
                    loginName: '',
                    password: '',
                    userName: '',
                    type: '1'
                },
                rules: {
                    loginName: [
                        {validator: checkLogin, trigger: 'blur'},
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
                editUserInfo: false,
                editForm: {
                    owned: [],
                    roles: []
                },
                owned: [],
                roles: [],
                dialogVisibles: false,
                tipTxts: '',
                sureCallbacks: function () {
                }

            };
        },
        created() {
            this.getDataList(this.listParam);
            console.log("哈哈哈哈");
        },
        methods: {
            getDataList(postData) {
                getUserList(postData).then(response => {
                    var data = response.data;
                    this.dataList = response.data;
                    this.totalRow = response.totalRow;
                    this.userType = getUserType();
                    this.flag = true;

                });
            },
            updateData(msg) {
                this.listParam = msg;
                this.getDataList(this.listParam);
                this.id = '';
            },
            submitAdd(formName) {
                var postData = {
                    userName: this.addForm.userName,
                    password: md5(this.addForm.password),
                    type: this.addForm.type,
                    loginName: this.addForm.loginName
                };
                createUser(postData).then(response => {
                    this.$message({
                        message: "添加成功",
                        type: "success"
                    });
                    this.addUserInfo = false;
                    this.getDataList(this.listParam);
                });
            },
            deleteInfo(row) {
                this.dialogVisibles = true;
                this.tipTxts = "确定要删除吗？";
                const userId = row.id;
                const getData = this.getDataList;
                const listParams = this.listParam;
                this.sureCallbacks = function () {
                    deleteUser(userId).then(response => {
                        getData(listParams);
                        this.dialogVisibles = false;
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    });
                };
            },
            modifyInfo(row) {
                this.editForm = row;
                getRoleList(row.id).then(response => {//获取角列表
                    this.owned = response.owned;
                    this.roles = response.data;
                    this.editUserInfo = true;
                });

            },
            sumbitModify() {
                const postData = {
                    id: this.editForm.id,
                    userName: this.editForm.userName,
                    type: this.editForm.type
                };
                const roleData = {
                    id: this.editForm.id,
                    newIds: this.owned
                };
                updateUser(postData).then(res => {//修改用户
                    roleModify(roleData).then(json => {
                        this.$message({
                            message: "修改成功",
                            type: "success"
                        });
                        this.editUserInfo = false;
                        this.getDataList(this.listParam);
                    });
                });

            },
            resetPassword() {
                if (this.id === '') {
                    this.$message({
                        message: "请先选择行"
                    });
                    return false;

                }
                this.dialogVisibles = true;
                this.tipTxts = "确定要重置密码为初始密码吗？";
                const userId = this.id;
                this.sureCallbacks = function () {
                    resetPassword(userId).then(res => {
                        this.dialogVisibles = false;
                        this.$message({
                            message: "重置成功",
                            type: "success"
                        });
                    });
                };
            },
            cancelConfirm() {
                this.dialogVisibles = false;
            },
            handleRowClick(row) {
                this.id = row.id;
            },
            superAdmin() {
                if (this.id === '') {
                    this.$message({
                        message: "请先选择行"
                    });
                    return false;

                }
                superAdminApi(this.id).then(res => {
                    this.$message({
                        message: "授权/取消成功",
                        type: 'success'
                    });
                });
            }


        }

    };
</script>
<style>
    .filter-container {
        padding-top: 20px;
    }
</style>

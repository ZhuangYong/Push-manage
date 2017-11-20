<template>
    <div>
        <div class="filter-container">
            <el-button class="filter-item" style="margin-left: 10px;" type="danger" @click="forceDeleteRole"
                       >强制删除
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="addRole = true " type="primary"
                       icon="edit">添加
            </el-button>
        </div>

        <div v-if="flag">
            <Tabletemp :field="field" :dataList="dataList" :operField="operField"
                       @handleRowClick="handleRowClick" @deleteInfo="deleteInfo" @modifyInfo="modifyInfo"></Tabletemp>
            <Pager :totalRow="totalRow" :listParam="listParam" @updateData="updateData"></Pager>
        </div>

        <el-dialog title="添加信息" :visible.sync="addRole">
            <el-form class="small-space" :model="addForm" ref="addForm" :rules="rules" label-position="left"
                     label-width="70px"
                     style='width: 400px; margin-left:50px;'>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="角色名" prop="roleName">
                    <el-input v-model="addForm.roleName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitAdd('addForm')">提交</el-button>
                    <el-button @click="addRole = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑信息" :visible.sync="editRole" >
            <el-form :model="editForm" label-width="100px" :rules="rules">
                <el-form-item label="id:">
                    <span> {{ editForm.id }}</span>
                </el-form-item>
                <el-form-item label="角色名:">
                    <el-input v-model="editForm.roleName" auto-complete="off" size="small"></el-input>
                </el-form-item>
                <el-form-item label="描述:">
                    <el-input v-model="editForm.description" auto-complete="off" size="small"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editRole = false">取 消</el-button>
                <el-button type="primary" @click="sumbitModify">确 定</el-button>
            </div>
        </el-dialog>
        <ConfirmDialog :dialogVisible="dialogVisibles" :tipTxt="tipTxts" :sureCallback="sureCallbacks"
                       @cancelConfirm="cancelConfirm"></ConfirmDialog>
    </div>
</template>
<script>
    import Tabletemp from 'components/table';
    import Pager from 'components/pager';
    import ConfirmDialog from 'components/confirm';
    import {
        getRoleList,
        deleteRole,
        modifyRole,
        forceDelete
    } from 'api/role';
    export default {
        name: 'layout',
        components: {
            Tabletemp,
            Pager,
            ConfirmDialog
        },
        data() {
            return {
                id: '', //只有选中一行时用到这个
                field: [
                    "id",
                    "roleName",
                    "description",
                    "createUser",
                    "createTime"
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
                dialogVisibles: false,
                tipTxts: '',
                sureCallbacks: function () {
                },
                addRole: false,
                addForm: {
                    id: '',
                    description: '',
                    roleName: ''
                },
                rules: {
                    description: [
                        {required: true, message: '描述不能为空', trigger: 'blur'},
                        {min: 1, max: 16, message: '描述不能为空', trigger: 'blur'}
                    ],
                    roleName: [
                        {required: true, message: '角色名不能为空', trigger: 'blur'},
                        {min: 1, max: 16, message: '角色名不能为空', trigger: 'blur'}
                    ]
                },
                editRole: false,
                editForm: {
                    id: '',
                    description: '',
                    roleName: ''
                }


            };
        },
        created() {
            this.getDataList(this.listParam);
        },
        methods: {
            getDataList(postData) {
                getRoleList(postData).then(response => {
                    var data = response.data;
                    this.dataList = response.data;
                    this.totalRow = response.totalRow;
                    this.flag = true;

                });
            },
            updateData(msg) {
                this.listParam = msg;
                this.getDataList(this.listParam);
                this.id = '';
            },
            deleteInfo(row) {
                this.dialogVisibles = true;
                this.tipTxts = "确定要删除吗？";
                const userId = row.id;
                const getData = this.getDataList;
                const listParams = this.listParam;
                this.sureCallbacks = function () {
                    deleteRole(userId).then(response => {
                        getData(listParams);
                        this.dialogVisibles = false;
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    });
                };
            },
            handleRowClick(row) {
                this.id = row.id;
            },
            forceDeleteRole() {
                if (this.id === '') {
                    this.$message({
                        message: "请先选择行"
                    });
                    return false;

                }
                this.dialogVisibles = true;
                this.tipTxts = "确定要强制删除吗？";
                const userId = this.id;
                const getData = this.getDataList;
                const listParams = this.listParam;
                this.sureCallbacks = function () {
                    forceDelete(userId).then(res => {
                        this.dialogVisibles = false;
                        getData(listParams);
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                    });
                };
            },
            cancelConfirm() {
                this.dialogVisibles = false;
            },
            submitAdd(formName) {
                var postData = {
                    description: this.addForm.description,
                    roleName: this.addForm.roleName
                };
                modifyRole(postData).then(response => {
                    this.$message({
                        message: "添加成功",
                        type: "success"
                    });
                    this.addRole = false;
                    this.getDataList(this.listParam);
                });
            },
            sumbitModify() {
                const postData = {
                    id: this.editForm.id,
                    roleName: this.editForm.roleName,
                    description: this.editForm.description
                };
                modifyRole(postData).then(res => {//修改用户
                    this.$message({
                        message: "修改成功",
                        type: "success"
                    });
                    this.editRole = false;
                    this.getDataList(this.listParam);
                });

            },
            modifyInfo(row) {
                this.editForm = row;
                this.editRole = true;
            }


        }

    };
</script>
<style>
    .filter-container {
        padding-top: 20px;
    }
</style>

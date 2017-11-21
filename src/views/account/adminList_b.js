import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {checkLoginName} from "../../api/user";

const viewRule = [
    {columnKey: 'userName', label: '用户名', width: 140},
    {columnKey: 'loginName', label: '登录名'},
    {columnKey: 'type', label: '类型'},
    {columnKey: 'createTime', label: '创建日期', width: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], width: 170}
];

export default {
    data() {
        return {
            status: "list",
            formData: {
                loginName: '',
                password: '',
                userName: '',
                type: '1'
            },
            rules: {
                loginName: [
                    {required: true, validator: (rule, value, callback) => {
                        checkLoginName(value).then(response => {
                            if (response.result === false) {
                                return callback(new Error('此名已被占用'));
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
    render(h) {
        return (
            <el-row>
                <div class="filter-container">
                    <el-button class="filter-item" style="margin-left: 10px;" plain onClick="superAdmin"
                            >授予/取消超级管理员
                            </el-button>
                            <el-button class="filter-item" style="margin-left: 10px;" type="danger" onClick="resetPassword"
                        >重置密码
                        </el-button>
                    <el-button class="filter-item" style="margin-left: 10px;" onClick={
                        () => {
                            this.status = "add";
                        }
                    } type="primary" icon="edit">添加</el-button>
                </div>
                {
                    this.status === "list" ? <Vtable pageAction={'user/RefreshPage'} data={this.userList} select={true} viewRule={viewRule} handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
                }

            </el-row>
        );
    },
    methods: {
        cruHtml: function(h) {
            return (
                <el-form class="small-space" model={this.formData} ref="addForm" rules={this.rules} label-position="left"
                         label-width="70px" style='width: 400px; margin-left:50px;'>
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
                                key="item.value"
                                label="item.label"
                                value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAdd('addForm')}>提交</el-button>
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

        },
        handleSelectionChange: function (selectedItems) {
            console.log(selectedItems);
        }
    }
};

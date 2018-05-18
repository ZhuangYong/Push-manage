/**
 * Created by Zed on 2018/1/19.
 */
import {mapGetters} from "vuex";
import {bindData} from '../../utils/index';
import {modifyPassword} from "../../api/user";
import md5 from "md5";
import Const from "../../utils/const";

const defaultData = {
    username: null,
    oldpwd: null,
    newpwd: null,
    checkNewpwd: null
};

const validRules = {
    username: [
        {required: true, message: '用户昵称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    oldpwd: [
        {required: true, message: '旧密码不能为空', trigger: 'blur'},
        {min: 6, max: 20, message: '请输入8-20位字符', trigger: 'blur'}
    ],
    newpwd: [
        {required: true, message: '新密码不能为空', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if (Const.VALID_PASSWORD.test(value)) {
                    callback();
                } else {
                    callback(new Error('请输入8-20位包含数字、大小写字母的密码'));
                }
                // else if (!validRule.test(value)) {
                //     callback(new Error('请输入合法特殊符号'));
                // }
            }, trigger: 'blur'
        },
    ]
};

const styles = {
    showPwd: {
        position: 'absolute',
        right: '10px',
        top: '7px',
        fontSize: '16px',
        color: '#889aa4',
        cursor: 'pointer'
    },
    item: {
        position: 'relative',
        width: "400px"
    }
};

export default {
    data() {
        const validPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.newpwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            submitLoading: false,
            formData: Object.assign({}, defaultData),
            rules: Object.assign({}, validRules, {
                checkNewpwd: [
                    {required: true, validator: validPwd, trigger: 'blur'}
                ]
            }),
            oldpwdType: 'password',
            newpwdType: 'password',
            checkNewpwdType: 'password'
        };
    },
    computed: {
        ...mapGetters(['user'])
    },
    mounted() {
        bindData(this, this.$refs.addForm);
        this.formData.username = this.user.name;
    },
    updated() {

    },
    render(h) {
        const {isInit} = this.user;
        const isShowCancel = !(parseInt(isInit, 10) === 1);
        return <el-form v-loading={this.submitLoading} class="small-space" model={this.formData}
                        ref="addForm" rules={this.rules} label-position="right" label-width="120px">

            <el-form-item label="用户昵称" prop="username" style={styles.item}>
                <el-input value={this.formData.username} name='username' placeholder="请输入新用户昵称"/>
            </el-form-item>
            <el-form-item label="旧密码" prop="oldpwd" style={styles.item}>
                <el-input type={this.oldpwdType} value={this.formData.oldpwd} name='oldpwd' placeholder="请输入旧密码"/>
                <span style={styles.showPwd} onClick={() => this.showPwd("oldpwdType")}><icon-svg icon-class="eye"/></span>
            </el-form-item>
            <el-form-item label="新密码" prop="newpwd" style={styles.item}>
                <el-input type={this.newpwdType} value={this.formData.newpwd} name='newpwd' placeholder="请输入新密码"/>
                <span style={styles.showPwd} onClick={() => this.showPwd("newpwdType")}><icon-svg icon-class="eye"/></span>
            </el-form-item>
            <el-form-item label="再次输入新密码" prop="checkNewpwd" style={styles.item}>
                <el-input type={this.checkNewpwdType} value={this.formData.checkNewpwd} name='checkNewpwd' placeholder="请再次输入新密码"/>
                <span style={styles.showPwd} onClick={() => this.showPwd("checkNewpwdType")}><icon-svg icon-class="eye"/></span>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" style={isShowCancel ? {} : {width: '280px'}} onClick={this.submit}>提交</el-button>
                {
                    isShowCancel && <el-button onClick={() => {
                        window.history.back();
                    }}>取消</el-button>
                }
            </el-form-item>
        </el-form>;
    },

    methods: {


        submit: function () {
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;

                    const params = {
                      username: this.formData.username,
                        oldpwd: md5(this.formData.oldpwd),
                        newpwd: md5(this.formData.newpwd),
                    };
                    modifyPassword(params).then(res => {
                        this.$message({
                            message: "操作成功，请重新登录！",
                            type: "success"
                        });
                        this.submitLoading = false;
                        this.logout();
                    }).catch(err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    });
                } else {
                    return false;
                }
            });
        },

        logout() {
            this.$store.dispatch('LogOut').then(() => {
                location.reload();// 为了重新实例化vue-router对象 避免bug
            });
        },

        showPwd(type) {
            if (this[type] === 'password') {
                this[type] = '';
            } else {
                this[type] = 'password';
            }
        }
    }
};

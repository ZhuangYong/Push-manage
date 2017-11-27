import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {
    upDelete,
    upAdd,
    upEdit,
    upSave,
    upSaveImg,
    upSearch
} from "../../api/upgrade";
import {getUpgradeType, bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';

const viewRule = [
    {columnKey: 'channelName', label: '机型'},
    {columnKey: 'name', label: '名称'},
    {columnKey: 'version', label: '版本号'},
    {columnKey: 'fileName', label: '文件', minWidth: 170, isLink: true},
    {columnKey: 'fileMd5', label: '文件MD5', minWidth: 170},
    {columnKey: 'forceUpdate', label: '强制升级', minWidth: 70, formatter: r => {
        if (r.status === 0) return '否';
        if (r.status === 1) return '是';
    }},
    {columnKey: 'createTime', label: '创建日期'},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultFormData = {
    type: 1,
    channelCode: '', //机型
    name: '', //名称
    version: '', //版本号
    fileUrl: '', //下载地址
    fileName: '', //文件名称
    fileSize: '', //文件大小
    fileMd5: '',
    forceUpdate: 1, //是否强制升级
    createTime: '',
    updateTime: ''
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '名称不能为空', trigger: 'blur'}
    ],
    version: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '版本号不能为空', trigger: 'blur'}
    ],
    fileOssUrl: [
        {required: true, message: '此处不能为空', trigger: 'blur'},
        {min: 1, max: 100, message: '此处不能为空', trigger: 'blur'}
    ]
};


export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            formData: defaultFormData, // 表单数据
            channelDefault: '',
            pageDefault: '',
            roles: [],
            owned: [],
            channleList: [],
            pageList: [],
            tipTxt: "",
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
            filters: {
                channelCode: '',
                type: ''
            },
            fileList: []
        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
        this.getChannelList();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row>
                {
                    this.status === "list" ? <div class="filter-container">
                        <el-form model={this.filters} inline ref="filterData">
                            <el-form-item label="">
                                <el-button class="filter-item" onClick={
                                    () => {
                                        this.status = "add";
                                        this.formData = Object.assign({}, defaultFormData);
                                    }
                                } type="primary" icon="edit">添加
                                </el-button>
                            </el-form-item>
                            <el-form-item label="" prop="channelCode">
                                <el-select placeholder="全部机型" value={this.filters.channelCode} name='channelCode'>
                                    {
                                        this.channelList && this.channelList.map(item => (
                                            <el-option
                                                key={item.id}
                                                label={item.name}
                                                value={item.code}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="type">
                                <el-select placeholder="全部类型" value={this.filters.type} name='type'>
                                    {
                                        getUpgradeType().map(item => (
                                            <el-option
                                                key={item.value}
                                                label={item.label}
                                                value={item.value}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" onClick={this.searchFilter}>搜索</el-button>
                            </el-form-item>
                        </el-form>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'upgrade/RefreshPage'} data={this.system.upgradeManage}
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
                         ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                    <el-form-item label="类型" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} name='type'>
                            {
                                getUpgradeType().map(item => (
                                    <el-option
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                    </el-form-item>
                    <el-form-item label="机型" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.channelList && this.channelList.map(item => (
                                    <el-option
                                        key={item.id}
                                        label={item.name}
                                        value={item.code}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="版本号" prop="version">
                        <el-input value={this.formData.version} name='version' placeholder="请输入版本号"/>
                    </el-form-item>
                    <el-form-item label="下载地址" prop="">
                        <el-upload
                            class="upload-demo"
                            action="http://192.168.1.138:8080/system/upgrade/saveImg"
                            limit={1}
                            file-list={this.fileList}
                            >
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文件下载地址" prop="fileUrl">
                        <el-input value={this.formData.fileUrl} name='fileUrl' placeholder="上传文件后自动生成或手动输入"/>
                    </el-form-item>
                    <el-form-item label="文件名" prop="fileName">
                        <el-input value={this.formData.fileName} name='fileName' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="文件大小" prop="fileSize">
                        <el-input value={this.formData.fileSize} name='fileSize' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="文件MD5值" prop="fileMd5">
                        <el-input value={this.formData.fileMd5} name='fileMd5' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="是否强制升级" prop="forceUpdate">
                        <el-select placeholder="请选择" value={this.formData.forceUpdate} name='forceUpdate'>
                            <el-option label="否" value={0} key={0}/>
                            <el-option label="是" value={1} key={1}/>
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
                    if (this.status === 'edit' || this.status === 'add') {
                        upSave(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
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
                upDelete(userId).then(response => {
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
         * 重置密码
         */
        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            console.log(row);
                            this.status = "edit";
                            this.loading = false;
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                        this.$refs.Vtable.$on('link', (row) => {
                            window.location.href = row.fileOssUrl;

                        });
                    }
                    bindData(this, this.$refs.filterData);
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
            });
        },
        searchFilter: function() {
            this.$refs.Vtable.refreshData({
                currentPage: 1,
                channelCode: this.filters.channelCode,
                type: this.filters.type,
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        }
    }
};

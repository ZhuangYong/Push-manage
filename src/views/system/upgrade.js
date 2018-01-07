import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {
    upDelete,
    upAdd,
    upEdit,
    upSave,
    upSaveImg,
    upSearch
} from "../../api/upgrade";
import {getUpgradeType, bindData} from '../../utils/index';
import {getToken} from '../../utils/auth';
import uploadApk from '../../components/Upload/singleApk.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";

const defaultData = {
    viewRule: [
        {columnKey: 'channelName', label: '机型名称', minWidth: 120, sortable: true},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120},
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'version', label: '版本号', minWidth: 120, sortable: true},
        {columnKey: 'fileName', label: '文件', minWidth: 170, formatter: (r, h) => {
            if (r.fileName) return (<a href={r.fileOssUrl}>{r.fileName}</a>);
            return '';
        }},
        {columnKey: 'fileMd5', label: '文件MD5', minWidth: 170},
        {columnKey: 'forceUpdate', label: '强制升级', minWidth: 100, formatter: r => {

            if (r.forceUpdate === 0) return '否';
            if (r.forceUpdate === 1) return '是';

        }},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者'},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}

    ],
    tableCanSelect: false,
    defaultFormData: {
        type: 1, //getUpgradeType函数获得，1app升级,2rom升级，3音效升级，4HDMI升级
        channelCode: '', //机型
        name: '', //名称
        version: '', //版本号
        fileUrl: '', //下载地址
        fileName: '', //文件名称
        fileSize: '', //文件大小
        fileMd5: '',
        forceUpdate: 1, //是否强制升级， 0否，1是
        createTime: '',
        updateTime: ''
    },
    listDataGetter: function() {
        return this.system.upgradeManage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {column: 'version', label: '请输入版本号', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'upgrade/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    version: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    fileOssUrl: [
        {required: true, message: '此处不能为空', trigger: 'blur'}
    ]
};

export default BaseListView.extend({
    components: {
        uploadApk
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            formData: _defaultData.defaultFormData,
            loading: false,
            submitLoading: false,
            rules: validRules,
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
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_UPGRADE_SAVE_IMG;
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
                    <el-form-item label="机型名称" prop="channelCode">
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
                        <span style={{display: this.formData.channelCode ? "inline-block" : "none", marginLeft: "10px", color: '#F56C6C'}}>{this.formData.channelCode}</span>
                    </el-form-item>

                    <el-form-item label="版本号" prop="version">
                        <el-input value={this.formData.version} name='version' placeholder="请输入版本号"/>
                    </el-form-item>
                    <el-form-item label="下载地址" prop="">
                        <uploadApk uploadSuccess={this.uploadSuccess} uploadFail={this.uploadFail} beforeUpload={this.beforeUpload} actionUrl={uploadImgApi}/>
                    </el-form-item>
                    <el-form-item label="文件下载地址" prop="fileUrl">
                        <el-input value={this.formData.fileUrl} name='fileUrl' placeholder="上传文件后自动生成" disabled={true}/>
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
                            <el-option label="是" value={1} key={2}/>
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
        topButtonHtml: function(h) {
            return (
                this.status === "list" ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    if (this.formData.forceUpdate === '否') this.formData.forceUpdate = 0;
                    if (this.formData.fileUrl && this.formData.fileUrl.indexOf(this.formData.channelCode) < 0) {
                        this.$message({
                            message: "文件类型出错",
                            type: "error"
                        });
                        return;
                    }
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
                            this.status = "edit";
                            this.loading = false;
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
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                defaultData.defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
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
        },
        uploadSuccess(data) {
            this.submitLoading = false;
            const {fileName, fileSize, filemd5, imgPath, versionName} = data;
            Object.assign(this.formData, {
                fileName: fileName,
                fileSize: fileSize,
                fileMd5: filemd5,
                fileUrl: imgPath,
                version: versionName
            });
        },

        beforeUpload() {
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                version: ""
            });
            this.submitLoading = true;
        },
        uploadFail(err) {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                version: ""
            });
            this.submitLoading = false;
        }
    }
});

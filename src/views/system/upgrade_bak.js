import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {upDelete, upSave} from "../../api/upgrade";
import {getUpgradeType} from '../../utils/index';
import uploadApk from '../../components/Upload/singleApk.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import JPanel from "../../components/panel/JPanel";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'channelName', label: '机型名称', minWidth: 180},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120, sortable: true},
        {columnKey: 'version', label: '版本号', minWidth: 120, sortable: true},
        {columnKey: 'versionCode', label: '版本code', inDetail: true},
        {columnKey: 'type', label: '类型', formatter: r => {
                if (r.type === 1) return "app升级";
                if (r.type === 2) return "rom升级";
                if (r.type === 3) return "音效升级";
                if (r.type === 4) return "HDMI升级";
            }},
        {columnKey: 'fileName', label: '文件', minWidth: 170, formatter: (r, h) => {
                if (r.fileName) return (<a href={r.fileOssUrl}>{r.fileName}</a>);
                return '';
            }},
        {columnKey: 'fileMd5', label: '文件MD5', minWidth: 170, inDetail: true},
        {columnKey: 'forceUpdate', label: '强制升级', minWidth: 100, formatter: r => {

                if (r.forceUpdate === 0) return '否';
                if (r.forceUpdate === 1) return '是';

            }},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}

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
        updateTime: '',
        remark: '',
        versionCode: '',
    },
    listDataGetter: function() {
        return this.system.upgradeManage;
    },
    pageActionSearch: [
        {column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []},
        {column: 'type', label: '请选升级类型', type: 'option', value: '', options: [
                {value: 1, label: 'app升级'},
                {value: 2, label: 'rom升级'},
                {value: 3, label: '音效升级'},
                {value: 4, label: 'HDMI升级'},
            ]},
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {column: 'version', label: '请输入版本号', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'upgrade/RefreshPage',
    editFun: upSave,
    delItemFun: upDelete
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
            fileList: [],
            editFun: _defaultData.editFun,
            delItemFun: _defaultData.delItemFun
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
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_UPGRADE_SAVE_IMG;
            return (
                <JPanel title={`${this.formData.id ? "修改" : "添加"}升级`}>
                    <el-form class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="120px">
                        <el-form-item label="类型：" prop="type">
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
                        <el-form-item label="名称：" prop="name">
                            <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                        </el-form-item>
                        <el-form-item label="机型：" prop="channelCode">
                            <el-select placeholder="请选择机型" value={this.formData.channelCode} name='channelCode' disabled={this.formData.id}>
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

                        <el-form-item label="版本号：" prop="version">
                            <el-input value={this.formData.version} name='version' placeholder="请输入版本号"/>
                        </el-form-item>
                        <el-form-item label="下载地址：" prop="">
                            <uploadApk uploadSuccess={this.uploadSuccess} uploadFail={this.uploadFail} beforeUpload={this.beforeUpload} handelEmpty={() => this.uploadApkIng = false} actionUrl={uploadImgApi}/>
                        </el-form-item>
                        <el-form-item label="文件下载地址：" prop="fileUrl">
                            <el-input value={this.formData.fileUrl} name='fileUrl' placeholder="上传文件后自动生成" disabled={true}/>
                        </el-form-item>
                        <el-form-item label="文件名：" prop="fileName">
                            <el-input value={this.formData.fileName} name='fileName' placeholder="上传文件后自动生成" disabled={true}/>
                        </el-form-item>
                        <el-form-item label="文件大小：" prop="fileSize">
                            <el-input value={this.formData.fileSize} name='fileSize' placeholder="上传文件后自动生成" disabled={true}/>
                        </el-form-item>
                        <el-form-item label="文件MD5值：" prop="fileMd5">
                            <el-input value={this.formData.fileMd5} name='fileMd5' placeholder="上传文件后自动生成" disabled={true}/>
                        </el-form-item>
                        <el-form-item label="版本code：" prop="versionCode">
                            <el-input value={this.formData.versionCode} name='versionCode' placeholder="上传文件后自动生成" disabled={true}/>
                        </el-form-item>
                        <el-form-item label="是否强制升级：" prop="forceUpdate">
                            <el-select placeholder="请选择" value={this.formData.forceUpdate} onHandleOptionClick={f => this.formData.forceUpdate = f.value}>
                                <el-option label="否" value={0} key={0}/>
                                <el-option label="是" value={1} key={2}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input type="textarea" row={4} value={this.formData.remark} placeholder="" name="remark"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" loading={this.uploadApkIng} disabled={this.uploadApkIng} onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={
                                () => {
                                    this.goPage(this.PAGE_LIST);
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </JPanel>
            );
        },
        topButtonHtml: function(h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
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
        // submitAddOrUpdate: function () {
        //     this.$refs.addForm.validate((valid) => {
        //         if (valid) {
        //             if (this.formData.forceUpdate === '否') this.formData.forceUpdate = 0;
        //             this.submitLoading = true;
        //             if (this.currentPage === this.PAGE_EDIT || this.currentPage === this.PAGE_ADD) {
        //                 upSave(this.formData).then(response => {
        //                     this.$message({
        //                         message: this.currentPage === this.PAGE_ADD ? "添加成功" : "修改成功",
        //                         type: "success"
        //                     });
        //                     this.submitLoading = false;
        //                     this.goPage(this.PAGE_LIST);
        //                 }).catch(err => {
        //                     this.submitLoading = false;
        //                 });
        //             }
        //         } else {
        //             return false;
        //         }
        //     });
        // },

        /**
         * 获取选择列
         * @param selectedItems
         */
        // handleSelectionChange: function (selectedItems) {
        // },

        /**
         * 删除列
         * @param row
         */
        // submitDel(row) {
        //     this.dialogVisible = true;
        //     this.tipTxt = "确定要删除吗？";
        //     const userId = row.id;
        //     this.sureCallbacks = () => {
        //         upDelete(userId).then(response => {
        //             this.dialogVisible = false;
        //             this.$message({
        //                 message: "删除成功",
        //                 type: "success"
        //             });
        //             this.$refs.Vtable.refreshData({
        //                 currentPage: this.defaultCurrentPage
        //             });
        //         }).catch(err => {
        //             this.dialogVisible = false;
        //         });
        //     };
        // },

        /**
         * 重置密码
         */
        /**
         * 更新视图状态
         */
        // updateView: function () {
        //     switch (this.currentPage) {
        //         case this.PAGE_LIST:
        //             if (this.$refs.Vtable) {
        //                 this.$refs.Vtable.$on('edit', (row) => {
        //                     this.formData = row;
        //                     this.goPage(this.PAGE_EDIT);
        //                     this.loading = false;
        //                 });
        //                 this.$refs.Vtable.$on('del', (row) => {
        //                     this.submitDel(row);
        //                 });
        //                 this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
        //                     this.defaultCurrentPage = defaultCurrentPage;
        //                 });
        //             }
        //             break;
        //         case 'add':
        //         case 'edit':
        //             bindData(this, this.$refs.addForm);
        //             break;
        //         default:
        //             break;
        //     }
        // },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                res.map(f => {
                    this.pageActionSearch[0].options.push({value: f.code, label: `${f.name}（${f.code}）`});
                });
                this.$refs.Vtable.handelActionSearchChange();
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
            this.uploadApkIng = false;
            const {fileName, fileSize, filemd5, imageNet, versionName, versionCode} = data;
            Object.assign(this.formData, {
                fileName: fileName,
                fileSize: fileSize,
                fileMd5: filemd5,
                fileUrl: imageNet,
                version: versionName,
                versionCode: versionCode,
            });
        },

        beforeUpload(file) {
            const {name, type} = file;
            if (!this.formData.channelCode) {
                this.$message.error(`请先选择机型！`);
                return false;
            }
            // if (type !== "application/vnd.android.package-archive") {
            //     this.$message.error(`文件类型错误！`);
            //     return false;
            // }

            console.log("上传文件类型： " + type);
            if (this.formData.type === 1 && name.toUpperCase().indexOf(this.formData.channelCode.toUpperCase()) < 0) {
                this.$message.error(`文件名与机型值不匹配，请检查！`);
                return false;
            }
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                version: "",
                versionCode: "",
            });
            this.uploadApkIng = true;
            return true;
        },
        uploadFail(err) {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                version: "",
                versionCode: "",
            });
            this.submitLoading = false;
        }
    }
});

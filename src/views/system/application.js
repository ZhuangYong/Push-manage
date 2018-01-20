import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {
    upDelete,
    upSave,
} from "../../api/upgrade";
import {getUpgradeType, bindData} from '../../utils/index';
import uploadApk from '../../components/Upload/singleApk.vue';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as updateApplication, del as delApplication} from "../../api/application";

const BACKGROUND_TYPE_IMG = 1;
const BACKGROUND_TYPE_COLOR = 2;
const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '应用名称', minWidth: 140, sortable: true},
        {columnKey: 'versionName', label: '版本号', minWidth: 140, sortable: true},
        {columnKey: 'iconUrl', label: 'ICON图标', imgColumn: 'iconUrl'},
        {columnKey: 'size', label: '文件大小', minWidth: 120, sortable: true},
        {columnKey: 'bgUrl', label: '应用图片', imgColumn: 'bgUrl', inDetail: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}

    ],
    tableCanSelect: false,
    defaultFormData: {
        name: '',
        versionName: '', //版本号
        image: '',
        url: '',
        size: '', //文件大小
        type: BACKGROUND_TYPE_IMG,
        iconUrl: '',
        bgUrl: '',
        versionCode: '',
        packageName: '',
        md5: "",
    },
    listDataGetter: function() {
        return this.system.applicationPage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入应用名称', type: 'input', value: ''},
        {column: 'versionName', label: '请输入版本号', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'system/application/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    versionName: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
};

export default BaseListView.extend({
    components: {
        uploadApk,
        uploadImg
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
            delItemFun: delApplication
        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
        // this.getChannelList();
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
            const uploadApkApi = Const.BASE_API + "/" + apiUrl.API_UPGRADE_SAVE_IMG;
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_APPLY_SAVE_IMG;
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                    <el-form-item label="名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                    </el-form-item>
                    <el-form-item label="版本号" prop="versionName">
                        <el-input value={this.formData.versionName} name='versionName' placeholder="请输入版本号"/>
                    </el-form-item>
                    <el-form-item label="下载地址" prop="">
                        <uploadApk uploadSuccess={this.uploadSuccess} uploadFail={this.uploadFail} beforeUpload={this.beforeUpload} actionUrl={uploadApkApi}/>
                    </el-form-item>
                    <el-form-item label="文件下载地址" prop="url">
                        <el-input type="textarea" rows={3} value={this.formData.url} name='url' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="文件名">
                        <el-input value={this.formData.fileName} name='fileName' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="包名">
                        <el-input value={this.formData.packageName} name='packageName' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="版本Code">
                        <el-input value={this.formData.versionCode} name='versionCode' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="文件大小">
                        <el-input value={this.formData.size} name='size' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="文件MD5值">
                        <el-input value={this.formData.md5} name='md5' placeholder="上传文件后自动生成" disabled={true}/>
                    </el-form-item>
                    <el-form-item label="背景类型：" prop="type">
                        <el-select placeholder="请选择" value={this.formData.type} onHandleOptionClick={f => this.formData.type = f.value}>
                             <el-option label="背景图片" value={BACKGROUND_TYPE_IMG} key={BACKGROUND_TYPE_IMG}/>
                             <el-option label="背景色" value={BACKGROUND_TYPE_COLOR} key={BACKGROUND_TYPE_COLOR}/>
                        </el-select>
                    </el-form-item>
                    {
                        this.formData.type === BACKGROUND_TYPE_IMG ? <el-form-item label="背景图片：" prop="bgUrl">
                            <uploadImg ref="backgroundUpload" defaultImg={this.formData.bgUrl} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                        </el-form-item> : ''
                    }
                    {
                        this.formData.type === BACKGROUND_TYPE_COLOR ? <el-form-item label="背景色：">
                           <el-color-picker value={this.formData.bgUrl} name="bgUrl" onInput={v => this.formData.bgUrl = v}/>
                        </el-form-item> : ''
                    }

                    <el-form-item label="ICON图">
                        <uploadImg ref="iconUpload" defaultImg={this.formData.iconUrl} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                    </el-form-item>

                   {/* <el-form-item label="应用图片">
                        <uploadImg ref="applicationUpload" defaultImg={this.formData.image} actionUrl={uploadImgApi} />
                    </el-form-item>*/}

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
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        const upFileFail = err => {
                            this.formData.bgUrl = '';
                            this.formData.iconUrl = '';
                            this.submitLoading = false;
                            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                        };
                        const updateFail = err => {
                            this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                            this.submitLoading = false;
                        };
                        const updateSuccess = res => {
                            this.$message({
                                message: "操作成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        };
                        this.$refs.iconUpload.handleStart({
                            success: r => {
                                r && (this.formData.iconUrl = r.imageNet);
                                if (this.$refs.backgroundUpload) {
                                    this.$refs.backgroundUpload.handleStart({
                                        success: t => {
                                            if (t) this.formData.bgUrl = t.imageNet;
                                            updateApplication(Object.assign({}, this.formData)).then(updateSuccess).catch(updateFail);
                                        }, fail: upFileFail
                                    });
                                } else {
                                    updateApplication(Object.assign({}, this.formData)).then(updateSuccess).catch(updateFail);
                                }
                            }, fail: upFileFail
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
        // getChannelList: function() {
        //     this.$store.dispatch("fun/chanelList", '').then((res) => {
        //         this.channelList = res ;
        //         defaultData.defaultFormData.channelCode = res[0].code;
        //         this.formData.channelCode = res[0].code;
        //     }).catch((err) => {
        //     });
        // },
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
            const {fileName, fileSize, filemd5, imageNet, imgPath, versionName, versionCode, packageName} = data;
            Object.assign(this.formData, {
                fileName: fileName,
                size: fileSize,
                md5: filemd5,
                url: imageNet,
                versionName: versionName,
                versionCode: versionCode,
                packageName: packageName
            });
        },

        beforeUpload() {
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                versionName: "",
                versionCode: '',
                packageName: ''
            });
            this.submitLoading = true;
        },
        uploadFail(err) {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
                versionName: "",
                versionCode: '',
                packageName: ''
            });
            this.submitLoading = false;
        }
    }
});

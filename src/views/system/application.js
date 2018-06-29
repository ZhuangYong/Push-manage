import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadApk from '../../components/Upload/singleApk.vue';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {del as delApplication, save as updateApplication} from "../../api/application";
import JPanel from "../../components/panel/JPanel";

const BACKGROUND_TYPE_IMG = 1;
const BACKGROUND_TYPE_COLOR = 2;
const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '应用名称', minWidth: 140, sortable: true},
        {columnKey: 'versionName', label: '版本号', minWidth: 140, sortable: true},
        {columnKey: 'iconUrl', label: 'ICON图标', imgColumn: 'iconUrl'},
        {columnKey: 'size', label: '文件大小', minWidth: 120, sortable: true, formatter: r => r.size && (r.size / (1024 * 1024)).toFixed(4) + " M"},
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
        forceUpdate: 2, //是否强制升级， 2否，1是
        openType: 0,
        className: "",
        intentParam: "",
        pierceParam: ""
    },
    listDataGetter: function() {
        return this.system.applicationPage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入应用名称', type: 'input', value: ''},
        // {column: 'versionName', label: '请输入版本号', type: 'input', value: ''},
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
    openType: [
        {required: true, message: '请选择打开方式', trigger: 'blur'},
    ]
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
            uploadApkIng: false,
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
            const uploadApkApi = Const.BASE_API + '/' + apiUrl.API_ADMIN_APPLY_SAVE_UPGRADE;
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_APPLY_SAVE_IMG;
            return (
                <JPanel title={`${this.formData.id ? "修改" : "添加"}应用`}>
                    <el-form class="small-space" model={this.formData}
                             ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                        <el-form-item label="名称" prop="name">
                            <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                        </el-form-item>
                        <el-form-item label="版本号" prop="versionName">
                            <el-input value={this.formData.versionName} name='versionName' placeholder="请输入版本号"/>
                        </el-form-item>
                        <el-form-item label="下载地址" prop="">
                            <uploadApk uploadSuccess={this.uploadSuccess} uploadFail={this.uploadFail} beforeUpload={this.beforeUpload} handelEmpty={() => this.uploadApkIng = false} actionUrl={uploadApkApi}/>
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
                        <el-form-item label="ICON图">
                            {/*<uploadImg ref="iconUpload" defaultImg={this.formData.iconUrl} name="iconUrl" actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>*/}
                            {
                                this.formData.iconUrl ? <div style={{
                                    height: '100px',
                                    width: '100px',
                                }}>
                                    <img src={this.formData.iconUrl} style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        marginTop: '7px'
                                    }}/>
                                </div> : <el-button type="primary" size="mini" disabled={true}>上传文件后自动生成</el-button>
                            }
                        </el-form-item>
                        <el-form-item label="背景类型：" prop="type">
                            <el-select placeholder="请选择" value={this.formData.type} onHandleOptionClick={f => this.formData.type = f.value}>
                                 <el-option label="背景图片" value={BACKGROUND_TYPE_IMG} key={BACKGROUND_TYPE_IMG}/>
                                 <el-option label="背景色" value={BACKGROUND_TYPE_COLOR} key={BACKGROUND_TYPE_COLOR}/>
                            </el-select>
                        </el-form-item>
                        {
                            this.formData.type === BACKGROUND_TYPE_IMG ? <el-form-item label="背景图片：" prop="bgUrl">
                                <uploadImg ref="backgroundUpload" defaultImg={this.formData.bgUrl} name="bgUrl" actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                            </el-form-item> : ''
                        }
                        {
                            this.formData.type === BACKGROUND_TYPE_COLOR ? <el-form-item label="背景色：">
                               <el-color-picker value={this.formData.bgUrl} name="bgUrl" onInput={v => this.formData.bgUrl = v}/>
                            </el-form-item> : ''
                        }
                        <el-form-item label="是否强制升级：" prop="forceUpdate">
                            <el-select placeholder="请选择" value={this.formData.forceUpdate} onHandleOptionClick={f => this.formData.forceUpdate = f.value}>
                                <el-option label="否" value={2} key={2}/>
                                <el-option label="是" value={1} key={1}/>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="打开方式：">
                            <el-select placeholder="请选择" value={this.formData.openType} onHandleOptionClick={f => this.formData.openType = f.value}>
                                <el-option label="直接打开apk" value={0} key={0}/>
                                <el-option label="打开制定Activity" value={1} key={1}/>
                                <el-option label="启动制定Service" value={2} key={2}/>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="className" v-show={this.formData.openType === 1 || this.formData.openType === 2}>
                            <el-input value={this.formData.className} name='className' placeholder="请输入className"/>
                        </el-form-item>

                        <el-form-item label="附加参数" v-show={this.formData.openType === 1 || this.formData.openType === 2}>
                            <el-button class="filter-item" onClick={
                                () => {
                                    const intentParam = this.getIntentParam();
                                    intentParam.push({key: "", value: ""});
                                    this.formData.intentParam = JSON.stringify(intentParam);
                                }
                            } type="primary" icon="plus">添加
                            </el-button>
                            {
                                JSON.parse(this.formData.intentParam || "[]").map((o, index) => <div style="margin: 4px 0; width: 280px; border: 1px solid #e2e2e2; padding: 3px;">
                                    <el-input value={o.key} name='key' placeholder="key" style="width: 80px; margin-right: 10px;" onChange={v => {
                                        const intentParam = this.getIntentParam();
                                        intentParam[index].key = v;
                                        this.formData.intentParam = JSON.stringify(intentParam);
                                    }}/>
                                    <el-input value={o.value} name='value' placeholder="value" style="width: 100px; margin-right: 10px;" onChange={v => {
                                        const intentParam = this.getIntentParam();
                                        intentParam[index].value = v;
                                        this.formData.intentParam = JSON.stringify(intentParam);
                                    }}/>
                                    <el-button class="filter-item" onClick={
                                        () => {
                                            const intentParam = this.getIntentParam();
                                            this.formData.intentParam = JSON.stringify(intentParam.filter((i, inIndex) => index !== inIndex));
                                        }
                                    } type="danger" icon="plus">删除</el-button>
                                </div>)
                            }
                        </el-form-item>

                        <el-form-item label="扩展透传参数" v-show={this.formData.openType === 1 || this.formData.openType === 2}>
                            <el-input value={this.formData.pierceParam} name='pierceParam' placeholder="请输入pierceParam"/>
                        </el-form-item>

                       {/* <el-form-item label="应用图片">
                            <uploadImg ref="applicationUpload" defaultImg={this.formData.image} actionUrl={uploadImgApi} />
                        </el-form-item>*/}

                        <el-form-item>
                            <el-button loading={this.uploadApkIng} disabled={this.uploadApkIng} type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
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
        submitAddOrUpdate: function () {
            this.validIntentParam();
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.currentPage === this.PAGE_EDIT || this.currentPage === this.PAGE_ADD) {
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
                            this.goPage(this.PAGE_LIST);
                        };
                        // this.$refs.iconUpload.handleStart({
                        //     success: r => {
                        //         r && (this.formData.iconUrl = r.imageNet);
                        //         if (this.$refs.backgroundUpload) {
                                    this.$refs.backgroundUpload.handleStart({
                                        success: t => {
                                            if (t) this.formData.bgUrl = t.imageNet;
                                            updateApplication(Object.assign({}, this.formData)).then(updateSuccess).catch(updateFail);
                                        }, fail: upFileFail
                                    });
                        //         } else {
                        //             updateApplication(Object.assign({}, this.formData)).then(updateSuccess).catch(updateFail);
                        //         }
                        //     }, fail: upFileFail
                        // });

                    }
                } else {
                    return false;
                }
            });
        },

        uploadSuccess(data) {
            this.submitLoading = false;
            const {fileName, fileSize, filemd5, imageNet, imgPath, versionName, versionCode, packageName, icon} = data;
            Object.assign(this.formData, {
                fileName: fileName,
                size: fileSize,
                md5: filemd5,
                url: imageNet,
                versionName: versionName,
                versionCode: versionCode,
                packageName: packageName,
                iconUrl: icon
            });
            this.uploadApkIng = false;
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
            this.uploadApkIng = true;
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
            this.uploadApkIng = false;
        },

        getIntentParam() {
            try {
                return JSON.parse(this.formData.intentParam || "[]");
            } catch (e) {
                return [];
            }
        },

        validIntentParam() {
            try {
                const intentParam = this.getIntentParam();
                this.formData.intentParam = JSON.stringify(intentParam.filter(o => o.key && o.value));
            } catch (e) {
                this.formData.intentParam = "";
            }

        }
    }
});

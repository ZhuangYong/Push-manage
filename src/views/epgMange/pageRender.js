import {mapGetters} from "vuex";
import {del as deleteScreen, save as saveScreen, saveTemplate, delTemplate} from "../../api/screen";
import {bindData} from '../../utils/index';
import uploadImg from '../../components/Upload/singleImage.vue';
import apiUrl from "../../api/apiUrl";
import Const from "../../utils/const";
import BaseListView from "../../components/common/BaseListView";
import uploadApk from '../../components/Upload/singleApk.vue';

const TARGET_TYPE_JUMP_URL = 1;
const TARGET_TYPE_DISPLAY = 2;

const JUMP_TYPE_GO_APP = 11;
const JUMP_TYPE_GO_WEB = 12;
const JUMP_TYPE_OPEN_APP = 13;

const BACKGROUND_TYPE_IMG = 1;
const BACKGROUND_TYPE_COLOR = 2;

const OPEN_TYPE_LIST = 21;
const OPEN_TYPE_GRADE = 22;
const OPEN_TYPE_SONG_CATEGORY_LIST = 23;
const OPEN_TYPE_DETAIL = 24;

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'defineName', label: '数据绑定', minWidth: 140, sortable: true},
        // {columnKey: 'epgVersionName', label: '背景', formatter: (r, h) => {
        //     if (r.imageNet) return (<img src={r.imageNet} style="height: 30px; margin-top: 6px;"/>);
        //     return '';
        // }},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
            if (r.isEnabled === 1) return '是';
                return '否';
        }},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '修改模板', type: 'edit'}, {label: '修改子模块', type: 'editSub'}, {label: '删除', type: 'del'}], minWidth: 270}
    ],
    defaultFormData: {
        name: '',
        dataSrcId: '',
        imageNet: '',
        image: '',
        sort: 1,
        remark: '',
        isEnabled: 1, // 1 生效 2 禁用
    },
    validRules: {
        name: [
            {required: true, message: '请输入名称'},
        ],
        dataSrcId: [
            {required: true, message: '请选择'},
        ],
        sort: [
            {required: true, message: '请选择'},
            {type: "number", message: '必须输入数字'}
        ],
    },
    listDataGetter: function() {
        return this.epgMange.screenPage;
    },
    pageAction: 'screen/RefreshPage',
    pageActionSearch: [{
        column: 'name', label: '请输入名称', type: 'input', value: ''
    }],
    pagination: true,
    pageActionSearchColumn: [],
};

const subListData = {
    viewRule: [
        {columnKey: 'sort', label: '排序', minWidth: 80},
        {columnKey: 'name', label: '显示名称', minWidth: 140},
        {columnKey: 'targetType', label: 'target类型', formatter: r => {
                if (r.targetType === TARGET_TYPE_JUMP_URL) return '跳转页面(jump_url)';
                if (r.targetType === TARGET_TYPE_DISPLAY) return '页面展示(display)';
            }, minWidth: 120},
        {columnKey: 'defineName', label: '数据绑定'},
        // {columnKey: 'bgOssUrl', label: '背景', imgColumn: 'bgOssUrl', minWidth: 100},
        {columnKey: 'x', label: 'X轴', minWidth: 70},
        {columnKey: 'y', label: 'Y轴', minWidth: 70},
        {columnKey: 'width', label: '宽', minWidth: 40},
        {columnKey: 'high', label: '高', minWidth: 40},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
            if (r.isEnabled === 1) return '是';
            if (r.isEnabled === 2) return '否';
        }, minWidth: 100},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170},
        {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 160}
    ],
    defaultFormData: {
        name: '',
        sort: 1,
        targetType: TARGET_TYPE_JUMP_URL,
        jumpOpenType: JUMP_TYPE_GO_APP,
        pageId: '',
        packageName: '',
        content: '',
        size: '',
        md5: '',
        openType: OPEN_TYPE_LIST,
        bgType: BACKGROUND_TYPE_IMG,
        dataSrcId: '',
        bgValue: '',
        icon: '',
        bgOssUrl: '',
        x: '',
        y: '',
        width: '',
        high: '',
        remark: '',
        isEnabled: 1, // 1 生效 2 禁用
    },
    validRules: {
        name: [
            {required: true, message: '请输入名称'},
            {min: 1, max: 50, message: '请输入1-50位字符'}
        ],
        dataSrcId: [
            {required: true, message: '请选择'},
        ],
        x: [
            {required: true, message: '必须输入'},
        ],
        y: [
            {required: true, message: '必须输入'},
        ],
        width: [
            {required: true, message: '必须输入'},
        ],
        high: [
            {required: true, message: '必须输入'},
        ],
        packageName: [
            {required: true, message: '必须输入'},
        ],
        pageId: [
            {required: true, message: '必须选择'},
        ],
        content: [
            {required: true, message: '必须选择'},
        ]
    },
    listDataGetter: function() {
        return {data: this.epgMange.templateList || []};
    },
    pagination: false,
    pageAction: 'screen/template/list',
    pageActionSearch: [],
    pageActionSearchColumn: [],
};

const pageData = {
    viewRule: [
        {columnKey: 'name', label: '页面名称', minWidth: 140},
        {columnKey: 'pageCode', label: '页面ID', minWidth: 120},
        {columnKey: 'createName', label: '创建人'},
        // {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
        //     if (r.isEnabled === 1) return '是';
        //         return '否';
        // }, minWidth: 100},
    ],
    defaultFormData: subListData.defaultFormData,
    listDataGetter: function() {
        return this.system.pageManage;
    },
    tableCanSelect: true,
    pageAction: 'page/RefreshPage',
    pageActionSearch: [],
    pagination: true,
    selectItem: null,
    pageActionSearchColumn: [
        {isEnabled: 1}
    ],
};

const applicationPageData = Object.assign({}, pageData, {
    listDataGetter: function() {
        return this.system.applicationPage;
    },
    pageAction: 'system/application/RefreshPage',
});

export default BaseListView.extend({
    name: 'pageRenderPage',
    components: {
        uploadImg,
        uploadApk
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: "list",
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            templateId: 0,
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItem: null, // 选择列
            formData: _defaultData.defaultFormData, // 表单数据
            userGroup: [],
            upgrade: [],
            romList: [],
            appList: [],
            tipTxt: "",
            preStatus: [],
            tableCanSelect: false,
            dialogVisible: false,
            defaultCurrentPage: 1,
            validRules: _defaultData.validRules,
            rules: _defaultData.validRules,
        };
    },
    computed: {
        ...mapGetters(['epgMange', 'system'])
    },
    created() {
        this.refreshPageList();
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_SCREEN_SAVE_IMAGE;
            const uploadImgApk = uploadImgApi;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validRules} label-position="right" label-width="140px">
                    {
                        (this.pageAction === subListData.pageAction || this.pageAction === pageData.pageAction || this.pageAction === applicationPageData.pageAction) ? <div>
                            <el-form-item label="显示名称：" prop="name">
                                <el-input value={this.formData.name} name="name"/>
                            </el-form-item>
                            <el-form-item label="排序：" prop="sort">
                                <el-input value={this.formData.sort} name="sort" number/>
                            </el-form-item>
                            <el-form-item label="target类型：" prop="targetType">
                                <el-select placeholder="请选择" value={this.formData.targetType} name='targetType'>
                                     <el-option label="跳转页面(jump_url)" value={TARGET_TYPE_JUMP_URL} key={TARGET_TYPE_JUMP_URL}/>
                                     <el-option label="页面展示(display)" value={TARGET_TYPE_DISPLAY} key={TARGET_TYPE_DISPLAY}/>
                                </el-select>
                            </el-form-item>
                            {
                                this.formData.targetType === TARGET_TYPE_JUMP_URL ? <el-form-item label="跳转/打开类型：" prop="jumpOpenType">
                                    <el-select placeholder="请选择" value={this.formData.jumpOpenType} onHandleOptionClick={f => {
                                        this.formData.jumpOpenType = f.value;
                                        this.formData.content = '';
                                        this.formData.pageId = '';
                                        this.formData.packageName = '';
                                    }}>
                                         <el-option label="goapp" value={JUMP_TYPE_GO_APP} key={JUMP_TYPE_GO_APP}/>
                                         <el-option label="goweb" value={JUMP_TYPE_GO_WEB} key={JUMP_TYPE_GO_WEB}/>
                                         <el-option label="openapp" value={JUMP_TYPE_OPEN_APP} key={JUMP_TYPE_OPEN_APP}/>
                                    </el-select>
                                </el-form-item> : ''
                            }

                            {
                                this.formData.targetType === TARGET_TYPE_DISPLAY ? <el-form-item label="数据绑定：" prop="dataSrcId">
                                    <el-select placeholder="请选择" value={this.formData.dataSrcId} onHandleOptionClick={f => this.formData.dataSrcId = f.value}>
                                        {
                                            this.system.defineDefineList && this.system.defineDefineList.map(u => (
                                                <el-option label={u.name} value={u.dataSrcId} key={u.dataSrcId}/>
                                            ))
                                        }
                                    </el-select>
                                </el-form-item> : ""
                            }
                            {
                                this.formData.targetType === TARGET_TYPE_DISPLAY ? <el-form-item label="跳转/打开类型：" prop="openType">
                                    <el-select placeholder="请选择" value={this.formData.openType} name='openType' onHandleOptionClick={f => this.formData.openType = f.value}>
                                        <el-option label="列表展示" value={OPEN_TYPE_LIST} key={OPEN_TYPE_LIST}/>
                                        <el-option label="宫格展示" value={OPEN_TYPE_GRADE} key={OPEN_TYPE_GRADE}/>
                                        <el-option label="歌曲分类榜单" value={OPEN_TYPE_SONG_CATEGORY_LIST} key={OPEN_TYPE_SONG_CATEGORY_LIST}/>
                                        <el-option label="详情展示" value={OPEN_TYPE_DETAIL} key={OPEN_TYPE_DETAIL}/>
                                    </el-select>
                                </el-form-item> : ""
                            }

                            {
                                (this.formData.targetType === TARGET_TYPE_JUMP_URL && (this.formData.jumpOpenType === JUMP_TYPE_GO_APP || this.formData.jumpOpenType === JUMP_TYPE_OPEN_APP)) ? <el-form-item label="值：" prop="content">
                                {
                                    this.formData.content ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                        this.selectItem = null;
                                        this.formData.content = '';
                                        this.formData.pageId = '';
                                        this.formData.packageName = '';
                                    }}>
                                        {this.formData.packageName}
                                    </el-tag> : <el-button type="primary" onClick={f => {
                                        this.preStatus.push(this.status);
                                        this.showList(null, true);
                                        this.status = "list";
                                    }}>点击选择</el-button>
                                }
                                </el-form-item> : ''
                            }

                            {
                                (this.formData.targetType === TARGET_TYPE_JUMP_URL && this.formData.jumpOpenType === JUMP_TYPE_GO_WEB) ? <el-form-item label="值：" prop="content">
                                    <el-input value={this.formData.content} name='content' placeholder="网页URL,以 http:// 开头"/>
                                </el-form-item> : ''
                            }

                            <el-form-item label="背景类型：" prop="bgType">
                                <el-select placeholder="请选择" value={this.formData.bgType} onHandleOptionClick={f => this.formData.bgType = f.value}>
                                     <el-option label="背景图片" value={BACKGROUND_TYPE_IMG} key={BACKGROUND_TYPE_IMG}/>
                                     <el-option label="背景色" value={BACKGROUND_TYPE_COLOR} key={BACKGROUND_TYPE_COLOR}/>
                                </el-select>
                            </el-form-item>

                            {
                                this.formData.bgType === BACKGROUND_TYPE_IMG ? <el-form-item label="背景图片：" prop="bgValue">
                                    <uploadImg ref="backgroundUpload" defaultImg={this.formData.bgValue} actionUrl={uploadImgApi} />
                                </el-form-item> : ''
                            }

                            {
                                this.formData.bgType === BACKGROUND_TYPE_COLOR ? <el-form-item label="背景色：">
                                    <el-color-picker value={this.formData.bgValue} onInput={v => this.formData.bgValue = v}/>
                                </el-form-item> : ''
                            }

                            <el-form-item label="ICON图：">
                                <uploadImg ref="iconUpload" defaultImg={this.formData.iconUrl} actionUrl={uploadImgApi} />
                                <el-input type="hidden" style="display:none" value={this.formData.iconUrl} name='icon'/>
                            </el-form-item>
                            <el-form-item label="位置：" required>
                                <el-row style="max-width: 440px">
                                    <el-col span={6}>
                                        <el-form-item prop="x">
                                             <el-input value={this.formData.x} name='x' placeholder="X轴：" style="max-width: 100px; margin-right: 10px"/>
                                        </el-form-item>
                                    </el-col>
                                     <el-col span={6}>
                                        <el-form-item prop="y">
                                             <el-input value={this.formData.y} name='y' placeholder="Y轴：" style="max-width: 100px; margin-right: 10px"/>
                                        </el-form-item>
                                    </el-col>
                                     <el-col span={6}>
                                        <el-form-item prop="width">
                                            <el-input value={this.formData.width} name='width' placeholder="宽：" style="max-width: 100px; margin-right: 10px"/>
                                        </el-form-item>
                                    </el-col>
                                     <el-col span={6}>
                                        <el-form-item prop="high">
                                            <el-input value={this.formData.high} name='high' placeholder="高：" style="max-width: 100px"/>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item label="是否开启：" prop="isEnabled">
                                <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                                    <el-radio value={1} label={1}>是</el-radio>
                                    <el-radio value={2} label={2}>否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="备注：" prop="remark">
                                <el-input type="textarea" rows={4} value={this.formData.remark} name='remark'/>
                             </el-form-item>
                        </div> : <div>
                            <el-form-item label="名称：" prop="name">
                                <el-input value={this.formData.name} name="name"/>
                            </el-form-item>
                            <el-form-item label="数据绑定：" prop="dataSrcId">
                                <el-select placeholder="请选择" value={this.formData.dataSrcId} onHandleOptionClick={f => this.formData.dataSrcId = f.value}>
                                    {
                                        this.system.defineDefineList && this.system.defineDefineList.map(u => (
                                            <el-option label={u.name} value={u.dataSrcId} key={u.dataSrcId}/>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            {/*<el-form-item label="背景：">
                                <uploadImg ref="upload" defaultImg={this.formData.imageNet} actionUrl={uploadImgApi} />
                            </el-form-item>*/}
                            <el-form-item label="是否开启：" prop="isEnabled">
                                <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                                    <el-radio value={1} label={1} key={1}>是</el-radio>
                                    <el-radio value={2} label={2} key={2}>否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="备注：" prop="remark">
                                <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
                             </el-form-item>
                        </div>
                    }

                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                if (this.pageAction === defaultData.pageAction) this.showList();
                                if (this.pageAction === pageData.pageAction) this.showList(this.templateId);
                                if (this.pageAction === applicationPageData.pageAction) this.showList(this.templateId);
                                // if (this.pageAction === subListData.pageAction)
                                    this.status = "list";
                                // this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            return (
                (((this.templateId && this.status === 'list') || this.pageAction === pageData.pageAction || this.pageAction === applicationPageData.pageAction) && this.status !== 'add' && this.status !== 'edit') ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => {
                        if (this.pageAction === pageData.pageAction || this.pageAction === applicationPageData.pageAction) this.status = this.preStatus.pop();
                        if (this.pageAction === subListData.pageAction) this.showList();
                        // this.showList();
                    }} type="primary" icon="caret-left">
                        返回
                    </el-button>
                    {
                        (this.pageAction !== pageData.pageAction && this.pageAction !== applicationPageData.pageAction) ? <el-button class="filter-item" onClick={
                                    () => {
                                        this.status = "add";
                                        this.formData = Object.assign({}, subListData.defaultFormData);
                                        this.owned = [];
                                    }
                                } type="primary" icon="edit">添加
                            </el-button> : ""
                    }

                    </div> : (
                            this.status === 'list' ? <div class="filter-container table-top-button-container">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.status = "add";
                                    this.formData = Object.assign({}, defaultData.defaultFormData);
                                }
                            } type="primary" icon="edit">添加
                            </el-button>
                        </div> : ""
                    )

            );
        },


        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    const upFileFail = err => {
                        this.formData.bgOssUrl = '';
                        this.formData.imageNet = '';
                        this.formData.image = '';
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    };
                    const updateSuccess = res => {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.submitLoading = false;
                        this.showList(this.templateId);
                        this.status = 'list';
                    };
                    const updateFail = err => {
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                        this.submitLoading = false;
                    };
                    // 如果是添加子模板
                    if (this.pageAction === subListData.pageAction || this.pageAction === pageData.pageAction || this.pageAction === applicationPageData.pageAction) {
                        this.$refs.iconUpload.handleStart({
                            success: r => {
                                r && (this.formData.iconUrl = r.imageNet);
                                if (this.$refs.backgroundUpload) {
                                    this.$refs.backgroundUpload.handleStart({
                                        success: t => {
                                            if (t) this.formData.bgValue = t.imageNet;
                                            saveTemplate(Object.assign({urlJoin: this.templateId}, this.formData)).then(updateSuccess).catch(updateFail);
                                        }, fail: upFileFail
                                    });
                                } else {
                                    saveTemplate(Object.assign({urlJoin: this.templateId}, this.formData)).then(updateSuccess).catch(updateFail);
                                }

                            }, fail: upFileFail
                        });

                    } else {
                        // this.$refs.upload.handleStart({
                        //     success: r => {
                        //         if (r) {
                        //             const {imageNet, imgPath} = r;
                        //             this.formData.imageNet = imageNet;
                        //             this.formData.image = imgPath;
                        //         }
                        //         saveScreen(this.formData).then(updateSuccess).catch(updateFail);
                        //     }, fail: upFileFail
                        // });
                        saveScreen(this.formData).then(updateSuccess).catch(updateFail);
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
            if (this.pageAction !== pageData.pageAction && this.pageAction !== applicationPageData.pageAction) return;
            if (selectedItems.length === 1) {
                this.selectItem = selectedItems[0];
                const {name, id, pageCode, uuid} = this.selectItem;
                this.formData.packageName = name;
                // this.formData.pageId = id;
                this.formData.content = pageCode || uuid;
                this.status = this.preStatus.pop();
                if (this.templateId) this.pageActionSearchColumn = [{
                    urlJoin: this.templateId
                }];
            } else {
                this.selectItem = null;
                this.formData.packageName = '';
                this.formData.pageId = '';
                this.formData.content = '';
            }
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = row.id;
            const delFun = this.pageAction === defaultData.pageAction ? deleteScreen : delTemplate;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                delFun(id).then(response => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

        refreshPageList() {
            this.loading = true;
            this.$store.dispatch("define/define/list").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = Object.assign({}, subListData.defaultFormData, row);
                            this.status = "edit";
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('editSub', (row) => {
                            this.showList(row.id);
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

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         * @param choosePage
         */
        showList: function (id, choosePage) {
            if (!choosePage) this.templateId = id;
            const _thisData = choosePage ? Object.assign({}, this.formData.jumpOpenType === JUMP_TYPE_OPEN_APP ? applicationPageData : pageData) : Object.assign({}, id ? subListData : defaultData);
            Object.keys(_thisData).map(key => {
                this[key] = _thisData[key];
            });
            this.enableDefaultCurrentPage = !id;
            if (id) {
                this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                this.pageActionSearchColumn = [{
                    urlJoin: id
                }];
            } else {
                this.pageActionSearchColumn = [];
            }
            if (this.pageAction === pageData.pageAction) this.pageActionSearchColumn = this.pageActionSearchColumn.concat(_thisData.pageActionSearchColumn);
        },

        uploadSuccess(data) {
            this.submitLoading = false;
            const {fileName, fileSize, filemd5, imgPath} = data;
            this.formData = Object.assign({}, this.formData, {
                size: fileSize,
                md5: filemd5,
                content: imgPath
            });
            this.$refs.apkUpload.$parent.resetField();
        },

        beforeUpload() {
            this.handelApkEmpty();
            this.submitLoading = true;
        },
        uploadFail(err) {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            this.handelApkEmpty();
            this.submitLoading = false;
        },
        handelApkEmpty() {
            this.formData = Object.assign(this.formData, {
                size: "",
                md5: "",
                content: ""
            });
        }

    },
});

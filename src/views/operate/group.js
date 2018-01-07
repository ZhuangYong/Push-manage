/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as editGroup, del as delGroup, saveActors, delAcotors} from '../../api/group';
import {bindData} from "../../utils/index";
import {saveLanguage} from "../../api/category";

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        seq: '',
        isEnabled: 1,
        map: {
            nameKey: {},
            ottPicKey: {},
            ottPicOssKey: {},
            wxPicKey: {},
            wxPicOssKey: {},
        },
        ottEnEcs: "",
        ottEnOss: "",
        ottFtEcs: "",
        ottFtOss: "",
        ottTwEcs: "",
        ottTwOss: "",
        ottOssPic: "",
        ottpic: "",

        wxEnEcs: "",
        wxEnOss: "",
        wxFtEcs: "",
        wxFtOss: "",
        wxTwEcs: "",
        wxTwOss: "",
        wxOssPic: "",
        wxpic: "",

        actorNos: []
    },
    viewRule: [
        {columnKey: 'seq', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'name', label: '名称', minWidth: 120, sortable: true},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map.wxPicOssKey && (r.map.wxPicOssKey.cn || r.map.wxPicOssKey.en || r.map.wxPicOssKey.hk || r.map.wxPicOssKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map.ottPicOssKey && (r.map.ottPicOssKey.cn || r.map.ottPicOssKey.en || r.map.ottPicOssKey.hk || r.map.ottPicOssKey.tw)},
        {columnKey: 'isEnabled', label: '状态', minWidth: 70, formatter: r => {
            if (r.isEnabled === 1) return '启用';
            if (r.isEnabled === 2) return '禁用';
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌星列表', type: 'actorList'}], minWidth: 190}
    ],
    validateRule: {
        name: [
            {required: true, message: '名称'}
        ],
        seq: [
            {required: true, message: '请输入排序序列号'},
            {type: 'number', message: '必须为数字值'}
        ],
        ottpic: [
            {required: true, message: '请选择ott自定义图片'},
        ],
        wxpic: [
            {required: true, message: '请选择微信自定义图片'},
        ],
    },
    listDataGetter: function() {
        return this.operate.groupPage;
    },
    pageAction: 'operate/group/RefreshPage',
    tableCanSelect: false,
    pageActionSearch: [{
        column: 'name', label: '请输入名称', type: 'input', value: ''
    }],
    pageActionSearchColumn: [],
    editFun: editGroup,
    delItemFun: delGroup
};

const actorListData = {
    defaultFormData: {
        id: '',
        sn: '',
        mac: '',
        wifimac: '',
        ranmdoncode: '',
        status: 1,
        actorNos: []
    },
    viewRule: [
        {columnKey: 'actorNo', label: '歌星编号', minWidth: 190},
        {columnKey: 'nameNorm', label: '歌星名称', minWidth: 190},
        {columnKey: 'abbrNorm', label: '歌星首字母', minWidth: 190},
        {columnKey: 'actorTypeNorm', label: '歌星类型', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'},
        {columnKey: 'wxImg', label: '自定义微信图片', minWidth: 190, imgColumn: 'wxpic'},
        {columnKey: 'ottImg', label: '自定义ott图片', minWidth: 190, imgColumn: 'wxpic'},
    ],
    listDataGetter: function() {
        return this.operate.groupActorPage;
    },
    pageAction: 'operate/group/actor/RefreshPage',
    tableCanSelect: true,
    pageActionSearch: [{
        column: 'nameNorm', label: '请输入歌星名称', type: 'input', value: ''
    }],
    pageActionSearchColumn: [],
};

const chooseActorsData = Object.assign({}, actorListData, {
    listDataGetter: function() {
        return this.operate.actorPage;
    },
    tableCanSelect: true,
    pageAction: 'operate/actor/RefreshPage',
});

export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            id: null,
            rankId: null,
            isLeike: false,
            pageAction: _defaultData.pageAction,
            i18nObj: {},
            cruI18n: f => f,
            preStatus: ''
        };
    },

    computed: {
        ...mapGetters(['operate'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            if (this.status === 'editI18n') return this.cruI18n(h);
            return (

                this.pageAction === defaultData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <div>
                         <el-form-item label="名称：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={6}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey.cn} placeholder="中文名称" onChange={v => this.formData.map.nameKey.cn = v} style="max-width: 100px; margin-right: 10px"/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={6}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("txt", [
                                            {
                                                label: "中文名称：",
                                                getValue: v => this.formData.map.nameKey.cn,
                                                onChange: v => this.formData.map.nameKey.cn = v,
                                                placeholder: "请输入中文名称",
                                            },
                                            {
                                                label: "英文名称：",
                                                getValue: v => this.formData.map.nameKey.en,
                                                onChange: v => this.formData.map.nameKey.en = v,
                                                placeholder: "请输入英文名称",
                                            },
                                            {
                                                label: "繁体名称：",
                                                getValue: v => this.formData.map.nameKey.hk,
                                                onChange: v => this.formData.map.nameKey.hk = v,
                                                placeholder: "请输入繁体名称",
                                            },
                                            {
                                                label: "粤语名称：",
                                                getValue: v => this.formData.map.nameKey.tw,
                                                onChange: v => this.formData.map.nameKey.tw = v,
                                                placeholder: "请输入繁体名称",
                                            }
                                        ])}>点击编辑</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                         </el-form-item>
                         <el-form-item label="排序：" prop="seq">
                             <el-input value={this.formData.seq} placeholder="" onChange={v => this.formData.seq = parseInt(v, 10)} number/>
                         </el-form-item>
                        <el-form-item label="状态：" prop="isEnabled">
                            <el-radio-group value={this.formData.isEnabled} name='isEnabled' onInput={v => this.formData.isEnabled = v}>
                                <el-radio value={1} label={1}>启用</el-radio>
                                <el-radio value={2} label={2}>禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>

                    <el-form-item label="微信图片(300*180)：" required>
                        <el-row style="max-width: 440px">
                            <el-col span={6}>
                                <el-form-item prop="x">
                                    <uploadImg defaultImg={this.formData.map.wxPicOssKey.cn} actionUrl={uploadImgApi} name="wxOssPic" name2="wxpic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                </el-form-item>
                            </el-col>
                            <el-col span={6}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.editI18n("img", [
                                        {
                                            label: "中文图片：",
                                            name: "wxOssPic",
                                            name2: "wxpic",
                                            defaultImg: v => this.formData.map.wxPicOssKey.cn,
                                        },
                                        {
                                            label: "英文图片：",
                                            name: "wxEnOss",
                                            name2: "wxEnEcs",
                                            defaultImg: v => this.formData.map.wxPicOssKey.en,
                                        },
                                        {
                                            label: "繁体图片：",
                                            name: "wxFtOss",
                                            name2: "wxFtEcs",
                                            defaultImg: v => this.formData.map.wxPicOssKey.hk,
                                        },
                                        {
                                            label: "粤语图片：",
                                            name: "wxTwOss",
                                            name2: "wxTwEcs",
                                            defaultImg: v => this.formData.map.wxPicOssKey.tw,
                                        }
                                    ], uploadImgApi)}>点击编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：" required>
                        <el-row style="max-width: 440px">
                            <el-col span={6}>
                                <el-form-item prop="x">
                                    <uploadImg defaultImg={this.formData.map.ottPicOssKey.cn} actionUrl={uploadImgApi} name="ottOssPic" name2="ottpic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                </el-form-item>
                            </el-col>
                            <el-col span={6}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.editI18n("img", [
                                        {
                                            label: "中文图片：",
                                            name: "ottOssPic",
                                            name2: "ottpic",
                                            defaultImg: v => this.formData.map.ottPicOssKey.cn,
                                        },
                                        {
                                            label: "英文图片：",
                                            name: "ottEnOss",
                                            name2: "ottFtEcs",
                                            defaultImg: v => this.formData.map.ottPicOssKey.en,
                                        },
                                        {
                                            label: "繁体图片：",
                                            name: "ottFtOss",
                                            name2: "ottFtEcs",
                                            defaultImg: v => this.formData.map.ottPicOssKey.hk,
                                        },
                                        {
                                            label: "粤语图片：",
                                            name: "ottTwOss",
                                            name2: "ottTwEcs",
                                            defaultImg: v => this.formData.map.ottPicOssKey.tw,
                                        }
                                    ])}>点击编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
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
                </el-form> : ''
            );
        },

        cruI18nTxt(h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                    ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                     {
                         this.i18nObj.map(o => (
                             <el-form-item label={o.label} required>
                                <el-input value={o.getValue()} placeholder={o.placeholder} onChange={o.onChange}/>
                             </el-form-item>
                         ))
                     }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "edit";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        cruI18nImg(h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                    ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.i18nObj.map(o => (
                            <el-form-item label={o.label} required>
                            <uploadImg defaultImg={o.defaultImg()} actionUrl={uploadImgApi} name={o.name} name2={o.name2} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                        </el-form-item>
                        ))
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "edit";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        editI18n(type, i18nObj) {
            this.preStatus = this.status;
            this.status = "editI18n";
            this.i18nObj = i18nObj;
            switch (type) {
                case "txt":
                    this.cruI18n = this.cruI18nTxt;
                    break;
                case "img":
                    this.cruI18n = this.cruI18nImg;
                    break;
                default:
                    this.cruI18n = [];
            }
        },

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.groupPage.config && this.operate.groupPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const isChooseActor = this.pageAction === chooseActorsData.pageAction;
            const isAcotrList = this.pageAction === actorListData.pageAction;
            const canChoose = isChooseActor && !(this.formData.actorNos.length > 0);
            return (
                this.rankId ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => this.showList(isChooseActor ? this.rankId : null)} type="primary" icon="caret-left">
                        返回
                    </el-button>

                    {
                        !this.isLeike ? <el-button class="filter-item" onClick={
                            () => {
                                if (isChooseActor) {
                                    this.submitSaveActors();
                                } else {
                                    this.showList(this.rankId, true);
                                }
                                this.status = "list";
                            }
                        } type="primary" disabled={canChoose}>
                                        {isChooseActor ? '选定' : '添加'}
                                    </el-button> : ''
                    }

                    {
                        (isAcotrList && !this.isLeike) ? <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.formData.actorNos.length > 0)}>批量删除</el-button> : ''
                    }

                    </div> : (
                    this.status === 'list' ? <div class="filter-container table-top-button-container">
                             <el-button class="filter-item" onClick={
                                 () => {
                                     this.status = "add";
                                     this.defaultFormData.map = {
                                         nameKey: {},
                                         ottPicKey: {},
                                         ottPicOssKey: {},
                                         wxPicKey: {},
                                         wxPicOssKey: {},
                                     };
                                     this.formData = Object.assign({}, this.defaultFormData);
                                     this.owned = [];
                                 }
                             } type="primary" icon="edit">添加
                                </el-button>
                                <el-button class="filter-item" onClick={f => this.updateFromLeiKe(null, false, true)} type="primary" loading={updateIngFromLeiKe}>
                                    {
                                        updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                                    }
                                </el-button>
                        </div> : ''
                    )
            );
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         * @param choosePage
         * @param refreshPage
         */
        showList: function (id, choosePage, refreshPage) {
            this.rankId = id;
            setTimeout(f => {
                const _thisData = choosePage ? Object.assign({}, chooseActorsData) : Object.assign({}, id ? actorListData : defaultData);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                this.enableDefaultCurrentPage = !id;
                if (id && !choosePage) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        urlJoin: id
                    }];
                    if (this.isLeike) this.tableCanSelect = false;
                } else {
                    this.pageActionSearchColumn = [];
                }
                this.rankId = id;
                if (refreshPage) {
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }
            }, 50);
            this.formData.actorNos = [];
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitForm();
            });
        },

        submitForm() {
            this.submitLoading = true;
            this.formData.map.ottPicKey = this.formData.map.ottPicKey || {};
            this.formData.map.ottPicOssKey = this.formData.map.ottPicOssKey || {};
            this.formData.map.wxPicKey = this.formData.map.wxPicKey || {};
            this.formData.map.wxPicOssKey = this.formData.map.wxPicOssKey || {};
            this.formData.map = Object.assign(this.formData.map, {
                ottPicKey: Object.assign(this.formData.map.ottPicKey, {
                    cn: this.formData.ottpic || this.formData.map.ottPicKey.cn,
                    en: this.formData.ottEnEcs || this.formData.map.ottPicKey.en,
                    hk: this.formData.ottFtEcs || this.formData.map.ottPicKey.hk,
                    tw: this.formData.ottTwEcs || this.formData.map.ottPicKey.tw,
                }),
                ottPicOssKey: Object.assign(this.formData.map.ottPicOssKey, {
                    cn: this.formData.ottOssPic || this.formData.map.ottPicOssKey.cn,
                    en: this.formData.ottEnOss || this.formData.map.ottPicOssKey.en,
                    hk: this.formData.ottFtOss || this.formData.map.ottPicOssKey.hk,
                    tw: this.formData.ottTwOss || this.formData.map.ottPicOssKey.tw,
                }),
                wxPicKey: Object.assign(this.formData.map.wxPicKey, {
                    cn: this.formData.wxpic || this.formData.map.wxPicKey.cn,
                    en: this.formData.wxEnEcs || this.formData.map.wxPicKey.en,
                    hk: this.formData.wxFtEcs || this.formData.map.wxPicKey.hk,
                    tw: this.formData.wxTwEcs || this.formData.map.wxPicKey.tw,
                }),
                wxPicOssKey: Object.assign(this.formData.map.wxPicOssKey, {
                    cn: this.formData.wxOssPic || this.formData.map.wxPicOssKey.cn,
                    en: this.formData.wxEnOss || this.formData.map.wxPicOssKey.en,
                    hk: this.formData.wxFtOss || this.formData.map.wxPicOssKey.hk,
                    tw: this.formData.wxTwOss || this.formData.map.wxPicOssKey.tw,
                }),
            });

            this.formData = Object.assign({}, this.formData, {
                name: this.formData.map.nameKey.cn,
                nameKey: this.formData.map.nameKey.key,
                ottPic: this.formData.map.ottPicKey.cn,
                ottPicKey: this.formData.map.ottPicKey.key,
                ottPicOss: this.formData.map.ottPicOssKey.cn,
                ottPicOssKey: this.formData.map.ottPicOssKey.key,
                wxPic: this.formData.map.wxPicKey.cn,
                wxPicKey: this.formData.map.wxPicKey.key,
                wxPicOss: this.formData.map.wxPicOssKey.cn,
                wxPicOssKey: this.formData.map.wxPicOssKey.key,
            });

            delete this.formData.ottEnEcs;
            delete this.formData.ottEnOss;
            delete this.formData.ottFtEcs;
            delete this.formData.ottFtOss;
            delete this.formData.ottTwEcs;
            delete this.formData.ottTwOss;
            delete this.formData.ottOssPic;
            delete this.formData.ottpic;

            delete this.formData.wxEnEcs;
            delete this.formData.wxEnOss;
            delete this.formData.wxFtEcs;
            delete this.formData.wxFtOss;
            delete this.formData.wxTwEcs;
            delete this.formData.wxTwOss;
            delete this.formData.wxOssPic;
            delete this.formData.wxpic;
            // delete this.formData.map;

            const editFunc = this.status === "editI18n" ? saveLanguage : this.editFun;
            editFunc && editFunc(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                const {name, nameKey, ottPic, ottPicKey, ottPicOss, ottPicOssKey, wxPic, wxPicKey, wxPicOss, wxPicOssKey} = res;
                nameKey && (this.formData.map.nameKey.key = nameKey);
                ottPicKey && (this.formData.map.ottPicKey.key = ottPicKey);
                ottPicOssKey && (this.formData.map.ottPicOssKey.key = ottPicOssKey);
                wxPicKey && (this.formData.map.wxPicKey.key = wxPicKey);
                wxPicOssKey && (this.formData.map.wxPicOssKey.key = wxPicOssKey);
                this.submitLoading = false;
                this.status = this.status === "editI18n" ? 'add' : 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },


        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        const edit = (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const del = (row) => {
                            this.submitDel(row);
                        };
                        const actorList = (row) => {
                            this.isLeike = row.isLeike;
                            this.showList(row.id);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', del);
                        this.$refs.Vtable.$on('actorList', actorList);
                        this.$refs.Vtable.$on('pageChange', pageChange);
                        this.$refs.Vtable.handCustomEvent = true;
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

        beforeUpload: function () {
            this.submitLoading = true;
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            if (this.pageAction === defaultData.pageAction) return;
            if (selectedItems.length > 0) {
                let actorNos = [];
                selectedItems.map(s => {
                    actorNos.push(s.actorNo);
                });
                this.formData.actorNos = actorNos;
            } else {
                this.formData.actorNos = [];
            }
        },

        submitSaveActors: function () {
            this.submitLoading = true;
            saveActors({actorNos: this.formData.actorNos}, this.rankId).then(res => {
                this.submitLoading = false;
                this.showList(this.rankId);
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

        submitDelSongs: function () {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                delAcotors({actorNos: this.formData.actorNos}, this.rankId).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.showList(this.rankId, false, true);
                }).catch(err => {
                    this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                    this.submitLoading = false;
                });
            };
        },
    }
});

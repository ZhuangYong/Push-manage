/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as editGroup, del as delGroup, saveActors, delAcotors} from '../../api/group';
import {bindData} from "../../utils/index";
import {languageList} from "../../api/language";

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        seq: '',
        isEnabled: 1,
        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },
        actorNos: []
    },

    viewRule: [
        {columnKey: 'seq', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'name', label: '名称', minWidth: 120, sortable: true},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'isEnabled', label: '状态', minWidth: 70, formatter: r => {
            if (r.isEnabled === 1) return '启用';
            if (r.isEnabled === 2) return '禁用';
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌星列表', type: 'actorList'}], minWidth: 234}
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

    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            return (
                this.pageAction === defaultData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <div>
                        {
                            this.lanList.length > 0 ? <el-form-item label="名称：" required>
                                <el-row style="max-width: 440px">
                                    <el-col span={6}>
                                        <el-form-item prop="x">
                                            <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col span={6}>
                                        <el-form-item prop="width">
                                            <el-button type="primary" onClick={f => this.editI18n("txt",
                                                this.lanList.map(lanItem => {
                                                    return {
                                                        label: lanItem.name + "名称：",
                                                        getValue: v => this.formData.map.nameKey[lanItem.language],
                                                        onChange: v => this.formData.map.nameKey[lanItem.language] = v,
                                                        placeholder: `请输入${lanItem.name}名称`,
                                                    };
                                                })
                                            )} plain size="small">点击编辑多语言</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item> : ''
                        }
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

                    {
                        this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={6}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.wxPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.wxPicKey[this.lanList[0].language] = this.formData.wxPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={6}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("img",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "图片：",
                                                    name: v => this.formData.map.wxPicKey[lanItem.language] = v,
                                                    defaultImg: v => this.formData.map.wxPicKey[lanItem.language],
                                                };
                                            })
                                            , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    {
                        this.lanList.length > 0 ? <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={6}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.ottPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.ottPicKey[this.lanList[0].language] = this.formData.ottPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={6}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("img",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "图片：",
                                                    name: v => this.formData.map.ottPicKey[lanItem.language] = v,
                                                    defaultImg: v => this.formData.map.ottPicKey[lanItem.language],
                                                };
                                            })
                                            , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={this.pageBack}>
                            取消
                        </el-button>
                    </el-form-item>
                </el-form> : ''
            );
        },

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.groupPage.config && this.operate.groupPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const isChooseActor = this.pageAction === chooseActorsData.pageAction;
            const isAcotrList = this.pageAction === actorListData.pageAction;
            const canChoose = isChooseActor && !(this.formData.actorNos.length > 0);
            return (
                this.searchId ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => {
                        this.pageBack();
                        this.showList(isChooseActor ? this.searchId : null);
                    }} type="primary" icon="caret-left">
                        返回
                    </el-button>

                    {
                        !this.isLeike ? <el-button class="filter-item" onClick={
                            () => {
                                if (isChooseActor) {
                                    this.submitSaveActors();
                                } else {
                                    this.showList(this.searchId, true);
                                }
                                this.goPage(this.PAGE_LIST);
                            }
                        } type="primary" disabled={canChoose}>
                                        {isChooseActor ? '选定' : '添加歌星'}
                                    </el-button> : ''
                    }

                    {
                        (isAcotrList && !this.isLeike) ? <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.formData.actorNos.length > 0)}>批量删除</el-button> : ''
                    }

                    </div> : (
                    this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                             <el-button class="filter-item" onClick={
                                 () => {
                                     this.goPage(this.PAGE_ADD);
                                     this.defaultFormData.map = {
                                         nameKey: {},
                                         ottPicKey: {},
                                         wxPicKey: {},
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

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        handelActorList(row) {
            this.isLeike = row.isLeike;
            this.goPage(this.PAGE_LIST);
            this.showList(row.id);
        },

        getDataWhenShowListChange(choosePage, id, refreshPage) {
            return choosePage ? Object.assign({}, chooseActorsData) : Object.assign({}, id ? actorListData : defaultData);
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
            saveActors({actorNos: this.formData.actorNos}, this.searchId).then(res => {
                this.submitLoading = false;
                this.showList(this.searchId);
                this.pageBack();
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
                delAcotors({actorNos: this.formData.actorNos}, this.searchId).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.refreshTable();
                }).catch(err => {
                    this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                    this.submitLoading = false;
                });
            };
        },
    }
});

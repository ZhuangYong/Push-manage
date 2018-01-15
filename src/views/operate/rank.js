/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveRank, del as delRank, saveSongs, delSongs} from '../../api/rank';
import {bindData} from "../../utils/index";
import {languageList} from "../../api/language";

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        isEnabled: 1, //是否使用, 1启用，2禁用
        sort: 1,

        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },

        serialNos: []
        // isUsage: 0,
    },
    viewRule: [
        {columnKey: 'rankId', label: '榜单标识', minWidth: 120, sortable: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
            if (r.isEnabled === 1) return '是';
            return '否';
        }, sortable: true},
        {columnKey: 'name', label: '榜单名称', minWidth: 120, sortable: true},
        {columnKey: 'wxImg', label: '榜单微信图片', minWidth: 90, imgColumn: 'wxImg'},
        {columnKey: 'ottImg', label: '榜单ott图片', minWidth: 90, imgColumn: 'ottImg'},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, formatter: r => r.createTime, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, formatter: r => r.updateTime, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, formatter: r => r.mediaListUpdateTime, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 234}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入榜单名称'}
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
        ],
    },
    listDataGetter: function() {
        return this.operate.rankPage;
    },
    pageAction: 'operate/rank/RefreshPage',
    tableCanSelect: false,
    pageActionSearch: [{
        column: 'name', label: '请输入榜单名称', type: 'input', value: ''
    }],
    pageActionSearchColumn: [],
    editFun: saveRank,
    delItemFun: delRank,
};

const musicData = {
    defaultFormData: {
        serialNos: []
    },
    viewRule: [
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 190},
        {columnKey: 'languageNorm', label: '歌曲语言', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'}
    ],
    listDataGetter: function() {
        return this.operate.rankMediaPage;
    },
    pageAction: 'operate/rank/media/RefreshPage',
    pageActionSearch: [{
        column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''
    }],
    tableCanSelect: true,
    pageActionSearchColumn: [],
};

const chooseMusicData = Object.assign({}, musicData, {
    listDataGetter: function() {
        return this.operate.mediaPage;
    },
    tableCanSelect: true,
    pageAction: 'operate/media/RefreshPage',
});

export default BaseListView.extend({
    name: 'rankIndex',
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
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            rankId: null,
            isLeike: false,
            pageAction: _defaultData.pageAction
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_TYPE_SAVE_IMG;
            if (this.status === 'editI18n') return this.cruI18n(h);
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} onInput={v => this.formData.isEnabled = v}>
                            <el-radio label={1} value={1}>是</el-radio>
                            <el-radio label={2} value={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                        <el-input value={this.formData.sort} onChange={v => this.formData.sort = v} number/>
                    </el-form-item>
                    {
                        this.lanList.length > 0 ? <el-form-item label="榜单名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
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
                        </el-form-item> : ""
                    }


                    {
                        this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.wxPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.wxPicKey[this.lanList[0].language] = this.formData.wxPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
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
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.ottPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.ottPicKey[this.lanList[0].language] = this.formData.ottPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("img",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "图片：",
                                                    name: v => this.formData.map.ottPicKey[lanItem.language] = v,
                                                    defaultImg: v => this.formData.map.ottPicKey[lanItem.language],
                                                };
                                            })
                                        )} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

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

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.rankPage.config && this.operate.rankPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const isChooseSong = this.pageAction === chooseMusicData.pageAction;
            const isSongList = this.pageAction === musicData.pageAction;
            return (
                this.rankId ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={f => this.showList(isChooseSong ? this.rankId : null)} type="primary" icon="caret-left">
                            返回
                        </el-button>
                        {
                            !this.isLeike ? <el-button class="filter-item" onClick={
                                () => {
                                    if (isChooseSong) {
                                        this.submitSaveSongs();
                                    } else {
                                        this.showList(this.rankId, true);
                                    }
                                    this.status = "list";
                                }
                            } type="primary" disabled={isChooseSong && !(this.formData.serialNos.length > 0)}>
                                        {isChooseSong ? '选定' : '添加'}
                                    </el-button> : ''
                        }

                        {
                            (isSongList && !this.isLeike) ? <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.formData.serialNos.length > 0)}>批量删除</el-button> : ''
                        }
                    </div> : (
                        this.status === 'list' ? <div class="filter-container table-top-button-container">
                             <el-button class="filter-item" onClick={
                                 () => {
                                     this.status = "add";
                                     this.defaultFormData.map = {
                                         nameKey: {},
                                         ottPicKey: {},
                                         wxPicKey: {},
                                     };
                                     this.formData = Object.assign({}, defaultData.defaultFormData);
                                 }
                             } type="primary" icon="edit">添加
                            </el-button>
                            <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'rank'})} type="primary" loading={updateIngFromLeiKe}>
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
                const _thisData = choosePage ? Object.assign({}, chooseMusicData) : Object.assign({}, id ? musicData : defaultData);
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
            this.formData.serialNos = [];
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        submitForm() {
            this.submitLoading = true;
            this.editFun && this.editFun(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.status = 'list';
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
                            this.formData = Object.assign({}, row);
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const musicList = (row) => {
                            this.isLeike = row.isLeike;
                            this.showList(row.rankId);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row, "rankId");
                        });
                        this.$refs.Vtable.$on('musicList', musicList);
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
                let serialNos = [];
                selectedItems.map(s => {
                    serialNos.push(s.serialNo);
                });
                this.formData.serialNos = serialNos;
            } else {
                this.formData.serialNos = [];
            }
        },

        submitSaveSongs: function () {
            this.submitLoading = true;
            saveSongs({serialNos: this.formData.serialNos}, this.rankId).then(res => {
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
                delSongs({serialNos: this.formData.serialNos}, this.rankId).then(res => {
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

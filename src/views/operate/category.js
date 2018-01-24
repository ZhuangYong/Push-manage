/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {del as delCategory, delSongs, save as saveCategory, saveSongs} from '../../api/category';
import {languageList} from "../../api/language";
import {adminTypeGroupGroupList} from "../../api/typeGroupManage";

const defaultData = {
    dataName: '分类数据',
    defaultFormData: {
        id: '',
        groups: '',
        name: '',
        isEnabled: 1, //是否使用,1启用，2禁用
        sort: 1,
        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },
        groupsUuid: '',
        serialNos: []
        // isUsage: 0,
    },

    viewRule: [
        {columnKey: 'rankId', label: '分类标识', minWidth: 120, sortable: true, inDetail: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true, inDetail: true},
        {columnKey: 'name', label: '分类名称', minWidth: 120, sortable: true},
        {columnKey: 'groups', label: '组名称', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 120, formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }, sortable: true},
        {columnKey: 'write', label: 'ott是否写字', minWidth: 120, formatter: r => {
            if (r.write === "true") return '是';
            return '否';
        }, inDetail: true},
        {columnKey: 'wxImg', label: '分类微信图片', minWidth: 90, imgColumn: 'wxImg'},
        {columnKey: 'ottImg', label: '分类ott图片', minWidth: 90, imgColumn: 'ottImg'},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        // {columnKey: 'isUsage', label: '是否启用', minWidth: 70, formatter: r => {
        //     if (r.isUsage === 1) return '是';
        //     if (r.isUsage === 0) return '否';
        // }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 236}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入图文消息名称'}
        ],
        groupsUuid: [
            {required: true, message: '请输入组名称'},
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字'},
        ],
    },
    listDataGetter: function() {
        return this.operate.categoryPage;
    },
    pageActionSearch: [{
        column: 'name', label: '请输入分类名称', type: 'input', value: ''
    }],
    pageAction: 'operate/category/RefreshPage',
    tableCanSelect: false,
    pageActionSearchColumn: [],
    editFun: saveCategory,
    delItemFun: delCategory,
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
        return this.operate.categoryMediaPage;
    },
    pageAction: 'operate/category/media/RefreshPage',
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
    name: 'categoryIndex',
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
            dataName: _defaultData.dataName,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            rankId: null,
            isLeike: false,
            pageAction: _defaultData.pageAction,
            i18nObj: {},
            cruI18n: f => f,
            preStatus: '',
            adminTypeGroupGroupList: []
        };
    },
    watch: {
       status: function () {
           let searched = false;
           this.pageActionSearch && this.pageActionSearch.map(item => {
               const {value} = item;
               if (value || value === 0) searched = true;
           });

       }
    },
    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);

        adminTypeGroupGroupList().then(res => {
            this.adminTypeGroupGroupList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_TYPE_SAVE_IMG;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            return (
                 <el-form v-loading={this.loading} class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                     <el-form-item label="是否开启：" prop="isEnabled">
                         <el-radio-group value={this.formData.isEnabled} onInput={v => this.formData.isEnabled = v}>
                             <el-radio label={1} value={1}>是</el-radio>
                             <el-radio label={2} value={2}>否</el-radio>
                         </el-radio-group>
                     </el-form-item>
                     <el-form-item label="排序：" prop="sort">
                         <el-input value={this.formData.sort} number onChange={v => this.formData.sort = parseInt(v, 10)}/>
                     </el-form-item>
                     <div>
                         {
                             this.lanList.length > 0 ? <el-form-item label="分类名称：" prop="name">
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

                         <el-form-item label="组名称：" prop="groupsUuid">
                             <el-select placeholder={'请选择'} value={this.formData.groupsUuid} name='groupsUuid' onChange={v => {
                                 this.adminTypeGroupGroupList.map(item => {
                                    if (item.groupUuid === v) this.formData.groups = item.name;
                                 });
                             }}>
                                 {
                                     this.adminTypeGroupGroupList.map(item => <el-option
                                         key={item.groupUuid}
                                         label={item.name}
                                         value={item.groupUuid}>
                                     </el-option>)
                                 }
                             </el-select>
                             {/*<el-input value={this.formData.groups} onChange={v => this.formData.groups = v}/>*/}
                         </el-form-item>
                         {/*<el-form-item label="ott是否写字：">
                             <el-radio-group value={this.formData.write} onInput={v => this.formData.write = v}>
                                 <el-radio value="true" label="true">是</el-radio>
                                 <el-radio value="false" label="false">否</el-radio>
                             </el-radio-group>
                         </el-form-item>*/}
                     </div>
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
                                             , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                     </el-form-item>
                                 </el-col>
                             </el-row>
                         </el-form-item> : ""
                     }

                     <el-form-item>
                         <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                             <el-button onClick={
                                 () => {
                                     this.goPage(this.PAGE_LIST);
                                 }
                             }>取消
                            </el-button>
                     </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.recommendPage.config && this.operate.recommendPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const isChooseSong = this.pageAction === chooseMusicData.pageAction;
            const isSongList = this.pageAction === musicData.pageAction;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        (this.pageAction !== defaultData.pageAction) ? <el-button class="filter-item" onClick={f => {
                            this.pageBack();
                            this.showList(isChooseSong ? this.searchId : null);
                        }} type="primary" icon="caret-left">
                            返回
                        </el-button> : ''
                    }
                    {
                        this.pageAction === defaultData.pageAction ? <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'type'})} type="primary" loading={updateIngFromLeiKe}>
                            {
                                updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                            }
                        </el-button> : ""
                    }
                    {
                        this.pageAction === defaultData.pageAction ? <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.defaultFormData.map = {
                                    nameKey: {},
                                    ottPicKey: {},
                                    wxPicKey: {},
                                };
                                this.formData = Object.assign({}, defaultData.defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button> : ""
                    }
                    {
                        (this.pageAction !== defaultData.pageAction && !this.isLeike) ? <el-button class="filter-item" onClick={
                            () => {
                                if (isChooseSong) {
                                    this.submitSaveSongs();
                                } else {
                                    this.showList(this.searchId, true);
                                }
                                this.goPage(this.PAGE_LIST);
                            }
                        } type="primary" disabled={isChooseSong && !(this.formData.serialNos && this.formData.serialNos.length)}>
                            {isChooseSong ? '选定' : '添加歌曲'}
                        </el-button> : ''
                    }

                    {
                        (isSongList && !this.isLeike) ? <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.formData.serialNos && this.formData.serialNos.length)}>批量删除</el-button> : ''
                    }
                </div> : ""
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        handelMusicList(row) {
            this.isLeike = row.isLeike;
            this.goPage(this.PAGE_LIST);
            this.showList(row.rankId);
        },

        getDataWhenShowListChange(choosePage, id, refreshPage) {
            return choosePage ? Object.assign({}, chooseMusicData) : Object.assign({}, id ? musicData : defaultData);
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
            saveSongs({serialNos: this.formData.serialNos}, this.searchId).then(res => {
                this.submitLoading = false;
                this.showList(this.searchId);
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
                delSongs({serialNos: this.formData.serialNos}, this.searchId).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.showList(this.searchId, false, true);
                }).catch(err => {
                    this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                    this.submitLoading = false;
                });
            };
        },
    }
});

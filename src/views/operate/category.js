/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveCategory, del as delCategory, saveSongs, delSongs} from '../../api/category';
import {bindData} from "../../utils/index";

const defaultData = {
    dataName: '分类数据',
    defaultFormData: {
        id: '',
        groups: '',
        name: '',
        codeAutoDay: 'true',
        isEnabled: 1, //是否使用,1启用，2禁用
        sort: '',

        ottCnEcs: "",
        ottPicOss: "",
        ottEnEcs: "",
        ottEnOss: "",
        ottFtEcs: "",
        ottFtOss: "",
        ottPicEcs: "",
        ottImgOss: "",

        wxCnEcs: "",
        wxPicOss: "",
        wxEnEcs: "",
        wxEnOss: "",
        wxFtEcs: "",
        wxFtOss: "",
        wxPicEcs: "",
        wxImgOss: "",

        serialNos: []
        // isUsage: 0,
    },
    viewRule: [
        {columnKey: 'rankId', label: '分类标识', minWidth: 120, sortable: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否使用', minWidth: 120, formatter: r => {
            if (r.isEnabled === 1) return '启用';
            if (r.isEnabled === 2) return '禁用';
        }, sortable: true},
        {columnKey: 'name', label: '分类名称', minWidth: 120, sortable: true},
        {columnKey: 'groups', label: '组名称', minWidth: 120, sortable: true},
        {columnKey: 'codeAutoDay', label: 'ott是否写字', minWidth: 120, formatter: r => {
            if (r.write === "true") return '是';
            return '否';
        }},
        {columnKey: 'wxImgOss', label: '分类微信图片', minWidth: 90, imgColumn: 'wxImgOss'},
        {columnKey: 'ottImgOss', label: '分类ott图片', minWidth: 90, imgColumn: 'ottImgOss'},
        {columnKey: 'wxPicOss', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxPicOss'},
        {columnKey: 'ottPicOss', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottPicOss'},
        // {columnKey: 'isUsage', label: '是否启用', minWidth: 70, formatter: r => {
        //     if (r.isUsage === 1) return '是';
        //     if (r.isUsage === 0) return '否';
        // }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 190}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入图文消息名称'}
        ],
        groups: [
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
            pageAction: _defaultData.pageAction
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
            return (
                 <el-form v-loading={this.loading} class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                     <el-form-item label="是否使用：" prop="isEnabled">
                         <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                             <el-radio label={1} value={1}>启用</el-radio>
                             <el-radio label={2} value={2}>禁用</el-radio>
                         </el-radio-group>
                     </el-form-item>
                     <el-form-item label="排序：" prop="sort">
                         <el-input value={this.formData.sort} name='sort' number/>
                     </el-form-item>
                     {
                         this.status === 'add' ? <div>
                             <el-form-item label="分类名称：" prop="name">
                                 <el-input value={this.formData.name} name="name"/>
                             </el-form-item>
                             <el-form-item label="组名称：" prop="groups">
                                 <el-input value={this.formData.groups} name="groups"/>
                             </el-form-item>
                             <el-form-item label="ott是否写字：">
                                 <el-radio-group value={this.formData.codeAutoDay} name='codeAutoDay'>
                                    <el-radio value="true" label="true">是</el-radio>
                                    <el-radio value="false" label="false">否</el-radio>
                                 </el-radio-group>
                             </el-form-item>
                             <el-form-item label="默认图片：" style="color: gray; margin-bottom: 0;">
                                 <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                             </el-form-item>
                             <el-form-item label="微信图片">
                                 <uploadImg defaultImg={this.formData.wxImgOss} actionUrl={uploadImgApi} name="wxImgOss" name2="wxPicEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                             </el-form-item>
                             <el-form-item label="ott图片">
                                 <uploadImg defaultImg={this.formData.ottImgOss} actionUrl={uploadImgApi} name="ottImgOss" name2="ottPicEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                             </el-form-item>
                         </div> : <el-form-item label="分类名称：">
                             {this.formData.name}
                         </el-form-item>
                     }
                     <el-form-item label="简体中文图片：" style="color: gray; margin-bottom: 0;">
                         <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                     </el-form-item>
                     <el-form-item label="微信自定义图片">
                         <uploadImg defaultImg={this.formData.wxPicOss} actionUrl={uploadImgApi} name="wxPicOss" name2="wxCnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>
                     <el-form-item label="ott自定义图片">
                         <uploadImg defaultImg={this.formData.ottPicOss} actionUrl={uploadImgApi} name="ottPicOss" name2="ottCnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>

                     <el-form-item label="英文图片：" style="color: gray; margin-bottom: 0;">
                         <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                     </el-form-item>
                     <el-form-item label="微信自定义图片">
                         <uploadImg defaultImg={this.formData.wxEnOss} actionUrl={uploadImgApi} name="wxEnOss" name2="wxEnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>
                     <el-form-item label="ott自定义图片">
                         <uploadImg defaultImg={this.formData.ottEnOss} actionUrl={uploadImgApi} name="ottEnOss" name2="ottEnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>

                     <el-form-item label="繁体图片：" style="color: gray; margin-bottom: 0;">
                         <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                     </el-form-item>
                     <el-form-item label="微信自定义图片">
                         <uploadImg defaultImg={this.formData.wxFtOss} actionUrl={uploadImgApi} name="wxFtOss" name2="wxFtEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>
                     <el-form-item label="ott自定义图片">
                         <uploadImg defaultImg={this.formData.ottFtOss} actionUrl={uploadImgApi} name="ottFtOss" name2="ottFtEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
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

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.categoryPage.config && this.operate.categoryPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
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
                                     this.formData = Object.assign({}, defaultData.defaultFormData);
                                 }
                             } type="primary" icon="edit">添加
                            </el-button>
                            <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'type'})} type="primary" loading={updateIngFromLeiKe}>
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
                if (valid) this.submitForm();
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

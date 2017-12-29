/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as editGroup, del as delGroup, saveActors, delAcotors} from '../../api/group';
import {bindData} from "../../utils/index";

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        seq: '',
        status: 1,

        ottEnEcs: "",
        ottEnOss: "",
        ottFtEcs: "",
        ottFtOss: "",
        ottOssPic: "",
        ottpic: "",

        wxEnEcs: "",
        wxEnOss: "",
        wxFtEcs: "",
        wxFtOss: "",
        wxOssPic: "",
        wxpic: "",

        actorNos: []
    },
    viewRule: [
        {columnKey: 'seq', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'name', label: '名称', minWidth: 120, sortable: true},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxOssPic'},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: 'wxOssPic'},
        {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
            if (r.status === 1) return '生效';
            if (r.status === 0) return '禁用';
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
            pageAction: _defaultData.pageAction
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
            return (

                this.pageAction === defaultData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.status === 'add' ? <div>
                             <el-form-item label="名称：" prop="name">
                                <el-input value={this.formData.name} placeholder="" name="name"/>
                             </el-form-item>
                             <el-form-item label="排序：" prop="seq">
                                 <el-input value={this.formData.seq} placeholder="" name="seq" number/>
                             </el-form-item>
                            <el-form-item label="状态：" prop="status">
                                <el-radio-group value={this.formData.status} name='status'>
                                    <el-radio value={1} label={1}>生效</el-radio>
                                    <el-radio value={0} label={0}>禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div> : <div>
                            <el-form-item label="名称：" prop="name">
                                <el-input value={this.formData.name} placeholder="" name="name"/>
                             </el-form-item>
                             <el-form-item label="排序：" prop="seq">
                                 <el-input value={this.formData.seq} placeholder="" name="seq" number/>
                             </el-form-item>
                            <el-form-item label="状态：" prop="status">
                                <el-radio-group value={this.formData.status} name='status'>
                                    <el-radio value={1} label={1}>生效</el-radio>
                                    <el-radio value={0} label={0}>禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    }

                    <el-form-item label="简体中文图片：" style="color: gray; margin-bottom: 0;">
                         <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                     </el-form-item>
                     <el-form-item label="微信自定义图片">
                         <uploadImg defaultImg={this.formData.wxOssPic} actionUrl={uploadImgApi} name="wxOssPic" name2="wxpic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>
                     <el-form-item label="ott自定义图片">
                         <uploadImg defaultImg={this.formData.ottOssPic} actionUrl={uploadImgApi} name="ottOssPic" name2="ottpic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
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
                </el-form> : ''
            );
        },

        topButtonHtml: function (h) {
            const updateIngFromLeiKe = (this.operate.groupPage.config && this.operate.groupPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const isChooseActor = this.pageAction === chooseActorsData.pageAction;
            const isAcotrList = this.pageAction === actorListData.pageAction;
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
                        } type="primary" disabled={isChooseActor && !(this.formData.actorNos.length > 0)}>
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

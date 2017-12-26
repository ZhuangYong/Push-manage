/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveCategory, del as delCategory} from '../../api/category';
import {bindData} from "../../utils/index";

const defaultData = {
    dataName: '分类数据',
    defaultFormData: {
        id: '',
        groups: '',
        name: '',
        codeAutoDay: 'true',

        ottCnEcs: "",
        ottCnOss: "",
        ottEnEcs: "",
        ottEnOss: "",
        ottFtEcs: "",
        ottFtOss: "",
        ottPicEcs: "",
        ottpic: "",

        wxCnEcs: "",
        wxCnOss: "",
        wxEnEcs: "",
        wxEnOss: "",
        wxFtEcs: "",
        wxFtOss: "",
        wxPicEcs: "",
        wxpic: "",
        // isUsage: 0,
    },
    viewRule: [
        {columnKey: 'rankId', label: '分类标识', minWidth: 120, sortable: true},
        {columnKey: 'isUsage', label: '是否使用', minWidth: 120, formatter: r => {
            if (r.isUsage === 0) return '否';
            if (r.isUsage === 1) return '是';
        }, sortable: true},
        {columnKey: 'name', label: '分类名称', minWidth: 120, sortable: true},
        {columnKey: 'groups', label: '组名称', minWidth: 120, sortable: true},
        {columnKey: 'codeAutoDay', label: 'ott是否写字', minWidth: 120, formatter: r => {
            if (r.write === "true") return '是';
            return '否';
        }},
        {columnKey: 'wxpic', label: '分类微信图片', minWidth: 90, imgColumn: 'wxpic'},
        {columnKey: 'ottpic', label: '分类ott图片', minWidth: 90, imgColumn: 'ottpic'},
        {columnKey: 'wxCnOss', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxCnOss'},
        {columnKey: 'ottCnOss', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottCnOss'},
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
    },
    listDataGetter: function() {
        return this.operate.categoryPage;
    },
    pageActionSearch: [{
        column: 'name', label: '请输入分类名称', type: 'input', value: ''
    }],
    pageAction: 'operate/category/RefreshPage',
    pageActionSearchColumn: [],
    editFun: saveCategory,
    delItemFun: delCategory,
};

const musicData = {
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
    pageActionSearchColumn: [],
};
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
                                 <uploadImg defaultImg={this.formData.wxpic} actionUrl={uploadImgApi} name="wxpic" name2="wxPicEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                             </el-form-item>
                             <el-form-item label="ott图片">
                                 <uploadImg defaultImg={this.formData.ottpic} actionUrl={uploadImgApi} name="ottpic" name2="ottPicEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                             </el-form-item>
                         </div> : <el-form-item label="分类名称：">
                             {this.formData.name}
                         </el-form-item>
                     }
                     <el-form-item label="简体中文图片：" style="color: gray; margin-bottom: 0;">
                         <h5 style="margin: 0">微信格式：300*180，ott格式：280*280 280*580 580*280 580*580</h5>
                     </el-form-item>
                     <el-form-item label="微信自定义图片">
                         <uploadImg defaultImg={this.formData.wxCnOss} actionUrl={uploadImgApi} name="wxCnOss" name2="wxCnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                     </el-form-item>
                     <el-form-item label="ott自定义图片">
                         <uploadImg defaultImg={this.formData.ottCnOss} actionUrl={uploadImgApi} name="ottCnOss" name2="ottCnEcs" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
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
            return (
                this.rankId ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => this.showList()} type="primary" icon="caret-left">
                        返回
                    </el-button>
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
         */
        showList: function (id) {
            this.rankId = id;
            setTimeout(f => {
                const _thisData = Object.assign({}, id ? musicData : defaultData);
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
                this.rankId = id;
            }, 50);
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
                            this.showList(row.rankId);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
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
        }

    }
});

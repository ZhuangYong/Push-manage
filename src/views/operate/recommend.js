/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveRecommend} from '../../api/recommend';
import {bindData} from "../../utils/index";

const defaultData = {
    defaultFormData: {
        id: '',
        wxCnOss: '',
        ottCnOss: '',
        isUsage: 0,
        tails: {
            isUsage: 0,
            wxCnOss: '',
            ottCnOss: ''
        }
    },
    viewRule: [
        {columnKey: 'rankId', label: '分类标识', minWidth: 70},
        {columnKey: 'name', label: '推荐名称', minWidth: 120},
        {columnKey: 'wxpic', label: '分类微信图片', minWidth: 90, imgColumn: 'wxpic'},
        {columnKey: 'ottpic', label: '分类ott图片', minWidth: 90, imgColumn: 'ottpic'},
        {columnKey: 'wxCnOss', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxCnOss'},
        {columnKey: 'ottCnOss', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottCnOss'},
        {columnKey: 'isUsage', label: '是否启用', minWidth: 70, formatter: r => {
            if (r.tails.isUsage === 1) return '是';
            if (r.tails.isUsage === 0) return '否';
        }},
        {columnKey: 'codeAutoDay', label: '创建时间', minWidth: 170, formatter: r => r.tails.createTime},
        {columnKey: 'codeAutoDay', label: '更新时间', minWidth: 170, formatter: r => r.tails.updateTime},
        {columnKey: 'codeAutoDay', label: '歌曲更新时间', minWidth: 170, formatter: r => r.tails.mediaListUpdateTime},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '歌曲列表', type: 'musicList'}], minWidth: 140}
    ],
    listDataGetter: function() {
        return this.operate.recommendPage;
    },
    pageAction: 'operate/recommend/RefreshPage',
    pageActionSearchColumn: [],
    editFun: saveRecommend,
};

const musicData = {
    viewRule: [
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 190},
        {columnKey: 'languageNorm', label: '歌曲语言', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'}
    ],
    listDataGetter: function() {
        return this.operate.recommendMediaPage;
    },
    pageAction: 'operate/recommend/media/RefreshPage',
    pageActionSearchColumn: [],
};
export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            rankId: null,
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_TYPE_SAVE_IMG;
            return (
                 <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.id} name="id"/>
                     <el-form-item label="分类名称：">
                         {this.formData.name}
                    </el-form-item>
                    <el-form-item label="自定义图片(300*180)：" prop="wxOssPic">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxCnOss} name="wxCnOss"/>
                        <uploadImg ref="upload1" defaultImg={this.formData.wxCnOss} actionUrl={uploadImgApi} name="wxCnOss" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(280*280 280*580 580*280 580*580)：" prop="ottCnOss">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottCnOss} name="ottCnOss"/>
                        <uploadImg ref="upload2" defaultImg={this.formData.ottCnOss} actionUrl={uploadImgApi} name="ottCnOss" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="是否启用：">
                        <el-radio-group value={this.formData.isUsage} name='isUsage'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={0} label={0}>否</el-radio>
                        </el-radio-group>
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
            return (
                this.rankId ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => this.showList()} type="primary" icon="caret-left">
                        返回
                    </el-button>
                    </div> : ""
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
                this.pageActionSearchColumn = [{
                    urlJoin: id
                }];
                this.rankId = id;
            }, 50);
        },

        submitAddOrUpdate: function () {
            this.submitLoading = true;
            const upImgFail = err => {
                this.submitLoading = false;
                this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            };
            this.$refs.upload1.handleStart({
                success: r => {
                    if (r) {
                        const {imageNet, imgPath} = r;
                        this.formData.wxCnOss = imageNet;
                        this.formData.wxCnEcs = imgPath;
                    }
                    this.$refs.upload2.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.ottCnOss = imageNet;
                                this.formData.ottCnEcs = imgPath;
                            }
                            this.formData.tails = Object.assign({}, this.formData.tails, {
                                wxCnOss: this.formData.wxCnOss,
                                wxCnEcs: this.formData.wxCnEcs,
                                ottCnOss: this.formData.ottCnOss,
                                ottCnEcs: this.formData.ottCnEcs,
                            });
                            this.submitForm();
                        }, fail: upImgFail
                    });
                }, fail: upImgFail
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
                            this.formData = Object.assign({}, row, row.tails);
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
                        this.$refs.Vtable.$on('musicList', musicList);
                        this.$refs.Vtable.$on('pageChange', pageChange);
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },

    }
});

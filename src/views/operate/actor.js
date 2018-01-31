/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as saveRank} from '../../api/actor';

const defaultData = {
    defaultFormData: {
        nameNorm: '',
        wxImgEcs: '',
        ottImgEcs: '',
    },
    viewRule: [
        {columnKey: 'actorNo', label: '歌星编号', minWidth: 120, sortable: true},
        {columnKey: 'nameNorm', label: '歌星名称', minWidth: 120, sortable: true},
        {columnKey: 'abbrNorm', label: '歌星首字母', minWidth: 140, sortable: true},
        {columnKey: 'actorTypeNorm', label: '歌星类型', minWidth: 90},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 110, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 110, imgColumn: 'ottPic'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '歌星歌曲', type: 'filterMedia'}], minWidth: 168}
    ],
    listDataGetter: function() {
        return this.operate.actorPage;
    },
    pageAction: 'operate/actor/RefreshPage',
    pageActionSearch: [
        {column: 'nameNorm', label: '请输入歌星名称', type: 'input', value: ''},
        {column: 'actorNo', label: '请输入歌星编号', type: 'input', value: ''},
        {column: 'serialNo', label: '请输入歌曲编号', type: 'input', value: ''}
        ],
    pageActionSearchColumn: [],
    editFun: saveRank,
};

const musicData = {
    viewRule: [
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 190},
        {columnKey: 'languageNorm', label: '歌曲语言', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'}
    ],
    listDataGetter: function() {
        return this.operate.rankMediaPage;
    },
    pageAction: 'operate/rank/media/RefreshPage',
    pageActionSearchColumn: [],
};
export default BaseListView.extend({
    name: 'rankIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
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
    created() {
        this.pageActionSearch[2].value = this.$route.query.serialNo || "";
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + apiUrl.API_TYPE_SAVE_IMG;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="分类名称：">
                         {this.formData.nameNorm}
                    </el-form-item>
                    <el-form-item label="微信自定义图片(300*180)：" prop="wxImgEcs">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxPic} name="wxPic"/>
                        <uploadImg ref="upload1" defaultImg={this.formData.wxPic} actionUrl={uploadImgApi} name="wxPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(280*280 280*580 580*280 580*580)：" prop="ottImg">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottPic} name="ottPic"/>
                        <uploadImg ref="upload2" defaultImg={this.formData.ottPic} actionUrl={uploadImgApi} name="ottPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
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
            const updateIngFromLeiKe = (this.operate.actorPage.config && this.operate.actorPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            return (
                (this.rankId && this.currentPage === this.PAGE_LIST) ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={f => this.showList()} type="primary" icon="caret-left">
                        返回
                    </el-button>
                    </div> : (
                    this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                            <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'actor'}, true)} type="primary" loading={updateIngFromLeiKe}>
                                {
                                    updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                                }
                            </el-button>
                        </div> : ''
                    )
            );
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
                        this.formData.wxImg = imageNet;
                        this.formData.wxImgEcs = imgPath;
                    }
                    this.$refs.upload2.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.ottImg = imageNet;
                                this.formData.ottImgEcs = imgPath;
                            }
                            this.submitForm();
                        }, fail: upImgFail
                    });
                }, fail: upImgFail
            });
        },

        submitForm() {
            this.applyApiDurFun(this.editFun, res => {
                this.pageBack();
            });
        },

        handelMusicList(row) {
            this.isLeike = row.isLeike;
            this.goPage(this.PAGE_LIST);
            this.showList(row.id);
        },

        /**
         * 跳转歌星歌曲
         * @param row
         */
        handelFilterMedia(row) {
            console.log(row);
            this.$router.push({path: "/operate/media", query: {actorNo: row.actorNo}});
        }

    }
});

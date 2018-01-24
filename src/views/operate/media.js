/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {mediaLanguageList, save as editMedia} from '../../api/media';

const defaultData = {
    defaultFormData: {
        wxOssPic: '',
        ottOssPic: '',
        isEnabled: 0
    },
    viewRule: [
        {columnKey: 'serialNo', label: '歌曲编号', minWidth: 120, sortable: true},
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 120, sortable: true},
        {columnKey: 'abbrNorm', label: '拼音首字母缩写', minWidth: 100, sortable: true},
        {columnKey: 'languageNorm', label: '语言', minWidth: 100},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottPic'},
        // {columnKey: 'charge', label: 'CIBN审核状态', minWidth: 100},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 70, formatter: r => {
            if (r.isEnabled === 1) return '是';
            if (r.isEnabled === 0) return '否';
        }},
        {columnKey: 'fileMark', label: '播放时长', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '查看歌星', type: 'filterActor'}], minWidth: 168}
    ],
    validateRule: {
        // wxImgEcs: [
        //     {required: true, message: '请选择自定义图片'},
        // ],
        // ottImgEcs: [
        //     {required: true, message: '请选择ott自定义图片'},
        // ],
    },
    listDataGetter: function() {
        return this.operate.mediaPage;
    },
    pageAction: 'operate/media/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [
        {column: 'languageNorm', label: '请选择语言类型', type: 'option', value: '', options: []},
        {column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''},
        {column: 'actorNo', label: '请输入歌星编码', type: 'input', value: ''}
    ],
    editFun: editMedia
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
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            formData: {},
            tableCanSelect: false,
            editFun: _defaultData.editFun,
            pageAction: _defaultData.pageAction,
            mediaLanguageList: []
        };
    },

    computed: {
        ...mapGetters(['operate'])
    },
    watch: {
        mediaLanguageList: function() {
            if (defaultData.pageActionSearch[0].options.length === 0) {
                this.mediaLanguageList.map(i => defaultData.pageActionSearch[0].options.push({label: i, value: i}));
            }
        }
    },
    created() {
        if (this.$route.query.actorNo) {
            this.pageActionSearch[2].value = this.$route.query.actorNo;
            this.searchedDefault = true;
        }
        mediaLanguageList().then(res => {
            this.mediaLanguageList = res;
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
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.id} name="id"/>
                    <el-form-item label="歌曲名称：">
                        {this.formData.nameNorm}
                    </el-form-item>
                    <el-form-item label="微信自定义图片(64*48或者等比例图片)：" prop="wxImg">
                        <uploadImg ref="upload1" defaultImg={this.formData.wxPic} actionUrl={uploadImgApi} name="wxPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(64*48或者等比例图片)：" prop="ottImg">
                        <uploadImg ref="upload2" defaultImg={this.formData.ottPic} actionUrl={uploadImgApi} name="ottPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                    </el-form-item>
                    <el-form-item label="是否开启：">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={0} label={0}>否</el-radio>
                        </el-radio-group>
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
            const updateIngFromLeiKe = (this.operate.mediaPage.config && this.operate.mediaPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const updateIngFromLeiKe2 = (this.operate.mediaPage.config2 && this.operate.mediaPage.config2.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'media'}, true)} type="primary" loading={updateIngFromLeiKe}>
                            {
                                updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                            }
                        </el-button>
                     <el-button class="filter-item" onClick={f => this.updateFromLeiKe(null, false, false, true)} type="primary" loading={updateIngFromLeiKe2}>
                            {
                                updateIngFromLeiKe2 ? "数据更新中" : "从雷客更新歌曲关联歌星"
                            }
                        </el-button>
                    </div> : ""
            );
        },


        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    const upImgFail = err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    };
                    this.submitLoading = true;
                    this.$refs.upload1.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.wxImgEcs = imgPath;
                                this.formData.wxImg = imageNet;
                            }
                            this.$refs.upload2.handleStart({
                                success: r => {
                                    if (r) {
                                        const {imageNet, imgPath} = r;
                                        this.formData.ottImgEcs = imgPath;
                                        this.formData.ottImg = imageNet;
                                    }
                                    this.submitForm();
                                }, fail: upImgFail
                            });
                        }, fail: upImgFail
                    });
                } else {
                    return false;
                }
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
                this.goPage(this.PAGE_LIST);
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

        handelFilterActor(row) {
            this.$router.push({path: "/operate/actor", query: {serialNo: row.serialNo}});
        }

    }
});

/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {save as editMedia} from '../../api/media';
import {updateTbActorOnMedia} from '../../api/category';

const defaultData = {
    defaultFormData: {
        wxOssPic: '',
        ottOssPic: '',
        isOpen: 0
    },
    viewRule: [
        {columnKey: 'serialNo', label: '歌曲编号', minWidth: 120},
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 120},
        {columnKey: 'abbrNorm', label: '拼音首字母缩写', minWidth: 100},
        {columnKey: 'languageNorm', label: '语言', minWidth: 100},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxImgEcs', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxImgEcs'},
        {columnKey: 'ottImgEcs', label: '自定义ott图片', minWidth: 100, imgColumn: 'ottImgEcs'},
        {columnKey: 'charge', label: 'CIBN审核状态', minWidth: 100},
        {columnKey: 'isOpen', label: '是否开启', minWidth: 70, formatter: r => {
            if (r.isOpen === 1) return '是';
            if (r.isOpen === 0) return '否';
        }},
        {columnKey: 'fileMark', label: '播放时长', minWidth: 170},
        {label: '操作', buttons: [{label: '修改', type: 'edit'}], minWidth: 70}
    ],
    validateRule: {
        wxImgEcs: [
            {required: true, message: '请选择自定义图片'},
        ],
        ottImgEcs: [
            {required: true, message: '请选择ott自定义图片'},
        ],
    },
    listDataGetter: function() {
        return this.operate.mediaPage;
    },
    pageAction: 'operate/media/RefreshPage',
    pageActionSearchColumn: [],
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
            formData: {},
            tableCanSelect: false,
            editFun: _defaultData.editFun,
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
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.id} name="id"/>
                    <el-form-item label="歌曲名称：">
                        {this.formData.nameNorm}
                    </el-form-item>
                    <el-form-item label="微信自定义图片(64*48或者等比例图片)：" prop="wxImgEcs">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxImgEcs} name="wxImgEcs"/>
                        <uploadImg ref="upload1" defaultImg={this.formData.wxImgEcs} actionUrl={uploadImgApi} name="wxImgEcs" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(64*48或者等比例图片)：" prop="ottImgEcs">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottImgEcs} name="ottImgEcs"/>
                        <uploadImg ref="upload2" defaultImg={this.formData.ottImgEcs} actionUrl={uploadImgApi} name="ottImgEcs" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="是否开启：">
                        <el-radio-group value={this.formData.isOpen} name='isOpen'>
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
            const updateIngFromLeiKe = (this.operate.mediaPage.config && this.operate.mediaPage.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            const updateIngFromLeiKe2 = (this.operate.mediaPage.config2 && this.operate.mediaPage.config2.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
            return (
                this.status === 'list' ? <div class="filter-container table-top-button-container">
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
                                this.formData.wxImgEcs = imageNet;
                                this.formData.wxImg = imgPath;
                            }
                            this.$refs.upload2.handleStart({
                                success: r => {
                                    if (r) {
                                        const {imageNet, imgPath} = r;
                                        this.formData.ottImgEcs = imageNet;
                                        this.formData.ottImg = imgPath;
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
                this.status = 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

    }
});

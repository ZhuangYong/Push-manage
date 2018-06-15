import {mapGetters} from "vuex";
import uploadImg from '../../components/Upload/singleImage.vue';
import apiUrl from "../../api/apiUrl";
import {edit as editLoad, del as delLoad} from "../../api/load";
import Const from "../../utils/const";
import BaseListView from "../../components/common/BaseListView";
import {languageList} from "../../api/language";
import JPanel from "../../components/panel/JPanel";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'image', label: '图片', imgColumn: "image"},
        {columnKey: 'video', label: '视频', videoColumn: "video"},
        {columnKey: 'remark', label: '备注', minWidth: 120},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    defaultFormData: {
        name: '',
        image: '',
        imageKey: '',
        video: '',
        videoKey: '',
        duration: 12,
        remark: '',
    },
    validRules: {
        name: [
            {required: true, message: '请输入名称'},
        ],
        duration: [
            {required: true, message: '请输入显示时长'},
            {type: 'number', message: '必须为数字'},
        ],
        video: [
            {required: true, message: '请选择'},
        ],
        image: [
            {required: true, message: '请选择'},
        ],
    },
    listDataGetter: function() {
        return this.epgMange.loadList;
    },
    pageAction: 'epg/load/RefreshPage',
    pageActionSearch: [{
        column: 'name', label: '请输入名称', type: 'input', value: ''
    }],
    pagination: true,
    pageActionSearchColumn: [],
};

export default BaseListView.extend({
    name: 'loadManagePage',
    components: {
        uploadImg,
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: "list",
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            templateId: 0,
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItem: null, // 选择列
            formData: _defaultData.defaultFormData, // 表单数据
            userGroup: [],
            upgrade: [],
            romList: [],
            appList: [],
            tipTxt: "",
            preStatus: [],
            tableCanSelect: false,
            dialogVisible: false,
            defaultCurrentPage: 1,
            validRules: _defaultData.validRules,
            rules: _defaultData.validRules,
            editFun: editLoad,
            delItemFun: delLoad
        };
    },
    computed: {
        ...mapGetters(['epgMange'])
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
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_SCREEN_SAVE_IMAGE;
            const uploadVideoApi = Const.BASE_API + '/' + apiUrl.API_ADMIN_LOAD_SAVE_UPGRADE;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            return (
                <JPanel title={`${this.formData.id ? "修改" : "添加"}广告`}>
                    <el-form v-loading={this.loading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.validRules} label-position="right" label-width="140px">
                        <div>
                            <el-form-item label="名称：" prop="name">
                                <el-input value={this.formData.name} name="name"/>
                            </el-form-item>
                            {
                                this.lanList.length > 0 ? <el-form-item label="广告页图片：">
                                    <el-row style="max-width: 440px">
                                        <el-col span={6}>
                                            <el-form-item prop="x">
                                                <uploadImg defaultImg={this.formData.image} actionUrl={uploadImgApi} name={v => this.formData.image = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item> : ""
                            }

                            {
                                this.lanList.length > 0 ? <el-form-item label="广告页视频：">
                                    <el-row style="max-width: 440px">
                                        <el-col span={6}>
                                            <el-form-item prop="x">
                                                <uploadImg ref="videoImgLoader" defaultImg={this.formData.video} actionUrl={uploadVideoApi} name={v => this.formData.video = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true} isVideo={true}/>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item> : ""
                            }
                            <el-form-item label="广告视频显示时长：" prop="duration">
                                <el-input value={this.formData.duration} name='duration' number onChange={v => this.formData.sort = parseInt(v, 10)}/>
                            </el-form-item>
                            <el-form-item label="备注：" prop="remark">
                                <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
                             </el-form-item>
                        </div>

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
                </JPanel>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },


        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            if (this.$refs.videoImgLoader.uploadSuccessData) {
                const {fileName, fileSize, filemd5} = this.$refs.videoImgLoader.uploadSuccessData;
                this.formData.fileName = fileName;
                this.formData.fileSize = fileSize;
                this.formData.filemd5 = filemd5;
            }
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

    },
});

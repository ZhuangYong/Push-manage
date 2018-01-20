import {mapGetters} from "vuex";
import uploadImg from '../../components/Upload/singleImage.vue';
import apiUrl from "../../api/apiUrl";
import {edit as editLoad, del as delLoad} from "../../api/load";
import Const from "../../utils/const";
import BaseListView from "../../components/common/BaseListView";
import {languageList} from "../../api/language";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: '', label: '图片', imgColumn: r => (r.map && r.map.imageKey) && (r.map.imageKey.cn || r.map.imageKey.en || r.map.imageKey.hk || r.map.imageKey.tw)},
        {columnKey: '', label: '视频', videoColumn: r => (r.map && r.map.videoKey) && (r.map.videoKey.cn || r.map.videoKey.en || r.map.videoKey.hk || r.map.videoKey.tw)},
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
        map: {
            imageKey: {},
            videoKey: {},
        },
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_SCREEN_SAVE_IMAGE;
            if (this.status === 'editI18n') return this.cruI18n(h);
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validRules} label-position="right" label-width="140px">
                    <div>
                        <el-form-item label="名称：" prop="name">
                            <el-input value={this.formData.name} name="name"/>
                        </el-form-item>
                        <el-form-item label="显示时长：" prop="duration">
                            <el-input value={this.formData.duration} name='duration' number/>
                        </el-form-item>
                        {
                            this.lanList.length > 0 ? <el-form-item label="广告页图片：" prop="image">
                                <el-row style="max-width: 440px">
                                    <el-col span={6}>
                                        <el-form-item prop="x">
                                            <uploadImg defaultImg={this.formData.map.imageKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.imageKey[this.lanList[0].language] = this.formData.image = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col span={6}>
                                        <el-form-item prop="width">
                                            <el-button type="primary" onClick={f => this.editI18n("img",
                                                this.lanList.map(lanItem => {
                                                    return {
                                                        label: lanItem.name + "图片：",
                                                        name: v => this.formData.map.imageKey[lanItem.language] = v,
                                                        defaultImg: v => this.formData.map.imageKey[lanItem.language],
                                                    };
                                                })
                                                , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item> : ""
                        }

                        {
                            this.lanList.length > 0 ? <el-form-item label="广告页视频：" prop="video">
                                <el-row style="max-width: 440px">
                                    <el-col span={6}>
                                        <el-form-item prop="x">
                                            <uploadImg defaultImg={this.formData.map.videoKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.videoKey[this.lanList[0].language] = this.formData.video = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true} isVideo={true}/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col span={6}>
                                        <el-form-item prop="width">
                                            <el-button type="primary" onClick={f => this.editI18n("img",
                                                this.lanList.map(lanItem => {
                                                    return {
                                                        label: lanItem.name + "视频：",
                                                        name: v => this.formData.map.videoKey[lanItem.language] = v,
                                                        defaultImg: v => this.formData.map.videoKey[lanItem.language],
                                                    };
                                                })
                                                , uploadImgApi, true)} plain size="small">点击编辑多语言</el-button>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form-item> : ""
                        }
                        <el-form-item label="备注：" prop="remark">
                            <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
                         </el-form-item>
                    </div>

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
                this.status === "list" ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
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
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

    },
});

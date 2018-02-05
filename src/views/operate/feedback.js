import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {feedbackSave, feedbackDelete, feedbackClassifyList} from '../../api/feedback';

const defaultData = {
    defaultFormData: {
        id: '',
        remark: '',
        content: ''
    },
    viewRule: [
        {columnKey: 'nickName', label: '昵称', minWidth: 100, sortable: true},
        {columnKey: 'phone', label: '联系方式', minWidth: 100, inDetail: true},
        {columnKey: 'name', label: '问题类型', minWidth: 120},
        {columnKey: 'questionDesc', label: '问题描述', minWidth: 180},
        {columnKey: 'coverMap', label: '反馈图片', minWidth: 90, imgColumn: "images", inDetail: true},
        {columnKey: 'deviceId', label: '设备编号', minWidth: 180},
        {columnKey: 'channelName', label: '机型', minWidth: 100},
        {columnKey: 'createTime', label: '提交时间', minWidth: 170, sortable: true},
        {columnKey: 'remark', label: '备注', minWidth: 180},
        // 1： 未回复 2： 已回复
        {columnKey: 'replyStatus', label: '回复状态', minWidth: 100, formatter: r => {
            if (r.replyStatus === 1) return '未回复';
            if (r.replyStatus === 2) return '已回复';
        }},
        {label: '操作', buttons: [{label: '回复/备注', type: 'edit'}, {label: '删除', type: 'del'}, {label: '查看', type: 'showReply'}], minWidth: 240}
    ],
    validateRule: {
        remark: [
            {required: true, message: '请输入备注'}
        ],
        content: [
            {required: true, message: '请输入回复'}
        ],
    },
    listDataGetter: function() {
        return this.operate.feedbackPage;
    },
    enableDefaultCurrentPage: true,
    pageAction: 'operate/feedback/RefreshPage',
    pageActionSearch: [
        {column: 'nickname', label: '请输入昵称', type: 'input', value: ''},
        { column: 'questionId', label: '请选择问题分类', type: 'option', value: '', options: []},
    ],
};

const replyData = {
    defaultFormData: {}, // 默认表单值
    viewRule: [
        {columnKey: 'feedbackUuid', label: '反馈id', minWidth: 90, inDetail: true},
        {columnKey: 'replyContent', label: '回复内容', minWidth: 120},
        {columnKey: 'replyName', label: '回复名', minWidth: 120, sortable: true},
        {columnKey: 'replyTime', label: '回复时间', minWidth: 170, sortable: true}
    ],
        validateRule: {
        questionName: [
            {required: true, message: '请输入问题分类'}
        ],
            seq: [
            {required: true, message: '请输入排序序号'},
            {type: 'number', message: '请输入数字'}
        ],
    },
    listDataGetter: function() {
        return this.operate.feedbackClassifyPageReply;
    },
    pageAction: 'operate/feedback/reply/RefreshPage',
    tableCanSelect: false, // 表单项是否可以选择
    pageActionSearchColumn: [],
    enableDefaultCurrentPage: false,
    pageActionSearch: []
};

export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            feedbackId: '',
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearch: _defaultData.pageActionSearch,
            formData: Object.assign({}, _defaultData.defaultFormData), // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            classifyList: [],
            delItemFun: feedbackDelete,
            editFun: feedbackSave
        };
    },

    computed: {
        ...mapGetters(['operate'])
    },

    created() {
        this.refreshFeedbackClassifyList();
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_CHANNEL_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                         <el-input style="display: none;" type="hidden" value={this.formData.id} name="tag"/>
                     <el-form-item label="问题分类:">
                         <el-input value={this.formData.name} disabled={true}/>
                     </el-form-item>
                    <el-form-item label="问题描述：">
                         <el-input type="textarea" rows={2} value={this.formData.questionDesc} placeholder="设置后不能修改" disabled={true}/>
                     </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                         <el-input type="textarea" rows={4} value={this.formData.remark} placeholder="" name="remark"/>
                     </el-form-item>
                    <el-form-item label="回复：" prop="content">
                         <el-input type="textarea" rows={4} value={this.formData.content} placeholder="" name="content"/>
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
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        this.pageAction === replyData.pageAction ? <el-button class="filter-item" onClick={
                                () => {
                                    this.showList();
                                }
                            } type="primary" icon="back">
                            返回
                        </el-button> : ""
                    }
                    </div> : ""
            );
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function (id) {
            this.feedbackId = id;
            setTimeout(f => {
                const _thisData = Object.assign({}, id ? replyData : defaultData);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                this.enableDefaultCurrentPage = !id;
                if (id) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        id: id
                    }];
                    if (this.isLeike) this.tableCanSelect = false;
                } else {
                    this.pageActionSearchColumn = [];
                }
                this.feedbackId = id;
            }, 50);
            this.formData.serialNos = [];
        },

        /**
         * 查看回复
         * @param row
         */
        handelShowReply: function (row) {
            this.goPage(this.PAGE_LIST);
            this.showList(row.id);
        },

        refreshFeedbackClassifyList() {
            this.loading = true;
            feedbackClassifyList().then(r => {
                this.classifyList = r;
                this.pageActionSearch[1].value = this.$route.query.questionId;
                this.pageActionSearch[1].options = [];
                r.map(i => this.pageActionSearch[1].options.push({label: i.name, value: i.questionId}));
                this.$refs.Vtable.handelActionSearchChange();
                this.$refs.Vtable.handelSearch();
                this.loading = false;
            }).catch(e => this.loading = false);
        }
    }
});

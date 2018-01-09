import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {feedbackSave, feedbackDelete} from '../../api/feedback';

const defaultData = {
    defaultFormData: {
        id: '',
        remark: '',
        content: ''

    },
    viewRule: [
        {columnKey: 'nickname', label: '昵称', minWidth: 100, sortable: true},
        {columnKey: 'tails', label: '问题类型', minWidth: 120, formatter: r => r.tails.questionName},
        {columnKey: 'questionDesc', label: '问题描述', minWidth: 180},
        {columnKey: 'deviceUuid', label: '设备编号', minWidth: 180},
        {columnKey: 'channelName', label: '机型', minWidth: 100},
        {columnKey: 'submitTime', label: '提交时间', minWidth: 170, sortable: true},
        {columnKey: 'remark', label: '备注', minWidth: 180},
        // 1： 未回复 2： 已回复
        {columnKey: 'replyStatus', label: '回复状态', minWidth: 100, formatter: r => {
            if (r.replyStatus === 1) return '未回复';
            if (r.replyStatus === 2) return '已回复';
        }},
        {label: '操作', buttons: [{label: '回复/备注', type: 'edit'}, {label: '删除', type: 'del'}, {label: '查看', type: 'showReply'}], minWidth: 190}
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
    pageAction: 'operate/feedback/RefreshPage',
    pageActionSearch: [{
        column: 'nickname', label: '请输入昵称', type: 'input', value: ''
    }],
};

const replyData = {
    defaultFormData: {}, // 默认表单值
    viewRule: [
        {columnKey: 'feedbackId', label: '问题ID', minWidth: 90, sortable: true},
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
            formData: _defaultData.defaultFormData, // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            delItemFun: feedbackDelete,
            updateItemFun: feedbackSave
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_CHANNEL_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                         <el-input style="display: none;" type="hidden" value={this.formData.id} name="tag"/>
                     <el-form-item label="问题分类:">
                         <el-input value={this.formData.tails.questionName} disabled={true}/>
                     </el-form-item>
                    <el-form-item label="问题描述：">
                         <el-input value={this.formData.questionDesc} placeholder="设置后不能修改" disabled={true}/>
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
                    {
                        this.pageAction === replyData.pageAction ? <el-button class="filter-item" onClick={
                                () => {
                                    this.showList();
                                }
                            } type="primary" icon="back">
                            返回
                        </el-button> : <el-button class="filter-item" onClick={
                                () => {
                                    this.$router.push('/operate/feedbackClassify');
                                }
                            } type="primary" icon="edit">
                            问题分类管理
                        </el-button>
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

        handelShowReply: function (row) {
            this.showList(row.id);
        }
    }
});

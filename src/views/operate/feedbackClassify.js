import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {bindData} from "../../utils/index";
import {feedbackClassifySave, feedbackClassifyDelete, feedbackReply} from '../../api/feedback';

const defaultFormData = {
    questionName: '',
    seq: 1,
    status: 1
};
const defaultData = {
    listData: {
        viewRule: [
            {columnKey: 'seq', label: '排序', minWidth: 90, sortable: true},
            {columnKey: 'questionName', label: '问题分类', minWidth: 120},
            {columnKey: 'feedbackNum', label: '反馈数量', minWidth: 120},
            {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
                if (r.status === 1) return '生效';
                if (r.status === 0) return '禁用';
            }},
            {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
            {label: '操作', buttons: [{label: '修改', type: 'edit'}, {label: '删除', type: 'del'}, {label: '查看', type: 'show'}], minWidth: 120}
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
            return this.operate.feedbackClassifyPage;
        },
        pageAction: 'operate/feedback/classify/RefreshPage',
        pageActionSearch: [{
            column: 'questionName', label: '请输入问题分类', type: 'input', value: ''
        }],
        pageActionSearchColumn: [],
        defaultFormData: defaultFormData, // 默认表单值
        formData: {}, // 表单值
        tableCanSelect: false, // 表单项是否可以选择
        delItemFun: feedbackClassifyDelete,
        addItemFun: feedbackClassifySave,
        updateItemFun: feedbackClassifySave
    },
    replyData: {
        viewRule: [
            {columnKey: 'feedbackId', label: '问题ID', minWidth: 90},
            {columnKey: 'replyContent', label: '回复内容', minWidth: 120},
            {columnKey: 'replyName', label: '回复名', minWidth: 120},
            {columnKey: 'replyTime', label: '回复时间', minWidth: 70}
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
        defaultFormData: {}, // 默认表单值
        tableCanSelect: false, // 表单项是否可以选择
        pageActionSearchColumn: [],
        pageActionSearch: []
    }
};

export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        const _defaultData = Object.assign({}, defaultData.listData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            pageAction: _defaultData.pageAction,
            validateRule: _defaultData.validateRule,
            selectItems: []
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
                     <el-form-item label="问题分类:" prop="questionName">
                         <el-input value={this.formData.questionName} name="questionName"/>
                     </el-form-item>
                    <el-form-item label="状态：">
                         <el-select placeholder="请选择" value={this.formData.status} onHandleOptionClick={f => this.formData.status = f.value} >
                                <el-option label="禁用" value={0} key={0}/>
                                <el-option label="启用" value={1} key={1}/>
                            </el-select>
                     </el-form-item>
                    <el-form-item label="排序：" prop="seq">
                         <el-input value={this.formData.seq} placeholder="" name="seq" number/>
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
                this.status === "list" && this.listStatus === 'list' ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : (this.listStatus === 'reply' ? <div class="filter-container table-top-button-container">
                    <el-button type="primary" icon='arrow-left' onClick={this.historyBack}>返回</el-button>
                </div> : '')
            );
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {

                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });

                        this.$refs.Vtable.$on('show', (row) => {
                            this.selectItems = row;
                            this.listStatus = 'reply';
                            this.preStatus.push('list');
                            this.showList();
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'reply':
                    break;
                default:
                    break;
            }
        },
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
        showList: function () {
            setTimeout(f => {
                let _thisData = defaultData[this.listStatus + 'Data'];
                const id = this.listStatus !== 'list' ? this.selectItems.id : null;
                for (let key in _thisData) {
                    this[key] = _thisData[key];
                }
                this.enableDefaultCurrentPage = !id;
                if (this.listStatus !== 'list') {
                    this.pageActionSearchColumn = [{
                        id: id
                    }];
                }
            }, 50);
        },
        historyBack: function () {
            const lastPage = this.preStatus.pop();
            this.listStatus = lastPage;
            this.showList();
        },
    }
});

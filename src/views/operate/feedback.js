import BasePage from "../../components/common/BasePage";
import BaseView from "../../components/common/BaseView";
import {Component} from "vue-property-decorator";
import {feedbackSave, feedbackDelete, feedbackClassifyList} from '../../api/feedback';
import {State} from "vuex-class";

@Component({name: "FeedBackView"})
export default class FeedBackView extends BaseView {
    constructor() {
        super();
    }
    created() {
        this.initialPages([<IndexPage/>, <ReplyPage/>, <EditReplayOrRemark/>]);
    }
}

@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    delItemFun = feedbackDelete;
    tableAction = 'operate/feedback/RefreshPage';
    viewRule = [
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
    ];
    tableActionSearch = [
        {column: 'nickname', label: '请输入昵称', type: 'input', value: ''},
        { column: 'questionId', label: '请选择问题分类', type: 'option', value: '', options: []},
    ];

    @State(state => state.operate.feedbackPage) tableData;

    created() {
        this.refreshFeedbackClassifyList();
    }
    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    refreshFeedbackClassifyList() {
        this.loading = true;
        feedbackClassifyList().then(r => {
            r.map(i => this.tableActionSearch[1].options.push({label: i.name, value: i.questionId}));
            this.loading = false;
        }).catch(e => this.loading = false);
    }

    /**
     * 查看回复
     * @param row
     */
    handelShowReply(row) {
        this.goPage("ReplyPage", {formData: row});
    }

    handelEdit(row) {
        this.goPage("EditReplayOrRemark", {formData: row});
    }
}


@Component({name: "ReplyPage"})
class ReplyPage extends BasePage {
    tableAction = 'operate/feedback/reply/RefreshPage';
    viewRule = [
        {columnKey: 'feedbackUuid', label: '反馈id', minWidth: 90, inDetail: true},
        {columnKey: 'replyContent', label: '回复内容', minWidth: 120},
        {columnKey: 'replyName', label: '回复名', minWidth: 120, sortable: true},
        {columnKey: 'replyTime', label: '回复时间', minWidth: 170, sortable: true}
    ];

    @State(state => state.operate.feedbackClassifyPageReply) tableData;

    created() {
        this.tableActionSearchColumn = [{id: this.formData.id}];
    }
    render(h) {
        return <div>
            {
                this.pageBackFormHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }
}

@Component({name: "EditReplayOrRemark"})
class EditReplayOrRemark extends BasePage {
    editFun = feedbackSave;
    defaultFormData = {
        id: '',
        remark: '',
        content: ''
    };
    validateRule = {
        content: [
            {required: true, message: '请输入回复'}
        ],
    };
    render() {
        return (
            <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                 <el-form-item label="问题分类:">
                     <el-input value={this.formData.name} disabled={true}/>
                 </el-form-item>
                <el-form-item label="问题描述：">
                     <el-input type="textarea" rows={2} value={this.formData.questionDesc} placeholder="设置后不能修改" disabled={true}/>
                 </el-form-item>
                <el-form-item label="回复：" prop="content">
                     <el-input type="textarea" rows={4} value={this.formData.content} placeholder="请对该意见反馈回复" onChange={v => this.formData.content = v}/>
                 </el-form-item>
                <el-form-item label="备注：">
                    <el-input type="textarea" rows={4} value={this.formData.remark} placeholder="请对该意见反馈做备注" onChange={v => this.formData.remark = v}/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" onClick={() => {
                        this.submitAddOrUpdate(() => this.pageBack());
                    }}>提交</el-button>
                    <el-button onClick={this.pageBack}>取消
                    </el-button>
                </el-form-item>
            </el-form>
        );
    }
}

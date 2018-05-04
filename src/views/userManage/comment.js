/**
 * Created by Zed on 2018/5/4.
 */
import {Component} from "vue-property-decorator";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class/lib/index";
import {commentFilter, commentSwitchEnable, deleteComment} from "../../api/comment";

@Component({
    name: 'commentView'
})
export default class CommentView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <ReplyPage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'comment/RefreshPage';
    commentType = 1;
    viewRule = [
        {columnKey: 'createTime', label: '评论时间', minWidth: 120},
        {columnKey: 'content', label: '评论内容', minWidth: 120},
        {columnKey: 'filterContent', label: '过滤后内容', minWidth: 120},
        {columnKey: 'tails', label: '评论所属录音', formatter: (r, h) => r.tails.nameNorm, minWidth: 120},
        {columnKey: 'nickName', label: '评论者微信昵称', minWidth: 120},
        {imgColumn: 'headerImg', label: '评论者微信头像', minWidth: 120},
        {label: '操作', buttons: [
                {label: r => r.isEnabled === 2 ? '生效' : '禁用', type: 'ban'},
                {label: r => r.sensitiveFilter === 2 ? '过滤' : '取消过滤', type: 'filter'},
                {label: '查看回复', type: 'reply'},
                {label: '删除', type: 'del'}
            ], minWidth: 284}
    ];

    tableActionSearch = [
        {column: 'nameNorm', label: '录音关键字', type: 'input', value: ''},
        {column: 'content', label: '评论关键字', type: 'input', value: ''},
    ];

    @State(state => state.userManage.commentPage) tableData;

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

    handelBan(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要${row.isEnabled === 2 ? '禁用' : '生效'}吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            const params = {
                type: this.commentType,
                operate: row.isEnabled === 1 ? 2 : 1,
                uuid: row.uuid,
            };
            commentSwitchEnable(params).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }

    handelFilter(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要${row.sensitiveFilter === 2 ? '过滤' : '取消过滤'}吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            const params = {
                type: this.commentType,
                operate: row.sensitiveFilter === 1 ? 2 : 1,
                uuid: row.uuid,
            };
            commentFilter(params).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }

    handelReply(row) {
        this.goPage('ReplyPage', {formData: row});
    }

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要删除吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            const params = {
                type: this.commentType,
                uuid: row.uuid,
            };
            deleteComment(params).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }
}

@Component({name: 'ReplyPage'})
class ReplyPage extends IndexPage {
    tableAction = 'reply/RefreshPage';
    commentType = 2;
    viewRule = [
        {columnKey: 'createTime', label: '回复时间', minWidth: 120},
        {columnKey: 'content', label: '回复内容', minWidth: 120},
        {columnKey: 'filterContent', label: '过滤后内容', minWidth: 120},
        {columnKey: 'nickName', label: '回复者微信昵称', minWidth: 120},
        {imgColumn: 'headerImg', label: '回复者微信头像', minWidth: 120},
        {label: '操作', buttons: [
                {label: r => r.isEnabled === 2 ? '生效' : '禁用', type: 'ban'},
                {label: r => r.sensitiveFilter === 2 ? '过滤' : '取消过滤', type: 'filter'},
                {label: '删除', type: 'del'}
            ], minWidth: 284}
    ];
    tableActionSearch = [
        {column: 'content', label: '回复关键字', type: 'input', value: ''},
    ];

    @State(state => state.userManage.replyPage) tableData;
    created() {
        this.targetId = this.formData.uuid;
        this.tableActionSearchColumn = [{uuid: this.targetId}];
    }

    render(h) {
        return <div>
            {
                this.pageBackHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }


}

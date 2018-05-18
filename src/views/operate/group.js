import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {State} from 'vuex-class';
import BasePage from "../../components/common/BasePage";
import EditI18nPage from "../commPages/editI18nPage";
import {del as delGroup, delAcotors, saveActors} from "../../api/group";
import Const from "../../utils/const";
import EditGroupPage from "./editPages/editGroupPage";
import {ActorMediaPage} from "./media";
import ActorPage from "../commPages/actorPage";
import EditActorPage from "./editPages/editActorPage";
import {actorPage} from "../../api/actor";
import EditMediaPage from "./editPages/editMediaPage";

/**
 * 主视图
 */
@Component({name: "RankView"})
export default class RankView extends BaseView {
    created() {
        this.initialPages([
            <IndexPage />,
            <EditI18nPage />,
            <EditGroupPage />,
            <RankOwnActorPage />,
            <RankChooseActorsPage />,
            <ActorMediaPage />,
            <EditActorPage />,
            <EditMediaPage />,
        ]);
    }
}

/**
 * actor page
 */
@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'operate/group/RefreshPage';
    viewRule = [
        {columnKey: 'seq', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'name', label: '名称', minWidth: 120, sortable: true},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'isEnabled', label: '状态', minWidth: 70, formatter: r => {
                if (r.isEnabled === 1) return '启用';
                if (r.isEnabled === 2) return '禁用';
            }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌星列表', type: 'actorList'}], minWidth: 234}
    ];
    tableActionSearch = [{
        column: 'name', label: '请输入名称', type: 'input', value: ''
    }];
    delItemFun = delGroup;

    @State(state => state.operate.groupPage) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        const updateIngFromLeiKe = (this.tableData.config && this.tableData.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditGroupPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
            <el-button class="filter-item" onClick={f => this.updateFromLeiKe(null, false, true)} type="primary"
                       loading={updateIngFromLeiKe}>
                {
                    updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                }
            </el-button>
        </div>;
    }

    /**
     * 跳向歌曲页面
     * @param row
     */
    handelActorList(row) {
        this.goPage("RankOwnActorPage", {formData: row});
    }

    /**
     * 修改歌星自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditGroupPage", {formData: row});
    }
}

@Component({name: 'RankOwnActorPage'})
class RankOwnActorPage extends ActorPage {
    tableAction = 'operate/group/actor/RefreshPage';
    tableActionSearch = [{
        column: 'nameNorm', label: '请输入歌星名称', type: 'input', value: ''
    }];

    @State(state => state.operate.groupActorPage) tableData;
    isLeike = false;
    actorNos = [];
    tableCanSelect = true;

    created() {
        this.targetId = this.formData.id;
        this.tableActionSearchColumn = [{urlJoin: this.targetId}];
        this.isLeike = this.formData.isLeike;
    }

    topButtonHtml() {
        return !this.isLeike ? <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage('RankChooseActorsPage', {formData: this.formData});
                }
            } type="primary">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.actorNos && this.actorNos.length)}>
                批量删除
            </el-button>
        </div> : "";
    }

    handelEdit(row) {
        this.loading = true;
        actorPage({actorNo: row.actorNo}).then(res => {
            this.goPage('EditActorPage', {formData: res.data[0]});
            this.loading = false;
        }).catch(err => this.loading = false);
    }

    /**
     * 跳转到音乐列表
     * @param row
     */
    handelFilterMedia(row) {
        this.goPage("ActorMediaPage", {formData: {actorNo: row.actorNo}});
    }

    /**
     * 删除自定义分类中歌曲
     */
    submitDelSongs() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            delAcotors({actorNos: this.actorNos}, this.targetId).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
            }).catch(() => this.submitLoading = false);
        };
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.actorNo);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

@Component({name: 'RankChooseActorsPage'})
class RankChooseActorsPage extends ActorPage {

    tableCanSelect = true;
    created() {
        this.viewRule.pop();
        this.targetId = this.formData.id;
    }
    actorNos = [];

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveSongs} type="primary">
                选定
            </el-button>
        </div>;
    }

    submitSaveSongs() {
        this.submitLoading = true;
        saveActors({actorNos: this.actorNos}, this.targetId).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(err => this.submitLoading = false);
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.actorNo);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

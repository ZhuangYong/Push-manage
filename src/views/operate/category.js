/* eslint-disable no-undef */
import BaseView from "../../components/common/BaseView";
import {State} from "vuex-class/lib/index";
import BasePage from "../../components/common/BasePage";
import EditI18nPage from "../commPages/editI18nPage";
import EditCategoryPage from "./editPages/editCategoryPage";
import MusicPage from "../commPages/musicPage";
import {Component} from "vue-property-decorator";
import Const from "../../utils/const";
import {del as delCategory, delSongs, saveSongs} from "../../api/category";

/**
 * 主视图
 */
@Component({name: "CategoryView"})
export default class CategoryView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditCategoryPage/>, <EditI18nPage/>, <OwnMusicPage/>, <ChooseMusicPage/>]);
    }
}

/**
 * 主页：分类页面
 */
@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'operate/category/RefreshPage';
    viewRule = [
        {columnKey: 'rankId', label: '分类标识', minWidth: 120, sortable: true, inDetail: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true, inDetail: true},
        {columnKey: 'name', label: '分类名称', minWidth: 120, sortable: true},
        {columnKey: 'groups', label: '组名称', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 120, formatter: r => {
            if (r.isEnabled === 1) return '是';
            return '否';
        }, sortable: true},
        {columnKey: 'write', label: 'ott是否写字', minWidth: 120, formatter: r => {
            if (r.write === "true") return '是';
            return '否';
        }, inDetail: true},
        {columnKey: 'wxImg', label: '分类微信图片', minWidth: 90, imgColumn: 'wxImg'},
        {columnKey: 'ottImg', label: '分类ott图片', minWidth: 90, imgColumn: 'ottImg'},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 236}
    ];

    tableActionSearch = [{
        column: 'name', label: '请输入分类名称', type: 'input', value: ''
    }];
    delItemFun = delCategory;

    @State(state => state.operate.categoryPage) tableData;

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

    topButtonHtml(h) {
        const updateIngFromLeiKe = (this.tableData.config && this.tableData.config.confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING);
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'type'})} type="primary" loading={updateIngFromLeiKe}>
                {
                    updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                }
            </el-button>
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditCategoryPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    /**
     * 跳向修改分类页面
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditCategoryPage", {formData: row});
    }

    /**
     * 跳向歌曲页面
     * @param row
     */
    handelMusicList(row) {
        this.goPage("OwnMusicPage", {formData: row});
    }

}

/**
 * 分类下歌曲列表页面
 */
@Component({name: "OwnMusicPage"})
class OwnMusicPage extends MusicPage {
    isLeike = false;
    serialNos = [];
    tableCanSelect = true;
    tableAction = 'operate/category/media/RefreshPage';
    viewRule = [
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 190},
        {columnKey: 'languageNorm', label: '歌曲语言', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'}
    ];
    tableActionSearch = [{
        column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''
    }];

    @State(state => state.operate.categoryMediaPage) tableData;

    created() {
        this.targetId = this.formData.rankId;
        this.tableActionSearchColumn = [{urlJoin: this.targetId}];
        this.isLeike = this.formData.isLeike;
    }

    topButtonHtml() {
        return !this.isLeike ? <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("ChooseMusicPage", {formData: this.formData});
                }
            } type="primary">
                添加歌曲
            </el-button>
            <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.serialNos && this.serialNos.length)}>
                批量删除
            </el-button>
        </div> : "";
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
            delSongs({serialNos: this.serialNos}, this.targetId).then(res => {
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
            let serialNos = [];
            selectedItems.map(s => {
                serialNos.push(s.serialNo);
            });
            this.serialNos = serialNos;
        } else {
            this.serialNos = [];
        }
    }
}

/**
 * 选择歌曲页面
 */
@Component({name: "ChooseMusicPage"})
class ChooseMusicPage extends MusicPage {
    targetId = "";
    tableCanSelect = true;
    tableAction = 'operate/media/RefreshPage';
    @State(state => state.operate.mediaPage) tableData;
    viewRule = [
        {columnKey: 'nameNorm', label: '歌曲名称', minWidth: 190},
        {columnKey: 'languageNorm', label: '歌曲语言', minWidth: 190},
        {columnKey: 'image', label: '图片', minWidth: 90, imgColumn: 'image'}
    ];
    tableActionSearch = [{
        column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''
    }];

    created() {
        this.targetId = this.formData.rankId;
    }

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveSongs} type="primary">
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveSongs() {
        this.submitLoading = true;
        saveSongs({serialNos: this.formData.serialNos}, this.targetId).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(() => this.submitLoading = false);
    }

    /**
    * 获取选择列
    * @param selectedItems
    */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let serialNos = [];
            selectedItems.map(s => {
                serialNos.push(s.serialNo);
            });
            this.formData.serialNos = serialNos;
        } else {
            this.formData.serialNos = [];
        }
    }
}

import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {State} from 'vuex-class';
import BasePage from "../../components/common/BasePage";
import {del as delRank, delSongs, saveSongs} from "../../api/rank";
import EditRankPage from "./editPages/editRankPage";
import EditI18nPage from "../commPages/editI18nPage";
import OwnMusicPage from "../commPages/ownMusicPage";
import EditMediaPage from "./editPages/editMediaPage";
import ChooseMusicPage from "../commPages/chooseMusicPage";

/**
 * 主视图
 */
@Component({name: "RankView"})
export default class RankView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditRankPage />, <EditI18nPage />, <RankOwnMusicPage />, <EditMediaPage />, <RankChooseMusicPage />]);
    }
}

/**
 * actor page
 */
@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'operate/rank/RefreshPage';
    viewRule = [
        {columnKey: 'rankId', label: '榜单标识', minWidth: 120, sortable: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }, sortable: true},
        {columnKey: 'name', label: '榜单名称', minWidth: 120, sortable: true},
        {columnKey: 'wxImg', label: '榜单微信图片', minWidth: 90, imgColumn: 'wxImg'},
        {columnKey: 'ottImg', label: '榜单ott图片', minWidth: 90, imgColumn: 'ottImg'},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, formatter: r => r.createTime, sortable: true, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, formatter: r => r.updateTime, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, formatter: r => r.mediaListUpdateTime, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 234}
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入榜单名称', type: 'input', value: ''},
        {column: 'isEnabled', label: '请选择是否启用', type: 'option', value: '', options: [
                {label: '是', value: 1},
                {label: '否', value: 2}
            ]},
    ];

    delItemFun = delRank;

    @State(state => state.operate.rankPage) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage("EditRankPage");
                }
            } type="primary" icon="edit">添加
            </el-button>
        </div>;
    }

    /**
     * 跳向歌曲页面
     * @param row
     */
    handelMusicList(row) {
        this.goPage("RankOwnMusicPage", {formData: row});
    }

    /**
     * 修改歌星自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditRankPage", {formData: row});
    }
}

/**
 * 分类下歌曲列表页面
 */
@Component({name: "RankOwnMusicPage"})
class RankOwnMusicPage extends OwnMusicPage {
    delSongFun = delSongs;
    chooseMusicPageName = 'RankChooseMusicPage';
}

/**
 * 选择歌曲页面
 */
@Component({name: "RankChooseMusicPage"})
class RankChooseMusicPage extends ChooseMusicPage {
    saveSongFun = saveSongs;
}

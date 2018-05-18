import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {State} from 'vuex-class';
import BasePage from "../../components/common/BasePage";
import {del as delRecommend, delSongs, saveSongs} from "../../api/recommend";
import EditRecommendPage from "./editPages/editRecommendPage";
import EditI18nPage from "../commPages/editI18nPage";
import OwnMusicPage from "../commPages/ownMusicPage";
import EditMediaPage from "./editPages/editMediaPage";
import ChooseMusicPage from "../commPages/chooseMusicPage";

/**
 * 主视图
 */
@Component({name: "RecommendView"})
export default class RecommendView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditRecommendPage />, <EditI18nPage />, <RecommendOwnMusicPage />, <EditMediaPage />, <RecommendChooseMusicPage />]);
    }
}

/**
 * actor page
 */
@Component({name: "IndexPage"})
class IndexPage extends BasePage {
    tableAction = 'operate/recommend/RefreshPage';
    viewRule = [
        {columnKey: 'rankId', label: '分类标识', minWidth: 120, sortable: true},
        {columnKey: 'sort', label: '排序', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
                if (r.isEnabled === 1) return '启用';
                return '禁用';
            }, sortable: true},
        {columnKey: 'name', label: '推荐名称', minWidth: 120, sortable: true},
        {columnKey: 'wxImg', label: '推荐微信图片', minWidth: 90, imgColumn: 'wxImg'},
        {columnKey: 'ottImg', label: '推荐ott图片', minWidth: 90, imgColumn: 'ottImg'},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw)},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw)},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, sortable: true},
        {columnKey: 'mediaListUpdateTime', label: '歌曲更新时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del', condition: r => !r.isLeike}, {label: '歌曲列表', type: 'musicList'}], minWidth: 236}
        ];
    tableActionSearch = [
        {column: 'name', label: '请输推荐名称', type: 'input', value: ''},
        {column: 'isEnabled', label: '请选择是否启用', type: 'option', value: '', options: [
                {label: '是', value: 1},
                {label: '否', value: 2}
            ]},
        ];
    delItemFun = delRecommend;

    @State(state => state.operate.recommendPage) tableData;

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
                    this.goPage("EditRecommendPage");
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
        this.goPage("RecommendOwnMusicPage", {formData: row});
    }

    /**
     * 修改歌星自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditRecommendPage", {formData: row});
    }
}

/**
 * 分类下歌曲列表页面
 */
@Component({name: "RecommendOwnMusicPage"})
class RecommendOwnMusicPage extends OwnMusicPage {
    delSongFun = delSongs;
    chooseMusicPageName = 'RecommendChooseMusicPage';
}

/**
 * 选择歌曲页面
 */
@Component({name: "RecommendChooseMusicPage"})
class RecommendChooseMusicPage extends ChooseMusicPage {
    saveSongFun = saveSongs;
}

/* eslint-disable no-undef */
import BaseView from "../../components/common/BaseView";
import {State} from "vuex-class/lib/index";
import BasePage from "../../components/common/BasePage";
import EditI18nPage from "../commPages/editI18nPage";
import EditCategoryPage from "./editPages/editCategoryPage";
import ChooseMusicPage from "../commPages/chooseMusicPage";
import {Component} from "vue-property-decorator";
import Const from "../../utils/const";
import {del as delCategory, delSongs, saveSongs} from "../../api/category";
import EditMediaPage from "./editPages/editMediaPage";
import OwnMusicPage from "../commPages/ownMusicPage";

/**
 * 主视图
 */
@Component({name: "CategoryView"})
export default class CategoryView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <EditCategoryPage/>, <EditI18nPage/>, <CatOwnMusicPage/>, <CatChooseMusicPage/>, <EditMediaPage />]);
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
            {/*<el-button class="filter-item" onClick={f => this.updateFromLeiKe({type: 'type'})} type="primary" loading={updateIngFromLeiKe}>
                {
                    updateIngFromLeiKe ? "数据更新中" : "从雷客更新"
                }
            </el-button>*/}
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
        this.goPage("CatOwnMusicPage", {formData: row});
    }

}

/**
 * 分类下歌曲列表页面
 */
@Component({name: "CatOwnMusicPage"})
class CatOwnMusicPage extends OwnMusicPage {
    tableAction = 'operate/category/media/RefreshPage';
    delSongFun = delSongs;
    chooseMusicPageName = 'CatChooseMusicPage';
    @State(state => state.operate.categoryMediaPage) tableData;
}

/**
 * 选择歌曲页面
 */
@Component({name: "CatChooseMusicPage"})
class CatChooseMusicPage extends ChooseMusicPage {
    saveSongFun = saveSongs;
}

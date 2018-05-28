/**
 * Created by Zed on 2018/5/18.
 */
import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {State} from "vuex-class/lib/index";
import MusicPage from "./musicPage";

/**
 * 选择歌曲页面
 */
@Component({name: "ChooseMusicPage"})
export default class ChooseMusicPage extends MusicPage {
    targetId = "";
    serialNos = [];
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
    saveSongFun = null;

    created() {
        this.targetId = this.formData.rankId;
    }

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveSongs} type="primary" disabled={this.serialNos.length <= 0}>
                选定
            </el-button>
        </div>;
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveSongs() {
        this.submitLoading = true;
        typeof this.saveSongFun === 'function' && this.saveSongFun({serialNos: this.serialNos}, this.targetId).then(res => {
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
            this.serialNos = serialNos;
        } else {
            this.serialNos = [];
        }
    }
}

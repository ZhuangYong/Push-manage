/**
 * Created by Zed on 2018/5/18.
 */

import {Component} from "vue-property-decorator/lib/vue-property-decorator";
import {mediaPage} from "../../api/media";
import MusicPage from "./musicPage";

/**
 * 分类下歌曲列表页面
 */
@Component({name: "OwnMusicPage"})
export default class OwnMusicPage extends MusicPage {
    isLeike = false;
    serialNos = [];
    tableCanSelect = true;
    // delSongFun = delSongs;
    delSongFun = null;
    chooseMusicPageName = '';

    created() {
        this.viewRule[this.viewRule.length - 1] = {label: '操作', buttons: [{label: '编辑', type: 'edit'}], minWidth: 98};
        this.targetId = this.formData.rankId;
        this.tableActionSearchColumn = [{rankId: this.targetId}];
        this.isLeike = this.formData.isLeike;
    }

    topButtonHtml() {
        return !this.isLeike ? <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage(this.chooseMusicPageName, {formData: this.formData});
                }
            } type="primary">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.serialNos && this.serialNos.length)}>
                批量删除
            </el-button>
        </div> : "";
    }

    handelEdit(row) {
        this.goPage('EditMediaPage', {formData: row});
        // this.loading = true;
        // mediaPage({serialNo: row.serialNo}).then(res => {
        //     this.goPage('EditMediaPage', {formData: res.data[0]});
        //     this.loading = false;
        // }).catch(err => this.loading = false);
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
            typeof this.delSongFun === 'function' && this.delSongFun({serialNos: this.serialNos}, this.targetId).then(res => {
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

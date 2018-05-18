import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {State} from 'vuex-class';
import MusicPage from "../commPages/musicPage";
import ActorPage from "../commPages/actorPage";
import EditActorPage from "./editPages/editActorPage";
import EditMediaPage from "./editPages/editMediaPage";

/**
 * 主视图
 */
@Component({name: "MediaView"})
export default class MediaView extends BaseView {
    @State('operate') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;
    created() {
        this.initialPages([<IndexPage/>, <EditActorPage/>, <EditMediaPage/>, <MediaActorPage/>, <ActorMediaPage />]);
    }
}


/**
 * music page
 */
@Component({name: "IndexPage"})
class IndexPage extends MusicPage {


    /**
     * 跳转到音乐列表
     * @param row
     */
    handelFilterActor(row) {
        this.goPage("MediaActorPage", {formData: {serialNo: row.serialNo}});
    }

    /**
     * 编辑歌曲中自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditMediaPage", {formData: row});
    }
}

/**
 * actor page
 */
@Component({name: "MediaActorPage"})
class MediaActorPage extends ActorPage {

    tableActionSearch = [];

    created() {
        this.tableActionSearchColumn = [{serialNo: this.formData.serialNo}];
    }

    render(h) {
        return <div>
            <div class="filter-container table-top-button-container">
                <el-button class="filter-item" onClick={this.pageBack} type="primary">返回</el-button>
            </div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    /**
     * 跳回到音乐列表
     * @param row
     */
    handelFilterMedia(row) {
        this.goPage("ActorMediaPage", {formData: {actorNo: row.actorNo}});
    }

    /**
     * 跳向歌星修改自定义图片页面
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditActorPage", {formData: row});
    }

    topButtonHtml(h) {
        return '';
    }
}

@Component({name: 'ActorMediaPage'})
export class ActorMediaPage extends IndexPage {

    created() {
        this.viewRule[this.viewRule.length - 1] = {label: '操作', buttons: [{label: '编辑', type: 'edit'}], minWidth: 98};
        this.tableActionSearch.pop();
        this.tableActionSearchColumn = [{actorNo: this.formData.actorNo}];
    }

    topButtonHtml(h) {
        return '';
    }
}

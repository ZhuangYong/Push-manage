import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {State} from 'vuex-class';
import ActorPage from "../commPages/actorPage";
import EditActorPage from "./editPages/editActorPage";
import EditMediaPage from "./editPages/editMediaPage";
import {ActorMediaPage} from "./media";

/**
 * 主视图
 */
@Component({name: "ActorView"})
export default class ActorView extends BaseView {
    @State('operate') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;
    created() {
        this.initialPages([<IndexPage/>, <EditActorPage/>, <EditMediaPage/>, <ActorMediaPage/>]);
    }
}

/**
 * actor page
 */
@Component({name: "IndexPage"})
class IndexPage extends ActorPage {

    /**
     * 跳转到音乐列表
     * @param row
     */
    handelFilterMedia(row) {
        this.goPage("ActorMediaPage", {formData: {actorNo: row.actorNo}});
    }

    /**
     * 修改歌星自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditActorPage", {formData: row});
    }
}


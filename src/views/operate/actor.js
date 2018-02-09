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
@Component
export default class ActorView extends BaseView {
    @State('operate') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;
    created() {
        this.initialPages([<IndexPage/>, <EditActorPage/>, <EditMediaPage/>, <ActorMusicPage/>]);
    }
}

/**
 * actor page
 */
@Component
class IndexPage extends ActorPage {

    /**
     * 跳转到音乐列表
     * @param row
     */
    handelFilterMedia(row) {
        this.goPage("ActorMusicPage", {defaultSearch: [{actorNo: row.actorNo}]});
    }

    /**
     * 修改歌星自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditActorPage", {formData: row});
    }
}

/**
 * music page
 */
@Component
class ActorMusicPage extends MusicPage {

    /**
     * 跳回到歌星列表，并以歌星number过滤
     * @param row
     */
    handelFilterActor(row) {
        this.pageBackTo("IndexPage", {defaultSearch: [{serialNo: row.serialNo}]});
    }

    /**
     * 修改歌曲自定义图片
     * @param row
     */
    handelEdit(row) {
        this.goPage("EditMediaPage", {formData: row});
    }
}


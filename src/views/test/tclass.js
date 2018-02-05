import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import uploadImg from '../../components/Upload/singleImage.vue';
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import MusicPage from "../../components/commonPages/MusicPage";
import {save as saveRank} from '../../api/actor';
import ActorPage from "../../components/commonPages/ActorPage";

/**
 * 主页面
 */
@Component({
    name: 'actorView',
})
export default class Actor extends BaseView {
    @State('operate') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;
    created() {
        this.initialPages([<IndexPage/>, <EditPage/>, <ActorMusicPage/>]);
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
}

/**
 * music page
 */
@Component
class ActorMusicPage extends MusicPage {

    /**
     * 跳转到音乐列表
     * @param row
     */
    handelFilterActor(row) {
        this.pageBackTo("IndexPage", {defaultSearch: [{serialNo: row.serialNo}]});
    }
}

@Component({
    name: "EditPage",
    components: {
        uploadImg
    }
})
class EditPage extends BasePage {
    editFun = saveRank;
    render() {
        const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_TYPE_SAVE_IMG;
        return <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" label-position="right" label-width="180px">
            <el-form-item label="分类名称：">
                {this.formData.nameNorm}
            </el-form-item>
            <el-form-item label="微信自定义图片(300*180)：" prop="wxImgEcs">
                <el-input style="display: none;" type="hidden" value={this.formData.wxPic} name="wxPic"/>
                <uploadImg ref="upload1" defaultImg={this.formData.wxPic} actionUrl={uploadImgApi} name="wxPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
            </el-form-item>
            <el-form-item label="ott自定义图片(280*280 280*580 580*280 580*580)：" prop="ottImg">
                <el-input style="display: none;" type="hidden" value={this.formData.ottPic} name="ottPic"/>
                <uploadImg ref="upload2" defaultImg={this.formData.ottPic} actionUrl={uploadImgApi} name="ottPic" chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" onClick={() => {
                    this.submitAddOrUpdate(() => {
                        this.pageBack();
                    });
                }}>提交</el-button>
                <el-button onClick={this.pageBack}>取消
                </el-button>
            </el-form-item>
        </el-form>;
    }
}

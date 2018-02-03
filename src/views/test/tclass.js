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
        this.initialPages([<ListPage/>, <EditPage/>, <MusicPage/>]);
    }

    handelTableEvent() {
        console.log("??? sub page ????");
    }
}

/**
 * actor
 */
@Component
class ListPage extends BasePage {
    pageAction = 'operate/actor/RefreshPage';
    viewRule = [
        {columnKey: 'actorNo', label: '歌星编号', minWidth: 120, sortable: true},
        {columnKey: 'nameNorm', label: '歌星名称', minWidth: 120, sortable: true},
        {columnKey: 'abbrNorm', label: '歌星首字母', minWidth: 140, sortable: true},
        {columnKey: 'actorTypeNorm', label: '歌星类型', minWidth: 90},
        {columnKey: 'image', label: '图片', minWidth: 100, imgColumn: 'image'},
        {columnKey: 'wxPic', label: '自定义微信图片', minWidth: 110, imgColumn: 'wxPic'},
        {columnKey: 'ottPic', label: '自定义ott图片', minWidth: 110, imgColumn: 'ottPic'},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '歌星歌曲', type: 'filterMedia'}], minWidth: 168}
    ];
    @State(state => state.operate.actorPage) tableData;

    render(h) {
        return this.tableHtml(h);
    }

    handelFilterMedia(row) {
        this.goPage("MusicPage");
    }
}


@Component({
    name: "EditPage",
    components: {
        uploadImg
    }
})
class EditPage extends BasePage {
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
                {/*<el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>*/}
                <el-button onClick={this.pageBack}>取消
                </el-button>
            </el-form-item>
        </el-form>;
    }
}

// import Vue from 'vue';
// import Component from 'vue-class-component';
// import * as tsx from "vue-tsx-support";
//
// // import BaseView from '../../components/common/BaseView';
// // import {
// //     State,
// //     Getter,
// //     Action,
// //     Mutation,
// //     namespace
// // } from 'vuex-class';
// //
// // const ModuleGetter = namespace('path/to/module', Getter);
// @Component
// export class tclass extends tsx.Component {
//     // @State('foo') stateFoo;
//     // @State(state => state.bar) stateBar;
//     // @Getter('foo') getterFoo;
//     // @Action('foo') actionFoo;
//     // @Mutation('foo') mutationFoo;
//     // @ModuleGetter('foo') moduleGetterFoo;
//
//     // If the argument is omitted, use the property name
//     // for each state/getter/action/mutation type
//     // @State foo;
//     // @Getter bar;
//     // @Action baz;
//     // @Mutation qux;
//
//     created () {
//         console.log("--------------------------");
//         this.stateFoo; // -> store.state.foo
//         this.stateBar; // -> store.state.bar
//         this.getterFoo; // -> store.getters.foo
//         this.actionFoo({ value: true }); // -> store.dispatch('foo', { value: true })
//         this.mutationFoo({ value: true }); // -> store.commit('foo', { value: true })
//         this.moduleGetterFoo; // -> store.getters['path/to/module/foo']
//     }
//
//     render() {
//         return 'ggg';
//     }
// }

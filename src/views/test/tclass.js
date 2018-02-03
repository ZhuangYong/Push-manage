import {Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';
import BasePage from "../../components/common/BasePage";

@Component({
    name: 'actorView',
})
export default class Actor extends BaseView {
    @State('operate') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;
    created() {
        this.initialPages([<ListPage/>, <EditPage/>]);
    }
}

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
    @State(state => state.operate.actorPage) pageData;

    created() {
        // this.showTable();
    }

    render(h) {
        return this.tableHtml(h);
    }
}

@Component
class EditPage extends BasePage {
    render() {
        console.log(this.ttttttt);
        return <div>editPage</div>;
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

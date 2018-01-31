import component from "vue-class-component";
import BaseView from "../../components/common/BaseView";
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';
import {VNode} from "vue";

@component({
    name: 'ttt',
    props: {
        text: {
            type: Number,
            require: true
        }
    },
})
export default class tclass extends BaseView {
    @State('channel') stateChannel;
    @State(state => state.channel.channelPage) channelPageChannel;

    page = 1;
    created() {
        this.pFunc();
    }

    render(h) {
        console.log("------ render-------");
        return <div>ggg</div>;
    }

    beforeRouteEnter () {
        console.log('beforeRouteEnter');
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave');
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

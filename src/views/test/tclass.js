import Vue from 'vue';
import Component from 'vue-class-component';
// import BaseView from '../../components/common/BaseView';
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';

const ModuleGetter = namespace('path/to/module', Getter);

@Component
export class tclass extends Vue {
    @State('foo') stateFoo;
    @State(state => state.bar) stateBar;
    @Getter('foo') getterFoo;
    @Action('foo') actionFoo;
    @Mutation('foo') mutationFoo;
    @ModuleGetter('foo') moduleGetterFoo;

    // If the argument is omitted, use the property name
    // for each state/getter/action/mutation type
    @State foo;
    @Getter bar;
    @Action baz;
    @Mutation qux;

    created () {
        console.log("--------------------------");
        this.stateFoo; // -> store.state.foo
        this.stateBar; // -> store.state.bar
        this.getterFoo; // -> store.getters.foo
        this.actionFoo({ value: true }); // -> store.dispatch('foo', { value: true })
        this.mutationFoo({ value: true }); // -> store.commit('foo', { value: true })
        this.moduleGetterFoo; // -> store.getters['path/to/module/foo']
    }

    render() {
        console.log("00000000000");
    }
}

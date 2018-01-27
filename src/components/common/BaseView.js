import Vue from 'vue';
import {Component} from "vue-class-component";

@Component
export class BaseView extends Vue {

    beforeRouteEnter () {
        console.log('beforeRouteEnter');
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave');
    }
}

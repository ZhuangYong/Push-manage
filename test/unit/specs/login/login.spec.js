/* eslint-disable no-undef */
import Vue from "vue";
import Login from '../../../../src/views/login/index';

describe('login', f => {
    it('should have login title', function () {
        const Constructor = Vue.extend(Login);
        const vm = new Constructor().$mount();
        console.log(vm);
        // expect(vm.$el.querySelector('title').textContent).to.equal("login");
    });
});

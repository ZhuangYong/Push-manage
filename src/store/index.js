import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import role from './modules/role';
import permission from './modules/permission';
import resource from './modules/resource';
import getters from './getters';
import userList from "./modules/userList";
import system from "./modules/system";
import epgMange from "./modules/epgMange";
import activate from "./modules/activate";
import channel from "./modules/channel";
import userManage from "./modules/userManage";
import logs from "./modules/logs";
import operate from "./modules/operate";
import weixin from "./modules/weixin";
import share from "./modules/share";
import statistics from "./modules/statistics";
import dataStat from "./modules/dataStat";
import recordManage from "./modules/recordManage";
import sales from "./modules/sales";
import manufacturer from "./modules/manufacturer";
import settlement from "./modules/settlement";
import payment from "./modules/payment";
import third from "./modules/third";
import rechargeCardManage from "./modules/rechargeCardManage";
import snManage from "./modules/snManage";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        role,
        userList,
        resource,
        permission,
        system,
        epgMange,
        activate,
        channel,
        userManage,
        recordManage,
        logs,
        operate,
        weixin,
        share,
        statistics,
        dataStat,
        sales,
        manufacturer,
        settlement,
        payment,
        third,
        rechargeCardManage,
        snManage,
    },
    getters
});

export default store;

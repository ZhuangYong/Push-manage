import Component from "vue-class-component";
import Vue from 'vue';
import {
    State,
    Getter,
    Action,
    Mutation,
    namespace
} from 'vuex-class';

@Component
export default class BaseView extends Vue {
    status = '';
    currentPage = "list";
    submitLoading = false; // 提交等待
    loading = false; // 数据加载等待
    selectItems = []; // 选择列
    selectItem = {};
    defaultFormData = {};
    dataName = "";
    formData = {}; // 表单数据
    viewRule = []; // 列表显示字段与规则
    tipTxt = ""; // 提示信息
    dialogVisible = false; // 是否显示confirm
    enableDefaultCurrentPage = true; // 是否启用默认页
    defaultCurrentPage = 1; // 默认选择页数
    validateRule = {}; // 校验规则
    pageAction = ''; // 列表请求action标志
    pageActionSearchColumn = []; // 列表搜索过滤
    delItemFun = null;
    addItemFun = null;
    updateItemFun = null;
    tableData = '';
    tableCanSelect = true;
    pagination = true;
    deFaultI18nData = {};
    lanList = [];
    refreshViewNumber = "";
    isVideo = false;
    i18nUploadImgApi = ""; // 多语言上传地址;
    locationHistory = [];
    searchId = '';

    constructor() {
        super();
        this.defaultFormData && (this.formData = Object.assign({}, this.defaultFormData));
        console.log("super constructor");
    }
    created() {
        console.log("super create");
    }

    pFunc() {
        console.log("this is parent");
    }
}



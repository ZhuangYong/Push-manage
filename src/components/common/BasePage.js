import Component from "vue-class-component";
import {Model} from "vue-property-decorator";
import Vue from 'vue';
import CommonTable from "../../components/Table/CommonTable";
import {Inject, Watch} from "vue-property-decorator/lib/vue-property-decorator";

@Component({
    name: "BasePage",
    // props: {
    //     SubPageRouter: {
    //         require: true
    //     }
    // }
})
export default class BasePage extends Vue {
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

    @Inject() SubPageRouter;

    constructor() {
        super();
    }
    created() {
    }
    updated() {
        console.group(">>>>> SubPageRouter >>>>>>>>");
        console.log(this.SubPageRouter);
        console.groupEnd();
        this.refreshTableButtonsEvent();
    }

    render() {
        return <div>
            {
                this.$slots.default
            }
        </div>;
    }

    tableHtml(h) {
        return (
            <CommonTable ref="commonTable"
                 data={this.pageData || {data: []}}
                 pageAction={this.pageAction}
                 pageActionSearchColumn={this.pageActionSearchColumn}
                 pageActionSearch={this.pageActionSearch}
                 defaultCurrentPage={this.enableDefaultCurrentPage ? this.defaultCurrentPage : 0}
                 select={this.tableCanSelect}
                 viewRule={this.viewRule}
                 pagination={this.pagination}
                 handleSelectionChange={this.handleSelectionChange}/>
        );
    }

    refreshTableButtonsEvent() {
        this.viewRule && this.viewRule.map(b => {
            const {buttons} = b;
            if (buttons && buttons.map) {
                buttons.map(btn => {
                    const {type} = btn;
                    const funcName = "handel" + type.replace(/^\S/, s => s.toUpperCase());
                    const statusFun = this[funcName];
                    if (statusFun) {
                        if (this.$refs.commonTable && !this.$refs.commonTable[funcName]) {
                            this.$refs.commonTable.$on(type, row => statusFun(row));
                            this.$refs.commonTable[funcName] = statusFun;
                        }
                    }
                });
            }
        });
    }

    handelEdit(row) {
        this.SubPageRouter.goPage();
        console.log("row");
    }
}



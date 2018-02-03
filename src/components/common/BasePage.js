import Component from "vue-class-component";
import {Model} from "vue-property-decorator";
import Vue from 'vue';
import CommonTable from "../../components/Table/CommonTable";
import {Inject, Watch} from "vue-property-decorator/lib/vue-property-decorator";
import Const from "../../utils/const";

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
    enableDefaultTableCurrentPage = true; // 是否启用默认页
    defaultTableCurrentPage = 1; // 默认选择页数
    validateRule = {}; // 校验规则
    pageActionSearchColumn = []; // 列表搜索过滤
    delItemFun = null;
    addItemFun = null;
    updateItemFun = null;
    tableCanSelect = true;
    pagination = true;
    deFaultI18nData = {};
    lanList = [];
    isVideo = false;
    i18nUploadImgApi = ""; // 多语言上传地址;
    locationHistory = [];
    searchId = '';

    leftPageData = "";
    rightPageData = "";
    // @Inject() SubPageRouter;

    constructor() {
        super();
    }
    created() {
        if (this.$vnode.ghostPageData) {
            Object.keys(this.$vnode.ghostPageData).map(key => {
                this[key] = this.$vnode.ghostPageData[key];
            });
        }
    }
    updated() {
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.$slots.default
            }
        </div>;
    }

    tableHtml(h) {
        return (
            <CommonTable ref="commonTable"
                 data={this.tableData || {data: []}}
                 pageAction={this.pageAction}
                 pageActionSearchColumn={this.pageActionSearchColumn}
                 pageActionSearch={this.pageActionSearch}
                 defaultCurrentPage={this.enableDefaultTableCurrentPage ? this.defaultTableCurrentPage : 0}
                 select={this.tableCanSelect}
                 viewRule={this.viewRule}
                 pagination={this.pagination}
                 handleSelectionChange={this.handleSelectionChange}
                 handelTablePageChange={this.handelTablePageChange}
                 handelTableButtonsEvent={this.handelTableButtonsEvent}
            />
        );
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.pageBack} type="primary" icon="caret-left">
                返回
            </el-button>
        </div>;
    }

    // refreshTableButtonsEvent() {
    //     this.viewRule && this.viewRule.map(b => {
    //         const {buttons} = b;
    //         if (buttons && buttons.map) {
    //             buttons.map(btn => {
    //                 const {type} = btn;
    //                 if (this.$refs.commonTable && !btn[type]) {
    //                     const funcName = "handel" + type.replace(/^\S/, s => s.toUpperCase());
    //                     // this.$refs.commonTable.$on(type, row => this.$vnode.handelTableEvent(type, row));
    //                     this.$refs.commonTable.$on(type, row => {
    //                         const handelTableTopButtonTypeEvent = this[funcName];
    //                         if (handelTableTopButtonTypeEvent) handelTableTopButtonTypeEvent.apply(this, [row]);
    //                     });
    //                     btn[type] = true;
    //                 }
    //             });
    //         }
    //     });
    // }

    handelTablePageChange(currentTablePage) {
        this.defaultTableCurrentPage = currentTablePage;
    }

    /**
     *
     * @param eventType
     * @param row
     */
    handelTableButtonsEvent(eventType, row) {
        const funcName = "handel" + eventType.replace(/^\S/, s => s.toUpperCase());
        const handelTableTopButtonTypeEvent = this[funcName];
        if (handelTableTopButtonTypeEvent) handelTableTopButtonTypeEvent.apply(this, [row]);
    }

    handelEdit(row) {
        this.goPage("EditPage");
    }

    goPage(pageName) {
        this.$vnode.subPageRouter.goPage(pageName, this._data);
    }

    pageBack() {
        this.$vnode.subPageRouter.pageBack(this._data, this.$vnode.leftPageData);
    }
}



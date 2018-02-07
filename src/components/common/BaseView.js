import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
import SimpleIcon from "../simple/SimpleIcon";

@Component
export default class BaseView extends Vue {
    currentPage = null;
    loading = false;
    @Provide() SubPageRouter = new SubPageRouter(this);
    constructor() {
        super();
        this.defaultFormData && (this.formData = Object.assign({}, this.defaultFormData));
    }

    created() {
    }

    @Watch('currentPage')
    onCurrentPageChange(v) {
        this.currentPage.handelTableEvent = this.handelTableEvent;
    }

    render() {
        return <div v-loading={this.loading || this.submitLoading}>
            {
                this.currentPage || <SimpleIcon/>
            }
        </div>;
    }

    renderPage() {
        return new this.CurrentPage();
    }

    /**
     * 初始化子页面
     * @param pages
     */
    initialPages(pages) {
        this.currentPage = pages[0];
        const subPageRouter = new SubPageRouter(this, pages);
        pages.map(p => {
            p.subPageRouter = subPageRouter;
            p.onLoadingChange = this.onLoadingChange;
        });
    }

    beforeRouteEnter () {
        console.log('beforeRouteEnter');
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave');
    }

    /**
     *  处理table中buttons里面以type为事件名发出的事件
     * @param type
     * @param row
     */
    handelTableEvent(type, row) {
        console.log("?????????????????");
    }

    /**
     *
     * @param isLoading
     */
    onLoadingChange(isLoading) {
        this.loading = isLoading;
    }
}

class SubPageRouter {
    context = null;
    page2Path = null;
    gost4page = [];
    pathStack = [];
    constructor(context, pages) {
        this.context = context;
        this.routerPage2Path(pages);
    }
    routerPage2Path(pages) {
        if (pages) {
            this.page2Path = {};
            pages.map(p => {
                const path = p.tag.split('-').pop();
                this.page2Path[path] = p;
                p.pageName = path;
            });
        }
    }

    getPageFromKey(pageName) {
        return this.page2Path[pageName];
    }

    goPage(pageName, leftPageData, extraData) {
        const nextPage = this.getPageFromKey(pageName);
        nextPage.leftPageData = leftPageData;
        nextPage.extraData = extraData;
        this.pathStack.push(this.context.currentPage);
        this.context.currentPage = nextPage;
    }

    pageBack(rightPageData, leftPageData, extraData) {
        const returnPage = this.pathStack.pop();
        returnPage.rightPageData = rightPageData;
        returnPage.ghostPageData = leftPageData;
        returnPage.extraData = extraData;
        this.context.currentPage = returnPage;
    }

    pageBackTo(pageName, rightPageData, leftPageData, extraData) {
        let returnPage;
        while (this.pathStack.length > 0) {
            const _returnPage = this.pathStack.pop();
            if (_returnPage.pageName === pageName) returnPage = _returnPage;
        }
        if (!returnPage) throw new Error(`页面${pageName}不存在！`);
        returnPage.rightPageData = rightPageData;
        returnPage.ghostPageData = leftPageData;
        returnPage.extraData = extraData;
        this.context.currentPage = returnPage;
    }

    pageCanBack() {
        return this.pathStack.length > 0;
    }
}

import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
import SimpleIcon from "../simple/SimpleIcon";

@Component
export default class BaseView extends Vue {
    currentPage = null;
    @Provide() SubPageRouter = new SubPageRouter(this);
    constructor() {
        super();
        this.defaultFormData && (this.formData = Object.assign({}, this.defaultFormData));
    }

    created() {
    }

    @Watch('subPages')
    onSubPagesChange(v) {

        console.group('----------- sub page change ----------');
        console.log(v);
        console.groupEnd();
    }

    @Watch('currentPage')
    onCurrentPageChange(v) {
        this.currentPage.handelTableEvent = this.handelTableEvent;

        console.group('----------- currentPage change ----------');
        console.log(v);
        console.groupEnd();
    }

    render() {
        // const showPage = this.subPages[0];
        return this.currentPage || <SimpleIcon/>;
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
        pages.map(p => p.subPageRouter = subPageRouter);
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
            });
        }
    }

    getPageFromKey(pageName) {
        return this.page2Path[pageName];
    }

    goPage(pageName, leftPageData) {
        console.log("----------- goPage ---------------");
        const nextPage = this.getPageFromKey(pageName);
        nextPage.leftPageData = leftPageData;
        this.pathStack.push(this.context.currentPage);
        this.context.currentPage = nextPage;
    }

    pageBack(rightPageData, leftPageData) {
        console.log("----------- page back ---------------");
        const returnPage = this.pathStack.pop();
        returnPage.rightPageData = rightPageData;
        returnPage.ghostPageData = leftPageData;
        this.context.currentPage = returnPage;
    }
}

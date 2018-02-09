import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
import SimpleIcon from "../simple/SimpleIcon";
import SubPageRouter from "../../router/subPageRouter";

@Component
export default class BaseView extends Vue {
    loading = false;
    currentPage = null;

    @Provide() SubPageRouter = new SubPageRouter(this);

    constructor() {
        super();
        this.defaultFormData && (this.formData = Object.assign({}, this.defaultFormData));
    }

    created() {
    }

    @Watch('currentPage')
    onCurrentPageChange(v) {

    }

    render() {
        return <div v-loading={this.loading || this.submitLoading}>
            {
                this.currentPage || <SimpleIcon/>
            }
        </div>;
    }

    /**
     * 装载子页面
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
     *
     * @param isLoading
     */
    onLoadingChange(isLoading) {
        this.loading = isLoading;
    }
}


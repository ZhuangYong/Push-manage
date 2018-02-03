import {Component, Provide, Vue, Watch} from 'vue-property-decorator';
import SimpleIcon from "../simple/SimpleIcon";

@Component
export default class BaseView extends Vue {
    subPages = null;
    currentPage = null;
    @Provide() SubPageRouter = this.currentPage;
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

    render() {
        const showPage = this.subPages[0];
        return this.currentPage || <SimpleIcon/>;
    }

    renderPage() {
        return new this.CurrentPage();
    }

    initialPages(pages) {
        // this.SubPageRouter = new SubPageRouter(this);
        this.subPages = pages;
        this.currentPage = pages[0];
        let checkPage;
        pages.map(p => {
            console.log(p.tag);
            // checkPage[p.tag.split('-')[3]] = true;
        });
        // pages.find(p => console.log(p.tag));
    }

    beforeRouteEnter () {
        console.log('beforeRouteEnter');
    }

    beforeRouteLeave () {
        console.log('beforeRouteLeave');
    }
}

class SubPageRouter {
    context = null;
    constructor(context) {
        this.context = context;
        console.log(" ----------- context ----------- ");
        console.log(context);
    }

    goPage(page) {
        this.context.currentPage = page;
        console.log(" ----------- go page ----------- ");
    }
}

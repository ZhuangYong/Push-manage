import Component from "vue-class-component";
import {Model} from "vue-property-decorator";
import Vue from 'vue';
import CommonTable from "../../components/Table/CommonTable";
import {Inject, Watch} from "vue-property-decorator/lib/vue-property-decorator";
import Const from "../../utils/const";
import {updateActorCategoryDB, updateRankInfo, updateTbActorOnMedia} from "../../api/category";

@Component({
    name: "BasePage",
})
export default class BasePage extends Vue {
    loading = false; // 数据加载等待
    submitLoading = false; // 提交等待
    selectItems = []; // 选择列
    selectItem = {};
    defaultFormData = {};
    // dataName = "";
    formData = {}; // 表单数据
    viewRule = []; // 列表显示字段与规则
    tipTxt = ""; // 提示信息
    dialogVisible = false; // 是否显示confirm
    enableDefaultTableCurrentPage = true; // 是否启用默认页
    defaultTableCurrentPage = 1; // 默认选择页数
    validateRule = {}; // 校验规则
    pageActionSearchColumn = []; // 列表搜索过滤
    delItemFun = null;
    // addItemFun = null;
    // updateItemFun = null;
    tableCanSelect = true; // 列表是否可以选择 默认可选
    pagination = true; // 列表是否展示底部分页信息 默认显示
    deFaultI18nData = {};
    lanList = []; // 多语言列表
    isVideo = false;
    i18nUploadImgApi = ""; // 多语言上传地址;
    searchId = '';

    // leftPageData = ""; // 从上个页面跳过来所带的数据
    // rightPageData = ""; // 从上个页面返回的时候所带的数据
    defaultSort = {};
    // @Inject() SubPageRouter;

    constructor() {
        super();
    }
    created() {
        console.log("----- extraData page -------");
        console.log(this.$vnode.extraData);
        this.handelGhostPageData();
        this.handelPageExtraPageData();
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
                 defaultSort={this.defaultSort[this.pageAction]}
                 pageActionSearchColumn={this.pageActionSearchColumn}
                 pageActionSearch={this.pageActionSearch}
                 defaultCurrentPage={this.enableDefaultTableCurrentPage ? this.defaultTableCurrentPage : 0}
                 select={this.tableCanSelect}
                 viewRule={this.viewRule}
                 pagination={this.pagination}
                 handelSortChange={this.handelSortChange}
                 handleSelectionChange={this.handleSelectionChange}
                 handelTablePageChange={this.handelTablePageChange}
                 handelTableButtonsEvent={this.handelTableButtonsEvent}
            />
        );
    }

    /**
     *  默认顶部按钮
     * @param h
     * @returns {*}
     */
    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            {
                this.pageBackHtml(h)
            }
        </div>;
    }

    /**
     * 返回按钮
     * @param h
     * @param txt
     * @returns {*}
     */
    pageBackHtml(h, txt) {
        return <el-button class="filter-item" onClick={this.pageBack} type="primary" icon="caret-left">
            {txt ? txt : '返回'}
        </el-button>;
    }

    /**
     * 新增、修改提交
     */
    submitAddOrUpdate(success, fail) {
        if (!this.addFun && !this.editFun) throw new Error("没有设置操作方法！");
        this.$refs.addForm.validate((valid) => {
            if (valid) {
                this.applyApiDurFun();
                let operateFun = this.editFun;
                if (!this.formData.id && this.addFun) operateFun = this.addFun;
                this.applyApiDurFun(operateFun, success, fail);
            } else {
                return false;
            }
        });
    }

    /**
     *
     * @param fun
     * @param success
     * @param fail
     * @param noNeedLoading
     */
    applyApiDurFun(fun, success, fail, noNeedLoading) {
        if (!fun) return;
        !noNeedLoading && (this.submitLoading = true);
        const submitFormData = Object.assign({}, this.beforeSubmit ? this.beforeSubmit(this.formData) : this.formData);
        fun(submitFormData).then(r => {
            this.$message({
                message: "操作成功",
                type: "success"
            });
            this.submitLoading = false;
            if (!(success instanceof Event)) success && success(r);
        }).catch(e => {
            this.submitLoading = false;
            this.$message.error(`操作失败(${typeof err === 'string' ? e : ''})！`);
            fail && fail(e);
        });
    }

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

    handelSortChange(sort) {
        this.defaultSort = sort;
    }

    handelEdit(row) {
        this.goPage("EditPage", {formData: row});
    }

    handelGhostPageData() {
        if (this.$vnode.ghostPageData) {
            Object.keys(this.$vnode.ghostPageData).map(key => {
                this[key] = this.$vnode.ghostPageData[key];
            });
        }
    }

    handelPageExtraPageData() {
        const {formData, defaultSearch} = this.$vnode.extraData || {};
        if (formData) this.formData = formData;
        if (defaultSearch && this.pageActionSearch.length) {
            defaultSearch.map(defaultSearchItem => {
                Object.keys(defaultSearchItem).map(key => {
                    this.pageActionSearch.map(searchItem => {
                        const {column} = searchItem;
                        if (column === key) searchItem.value = defaultSearchItem[key];
                    });
                });
            });
        }
    }

    //----------------------
    // 图片相关
    //----------------------
    // 当图片选择修改的时候
    chooseChange (file, fileList, uploadImgItem) {
        if (!this.submitLoading) {
            this.imgChooseFileList = fileList;
            const {name, name2} = uploadImgItem;
            if (fileList.length > 0) {
                try {uploadImgItem.$parent.resetField && uploadImgItem.$parent.resetField();} catch (e) {console.log(e);}
                const imgnet = (fileList[0].response && fileList[0].response.data.imageNet) || fileList[0].url;
                if (typeof name === "function") {
                    name(imgnet);
                } else {
                    name && (this.formData[name] = imgnet);
                }
            } else {
                if (typeof name === "function") {
                    name("");
                    this.refreshViewNumber = Math.random();
                } else {
                    name && (this.formData[name] = "");
                    name2 && (this.formData[name2] = "");
                }

            }
        }
    }

    /**
     * 图片上传成功
     * @param data
     * @param uploadImgItem
     */
    uploadSuccess (data, uploadImgItem) {
        const {imageNet, imgPath} = data;
        const {name, name2} = uploadImgItem;
        if (name && typeof name === "function") {
            name(imageNet);
        } else {
            name && (this.formData[name] = imageNet);
            name2 && (this.formData[name2] = imgPath);
        }
        uploadImgItem.uploadSuccessData = data;
        this.submitLoading = false;
    }

    /**
     * 图片上传之前
     */
    beforeUpload () {
        this.submitLoading = true;
    }


    /**
     * 从雷客更新数据
     * @param param
     * @param extra
     * @param isUpdateActorCategoryDB
     * @param isUpdateTbActorOnMedia
     */
    updateFromLeiKe(param, extra, isUpdateActorCategoryDB, isUpdateTbActorOnMedia) {
        if (isUpdateTbActorOnMedia) {
            updateTbActorOnMedia().then(res => this.$refs.commonTable.refreshData({
                currentPage: this.defaultCurrentPage
            }));
        } else if (isUpdateActorCategoryDB) {
            updateActorCategoryDB().then(res => this.$refs.commonTable.refreshData({
                currentPage: this.defaultCurrentPage
            }));
        } else {
            updateRankInfo(param, extra).then(res => this.$refs.commonTable.refreshData({
                currentPage: this.defaultCurrentPage
            }));
        }

    }

    goPage(pageName, extraData) {
        this.$vnode.subPageRouter.goPage(pageName, this._data, extraData);
    }

    pageBack(extraData) {
        this.$vnode.subPageRouter.pageBack(this._data, this.$vnode.leftPageData, extraData);
    }

    pageBackTo(pageName, extraData) {
        this.$vnode.subPageRouter.pageBackTo(pageName, this._data, this.$vnode.leftPageData, extraData);
    }
}



import Vtable from '../../components/Table';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {saveLanguage, updateActorCategoryDB, updateRankInfo, updateTbActorOnMedia} from "../../api/category";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {mapGetters} from "vuex";
import _ from "lodash";

const BaseListView = {
    data() {
        return {
            status: '',
            currentPage: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            selectItem: {},
            defaultFormData: {},
            dataName: "",
            formData: {}, // 表单数据
            viewRule: [], // 列表显示字段与规则
            tipTxt: "", // 提示信息
            dialogVisible: false, // 是否显示confirm
            enableDefaultCurrentPage: true, // 是否启用默认页
            defaultCurrentPage: 1, // 默认选择页数
            validateRule: {}, // 校验规则
            pageAction: '', // 列表请求action标志
            pageActionSearchColumn: [], // 列表搜索过滤
            defaultSort: {},
            delItemFun: null,
            addItemFun: null,
            updateItemFun: null,
            tableData: '',
            tableCanSelect: true,
            rowCanSelect: null,
            pagination: true,
            deFaultI18nData: {},
            lanList: [],
            refreshViewNumber: "",
            isVideo: false,
            i18nUploadImgApi: "", // 多语言上传地址,
            locationHistory: [],
            searchId: ''
        };
    },

    computed: {
        ...mapGetters(['user'])
    },

    watch: {
        currentPage: function (v, ov) {
            if (!v) return;
            const pageChangeFun = this["handelInPage" + v.replace(/^\S/, s => s.toUpperCase())];
            pageChangeFun && pageChangeFun();
        },
        status: function (v, ov) {
            throw new Error("已经改用'currentPage'，请修改！");
        }
    },
    beforeCreate() {
        window.onhashchange = e => {
            this.currentPage = location.hash.replace("#", '') || 'list';
        };
    },
    handelPageChange(v) {

    },
    created() {
        this.defaultFormData && (this.formData = Object.assign({}, this.defaultFormData));
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <div id={Math.random()} >
                <el-row v-loading={this.submitLoading || this.loading} class={this.refreshViewNumber}>
                    {
                        this.topButtonHtml(h)
                    }

                    {
                        // 如当前页面为 ‘tree’ 将会渲染名字为 ‘renderTreeHtml’ 的方法
                        this.currentPage !== this.PAGE_LIST ? (this["render" + this.currentPage.replace(/^\S/, s => s.toUpperCase()) + "Html"] && this["render" + this.currentPage.replace(/^\S/, s => s.toUpperCase()) + "Html"](h)) : ""
                    }

                    {
                        // 当前页面为 ‘list’ 、 ‘add’ 、 ‘edit’ 为默认页面，其他页面将走名称为 render + 页面名称 + Html 方法
                        this.currentPage === this.PAGE_LIST ? this.tableHtml(h) : (this.currentPage === this.PAGE_ADD || this.currentPage === this.PAGE_EDIT) && this.cruHtml(h)
                    }
                    <ConfirmDialog
                        visible={this.dialogVisible}
                        tipTxt={this.tipTxt}
                        handelSure={this.sureCallbacks}
                        handelCancel={() => {
                            this.dialogVisible = false;
                        }}
                    />
                </el-row>
            </div>

        );
    },
    methods: {

        tableHtml: function (h) {
            const data = (typeof this.listDataGetter === 'string' ? this[this.listDataGetter] : (typeof this.listDataGetter === 'function' ? this.listDataGetter() : {data: []})) || {data: []};
            return (
                <Vtable ref="Vtable" id={this.pageAction} pageAction={this.pageAction} data={data} dataName={this.dataName} pageActionSearchColumn={this.pageActionSearchColumn} pageActionSearch={this.pageActionSearch}
                        defaultCurrentPage={this.enableDefaultCurrentPage ? this.defaultCurrentPage : 0} select={this.tableCanSelect} selectableForRow={this.rowCanSelect} viewRule={this.viewRule} pagination={this.pagination}
                        handleSelectionChange={this.handleSelectionChange} defaultSort={this.defaultSort[this.pageAction]} page={this}/>
            );
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="left" label-width="70px">
                    请重写cruHtml方法来实现
                    {
                        this.bottomOperationButtonHtml(h)
                    }
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, this.defaultFormData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
            );
        },

        bottomOperationButtonHtml(h) {
            return (
                <el-form-item>
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.currentPage = this.PAGE_LIST;
                        }
                    }>取消
                    </el-button>
                </el-form-item>
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function (success, fail) {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.currentPage === this.PAGE_EDIT) {
                        this.editFun && this.editFun(this.formData).then(res => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.pageBack();
                            success && success(res);
                        }).catch(err => {
                            this.submitLoading = false;
                            fail && fail(err);
                        });
                    } else if (this.currentPage === this.PAGE_ADD) {
                        this.editFun && this.editFun(this.formData).then(res => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.pageBack();
                            success && success(res);
                        }).catch(err => {
                            this.submitLoading = false;
                            fail && fail(err);
                        });
                    }
                } else {
                    return false;
                }
            });
        },

        /**
         * 删除列
         * @param row
         * @param idKey
         * @param success
         * @param fail
         */
        submitDel(row, idKey, success, fail) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = idKey ? row[idKey] : row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                this.delItemFun && this.delItemFun(id).then(res => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.refreshTable();
                    success && success(res);
                }).catch(err => {
                    this.submitLoading = false;
                    fail && fail(err);
                });
            };
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         * @param choosePage
         * @param refreshPage
         */
        showList: function (id, choosePage, refreshPage) {
            this.searchId = id;
            setTimeout(f => {
                const _thisData = this.getDataWhenShowListChange(choosePage, id);
                Object.keys(_thisData).map(key => {
                    this[key] = _thisData[key];
                });
                if (_thisData.defaultFormData && !choosePage) this.formData = _thisData.defaultFormData;
                if (id) {
                    this.pageActionSearch && this.pageActionSearch.map(item => item.value = "");
                    this.pageActionSearchColumn = [{
                        urlJoin: id
                    }];
                    if (this.isLeike) this.tableCanSelect = false;
                } else {
                    this.pageActionSearchColumn = [];
                }
                if (refreshPage) this.refreshTable();
                this.searchId = id;
            }, 50);
        },

        /**
         *
         * @param choosePage
         * @param id
         */
        getDataWhenShowListChange(choosePage, id) {
            throw new Error("请重新该方法！");
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.currentPage) {
                case this.PAGE_LIST:
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on('sortChange', (s) => {
                            this.defaultSort = s;
                        });
                        !this.handelEdit && this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.goPage(this.PAGE_EDIT);
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        !this.handelDel && this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        !this.handelPageChange && this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.enableDefaultCurrentPage) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case this.PAGE_ADD:
                case this.PAGE_EDIT:
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    if (this.$refs.addForm) bindData(this, this.$refs.addForm);
                    break;
            }
            this.refreshTableButtonsEvent();
        },

        refreshTableButtonsEvent: function() {
            this.viewRule && this.viewRule.map(b => {
                const {buttons} = b;
                if (buttons) {
                    buttons.map(btn => {
                        const {type} = btn;
                        const funcName = "handel" + type.replace(/^\S/, s => s.toUpperCase());
                        const statusFun = this[funcName];
                        if (statusFun) {
                            if (this.$refs.Vtable && !this.$refs.Vtable[funcName]) {
                                this.$refs.Vtable.$on(type, row => statusFun(row));
                                this.$refs.Vtable[funcName] = statusFun;
                            }
                        }
                    });
                }
            });
        },

        // 当图片选择修改的时候
        chooseChange: function (file, fileList, uploadImgItem) {
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
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
            if (selectedItems.length === 1) {
                this.selectItem = selectedItems[0];
                this.pageBack();
            } else {
                this.selectItem = {};
            }
        },

        beforeUpload: function () {
            this.submitLoading = true;
        },

        uploadSuccess: function (data, uploadImgItem) {
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
        },

        beforeEditSHow: function (param, info) {

        },

        /**
         * 从雷客更新数据
         * @param param
         * @param extra
         */
        updateFromLeiKe: function (param, extra, isUpdateActorCategoryDB, isUpdateTbActorOnMedia) {
            if (isUpdateTbActorOnMedia) {
                updateTbActorOnMedia().then(res => this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                })).catch();
            } else if (isUpdateActorCategoryDB) {
                updateActorCategoryDB().then(res => this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                })).catch();
            } else {
                updateRankInfo(param, extra).then(res => this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                })).catch();
            }

        },

        /**
         * 修改多语言文字
         * @param h
         * @returns {*}
         */
        cruI18nTxt(h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.i18nObj.map(o => (
                            <el-form-item label={o.label}>
                                <el-input value={o.getValue()} placeholder={o.placeholder} onChange={o.onChange}/>
                            </el-form-item>
                        ))
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.formData.map = Object.assign({}, this.deFaultI18nData);
                                this.$refs.addForm && (this.$refs.addForm.vvmodel = null);
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        /**
         * 修改多语言图片
         * @param h
         * @returns {*}
         */
        cruI18nImg(h) {
            const uploadImgApi = this.i18nUploadImgApi || (Const.BASE_API + '/' + apiUrl.API_PRODUCT_SAVE_IMAGE);
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.i18nObj.map(o => (
                            <el-form-item label={o.label}>
                                <uploadImg defaultImg={o.defaultImg()} actionUrl={uploadImgApi} name={o.name} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true} isVideo={this.isVideo}/>
                            </el-form-item>
                        ))
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.formData.map = Object.assign({}, this.deFaultI18nData);
                                this.$refs.addForm && (this.$refs.addForm.vvmodel = null);
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        /**
         * 多语言下拉选择
         * @param h
         * @returns {*}
         */
        cruI18nOption(h) {
            return (
                <el-form v-loading={this.loading} class="small-space" key={JSON.stringify(this.formData.map.epgIndexKey)} model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    {
                        this.i18nObj.map(o => (
                            (o.optionData && o.optionData.length > 0) ? <el-form-item label={o.label}>
                                <el-select placeholder="请选择" value={o.getValue()} onHandleOptionClick={f => {
                                    this.refreshViewNumber = Math.random();
                                    o.setValue(f.value);
                                }} >
                                    <el-option label="无" value="" key=""/>
                                    {
                                        o.optionData && o.optionData.map(opt => (
                                            <el-option label={opt[o.optionKey]} value={opt[o.optionValueKey]} key={opt[o.optionValueKey]}>
                                                {
                                                    o.optionTemplate ? o.optionTemplate(opt) : ""
                                                }
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item> : ""
                        ))
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.formData.map = Object.assign({}, this.deFaultI18nData);
                                this.$refs.addForm && (this.$refs.addForm.vvmodel = null);
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        /**
         *  编辑多语言方法
         * @param type 多语言类型 txt： 文字， img： 图片
         * @param i18nObj 多语言数据
         * @param uploadImgApi
         * @param isVideo 是否是上传多媒体文件
         */
        editI18n(type, i18nObj, uploadImgApi, isVideo) {
            // this.preStatus = this.status;
            this.goPage(this.PAGE_EDIT_I18N);
            this.i18nObj = i18nObj;
            this.isVideo = !!isVideo;
            this.i18nUploadImgApi = uploadImgApi;
            this.deFaultI18nData = {};
            Object.keys(this.formData.map).map(key => {
                this.deFaultI18nData[key] = Object.assign({}, this.formData.map[key]);
            });
            switch (type) {
                case "txt":
                    this.cruI18n = this.cruI18nTxt;
                    break;
                case "img":
                    this.cruI18n = this.cruI18nImg;
                    break;
                case "option":
                    this.cruI18n = this.cruI18nOption;
                    break;
                default:
                    this.cruI18n = [];
            }
            this.$refs.addForm && this.$refs.addForm.clearValidate();
        },

        /**
         * 兼容editI18n方法
         * @param h
         * @returns {*|XML}
         */
        renderEditI18nHtml(h) {
            return this.cruHtml(h);
        },

        /**
         * 提交多语言表单
         */
        submitFormI18n() {
            if (this.formData.map) {
                this.formData.map.ottPicKey = this.formData.map.ottPicKey || {};
                this.formData.map.wxPicKey = this.formData.map.wxPicKey || {};
                this.formData.map.nameKey && (this.formData.name = this.formData.map.nameKey.cn);
                this.formData.map.nameKey && (this.formData.nameKey = this.formData.map.nameKey.key);
                this.formData.map.ottPicKey && (this.formData.ottPic = this.formData.map.ottPicKey.cn);
                this.formData.map.ottPicKey && (this.formData.ottPicKey = this.formData.map.ottPicKey.key);
                this.formData.map.wxPicKey && (this.formData.wxPic = this.formData.map.wxPicKey.cn);
                this.formData.map.wxPicKey && (this.formData.wxPicKey = this.formData.map.wxPicKey.key);
                this.formData.map.imageKey && (this.formData.image = this.formData.map.imageKey.cn);
                this.formData.map.imageKey && (this.formData.imageKey = this.formData.map.imageKey.key);
                this.formData.map.epgIndexKey && (this.formData.epgIndexId = this.formData.map.epgIndexKey.cn);
                this.formData.map.epgIndexKey && (this.formData.epgIndexKey = this.formData.map.epgIndexKey.key);
            }

            const editFunc = this.currentPage === this.PAGE_EDIT_I18N ? saveLanguage : this.editFun;

            this.applyApiDurFun(editFunc, res => {
                const {name, nameKey, ottPic, ottPicKey, wxPic, wxPicKey, epgIndexKey} = res;
                nameKey && (this.formData.map.nameKey.key = nameKey);
                ottPicKey && (this.formData.map.ottPicKey.key = ottPicKey);
                wxPicKey && (this.formData.map.wxPicKey.key = wxPicKey);
                epgIndexKey && (this.formData.map.epgIndexKey.key = epgIndexKey);
                this.$refs.addForm && (this.$refs.addForm.vvmodel = null);
                this.currentPage = this.currentPage === this.PAGE_EDIT_I18N ? this.PAGE_ADD : this.PAGE_LIST;
            });
        },

        refreshTable() {
            this.$refs.Vtable && this.$refs.Vtable.refreshData({
                currentPage: this.defaultCurrentPage
            });
        },

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
            if (this.formData.map && this.formData.map.nameKey && this.formData.map.nameKey.hasOwnProperty("type")) this.formData.map.nameKey.type = Const.TYPE_I18N_KEY_TXT;
            if (this.formData.map && this.formData.map.ottPicKey && this.formData.map.ottPicKey.hasOwnProperty("type")) this.formData.map.ottPicKey.type = Const.TYPE_I18N_KEY_IMG;
            if (this.formData.map && this.formData.map.wxPicKey && this.formData.map.wxPicKey.hasOwnProperty("type")) this.formData.map.wxPicKey.type = Const.TYPE_I18N_KEY_IMG;
            if (this.formData.map && this.formData.map.epgIndexKey && this.formData.map.epgIndexKey.hasOwnProperty("type")) this.formData.map.epgIndexKey.type = Const.TYPE_I18N_KEY_EPG;
            if (this.formData.map && this.formData.map.loadKey && this.formData.map.loadKey.hasOwnProperty("type")) this.formData.map.loadKey.type = Const.TYPE_I18N_KEY_LOAD;
            const submitFormData = Object.assign({}, this.beforeSubmit ? this.beforeSubmit(this.formData) : this.formData);
            fun(submitFormData).then(r => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                success && success(r);
            }).catch(e => {
                this.submitLoading = false;
                this.$message.error(`操作失败(${typeof err === 'string' ? e : ''})！`);
                fail && fail(e);
            });
        },

        goPage(page) {
            // this.savePageData();
            console.log(">>>>>>>>>gopage: " + page);
            this.locationHistory.push(this.currentPage);
            this.currentPage = page;
            // history.pushState("", "", location.href.split("#")[0] + "#" + page);
        },

        pageBack() {
            // this.savePageData();
            const page = this.locationHistory.pop();
            console.log(">>>>>>>>>pageBack: " + page);
            this.currentPage = page;
            // this.$router.back();
        },

        pageReplace(page) {
            this.currentPage = page;
        },

        /**
         * 清除虚拟路径访问记录
         */
        clearPageHistory() {
            this.locationHistory = [];
        },

        hasRole(type) {
            const urls = this.user.urls || {};
            const roles = urls[this.path];
            if (!_.isEmpty(roles)) {
                return roles.some(r => r === type);
            }
            return true;
        },

        superRoles() {
            return this.user.type === Const.USER_TYPE_JMAKE;
        }
    },

    extend: function (obj, parent) {
        const pObj = parent || BaseListView;
        if (typeof obj === "object") {
            Object.keys(pObj).map(key => {
               if (typeof pObj[key] === "function") {
                   if (pObj[key].name === "data") {
                       const objData = obj[key].call();
                       obj[key] = function () {
                           return Object.assign(Const.PAGE_SET, pObj.data.call(), objData);
                       };
                   } else {
                       if (typeof obj[key] === 'undefined') {
                           obj[key] = pObj[key];
                       }
                   }
               } else if (typeof pObj[key] === "object") {
                   obj[key] = Object.assign({}, pObj[key], obj[key]);
               } else {
                   if (typeof obj[key] === 'undefined') {
                       obj[key] = pObj[key];
                   }
               }
           });
           return obj;
       }
    },
};

export default BaseListView;

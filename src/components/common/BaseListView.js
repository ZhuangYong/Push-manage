import Vtable from '../../components/Table';
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {saveLanguage, updateActorCategoryDB, updateRankInfo, updateTbActorOnMedia} from "../../api/category";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";

const BaseListView = {
    data() {
        return {
            status: "list", // 页面状态
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
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
            delItemFun: null,
            addItemFun: null,
            updateItemFun: null,
            tableData: '',
            tableCanSelect: true,
            pagination: true,
            deFaultI18nData: {},
            lanList: [],
            refreshViewNumber: "",
            isVideo: false
        };
    },
    computed: {
    },
    created() {
        this.formData = Object.assign({}, this.defaultFormData);
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        const data = (typeof this.listDataGetter === 'string' ? this[this.listDataGetter] : (typeof this.listDataGetter === 'function' ? this.listDataGetter() : {data: []})) || {data: []};
        return (
            <el-row v-loading={this.submitLoading} class={this.refreshViewNumber}>
                {
                    this.topButtonHtml(h)
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={this.pageAction} data={data} dataName={this.dataName} pageActionSearchColumn={this.pageActionSearchColumn} pageActionSearch={this.pageActionSearch}
                                                     defaultCurrentPage={this.enableDefaultCurrentPage ? this.defaultCurrentPage : 0} select={this.tableCanSelect} viewRule={this.viewRule} pagination={this.pagination}
                                                     handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
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
        );
    },
    methods: {

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
                this.status === "list" ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, this.defaultFormData);
                                this.owned = [];
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
                            this.status = "list";
                        }
                    }>取消
                    </el-button>
                </el-form-item>
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit') {
                        this.updateItemFun && this.updateItemFun(this.formData).then(res => {
                            this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    } else if (this.status === 'add') {
                        this.addItemFun && this.addItemFun(this.formData).then(res => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         * @param idKey
         */
        submitDel(row, idKey) {
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
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'add':
                case 'edit':
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
                    try {uploadImgItem.$parent.resetField && uploadImgItem.$parent.resetField();} catch (e) {console.log("");}
                    const imgnet = (fileList[0].response && fileList[0].response.data.imageNet) || fileList[0].url;
                    if (typeof name === "function") {
                        name(imgnet);
                    } else {
                        name && (this.formData[name] = imgnet);
                    }

                } else {
                    if (typeof name === "function") {
                        name("");
                    } else {
                        name && (this.formData[name] = "");
                        name2 && (this.formData[name2] = "");
                    }

                }
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
                                this.status = this.formData.id ? "edit" : "add";
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
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
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
                                this.status = this.formData.id ? "edit" : "add";
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
                                this.status = this.formData.id ? "edit" : "add";
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
         * @param isVideo 是否是上传多媒体文件
         */
        editI18n(type, i18nObj, isVideo) {
            this.preStatus = this.status;
            this.status = "editI18n";
            this.i18nObj = i18nObj;
            this.isVideo = !!isVideo;
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
         * 提交多语言表单
         */
        submitFormI18n() {
            this.submitLoading = true;
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

            const editFunc = this.status === "editI18n" ? saveLanguage : this.editFun;
            editFunc && editFunc(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                const {name, nameKey, ottPic, ottPicKey, wxPic, wxPicKey, epgIndexKey} = res;
                nameKey && (this.formData.map.nameKey.key = nameKey);
                ottPicKey && (this.formData.map.ottPicKey.key = ottPicKey);
                wxPicKey && (this.formData.map.wxPicKey.key = wxPicKey);
                epgIndexKey && (this.formData.map.epgIndexKey.key = epgIndexKey);
                this.submitLoading = false;
                this.$refs.addForm && (this.$refs.addForm.vvmodel = null);
                this.status = this.status === "editI18n" ? 'add' : 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

    },

    extend: function (obj, parent) {
        const pObj = parent || BaseListView;
        if (typeof obj === "object") {
            Object.keys(pObj).map(key => {
               if (typeof pObj[key] === "function") {
                   if (pObj[key].name === "data") {
                       const objData = obj[key].call();
                       obj[key] = function () {
                           return Object.assign({}, pObj.data.call(), objData);
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
            obj.super = parent;
           return obj;
       }
    },
};

export default BaseListView;

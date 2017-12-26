import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {page, save, del, productPage, productSave, productDel, saveImg, productDiscountProductList} from '../../api/vipGroup';
import {bindData, parseTime} from "../../utils/index";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: '产品id', minWidth: 80},
        {columnKey: 'name', label: '产品名称', minWidth: 130},
        {columnKey: 'remark', label: '备注', minWidth: 120},
        {columnKey: 'updateId', label: '更新id'},
        {columnKey: 'status', label: '状态', formatter: r => {
            if (r.status === 1) return '正常';
            if (r.status === 2) return '禁用';
            if (r.status === 3) return '删除';
        }},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '子产品', type: 'proList'}], minWidth: 190}
    ],
    validateRule: {
        name: [
            {required: true, message: '必须请输入'}
        ],
        remark: [
            {required: true, message: '必须请输入'}
        ],
    },
    listDataGetter: function() {
        return this.channel.vipGroupPage;
    },
    pageAction: 'channel/vipGroup/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [],
    defaultFormData: {
        name: '',
        remark: '',
        status: 1 //1:正常，2：禁用，3：删除

    },
    editFun: save,
    delItemFun: del
};

const childProdcutData = {
    viewRule: [
        {columnKey: 'productId', label: '产品Id', minWidth: 160},
        {columnKey: 'productName', label: '产品名称', minWidth: 130},
        {columnKey: 'vipGroupId', label: '产品分组Id', minWidth: 120},
        {columnKey: 'status', label: '状态', minWidth: 120, formatter: r => {
            switch (r.status) {
                case 0:
                    return '未启用';
                case 1:
                    return '启用';
                default:
                    return '未启用';
            }
        }},
        {columnKey: 'productName', label: '产品价格模板', minWidth: 120},
        {columnKey: 'discountType', label: '折扣类型', minWidth: 120, formatter: r => {
            switch (r.discountType) {
                case 0:
                    return '没有折扣';
                case 1:
                    return '立减金额';
                case 2:
                    return '赠送时间';
                default:
                    return '没有折扣';
            }
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 150}
    ],
    validateRule: {},
    listDataGetter: function() {
        return this.channel.vipGroupProductPage;
    },
    pageAction: 'channel/vipGroup/product/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [],
    defaultFormData: {
        id: null,
        productId: '',
        productName: '',
        vipGroupId: '',
        status: 0, //0未启用, 1启用
        discountType: 0,
        discount: 0.01,
        extraTime: 1,
        startTime: null,
        endTime: null,
        effectTime: [],
        wxCnOss: null,
        wxCnEcs: null,
        wxFtOss: null,
        wxFtEcs: null,
        wxEnOss: null,
        wxEnEcs: null,
        ottCnOss: null,
        ottCnEcs: null,
        ottFtOss: null,
        ottFtEcs: null,
        ottEnOss: null,
        ottEnEcs: null
    },
    editFun: productSave,
    delItemFun: productDel
};

export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    created() {
        this.productListGetter();
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData,
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction
        };
    },
    computed: {
        ...mapGetters(['channel'])
    },
    methods: {

        /**
         * 获取产品列表
         */
        productListGetter: function () {
            productDiscountProductList().then(res => {
                this.optionsProduct = res;
            }).catch(err => {});
        },
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_VIP_GROUP_SAVE_IMG;
            const optionsProduct = this.optionsProduct;
            const optionsDiscountType = [
                {status: 0, label: '没有折扣'},
                {status: 1, label: '立减金额'},
                {status: 2, label: '赠送时间'}
            ];
            return (

                this.pageAction === childProdcutData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="产品价格模板：" prop="productId">
                        <el-select placeholder="请选择" value={this.formData.productId} name='productId' onChange={(e) => {this.productChange(e, optionsProduct);}}>
                            {optionsProduct && optionsProduct.map(item => <el-option label={item.productName} value={item.productId} key={item.productId}/>)}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                        <el-input value={this.formData.productName} placeholder="" name="productName"/>
                    </el-form-item>
                    <el-form-item label="产品分组Id：" prop="vipGroupId">
                        <el-input value={this.formData.vipGroupId} placeholder="" name="vipGroupId"/>
                    </el-form-item>
                    <el-form-item label="微信支付产品图片：" prop="wxCnOss">
                        <uploadImg ref="uploadWx" defaultImg={this.formData.wxCnOss} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                    </el-form-item>

                    <el-form-item label="OTT支付产品图片：" prop="ottCnOss">
                        <uploadImg ref="uploadOtt" defaultImg={this.formData.ottCnOss} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="折扣类型：" prop="discountType">
                        <el-select
                            onChange={(e) => {
                                if (!(e > 0)) this.formData.discountType = 0;
                            }}
                            placeholder="请选择"
                            value={this.formData.discountType}
                            name='discountType'>
                            {optionsDiscountType.map(item => <el-option label={item.label} value={item.status} key={item.status}/>)}
                        </el-select>
                    </el-form-item>
                    <el-form-item style={{
                        display: this.formData.discountType === 1 ? 'block' : 'none'
                    }}
                                  label="折扣金额："
                                  prop="discount">

                        <el-input value={this.formData.discount} name='discount' placeholder="请输入金额（元）" number/>
                    </el-form-item>

                    <el-form-item style={{
                        display: this.formData.discountType === 2 ? 'block' : 'none'
                    }}
                                  label="赠送时间："
                                  prop="extraTime">

                        <el-input value={this.formData.extraTime} name='extraTime' placeholder="请输入赠送时间（分钟）" number/>
                    </el-form-item>

                    <el-form-item label="有效时间：" style={{display: this.formData.discountType !== 0 ? 'block' : 'none'}}>
                        <el-date-picker
                            value={this.formData.effectTime}
                            name='effectTime'
                            type="datetimerange"
                            range-separator=" 至 "
                            placeholder="请输入有效起止日期"
                            onPicker={(val) => {
                                console.log(val);
                            }}/>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                        <el-select value={this.formData.status} name='status'>
                            <el-option label="未启用" value={0} key={0}/>
                            <el-option label="已启用" value={1} key={1}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form> : <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                      ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="产品名称：" prop="name">
                        <el-input value={this.formData.name} placeholder="" name="name"/>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input value={this.formData.remark} placeholder="" name="remark"/>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                        <el-select value={this.formData.status} name='status'>
                            <el-option label="正常" value={1} key={1}/>
                            <el-option label="禁用" value={2} key={2}/>
                            <el-option label="删除" value={3} key={3}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },
        topButtonHtml: function (h) {
            const proList = this.pageAction === childProdcutData.pageAction;
            return (
                this.status === "list" ? <div class="filter-container table-top-button-container">
                    {
                        proList ? <el-button class="filter-item" onClick={() => {this.showList();}} type="primary" icon="caret-left">返回
                        </el-button> : ""
                    }
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 添加、编辑传参解析
         */
        productChange: function (e, optionsProduct) {
            const selectedProduct = optionsProduct && optionsProduct.filter(item => {
                    return parseInt(item.productId, 10) === parseInt(e, 10);
                })[0];

            const imgKeys = [
                'wxCnOss',
                'wxCnEcs',
                'ottCnOss',
                'ottCnEcs',
                'wxFtOss',
                'wxFtEcs',
                'wxEnOss',
                'wxEnEcs',
                'ottFtOss',
                'ottFtEcs',
                'ottEnOss',
                'ottEnEcs'
            ];

            const imgKeysFromData = [
                'wxOssImg',
                'wxImg',
                'ottOssImg',
                'ottImg'
            ];

            imgKeys.map(key => {
                switch (key) {
                    case imgKeys[0]:
                        this.formData[key] = selectedProduct[imgKeysFromData[0]];
                        break;
                    case imgKeys[1]:
                        this.formData[key] = selectedProduct[imgKeysFromData[1]];
                        break;
                    case imgKeys[2]:
                        this.formData[key] = selectedProduct[imgKeysFromData[2]];
                        break;
                    case imgKeys[3]:
                        this.formData[key] = selectedProduct[imgKeysFromData[3]];
                        break;
                    default:
                        this.formData[key] = selectedProduct[key];
                        break;
                }
            });
        },

        /**
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        const edit = (row) => {
                            this.formData = row;

                            if (row.discount === null) this.formData.discount = this.defaultFormData.discount;
                            if (row.extraTime === null) this.formData.extraTime = this.defaultFormData.extraTime;

                            this.formData.effectTime = [row.startTime, row.endTime];
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const del = (row) => {
                            this.submitDel(row);
                        };
                        const proList = (row) => {
                            this.showList(row.id);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', del);
                        this.$refs.Vtable.$on('proList', proList);
                        this.$refs.Vtable.$on('pageChange', pageChange);
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.pageAction === childProdcutData.pageAction) {
                        // 上传成功后再提交
                        this.$refs.uploadWx.handleStart({
                            success: r => {

                                if (r) {
                                    const {imageNet, imgPath} = r;
                                    this.formData.wxCnOss = imageNet;
                                    this.formData.wxCnEcs = imgPath;
                                }

                                this.$refs.uploadOtt.handleStart({
                                    success: r => {

                                        this.submitLoading = false;
                                        if (r) {
                                            const {imageNet, imgPath} = r;
                                            this.formData.ottCnOss = imageNet;
                                            this.formData.ottCnEcs = imgPath;
                                        }
                                        if (this.formData.status === '未启用') this.formData.status = 0;
                                        productSave(this.submitAddOrUpdateParam()).then(res => {
                                            this.$message({
                                                message: "操作成功",
                                                type: "success"
                                            });
                                            this.submitLoading = false;
                                            this.status = 'list';
                                        }).catch(err => {
                                            this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                                            this.submitLoading = false;
                                        });

                                    }, fail: err => {
                                        this.submitLoading = false;
                                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                                    }
                                });
                            }, fail: err => {
                                this.submitLoading = false;
                                this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                            }
                        });
                    } else {
                        this.submitForm();
                    }
                } else {
                    return false;
                }
            });
        },

        /**
         * 添加、编辑传参解析
         */
        submitAddOrUpdateParam: function () {

            const paramKeys = [
                'id',
                'status',
                'productId',
                'discountType',
                'productName',
                'vipGroupId',
                'discount',
                'wxCnOss',
                'wxCnEcs',
                'wxFtOss',
                'wxFtEcs',
                'wxEnOss',
                'wxEnEcs',
                'ottCnOss',
                'ottCnEcs',
                'ottFtOss',
                'ottFtEcs',
                'ottEnOss',
                'ottEnEcs'
            ];

            let param = {};
            paramKeys.map(key => {
                param[key] = this.formData[key];
            });

            if (this.formData.discountType === 1) {
                param.discount = this.formData.discount;
            } else if (this.formData.discountType === 2) {
                param.extraTime = this.formData.extraTime;
            }

            if (this.formData.discountType > 0 && this.formData.effectTime.length === 2) {
                param.startTime = parseTime(this.formData.effectTime[0]);
                param.endTime = parseTime(this.formData.effectTime[1]);
            }

            if (this.status === 'add') {
                param.id = null;
            }

            return param;
        },
        submitForm() {
            this.submitLoading = true;
            this.editFun && this.editFun(this.formData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.status = 'list';
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
            });
        },

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function (id) {
            this.deviceConfigId = id;
            setTimeout(f => {
                const _deviceUserData = Object.assign({}, id ? childProdcutData : defaultData);
                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    id: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.validateRule = _deviceUserData.validateRule;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {id: id});
                this.enableDefaultCurrentPage = !id;
                this.editFun = _deviceUserData.editFun;
            }, 50);
        },
    }
});

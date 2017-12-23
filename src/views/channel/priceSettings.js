import {mapGetters} from 'vuex';
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import {
    productDiscountDelete, productDiscountProductList, productDiscountSave
} from '../../api/share';
import {bindData, parseTime} from '../../utils/index';
import apiUrl from "../../api/apiUrl";
import Const from "../../utils/const";


const defaultData = {
    defaultFormData: {
        id: null,
        productId: [],
        channelCode: null,
        status: null,
        discountType: null,
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
    viewRule: [
        {columnKey: 'channelName', label: '机型', minWidth: 170},
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
        // {imgColumn: 'wxCnOss', label: '微信支付产品图片', minWidth: 120},
        // {imgColumn: 'ottCnOss', label: 'OTT支付产品图片', minWidth: 120},
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
        // {columnKey: 'discount', label: '折扣金额（元）', minWidth: 150},
        // {columnKey: 'extraTime', label: '赠送时间（分钟）', minWidth: 150},
        // {columnKey: 'startTime', label: '开始时间', minWidth: 170},
        // {columnKey: 'endTime', label: '结束时间', minWidth: 170},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
        {columnKey: 'updateTime', label: '操作人', minWidth: 170},
        {label: '操作', buttons: [{label: '查看编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 140}
    ],
    validateRule: {
        channelCode: [
            {required: true, message: '请输入机型名称', trigger: 'change'}
        ],
        productId: [
            {required: true, message: '请输入产品名称', trigger: 'change'}
        ],
        discount: [
            {required: true, message: '请输入折扣金额'},
            {type: 'number', message: '必须为数字值'}
        ],
        extraTime: [
            {required: true, message: '请输入赠送时间'},
            {type: 'number', message: '必须为数字值'}
        ]
    },
    listDataGetter: function() {
        return this.share.shareListPage;
    },
    pageAction: 'shareList/RefreshPage',
    pageActionSearchColumn: [{type: 1}],
    pageActionSearch: [{
        column: 'channelCode', label: '请输选择机型', type: 'option', value: '', options: []
    }],
    editFun: productDiscountSave,
    delItemFun: productDiscountDelete
};

export default BaseListView.extend({
    name: 'shareIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            preStatus: [],
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            pageAction: _defaultData.pageAction,
            optionsProduct: [],
            optionsChannel: []
        };
    },
    created() {
        this.channelGetter();
        this.productListGetter();
    },
    computed: {
        ...mapGetters(['share', 'channel'])
    },
    watch: {
        optionsChannel: function() {
            if (defaultData.pageActionSearch[0].options.length === 0) {
                this.optionsChannel.map(i => defaultData.pageActionSearch[0].options.push({label: i.name, value: i.code}));
            }
        }
    },
    methods: {

        /**
         * 获取渠道列表
         */
        channelGetter: function () {
            this.$store.dispatch('channel/RefreshPage', {currentPage: 1, pageSize: 20}).then(res => {}).catch(err => {});
        },

        /**
         * 获取产品列表
         */
        productListGetter: function () {
            productDiscountProductList().then(res => {
                this.optionsProduct = res;
            }).catch(err => {});
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {

            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;

            this.optionsChannel = this.channel.channelPage.data;
            const optionsProduct = this.optionsProduct;

            const optionsStatus = [
                {status: 1, label: '启用'},
                {status: 0, label: '未启用'}
            ];

            const optionsDiscountType = [
                {status: 0, label: '没有折扣'},
                {status: 1, label: '立减金额'},
                {status: 2, label: '赠送时间'}
            ];

            if (this.status === 'add' && this.formData.discountType === null) {
                this.formData.status = optionsStatus[0].status;
                this.formData.discountType = optionsDiscountType[0].status;
            }

            return (
                (this.status === 'edit' || this.status === 'add') && <el-form v-loading={this.loading} class="small-space" model={this.formData} ref="addForm" rules={this.validateRule} label-position="right" label-width="150px">

                    <el-form-item label="机型：" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {this.optionsChannel.map(item => <el-option label={item.name} value={item.code} key={item.code}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="状态选择：" prop="status">
                        <el-select
                            onChange={(e) => {
                                if (!(e > 0)) this.formData.status = 0;
                            }} placeholder="请选择" value={this.formData.status} name='status'>

                            {optionsStatus.map(item => <el-option label={item.label} value={item.status} key={item.status}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="产品价格模板：" prop="productId">
                        <el-select placeholder="请选择" value={this.formData.productId} name='productId' onChange={(e) => {this.productChange(e, optionsProduct);}}>
                            {optionsProduct && optionsProduct.map(item => <el-option label={item.productName} value={item.productId} key={item.productId}/>)}
                        </el-select>
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
                            placeholder="请输入有效起止日期" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={f => this.status = this.preStatus.pop()}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            this.optionsChannel = this.channel.channelPage.data;
            return (
                this.status === 'list' && <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.formData = {...this.defaultFormData};
                            this.status = "add";
                            this.preStatus.push('list');
                        }
                    } type="primary" icon="edit">添加
                    </el-button>

                    <el-button class="filter-item" onClick={
                        () => {
                            this.pageActionSearchColumn[0].type = this.pageActionSearchColumn[0].type === 1 ? 2 : 1;

                            this.$refs.Vtable.refreshData({
                                currentPage: 1
                            });
                        }
                    } type="primary">{this.pageActionSearchColumn[0].type === 1 ? '切换至共享设备' : '切换至非共享设备'}
                    </el-button>
                </div>
            );
        },

        /**
         * 添加、编辑结果提交
         */
        submitAddOrUpdate: function () {

            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
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

                                    productDiscountSave(this.submitAddOrUpdateParam()).then(res => {
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
                'channelCode',
                'status',
                'productId',
                'discountType',
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

            return param;
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

                        this.$refs.Vtable.$on('edit', row => {

                            for (let key in this.defaultFormData) {
                                this.formData[key] = row[key];
                            }

                            if (row.discount === null) this.formData.discount = this.defaultFormData.discount;
                            if (row.extraTime === null) this.formData.extraTime = this.defaultFormData.extraTime;

                            this.formData.effectTime = [row.startTime, row.endTime];

                            this.status = "edit";
                            this.preStatus.push('list');
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });

                        this.$refs.Vtable.$on('del', row => {
                            this.submitDel(row);
                        });

                        this.$refs.Vtable.$on('pageChange', defaultCurrentPage => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });

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
        }

    }

});

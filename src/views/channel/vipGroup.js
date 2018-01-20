import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Ntable from '../../components/Table/normalTable';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {page, save, del, productPage,
    productSave, productDel,
    saveImg,
    productDiscountProductList,
    getSearchProductDetail,
    getChannelList} from '../../api/vipGroup';
import {bindData, parseTime} from "../../utils/index";
import {languageList} from "../../api/language";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: '产品包Id', minWidth: 100},
        {columnKey: 'name', label: '产品包名称', minWidth: 130},
        {columnKey: 'remark', label: '描述', minWidth: 120},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '子产品', type: 'proList'}, {label: '关联机型', type: 'channel'}], minWidth: 316}
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
    },
    editFun: save,
    delItemFun: del
};

const childProdcutData = {
    viewRule: [
        {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
        {columnKey: 'productId', label: '产品Id', minWidth: 160},
        {columnKey: 'productName', label: '产品名称', minWidth: 130},
        {columnKey: 'vipGroupName', label: '产品组名称', minWidth: 120},
        {columnKey: 'isEnabled', label: '是否开启', minWidth: 120, formatter: r => {
            switch (r.isEnabled) {
                case 1:
                    return '是';
                default:
                    return '否';
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
        {columnKey: 'isRecommand', label: '是否推荐', minWidth: 80, formatter: r => {
            if (r.isRecommand === 1) return '是';
            if (r.isRecommand === 0) return '否';
        }},
        {columnKey: 'remark', label: '描述'},
        {columnKey: 'createTime', label: '创建时间', minWidth: 100},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 100},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 150}
    ],
    validateRule: {
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字值'}
        ]
    },
    listDataGetter: function() {
        return this.channel.vipGroupProductPage;
    },
    pageAction: 'channel/vipGroup/product/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [],
    defaultFormData: {
        id: null,
        productId: '',
        isEnabled: 1, //0未启用, 1启用
        price: 0, //产品价格模板
        discountType: 0,
        sort: '',
        vipGroupUuid: '',
        isRecommand: 1,
        remark: '',
        discount: 0.01,
        extraTime: 1,
        startTime: null,
        endTime: null,
        effectTime: [],
        map: {
            nameKey: {},
            ottPicKey: {},
            wxPicKey: {},
        },
    },
    editFun: productSave,
    delItemFun: productDel
};

const channelListData = {
    viewRule: [
        {columnKey: 'name', label: '机型名称', minWidth: 130},
        {columnKey: 'code', label: '机型Code', minWidth: 130},
        {columnKey: 'remark', label: '描述', minWidth: 130},
    ]
};

export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    created() {
        this.productListGetter();
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
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
            pageAction: _defaultData.pageAction,
            optionsProduct: [],
            productPrice: 0,
            selectItems: null,
            channelData: []
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
            switch (this.status) {
                case 'channel':
                    return this.channelListHtml(h);
                default:
                    return this.detailViewHtml(h);
            }
        },
        detailViewHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_VIP_GROUP_SAVE_IMG;
            if (this.status === 'editI18n') return this.cruI18n(h);
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
                            {optionsProduct && optionsProduct.map(item => <el-option label={item.name} value={item.productId} key={item.productId}/>)}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="价格：" style={{
                        display: this.formData.productId ? 'block' : 'none'
                    }}>
                        <el-input value={this.productPrice} placeholder="请输入金额（元）" number disabled={true}/>
                    </el-form-item>

                    {
                        this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.wxPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.wxPicKey[this.lanList[0].language] = this.formData.wxPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("img",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "图片：",
                                                    name: v => this.formData.map.wxPicKey[lanItem.language] = v,
                                                    defaultImg: v => this.formData.map.wxPicKey[lanItem.language],
                                                };
                                            })
                                            , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    {
                        this.lanList.length > 0 ? <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：" required>
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <uploadImg defaultImg={this.formData.map.ottPicKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.ottPicKey[this.lanList[0].language] = this.formData.ottPic = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("img",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "图片：",
                                                    name: v => this.formData.map.ottPicKey[lanItem.language] = v,
                                                    defaultImg: v => this.formData.map.ottPicKey[lanItem.language],
                                                };
                                            })
                                            , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

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
                        />
                    </el-form-item>
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否推荐:" prop="isRecommand">
                        <el-select value={this.formData.isRecommand} onInput={v => this.formData.isRecommand = v}>
                            <el-option label="是" value={1} key={1}/>
                            <el-option label="否" value={0} key={0}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：" prop="remark">
                        <el-input value={this.formData.remark} placeholder="" name="remark"/>
                    </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                        <el-input value={this.formData.sort} placeholder="" name="sort" number/>
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
                    <el-form-item label="描述：" prop="remark">
                        <el-input value={this.formData.remark} placeholder="" name="remark"/>
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
                            (this.pageAction === childProdcutData.pageAction) && (this.defaultFormData.map = {
                                nameKey: {},
                                ottPicKey: {},
                                wxPicKey: {},
                            });
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        /**
         * 关联机型
         */
        channelListHtml: function(h) {
            return (
                <el-row>
                    <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={() => {
                           this.status = 'list';
                        }} type="primary" icon="caret-left">返回
                        </el-button>
                    </div>
                    <Ntable ref="allTable" data={this.channelData} viewRule={channelListData.viewRule}/>
                </el-row>
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
                'wxImg',
                'wxOssImg',
                'ottImg',
                'ottOssImg',
            ];
            this.productPrice = selectedProduct.price; //显示价格
            if (this.status === 'edit' && this.formData.wxCnOss && this.formData.ottCnOss) { //如果图片路径已经了，就不改变图片
                return;
            }

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

            // this.searchProductDetail(this.formData.productId);
        },
        searchProductDetail: function(id) {
            getSearchProductDetail(id).then(res => {
                this.productPrice = res.price;
                console.log("数据来了", res);
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
                            this.searchProductDetail(this.formData.productId);

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
                            if (this.pageAction === defaultData.pageAction) {
                                this.selectItems = row;
                            }
                            this.showList(row.uuid);
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
                        this.$refs.Vtable.$on('channel', (row) => {
                            this.getProductChannelList(row.uuid);
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                case 'add':
                case 'edit':
                    this.$refs.addForm && bindData(this, this.$refs.addForm);
                    break;
                case 'channel':
                    break;
                default:
                    break;
            }
        },

        // submitAddOrUpdate: function () {
        //     this.$refs.addForm.validate((valid) => {
        //         if (valid) {
        //             this.submitLoading = true;
        //             if (this.formData.isRecommand === "否") this.formData.isRecommand = 0;
        //             if (this.pageAction === childProdcutData.pageAction) {
        //                 // 上传成功后再提交
        //                 this.$refs.uploadWx.handleStart({
        //                     success: r => {
        //
        //                         if (r) {
        //                             const {imageNet, imgPath} = r;
        //                             this.formData.wxCnOss = imageNet;
        //                             this.formData.wxCnEcs = imgPath;
        //                         }
        //
        //                         this.$refs.uploadOtt.handleStart({
        //                             success: r => {
        //                                 this.submitLoading = false;
        //                                 if (r) {
        //                                     const {imageNet, imgPath} = r;
        //                                     this.formData.ottCnOss = imageNet;
        //                                     this.formData.ottCnEcs = imgPath;
        //                                 }
        //                                 // if (this.formData.status === '未启用') this.formData.status = 0;
        //                                 productSave(this.submitAddOrUpdateParam()).then(res => {
        //                                     this.$message({
        //                                         message: "操作成功",
        //                                         type: "success"
        //                                     });
        //                                     this.submitLoading = false;
        //                                     this.status = 'list';
        //                                 }).catch(err => {
        //                                     this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
        //                                     this.submitLoading = false;
        //                                 });
        //
        //                             }, fail: err => {
        //                                 this.submitLoading = false;
        //                                 this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
        //                             }
        //                         });
        //                     }, fail: err => {
        //                         this.submitLoading = false;
        //                         this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
        //                     }
        //                 });
        //             } else {
        //                 this.submitForm();
        //             }
        //         } else {
        //             return false;
        //         }
        //     });
        // },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        /**
         * 添加、编辑传参解析
         */
        submitAddOrUpdateParam: function () {

            const paramKeys = [
                'id',
                'isEnabled',
                'productId',
                'discountType',
                'vipGroupUuid',
                'sort',
                'remark',
                'isRecommand',
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
                param.vipGroupUuid = this.selectItems.uuid;
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
         * @param uuid
         */
        getProductChannelList(id) {
            getChannelList(id).then(res => {
                this.status = 'channel';
                this.channelData = res.data;
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
                    vipGroupUuid: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.validateRule = _deviceUserData.validateRule;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {vipGroupUuid: id});
                this.enableDefaultCurrentPage = !id;
                this.editFun = _deviceUserData.editFun;
            }, 50);
        },
    }
});

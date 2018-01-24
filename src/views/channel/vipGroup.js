import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import Ntable from '../../components/Table/normalTable';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {
    del,
    getChannelList,
    getSearchProductDetail,
    productDel,
    productDiscountProductList,
    productSave,
    save
} from '../../api/vipGroup';
import {languageList} from "../../api/language";

const defaultData = {
    defaultFormData: {
        name: '',
        remark: '',
    },
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
    pageActionSearch: [{
        column: 'name', label: '请输入产品包名称', type: 'input', value: ''
    }],
    editFun: save,
    delItemFun: del
};

const childProductData = {
    defaultFormData: {
        id: null,
        productId: '',
        isEnabled: 1, //0未启用, 1启用
        price: 0, //产品价格模板
        discountType: 0,
        sort: 1,
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
    viewRule: [
        {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
        {columnKey: 'productId', label: '产品Id', minWidth: 160, inDetail: true},
        {columnKey: 'productName', label: '产品名称', minWidth: 130},
        {columnKey: 'vipGroupName', label: '产品组名称', minWidth: 120},
        {columnKey: 'wxOssPic', label: '自定义微信图片', minWidth: 100, imgColumn: r => r.map && r.map.wxPicKey && (r.map.wxPicKey.cn || r.map.wxPicKey.en || r.map.wxPicKey.hk || r.map.wxPicKey.tw), inDetail: true},
        {columnKey: 'wxOssPic', label: '自定义OTT图片', minWidth: 100, imgColumn: r => r.map && r.map.ottPicKey && (r.map.ottPicKey.cn || r.map.ottPicKey.en || r.map.ottPicKey.hk || r.map.ottPicKey.tw), inDetail: true},
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
        {columnKey: 'createTime', label: '创建时间', minWidth: 100, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 100},
        {columnKey: 'remark', label: '描述', inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 150}
    ],
    validateRule: {
        productId: [
            {required: true, message: '请选择价格模板'},
        ],
        sort: [
            {required: true, message: '请输入排序'},
            {type: 'number', message: '必须为数字值'}
        ],
    },
    listDataGetter: function() {
        return this.channel.vipGroupProductPage;
    },
    pageAction: 'channel/vipGroup/product/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [
        {column: 'productName', label: '请输入产品名称', type: 'input', value: ''},
        {column: 'vipGroupName', label: '请输入产品组名称', type: 'input', value: ''},
        ],
    editFun: productSave,
    delItemFun: productDel
};

const channelListData = {
    viewRule: [
        {columnKey: 'name', label: '机型名称', minWidth: 130},
        {columnKey: 'code', label: '机型Code', minWidth: 130},
        {columnKey: 'remark', label: '描述', minWidth: 130},
    ],
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
            switch (this.currentPage) {
                case 'channel':
                    return this.channelListHtml(h);
                default:
                    return this.detailViewHtml(h);
            }
        },
        detailViewHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_VIP_GROUP_SAVE_IMG;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            const optionsProduct = this.optionsProduct;
            const optionsDiscountType = [
                {status: 0, label: '没有折扣'},
                {status: 1, label: '立减金额'},
                {status: 2, label: '赠送时间'}
            ];
            return (
                this.pageAction === childProductData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                           ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="产品价格模板：" prop="productId">
                        <el-select placeholder="请选择" value={this.formData.productId} name='productId' onChange={(e) => {this.productChange(e, optionsProduct);}}>
                            {optionsProduct && optionsProduct.map(item => <el-option label={item.name} value={item.productId} key={item.productId}/>)}
                        </el-select>
                    </el-form-item>
                    <el-form-item label="价格：" v-show={this.formData.productId}>
                        <el-input value={this.productPrice} placeholder="请输入金额（元）" disabled={true}/>
                    </el-form-item>

                    {
                        this.lanList.length > 0 ? <el-form-item label="微信图片(300*180)：" prop="wxPic">
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
                        this.lanList.length > 0 ? <el-form-item label="ott图片(280*280 280*580 580*280 580*580)：" prop="ottPic">
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
                        <el-select placeholder="请选择" value={this.formData.discountType} onHandleOptionClick={f => this.formData.discountType = f.value}>
                            {
                                optionsDiscountType.map(item => <el-option label={item.label} value={item.status} key={item.status}/>)
                            }
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
                    <el-form-item label="排序：" prop="sort">
                        <el-input value={this.formData.sort} onChange={v => this.formData.sort = parseInt(v, 10)} number/>
                    </el-form-item>
                    <el-form-item label="描述：" prop="remark">
                        <el-input rows={2} type="textarea" value={this.formData.remark} placeholder="" name="remark"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
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
                                this.goPage(this.PAGE_LIST);
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            const proList = this.pageAction === childProductData.pageAction;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        proList ? <el-button class="filter-item" onClick={() => {
                            this.pageBack();
                            this.showList();
                        }} type="primary" icon="caret-left">返回
                        </el-button> : ""
                    }
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            (this.pageAction === childProductData.pageAction) && (this.defaultFormData.map = {
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
                           this.pageBack();
                        }} type="primary" icon="caret-left">返回
                        </el-button>
                    </div>
                    <Ntable ref="allTable" data={this.channelData} viewRule={channelListData.viewRule}/>
                </el-row>
            );
        },

        /**
         * 兼容写法
         * @param h
         * @returns {*}
         */
        renderChannelHtml(h) {
            return this.cruHtml(h);
        },

        /**
         * 添加、编辑传参解析
         */
        productChange: function (e, optionsProduct) {
            const selectedProduct = optionsProduct && optionsProduct.filter(item => {
                    return parseInt(item.productId, 10) === parseInt(e, 10);
                })[0];
            this.productPrice = selectedProduct.price; //显示价格
        },

        searchProductDetail: function(id) {
            getSearchProductDetail(id).then(res => {
                this.productPrice = res.price;
            });
        },

        handelEdit(row) {
            this.formData = row;
            this.searchProductDetail(this.formData.productId);

            if (row.discount === null) this.formData.discount = this.defaultFormData.discount;
            if (row.extraTime === null) this.formData.extraTime = this.defaultFormData.extraTime;

            this.formData.effectTime = [row.startTime, row.endTime];
            this.goPage(this.PAGE_EDIT);
            this.beforeEditSHow && this.beforeEditSHow(row);
        },

        /**
         * table 中按钮 type = proList 事件
         * @param row
         */
        handelProList(row) {
            if (this.pageAction === defaultData.pageAction) {
                this.selectItems = row;
            }
            this.goPage(this.PAGE_LIST);
            this.showList(row.uuid);
        },

        /**
         * table 中按钮 type = channel 事件
         * @param row
         */
        handelChannel(row) {
            this.getProductChannelList(row.uuid);
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        /**
         * @param uuid
         */
        getProductChannelList(uuid) {
            getChannelList(uuid).then(res => {
                this.goPage('channel');
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
                const _deviceUserData = Object.assign({}, id ? childProductData : defaultData);

                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    vipGroupUuid: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.validateRule = _deviceUserData.validateRule;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.pageActionSearch = _deviceUserData.pageActionSearch;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {vipGroupUuid: id});
                this.enableDefaultCurrentPage = !id;
                this.editFun = _deviceUserData.editFun;
            }, 50);
        },
    }
});

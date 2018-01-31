import {mapGetters} from 'vuex';
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from '../../utils/const';
import apiUrl from "../../api/apiUrl";
import {save as saveShare, del as delShare, delMarket, saveMarket, getMarketlist} from '../../api/share';
import {bindData} from '../../utils/index';

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        channelCode: '',
        price: '',
        duration: '',
        status: 1,
        wxOssImage: '',
        wxCnEcs: '',
        wxCnOss: '',
        ottOssImage: '',
        ottCnOss: '',
        ottCnEcs: '',
        isRecommend: 1,
        sort: '',
        marketList: [],
        tails: {}
    },
    viewRule: [
        {columnKey: 'name', label: '套餐名称'},
        {columnKey: 'channelName', label: '机型'},
        {columnKey: 'channelCode', label: '渠道code'},
        {columnKey: 'price', label: '金额', minWidth: 70, formatter: r => {
            if (r.price) return r.price.toFixed(2);
        }},
        {columnKey: 'duration', label: '时长', minWidth: 70},
        {columnKey: 'wxOssImage', label: '微信图片', minWidth: 110, formatter: (r, h) => {
            if (r.wxOssImage) return (<img src={r.wxOssImage} style="height: 40px; margin-top: 5px"/>);
        }},
        {columnKey: 'ottOssImage', label: 'ott图片', minWidth: 110, formatter: (r, h) => {
            if (r.ottOssImage) return (<img src={r.ottOssImage} style="height: 40px; margin-top: 5px"/>);
        }},
        {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
            if (r.status === 1) return '启用';
            if (r.status === 0) return '禁用';
            if (r.status === 2) return '删除';
        }},
        {columnKey: 'isRecommend', label: '是否推荐', minWidth: 70, formatter: r => {
            if (r.isRecommend === 1) return '是';
            if (r.isRecommend === 0) return '否';
        }},
        {columnKey: 'marketList', label: '折扣方式', minWidth: 120, formatter: r => {
            //1折扣时间， 2折扣金额
            var val = [];
            r.marketList.map(item => {
                item.discountType === '1' ? val.push("折扣时间") : (item.discountType === '2' ? val.push("折扣金额") : '');
            });
            return val.join('');
        }},
        {columnKey: 'marketList', label: '折扣详情', minWidth: 120, formatter: r => {
            var val = [];
            r.marketList.map(item => {
                item.discountTime ? val.push(item.discountTime + '分钟') : '';
                item.discountAmount ? val.push(item.discountAmount + '元') : '';
            });
            return val.join('');
        }},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入套餐名称'}
        ],
        price: [
            {required: true, message: '请输入金额'},
            {type: 'number', message: '必须为数字值'}
        ],
        duration: [
            {required: true, message: '请输入时长'},
        ]
    },
    listDataGetter: function() {
        return this.share.shareList;
    },
    pageAction: 'share/RefreshPage',
    pageActionSearchColumn: [],
    editFun: saveShare,
    delItemFun: delShare
};

const couponData = {
    defaultFormData: {
        id: '',
        promotionId: '', //其父元素的id值
        name: '',
        wxOssImage: '',
        wxCnEcs: '',
        wxCnOss: '',
        ottOssImage: '',
        ottCnOss: '',
        ottCnEcs: '',
        promotionType: "1", //1首次优惠，2再次优惠
        expireDay: null,
        discountType: "1", //1折扣金额， 2赠送时间
        discountAmount: null,
        discountTime: null,
        startTime: '2017-1-1',
        endTime: null,
        status: 1, // 1可用，0不可用
        sort: '',
        tails: {}
    },
    viewRule: [
        {columnKey: 'name', label: '优惠名称'},
        {columnKey: 'expireDay', label: '优惠时间', formatter: r => {
            const val = [];
            r.expireDay ? val.push(r.expireDay + '天') : '';
            r.startTime && r.endTime ? val.push(r.startTime + '-' + r.endTime) : '';
            return val.join(' ');
        }},
        {columnKey: 'promotionType', label: '优惠方式', formatter: r => {
            //1首次优惠， 2再次优惠
            return (r.discountType === '1' ? "首次优惠" : (r.discountType === '2' ? "再次优惠" : ''));
        }},
        {columnKey: 'discountType', label: '折扣方式', formatter: r => {
            //1折扣金额， 2赠送时间
            return (r.discountType === '1' ? "折扣金额" : (r.discountType === '2' ? "赠送时间" : ''));
        }},
        {columnKey: 'discountType', label: '折扣详情', minWidth: 100, formatter: r => {
            var val = [];
            r.discountTime ? val.push(r.discountTime + '分钟') : '' ;
            r.discountAmount ? val.push(r.discountAmount + '元') : '' ;
            return val.join('');
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
    ],
    validateRule: {
        name: [
            {required: true, message: '请输入优惠名称'}
        ],
        expireDay: [
            {required: true, message: '请输入生效时间'},
            {type: 'number', message: '必须为数字值'}
        ],
        discountAmount: [
            {required: true, message: '请输入折扣金额'},
            {type: 'number', message: '必须为数字值'}
        ],
        discountTime: [
            {required: true, message: '请输入折扣时间'},
            {type: 'number', message: '必须为数字值'}
        ]
    }
};
export default BaseListView.extend({
    name: 'shareIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        const _couponData = Object.assign({}, couponData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            imgChooseFileListMarket: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            rankId: null,
            pageAction: _defaultData.pageAction,
            couponViewRule: _couponData.viewRule,
            couponFormData: _couponData.defaultFormData,
            couponDefaultFomeData: _couponData.defaultFormData,
            couponValidateRule: _couponData.validateRule,
            channelList: []
        };
    },
    mounted() {
         this.getChannelList();
    },
    computed: {
        ...mapGetters(['share'])
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + apiUrl.API_PROMOTION_SAVE_IMG;
            return (
                this.status === 'marketAdd' ? this.marketHtml(h) : (<el-form v-loading={this.loading} class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.id} name="id"/>
                    <el-form-item label="套餐名称:" prop="name">
                        <el-input value={this.formData.name} name="name" placeholder="请输入套餐名称"/>
                    </el-form-item>
                    <el-form-item label="机型:" prop="channleCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.channelList && this.channelList.map(item => (
                                    <el-option
                                        key={item.id}
                                        label={item.name}
                                        value={item.code}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                   <el-form-item label="金额:" prop="price">
                       <el-input type="number" value={this.formData.price} name="price" placeholder="请输入金额(单位元)" number/>
                   </el-form-item>
                    <el-form-item label="时长:" prop="duration">
                        <el-input value={this.formData.duration} name="duration" placeholder="请输入时长(单位分)"/>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-select placeholder="请选择" value={this.formData.status} name='status'>
                            <el-option label="生效" value={1} key={1}/>
                            <el-option label="禁用" value={0} key={0}/>
                            <el-option label="删除" value={2} key={2}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="微信图片:" prop="wxOssImage">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxOssImage} name="wxOssImage"/>
                        <uploadImg ref="upload1" defaultImg={this.formData.wxOssImage} actionUrl={uploadImgApi} name="wxOssImage" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="ott图片:" prop="ottOssImage">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottOssImage} name="ottOssImage"/>
                        <uploadImg ref="upload2" defaultImg={this.formData.ottOssImage} actionUrl={uploadImgApi} name="ottOssImage" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="是否推荐:" prop="isRecommend">
                        <el-select value={this.formData.isRecommend} name='isRecommend'>
                            <el-option label="是" value={1} key={1}/>
                            <el-option label="否" value={0} key={0}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序序号:" prop="sort">
                        <el-input value={this.formData.sort} name="sort" placeholder="请输入序号，越小排越前面" number/>
                    </el-form-item>
                    {
                        this.status === 'edit' ? (
                            <div>
                                <el-form-item label="优惠列表:">
                                    <el-button type="primary" onClick={() => {
                                        this.couponFormData = Object.assign({}, this.couponDefaultFomeData);
                                        this.couponFormData.promotionId = this.formData.id;
                                        this.status = 'marketAdd';
                                    }}>新增</el-button>
                                </el-form-item>
                                {
                                    this.formData.marketList ? <el-form-item label="" prop="marketList">
                                        <el-table
                                            border
                                            data={this.formData.marketList}>
                                            <el-table-column
                                                label="序号"
                                                type="index"
                                                index={this.indexMethod}>
                                            </el-table-column>
                                            {
                                                this.couponViewRule && this.couponViewRule.map((viewRuleItem) => (
                                                    <el-table-column
                                                        prop={viewRuleItem.columnKey}
                                                        scope="scope"
                                                        label={viewRuleItem.label || viewRuleItem.columnKey}
                                                        width={viewRuleItem.width || ''}
                                                        min-width={viewRuleItem.minWidth || 100}
                                                        formatter={viewRuleItem.buttons ? (row) => {
                                                            return (
                                                                viewRuleItem.buttons.map(button => (
                                                                    <el-button
                                                                        size="mini"
                                                                        type={(button.type === "edit" && "success") || (button.type === "del" && "danger") || (button.type === "auth" && "plain") || "primary"}
                                                                        onClick={
                                                                            () => {
                                                                                this.$emit(button.type, row);

                                                                            }
                                                                        }>{button.label}</el-button>
                                                                ))
                                                            );
                                                        } : (viewRuleItem.formatter ? (row) => {
                                                            return viewRuleItem.formatter(row, h);
                                                        } : null)}>
                                                    </el-table-column>
                                                ))
                                            }

                                        </el-table>
                                    </el-form-item> : ''
                                }

                            </div>
                        ) : ''
                    }
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.status = "list";
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>)

            );
        },
        marketHtml: function(h) {
            const uploadImgApi = Const.BASE_API + apiUrl.API_PROMOTION_SAVE_IMG;
            return (
                <el-row>
                    <el-form v-loading={this.loading} class="small-space" model={this.couponFormData} ref="addMarketForm" label-position="right" label-width="180px">
                        <el-input type="hidden" value={this.couponFormData.id} name="id"/>
                        <el-input type="hidden" value={this.couponFormData.promotionId} name="promotionId"/>
                        <el-form-item label="优惠名称:" prop="name" rules={this.couponValidateRule.name} >
                            <el-input value={this.couponFormData.name} name="name" placeholder="请输入优惠名称"/>
                        </el-form-item>
                        <el-form-item label="微信图片:" prop="wxOssImage">
                            <el-input style="display: none;" type="hidden" value={this.couponFormData.wxOssImage} name="wxOssImage"/>
                            <uploadImg ref="upload3" defaultImg={this.couponFormData.wxOssImage} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                        </el-form-item>
                        <el-form-item label="ott图片:" prop="ottOssImage">
                            <el-input style="display: none;" type="hidden" value={this.couponFormData.ottOssImage} name="ottOssImage"/>
                            <uploadImg ref="upload4" defaultImg={this.couponFormData.ottOssImage} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                        </el-form-item>
                        <el-form-item label="优惠类型:" prop="promotionType">
                            <el-select value={this.couponFormData.promotionType} name='promotionType'>
                                <el-option label="首次优惠" value={"1"} key={1}/>
                                <el-option label="再次优惠" value={"2"} key={2}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生效时间:" prop="expireDay" v-show={this.couponFormData.promotionType === '1'} rules={this.couponValidateRule.expireDay}>
                            <el-input type="number" value={this.couponFormData.expireDay} name="expireDay" placeholder="请输入生效时间(单位天)" number/>
                        </el-form-item>
                        <el-form-item label="活动时间" v-show={this.couponFormData.promotionType === '2'}>
                            <el-col span={5}>
                                <el-date-picker type="date" placeholder="选择开始时间" value={this.couponFormData.startTime} name="startTime" style="width: 100%;"/>
                            </el-col>
                            <el-col span={2} style="text-align:center">-</el-col>
                            <el-col span={5}>
                                <el-date-picker type="date" placeholder="请选择结束时间" value={this.couponFormData.endTime} name="endTime" style="width: 100%;"/>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="折扣类型:" prop="discountType">
                            <el-select value={this.couponFormData.discountType} name='discountType'>
                                <el-option label="折扣金额" value={"1"} key={1}/>
                                <el-option label="赠送时间" value={"2"} key={2}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="折扣金额:" prop="discountAmount" v-show={
                            this.couponFormData.discountType === '1'
                        } rules={this.couponValidateRule.discountAmount}>
                            <el-input value={this.couponFormData.discountAmount} name="discountAmount" placeholder="请输入折扣金额" number/>
                        </el-form-item>
                        <el-form-item label="赠送时间:" prop="discountTime" v-show={this.couponFormData.discountType === '2'} rules={this.couponValidateRule.discountTime}>
                            <el-input value={this.couponFormData.discountTime} name="discountTime" placeholder="请输入折扣时间(分)" number/>
                        </el-form-item>
                        <el-form-item label="折扣状态:" prop="status">
                            <el-select value={this.couponFormData.status} name='status'>
                                <el-option label="生效" value={1} key={1}/>
                                <el-option label="禁用" value={0} key={0}/>
                                <el-option label="删除" value={2} key={2}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="排列序号:" prop="sort">
                            <el-input value={this.couponFormData.sort} name="sort" placeholder="请输入排列序号，越小越排前面"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdateMarket}>确定</el-button>
                            <el-button onClick={
                                () => {
                                    this.status = "edit";
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            );
        },
        topButtonHtml: function (h) {
            return (
                this.status === "list" ? <div class="filter-container">
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
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.formData.status === "禁用") this.formData.status = 0;
                    if (this.formData.isRecommend === "否") this.formData.isRecommend = 0;
                    const upImgFail = err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    };
                    this.$refs.upload1.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.wxCnOss = imageNet;
                                this.formData.wxCnEcs = imgPath;
                                this.formData.wxOssImage = imageNet;
                            }
                            this.$refs.upload2.handleStart({
                                success: r => {
                                    if (r) {
                                        const {imageNet, imgPath} = r;
                                        this.formData.ottCnOss = imageNet;
                                        this.formData.ottCnEcs = imgPath;
                                        this.formData.ottOssImage = imageNet;
                                    }
                                    this.formData.tails = Object.assign({}, this.formData.tails, {
                                        wxCnOss: this.formData.wxCnOss,
                                        wxCnEcs: this.formData.wxCnEcs,
                                        wxOssImage: this.formData.wxOssImage,
                                        ottCnOss: this.formData.ottCnOss,
                                        ottCnEcs: this.formData.ottCnEcs,
                                        ottOssImage: this.formData.ottOssImage
                                    });
                                    this.submitForm();
                                }, fail: upImgFail
                            });
                        }, fail: upImgFail
                    });
                }
            });
        },
        submitAddOrUpdateMarket: function() {
            this.$refs.addMarketForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.couponFormData.status === "禁用") this.couponFormData.status = 0;
                    const upImgFail = err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    };
                    this.$refs.upload3.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.couponFormData.wxCnOss = imageNet;
                                this.couponFormData.wxCnEcs = imgPath;
                                this.couponFormData.wxOssImage = imageNet;
                            }
                            this.$refs.upload4.handleStart({
                                success: r => {
                                    if (r) {
                                        const {imageNet, imgPath} = r;
                                        this.couponFormData.ottCnOss = imageNet;
                                        this.couponFormData.ottCnEcs = imgPath;
                                        this.couponFormData.ottOssImage = imageNet;
                                    }
                                    this.formData.tails = Object.assign({}, this.couponFormData.tails, {
                                        wxCnOss: this.couponFormData.wxCnOss,
                                        wxCnEcs: this.couponFormData.wxCnEcs,
                                        wxOssImage: this.couponFormData.wxOssImage,
                                        ottCnOss: this.couponFormData.ottCnOss,
                                        ottCnEcs: this.couponFormData.ottCnEcs,
                                        ottOssImage: this.couponFormData.ottOssImage
                                    });
                                    this.submitCouponForm();
                                }, fail: upImgFail
                            });
                        }, fail: upImgFail
                    });
                }
            });
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
        submitCouponForm() {
            this.submitLoading = true;
            saveMarket && saveMarket(this.couponFormData).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.submitLoading = false;
                this.getMarketList(this.formData.id);
            }).catch(err => {
                this.$message.error(`操作失败(${typeof err === 'string' ? err : ''})！`);
                this.submitLoading = false;
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
                            this.formData = Object.assign({}, row, row.tails);
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        const del = (row) => {
                            this.submitDel(row);
                        };

                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', del);
                        this.$refs.Vtable.$on('pageChange', pageChange);
                        this.$refs.Vtable.handCustomEvent = true;

                        //删除market数据
                        this.$on("edit", (row) => {
                            console.log(row);
                            this.couponFormData = Object.assign({}, row);
                            this.status = "marketAdd";
                        });
                        this.$on("del", (row) => {
                            this.dialogVisible = true;
                            this.tipTxt = "确定要删除吗？";
                            const id = row.id;
                            this.sureCallbacks = () => {
                                this.dialogVisible = false;
                                this.submitLoading = true;
                                delMarket && delMarket(id).then(res => {
                                    this.submitLoading = false;
                                    this.$message({
                                        message: "删除成功",
                                        type: "success"
                                    });
                                    this.getMarketList(this.formData.id);
                                }).catch(err => {
                                    this.submitLoading = false;
                                });
                            };
                        });
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                case 'marketAdd':
                    bindData(this, this.$refs.addMarketForm);
                    break;
                default:
                    break;
            }
        },
        chooseChange: function (file, fileList, uploadImgItem) {
            if (!this.submitLoading) {
                this.imgChooseFileList = fileList;
                if (this.status === 'add') {
                    if (fileList.length > 0) {
                        uploadImgItem.$parent.resetField && uploadImgItem.$parent.resetField();
                        if (uploadImgItem.name) this.formData[uploadImgItem.name] = fileList[0].url;
                    } else {
                        if (uploadImgItem.name) this.formData[uploadImgItem.name] = "";
                    }
                }
            }
        },
        indexMethod: function(index) { //序号
            return index * 1;
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                this.formData.channelCode = res[0].code;

            }).catch((err) => {
            });
        },
        getMarketList: function(id) {
            getMarketlist(id).then(res => {
                this.status = 'edit';
                this.formData.marketList = res;
            });
        }

    }

});

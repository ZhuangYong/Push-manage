import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {edit as changeProduct, del as delItemFun} from '../../api/product';
import {languageList} from "../../api/language";
import {getShareProduct} from "../../api/userManage";

const strFormat = (r, h) => {
    if (r.description) return (<div><el-popover
        placement="top"
        width="100%"
        trigger="click"
        content={r.description}>
        <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.description}</div>
    </el-popover></div>);
    return '';
};

const defaultFormData = {
    channelCode: '',
    name: '',
    price: '',
    groupActiveCode: 1,
    wxImg: '',
    ottImg: '',
    description: '',
    type: 1,
    map: {
        nameKey: {type: Const.TYPE_I18N_KEY_TXT},
        ottPicKey: {type: Const.TYPE_I18N_KEY_IMG},
        wxPicKey: {type: Const.TYPE_I18N_KEY_IMG},
    },
};
export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        return {
            viewRule: [
                // {columnKey: 'sort', label: '排序', minWidth: 90, sortable: true},
                {columnKey: 'name', label: '产品名称', minWidth: 190, sortable: true},
                {columnKey: 'price', label: '价格（元）', minWidth: 120, sortable: true},
                // {columnKey: 'channelName', label: '机型', minWidth: 170},
                {columnKey: 'groupActiveCode', label: '激活码天数/时长', minWidth: 170, formatter: r => {
                    if (r.type === 1) return r.groupActiveCode + "天";
                    if (r.type === 2) return r.groupActiveCode + "分钟";
                }, sortable: true},
                {columnKey: 'type', label: '是否共享', formatter: r => {
                    if (r.type === 1) return '非共享';
                    if (r.type === 2) return '共享';
                }},
                {columnKey: 'wxPic', label: '微信支付产品图片', imgColumn: 'wxPic'},
                {columnKey: 'ottPic', label: 'OTT支付产品图片', imgColumn: 'ottPic'},
                {columnKey: 'description', label: '备注', minWidth: 180, formatter: strFormat},
                {columnKey: 'updateName', label: '更新者'},
                {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
                {columnKey: 'createName', label: '创建者', inDetail: true},
                {columnKey: 'createTime', label: '创建日期', minWidth: 170, inDetail: true},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 160}
            ],
            validateRule: {
                channelCode: [
                    {required: true, message: '请输入机型名称', trigger: 'change'}
                ],
                name: [
                    {required: true, message: '产品名称'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ],
                price: [
                    {required: true, message: '请输入价格'},
                    {type: 'number', message: '必须为数字值'}
                ],
                groupActiveCode: [
                    {required: true, message: '请输入激活时长'},
                ],
                wxImg: [
                    {required: true, message: '请选择微信支付产品图片'}
                ],
                ottImg: [
                    {required: true, message: '请选择ott支付产品图片'}
                ]
            },
            listDataGetter: function() {
                return this.channel.productPage;
            },
            pageAction: 'channel/product/RefreshPage',
            pageActionSearch: [{
                column: 'name', label: '请输入产品名称', type: 'input', value: ''
            }],
            defaultFormData: defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            activateDays: [],
            delItemFun: delItemFun,
            editFun: changeProduct
        };
    },

    computed: {
        ...mapGetters(['channel', 'system'])
    },
    created() {
        this.refreshChanel();
        this.getActivateDays();
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);

            const options = [
                {type: 1, label: '非共享'},
                {type: 2, label: '共享'},
            ];

            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                     {/*<el-form-item label="机型名称：" prop="channelCode">
                         <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.system.funChannelList && this.system.funChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                         </el-select>
                     </el-form-item>*/}
                     <el-form-item label="是否是共享：" prop="type">
                         <el-select placeholder="请选择" value={this.formData.type} onHandleOptionClick={f => (this.formData.type = f.value) && (this.formData.groupActiveCode = "")}>
                            {
                                options.map(chanel => (
                                    <el-option label={chanel.label} value={chanel.type} key={chanel.type}/>
                                ))
                            }
                         </el-select>
                     </el-form-item>
                    {
                        this.lanList.length > 0 ? <el-form-item label="产品名称：" prop="name">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item prop="x">
                                        <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("txt",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "名称：",
                                                    getValue: v => this.formData.map.nameKey[lanItem.language],
                                                    onChange: v => this.formData.map.nameKey[lanItem.language] = v,
                                                    placeholder: `请输入${lanItem.name}名称`,
                                                };
                                            })
                                        )} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }
                    <el-form-item label="价格（元）：" prop="price">
                         <el-input value={this.formData.price} placeholder="" name="price" number/>
                     </el-form-item>
                    {
                        this.formData.type === options[0].type ? <el-form-item label="激活码天数(天)：" prop="groupActiveCode">
                             <el-select value={this.formData.groupActiveCode} onHandleOptionClick={f => this.formData.groupActiveCode = f.value}>
                                 {
                                     this.activateDays.map(day =>
                                         <el-option label={day.remark} value={day.day} key={day.day}/>
                                     )
                                 }
                            </el-select>
                        </el-form-item> : <el-form-item label="激活时长(分钟)：" prop="groupActiveCode">
                             <el-input value={this.formData.groupActiveCode} placeholder="" onChange={v => this.formData.groupActiveCode = v} number/>
                        </el-form-item>
                    }
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

                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" rows={2} value={this.formData.description} name='description'/>
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
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.defaultFormData.map = {
                                nameKey: {type: Const.TYPE_I18N_KEY_TXT},
                                ottPicKey: {type: Const.TYPE_I18N_KEY_IMG},
                                wxPicKey: {type: Const.TYPE_I18N_KEY_IMG},
                            };
                            this.formData = Object.assign({}, this.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        // 刷新机型选项
        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("fun/chanelList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        getActivateDays() {
            this.loading = true;
            getShareProduct("").then(res => {
                this.activateDays = res;
                this.loading = false;
            }).catch(err => this.loading = false);
        }
    }
});

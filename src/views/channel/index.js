import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {add as changeChannel, vipGroupList, del as channelDel, checkChannelCodeUnique} from '../../api/channel';
import {languageList} from "../../api/language";
import JPanel from "../../components/panel/JPanel";

const defaultFormData = {
    name: '',
    code: '',
    // channelNo: '',
    payCodeImg: '',
    payCodeImgOss: '',
    payX: 0,
    payY: 0,
    payW: 0,
    payH: 0,
    isShare: 0,
    remark: '',
    map: {
        imageKey: {type: Const.TYPE_I18N_KEY_IMG},
    },
};
export default BaseListView.extend({
    name: 'channelIndex',
    components: {
        uploadImg
    },
    data() {
        const validateCode = function (rule, value, callback) {
            console.log("val", value);
            if (value === '') {
                callback(new Error('请输入机型值'));
            } else {
                checkChannelCodeUnique(value).then(res => {
                    if (res === "true") { //已经存在
                        callback(new Error('机型值已存在'));
                    } else {
                        callback();
                    }
                });
            }
        };
        return {
            viewRule: [
                {columnKey: 'name', label: '机型名称', minWidth: 190, sortable: true},
                {columnKey: 'code', label: '机型值', minWidth: 120},
                {columnKey: 'isShare', label: '是否是共享', formatter: r => {
                    if (r.isShare === 0) return '非共享';
                    if (r.isShare === 1) return '共享';
                    return '';
                }},
                // {columnKey: 'vipGroupName', label: '产品包名'},
                {columnKey: 'image', label: '支付二维码背景图片', minWidth: 170, imgColumn: 'image'},
                {columnKey: 'payX', label: 'X轴', inDetail: true},
                {columnKey: 'payY', label: 'Y轴', inDetail: true},
                {columnKey: 'payW', label: '宽', inDetail: true},
                {columnKey: 'payH', label: '高', inDetail: true},
                // {columnKey: 'status', label: '状态', formatter: r => {
                //     if (r.status === 1) return '生效';
                //     if (r.status === 2) return '禁用';
                //     if (r.status === 3) return '删除';
                // }, inDetail: true},
                {columnKey: 'remark', label: '描述', minWidth: 170},
                {columnKey: 'updateName', label: '更新者', inDetail: true},
                {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
                {columnKey: 'createName', label: '创建者', inDetail: true},
                {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144 }
            ],
            validateRule: {
                name: [
                    {required: true, message: '请输入机型名称'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ],
                code: [
                    {required: true, message: '请输入机型值'},
                    {validator: validateCode, trigger: 'blur'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ],
                // channelNo: [
                //     {required: true, message: '请输入机型号'},
                //     {validator: validateCode, trigger: 'blur'},
                //     {min: 1, max: 10, message: '请输入1-10位字符'}
                // ],
                payCodeImgOss: [
                    {required: true, message: '请输入图片地址或点击选择图片'}
                ],
                payX: [
                    {required: true, message: '请输入x轴'},
                    {type: 'number', message: '必须为数字值'}
                ],
                payY: [
                    {required: true, message: '请输入y轴'},
                    {type: 'number', message: '必须为数字值'}
                ],
                payW: [
                    {required: true, message: '请输入宽'},
                    {type: 'number', message: '必须为数字值'}
                ],
                payH: [
                    {required: true, message: '请输入高'},
                    {type: 'number', message: '必须为数字值'}
                ],
            },
            validateShareRule: {
                name: [
                    {required: true, message: '请输入机型名称'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ],
                code: [
                    {required: true, message: '请输入机型值'},
                    {validator: validateCode, trigger: 'blur'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ],
            },
            listDataGetter: function() {
                return this.channel.channelPage;
            },
            pageActionSearch: [{
                column: 'name', label: '请输入机型名称', type: 'input', value: ''
            },
            {
                column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                {value: 0, label: '非共享'},
                {value: 1, label: '共享'},
                ]
            },
            ],
            pageAction: 'channel/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            formData: {}, // 表单值
            tableCanSelect: false, // 表单项是否可以选择
            delItemFun: channelDel,
            imgChooseFileList: [],
            vipGroupOptionList: null,
            editFun: changeChannel
        };
    },
    created() {
        this.getVipGroupList();
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },
    computed: {
        ...mapGetters(['channel'])
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + '/' + apiUrl.API_CHANNEL_SAVE_IMAGE;
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            return (
                <JPanel title={`${this.formData.id ? "修改" : "添加"}机型`}>
                    <el-form v-loading={this.loading || this.submitLoading} class="small-space" model={this.formData}
                             ref="addForm" rules={this.formData.isShare === 1 ? this.validateShareRule : this.validateRule} label-position="right" label-width="180px">
                        <el-form-item label="是否是共享：" prop="isShare">
                            <el-select placeholder="请选择" value={this.formData.isShare} onHandleOptionClick={f => this.formData.isShare = f.value}>
                                <el-option label="非共享" value={0} key={0}/>
                                <el-option label="共享" value={1} key={1}/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="机型名称：" prop="name">
                             <el-input value={this.formData.name} name="name"/>
                         </el-form-item>
                        <el-form-item label="机型值：" prop={this.formData.id ? "" : "code"}>
                             <el-input value={this.formData.code} placeholder="设置后不能修改" name="code" disabled={!!this.formData.id}/>
                        </el-form-item>
                        {/*<el-form-item label="机型号：" prop={this.formData.id ? "" : "channelNo"}>
                            <el-input value={this.formData.channelNo} placeholder="设置后不能修改" name="channelNo" disabled={!!this.formData.id}/>
                            <el-input value={this.formData.channelNo} placeholder="设置后不能修改" name="channelNo"/>
                        </el-form-item>*/}
                        <div style={{display: this.formData.isShare === 1 ? "none" : "block"}}>
                            {
                                this.lanList.length > 0 ? <el-form-item label="支付二维码背景图片：" required>
                                    <el-row style="max-width: 440px">
                                        <el-col span={12}>
                                            <el-form-item prop="x">
                                                <uploadImg defaultImg={this.formData.map.imageKey[this.lanList[0].language]} actionUrl={uploadImgApi} name={v => this.formData.map.imageKey[this.lanList[0].language] = this.formData.image = v} chooseChange={this.chooseChange} uploadSuccess={this.uploadSuccess} beforeUpload={this.beforeUpload} autoUpload={true}/>
                                            </el-form-item>
                                        </el-col>
                                        <el-col span={12}>
                                            <el-form-item prop="width">
                                                <el-button type="primary" onClick={f => this.editI18n("img",
                                                    this.lanList.map(lanItem => {
                                                        return {
                                                            label: lanItem.name + "图片：",
                                                            name: v => this.formData.map.imageKey[lanItem.language] = v,
                                                            defaultImg: v => this.formData.map.imageKey[lanItem.language],
                                                        };
                                                    })
                                                    , uploadImgApi)} plain size="small">点击编辑多语言</el-button>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-form-item> : ""
                            }
                            <el-form-item label="支付列表显示（x轴）：" prop="payX">
                               <el-input value={this.formData.payX} name="payX" number/>
                            </el-form-item>
                            <el-form-item label="支付列表显示（Y轴）：" prop="payY">
                               <el-input value={this.formData.payY} name="payY" number/>
                            </el-form-item>
                            <el-form-item label="支付列表（宽）：" prop="payW">
                               <el-input value={this.formData.payW} name="payW" number/>
                            </el-form-item>
                            <el-form-item label="支付列表（高）：" prop="payH">
                               <el-input value={this.formData.payH} name="payH" number/>
                            </el-form-item>
                        </div>
                        <el-form-item label="描述" prop="remark">
                            <el-input type="textarea" rows={2} value={this.formData.remark} name='remark'/>
                         </el-form-item>

                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={
                                () => {
                                    if (this.formData.map) this.formData.map.imageKey = {};
                                    this.pageBack();
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                </JPanel>
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        getVipGroupList: function () {
            vipGroupList().then(res => {
                this.vipGroupOptionList = res;
            });
        }
    }
});

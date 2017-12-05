import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {edit as changeProduct, del as delItemFun} from '../../api/product';

const imgFormat = (r, h) => {
    if (r.wxImg) return (<img src={r.wxImg} style="height: 30px; margin-top: 6px;"/>);
    return '';
};
const defaultFormData = {
    channelCode: '',
    productName: '',
    price: '',
    sort: '',
    groupActiveCode: 1,
    status: 1,
    wxImg: '',
    description: ''
};
export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        return {
            viewRule: [
                {columnKey: 'sort', label: '排序', minWidth: 70},
                {columnKey: 'productName', label: '产品名称', minWidth: 190},
                {columnKey: 'price', label: '价格（元）', minWidth: 120},
                {columnKey: 'channelName', label: '机型', minWidth: 170},
                {columnKey: 'groupActiveCode', label: '激活码天数', minWidth: 170},
                {columnKey: 'status', label: '是否启用', formatter: r => {
                    if (r.status === 1) return '开启';
                    if (r.status === 2) return '未开启';
                }},
                {columnKey: 'wxImg', label: '微信支付产品图片', minWidth: 150, formatter: imgFormat},
                {columnKey: 'createTime', label: '创建时间', minWidth: 180},
                {columnKey: 'description', label: '备注', minWidth: 180},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
            ],
            validateRule: {
                channelCode: [
                    {required: true, message: '请输入机型名称', trigger: 'change'}
                ],
                productName: [
                    {required: true, message: '产品名称'},
                    {min: 1, max: 20, message: '请输入1-20位字符'}
                ],
                price: [
                    {required: true, message: '请输入价格'},
                    {type: 'number', message: '必须为数字值'}
                ],
                sort: [
                    {required: true, message: '请输入排序'},
                    {type: 'number', message: '必须为数字值'}
                ],
                wxImg: [
                    {required: true, message: '请选择微信支付产品图片'}
                ]
            },
            listDataGetter: function() {
                return this.channel.productPage;
            },
            pageAction: 'channel/product/RefreshPage',
            defaultFormData: defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: delItemFun
        };
    },

    computed: {
        ...mapGetters(['channel', 'system'])
    },
    created() {
        this.refreshChanel();
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                     <el-form-item label="机型名称：" prop="channelCode">
                         <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                            {
                                this.system.funChannelList && this.system.funChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                         </el-select>
                     </el-form-item>
                    <el-form-item label="产品名称：" prop="productName">
                         <el-input value={this.formData.productName} placeholder="" name="productName"/>
                     </el-form-item>
                    <el-form-item label="价格（元）：" prop="price">
                         <el-input value={this.formData.price} placeholder="" name="price" number/>
                     </el-form-item>
                    <el-form-item label="排序：" prop="sort">
                         <el-input value={this.formData.sort} placeholder="" name="sort" number/>
                     </el-form-item>
                    <el-form-item label="激活码天数(天)：" prop="groupActiveCode">
                         <el-select value={this.formData.groupActiveCode} name='groupActiveCode'>
                             <el-option label={1} value={1} key={1}/>
                             <el-option label={31} value={31} key={31}/>
                             <el-option label={186} value={186} key={186}/>
                             <el-option label={365} value={365} key={365}/>
                             <el-option label={366} value={366} key={366}/>
                        </el-select>
                     </el-form-item>
                    <el-form-item label="是否启用：" prop="status">
                        <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={0} label={0}>未启用</el-radio>
                            <el-radio value={1} label={1}>启用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="支付二维码背景图片：" prop="payCodeImgOss" ref="uploadItem">
                        <uploadImg ref="upload" defaultImg={this.formData.wxImg} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
                     </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" rows={2} value={this.formData.description} name='description'/>
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

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    // 上传成功后再提交
                    this.$refs.upload.handleStart({
                        success: r => {
                            if (r) {
                                const {imageNet, imgPath} = r;
                                this.formData.wxImg = imageNet;
                            }
                            changeProduct(this.formData).then(res => {
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
                            this.formData.payCodeImgOss = '';
                            this.formData.payCodeImg = '';
                            this.submitLoading = false;
                            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                        }
                    });
                } else {
                    return false;
                }
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
    }
});

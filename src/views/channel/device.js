import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {edit as changeDevice, editUser, del as delItemFun} from '../../api/device';
import {bindData} from "../../utils/index";

const imgFormat = (r, h) => {
    if (r.freeBgImg) return (<img src={r.freeBgImg} style="height: 30px; margin-top: 6px;"/>);
    return '';
};
const defaultData = {
    defaultFormData: {
        groupName: '',
        status: 1,
        codeAutoDay: '',
        freeBgImg: ''
    },
    viewRule: [
        {columnKey: 'groupName', label: '分组名称', minWidth: 170},
        {columnKey: 'codeAutoDay', label: '邀请码自动分配天数', minWidth: 120},
        {columnKey: 'freeBgImg', label: '免费激活背景图片', minWidth: 120, formatter: imgFormat},
        {columnKey: 'status', label: '状态', formatter: r => {
            if (r.status === 1) return '生效';
            if (r.status === 0) return '失效';
        }},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '设备列表', type: 'devList'}], minWidth: 190}
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
        return this.channel.devicePage;
    },
    pageAction: 'channel/device/RefreshPage',
    pageActionSearchColumn: [],
    editFun: changeDevice,
    delItemFun: delItemFun
};

const deviceUserData = {
    defaultFormData: {
        deviceConfigId: '',
        sn: '',
        mac: '',
        wifimac: '',
        ranmdoncode: '',
        status: 1
    },
    viewRule: [
        {columnKey: 'sn', label: 'SN', minWidth: 190},
        {columnKey: 'mac', label: 'MAC', minWidth: 190},
        {columnKey: 'wifimac', label: 'WIFIMAC', minWidth: 190},
        {columnKey: 'ranmdoncode', label: '随机码', minWidth: 190},
        {columnKey: 'status', label: '状态', formatter: r => {
            if (r.status === 1) return '未使用';
            if (r.status === 3) return '已使用';
        }},
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
        return this.channel.deviceUserPage;
    },
    pageAction: 'channel/device/user/RefreshPage',
    pageActionSearchColumn: [],
    editFun: editUser,
    delItemFun: delItemFun
};
export default BaseListView.extend({
    name: 'productIndex',
    components: {
        uploadImg
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            viewRule: _defaultData.viewRule,
            validateRule: _defaultData.validateRule,
            listDataGetter: _defaultData.listDataGetter,
            pageAction: _defaultData.pageAction,
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: true,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null
        };
    },

    computed: {
        ...mapGetters(['channel', 'system'])
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

                this.pageAction === deviceUserData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.deviceConfigId} name="deviceConfigId"/>
                    <el-form-item label="SN：" prop="sn">
                        <el-input value={this.formData.sn} placeholder="" name="sn"/>
                     </el-form-item>
                    <el-form-item label="MAC：" prop="mac">
                         <el-input value={this.formData.mac} placeholder="" name="mac"/>
                     </el-form-item>
                    <el-form-item label="WIFIMAC：" prop="wifimac">
                         <el-input value={this.formData.wifimac} placeholder="" name="wifimac"/>
                     </el-form-item>
                    <el-form-item label="随机码：" prop="ranmdoncode">
                         <el-input value={this.formData.ranmdoncode} placeholder="" name="ranmdoncode"/>
                     </el-form-item>
                     <el-form-item label="状态：" prop="status">
                        <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={1} label={1}>未使用</el-radio>
                            <el-radio value={3} label={3}>已使用</el-radio>
                        </el-radio-group>
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
                    <el-form-item label="分组名称：" prop="groupName">
                         <el-input value={this.formData.groupName} placeholder="" name="groupName"/>
                     </el-form-item>
                     <el-form-item label="是否启用：" prop="status">
                        <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={0} label={0}>失效</el-radio>
                            <el-radio value={1} label={1}>生效</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="激活码天数(天)：" prop="codeAutoDay">
                         <el-select value={this.formData.codeAutoDay} name='codeAutoDay'>
                             <el-option label={1} value={1} key={1}/>
                             <el-option label={31} value={31} key={31}/>
                             <el-option label={186} value={186} key={186}/>
                             <el-option label={365} value={365} key={365}/>
                             <el-option label={366} value={366} key={366}/>
                        </el-select>
                     </el-form-item>
                    <el-form-item label="支付二维码背景图片：" prop="freeBgImg" ref="uploadItem">
                        <uploadImg ref="upload" defaultImg={this.formData.freeBgImg} actionUrl={uploadImgApi} chooseChange={this.chooseChange}/>
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
            const devlist = this.pageAction === deviceUserData.pageAction;
            return (
                this.status === "list" ? <div class="filter-container">
                    {
                        devlist ? <el-button class="filter-item" onClick={() => {this.showList();}} type="primary" icon="caret-left">返回
                            </el-button> : ""
                    }
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

        /**
         * 显示列表数据，并初始化data和默认表单data
         * @param id
         */
        showList: function (id) {
            this.deviceConfigId = id;
            this.pageAction = "";
            setTimeout(f => {
                const _deviceUserData = Object.assign({}, id ? deviceUserData : defaultData);
                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    deviceConfigId: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {deviceConfigId: id});
                this.editFun = _deviceUserData.editFun;
                this.$refs.Vtable.refreshData({
                    currentPage: this.defaultCurrentPage
                });
            }, 50);
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.$refs.upload) {
                        // 上传成功后再提交
                        this.$refs.upload.handleStart({
                            success: r => {
                                if (r) {
                                    const {imageNet, imgPath} = r;
                                    this.formData.freeBgImg = imageNet;
                                }
                                this.submitForm();
                            }, fail: err => {
                                this.formData.freeBgImg = '';
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
         * 更新视图状态
         */
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('devList', (row) => {
                            this.showList(row.id);
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
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
    }
});

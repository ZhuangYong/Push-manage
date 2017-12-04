/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {edit as editDevice, editDeviceUser, del as delDevice, delDeviceUser} from '../../api/device';
import {bindData} from "../../utils/index";

const defaultData = {
    defaultFormData: {
        id: '',
        name: '',
        seq: '',
        wxOssPic: '',
        ottOssPic: '',
        status: 0
    },
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 120},
        {columnKey: 'wxpic', label: '自定义微信图片', minWidth: 100, imgColumn: 'wxpic'},
        {columnKey: 'ottpic', label: '自定义OTT图片', minWidth: 100, imgColumn: 'ottpic'},
        {columnKey: 'status', label: '状态', minWidth: 70, formatter: r => {
            if (r.status === 1) return '生效';
            if (r.status === 0) return '禁用';
        }},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '歌曲列表', type: 'musicList'}], minWidth: 190}
    ],
    validateRule: {
        name: [
            {required: true, message: '名称'}
        ],
        wxOssPic: [
            {required: true, message: '请选择自定义图片'},
        ],
        ottOssPic: [
            {required: true, message: '请选择ott自定义图片'},
        ],
        seq: [
            {type: 'number', message: '必须为数字值'}
        ]
    },
    listDataGetter: function() {
        return this.operate.groupPage;
    },
    pageAction: 'operate/group/RefreshPage',
    pageActionSearchColumn: [],
    editFun: editDevice,
    delItemFun: delDevice
};

const deviceUserData = {
    defaultFormData: {
        id: '',
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
        sn: [
            {required: true, message: '必须请输入'}
        ],
        mac: [
            {required: true, message: '必须请输入'}
        ],
        wifimac: [
            {required: true, message: '必须请输入'}
        ],
        ranmdoncode: [
            {required: true, message: '请输入排序'}
        ]
    },
    listDataGetter: function() {
        return this.operate.categoryMediaPage;
    },
    pageAction: 'operate/category/media/RefreshPage',
    pageActionSearchColumn: [],
    editFun: editDeviceUser,
    delItemFun: delDeviceUser
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
            pageActionSearchColumn: [],
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            id: null,
            pageAction: _defaultData.pageAction
        };
    },

    computed: {
        ...mapGetters(['operate'])
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

                this.pageAction === defaultData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-input type="hidden" value={this.formData.id} name="id"/>
                    <el-form-item label="名称：" prop="name">
                        <el-input value={this.formData.name} placeholder="" name="name"/>
                     </el-form-item>
                    <el-form-item label="排序：" prop="seq">
                         <el-input value={this.formData.seq} placeholder="" name="seq"/>
                     </el-form-item>
                    <el-form-item label="自定义图片(300*180)：" prop="wxOssPic">
                        <el-input style="display: none;" type="hidden" value={this.formData.wxOssPic} name="wxOssPic"/>
                        <uploadImg ref="upload" defaultImg={this.formData.wxOssPic} actionUrl={uploadImgApi} name="wxOssPic" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="ott自定义图片(280*280 280*580 580*280 580*580)：" prop="ottOssPic">
                        <el-input style="display: none;" type="hidden" value={this.formData.ottOssPic} name="ottOssPic"/>
                        <uploadImg ref="upload" defaultImg={this.formData.ottOssPic} actionUrl={uploadImgApi} name="ottOssPic" chooseChange={this.chooseChange}/>
                    </el-form-item>
                    <el-form-item label="状态：" prop="status">
                        <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={1} label={1}>生效</el-radio>
                            <el-radio value={0} label={0}>禁用</el-radio>
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
                         <el-input style="display: none;" type="hidden" value={this.formData.freeBgImg} name="payCodeImgOss"/>
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
            const musicList = this.pageAction === deviceUserData.pageAction;
            return (
                this.status === "list" ? <div class="filter-container">
                    {
                        musicList ? <el-button class="filter-item" onClick={() => {this.showList();}} type="primary" icon="caret-left">返回
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
            this.id = id;
            // this.pageAction = "";
            setTimeout(f => {
                const _deviceUserData = Object.assign({}, id ? deviceUserData : defaultData);
                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    urlJoin: id
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
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {
                        const edit = (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.beforeEditSHow && this.beforeEditSHow(row);
                        };
                        const del = (row) => {
                            this.submitDel(row);
                        };
                        const musicList = (row) => {
                            this.showList(row.id);
                        };
                        const pageChange = (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        };
                        this.$refs.Vtable.$on('edit', edit);
                        this.$refs.Vtable.$on('del', del);
                        this.$refs.Vtable.$on('musicList', musicList);
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

        // 当图片选择修改的时候
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
        }
    }
});

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import uploadImg from '../../components/Upload/singleImage.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {del as delDevice, delDeviceUser, edit as editDevice, editDeviceUser} from '../../api/device';
import {getShareProduct} from "../../api/userManage";
import {languageList} from "../../api/language";

const defaultData = {
    defaultFormData: {
        groupName: '',
        isEnabled: 1,
        codeAutoDay: 1,
        freeBgImg: '',
        map: {
            imageKey: {type: Const.TYPE_I18N_KEY_IMG},
        },
    },
    viewRule: [
        {columnKey: 'groupName', label: '分组名称', minWidth: 160, sortable: true},
        {columnKey: 'codeAutoDay', label: '邀请码自动分配天数', minWidth: 110, sortable: true},
        {columnKey: 'freeBgImg', label: '免费激活背景图片', minWidth: 100, imgColumn: 'freeBgImg'},
        {columnKey: 'deviceCount', label: '分组设备数量', minWidth: 100},
        {columnKey: 'vipCount', label: '已激活数量'},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
            if (r.isEnabled === 1) return '是';
                return '否';
        }},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '设备列表', type: 'devList'}], minWidth: 236}
    ],
    validateRule: {
        groupName: [
            {required: true, message: '请输入分组名称'}
        ],
        freeBgImg: [
            {required: true, message: '请选择免费激活背景图片'},
        ]
    },
    listDataGetter: function() {
        return this.channel.devicePage;
    },
    pageAction: 'channel/device/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [{
        column: 'groupName', label: '请输入分组名称', type: 'input', value: ''
    }],
    enableDefaultCurrentPage: true,
    editFun: editDevice,
    delItemFun: delDevice
};

const deviceUserData = {
    defaultFormData: {
        deviceConfigId: '',
        sn: '',
        mac: '',
        wifimac: '',
        ranmdoncode: ''
    },
    viewRule: [
        {columnKey: 'sn', label: 'SN', minWidth: 190},
        {columnKey: 'mac', label: 'MAC', minWidth: 190},
        {columnKey: 'wifimac', label: 'WIFIMAC', minWidth: 190},
        {columnKey: 'isUsed', label: '是否已领取', minWidth: 190, formatter: r => {
                if (r.isUsed === 1) return '是';
                return '否';
            }},
        {columnKey: 'ranmdoncode', label: '随机码', minWidth: 190},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
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
        return this.channel.deviceUserPage;
    },
    pageAction: 'channel/device/user/RefreshPage',
    pageActionSearchColumn: [],
    pageActionSearch: [{
        column: 'SN', label: '请输入SN', type: 'input', value: ''
    }],
    enableDefaultCurrentPage: false,
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
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            formData: {},
            tableCanSelect: false,
            imgChooseFileList: [],
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
            deviceConfigId: null,
            pageAction: _defaultData.pageAction
        };
    },

    computed: {
        ...mapGetters(['channel', 'system'])
    },
    created() {
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
            if (this.currentPage === this.PAGE_EDIT_I18N) return this.cruI18n(h);
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_PRODUCT_SAVE_IMAGE;
            return (

                this.pageAction === deviceUserData.pageAction ? <el-form v-loading={this.loading} class="small-space" model={this.formData}
                                                                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
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
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form> : <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                    <el-form-item label="分组名称：" prop="groupName">
                         <el-input value={this.formData.groupName} placeholder="" name="groupName"/>
                     </el-form-item>
                     <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="激活码天数(天)：" prop="codeAutoDay">
                         <el-select value={this.formData.codeAutoDay} onHandleOptionClick={f => this.formData.codeAutoDay = f.value}>
                             {
                                 this.activateDays.map(day =>
                                     <el-option label={day.remark} value={day.day} key={day.day}/>
                                 )
                             }
                        </el-select>
                     </el-form-item>
                    {
                        this.lanList.length > 0 ? <el-form-item label="免费激活背景图片：" required>
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
                    <el-form-item>
                        <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                        <el-button onClick={
                            () => {
                                this.pageBack();
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        topButtonHtml: function (h) {
            const devList = this.pageAction === deviceUserData.pageAction;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    {
                        devList ? <el-button class="filter-item" onClick={() => {this.showList();}} type="primary" icon="caret-left">返回
                            </el-button> : ""
                    }
                        <el-button class="filter-item" onClick={
                            () => {
                                this.goPage(this.PAGE_ADD);
                                this.formData = Object.assign({}, this.defaultFormData);
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
            this.searchId = id;
            // this.pageAction = "";
            setTimeout(f => {
                const _deviceUserData = Object.assign({}, id ? deviceUserData : defaultData);
                this.pageAction = _deviceUserData.pageAction;
                this.pageActionSearchColumn = [{
                    deviceConfigId: id
                }];
                this.listDataGetter = _deviceUserData.listDataGetter;
                this.validateRule = _deviceUserData.validateRule;
                this.viewRule = _deviceUserData.viewRule;
                this.delItemFun = _deviceUserData.delItemFun;
                this.pageActionSearch = _deviceUserData.pageActionSearch;
                this.defaultFormData = _deviceUserData.defaultFormData;
                if (id) this.defaultFormData = Object.assign({}, this.defaultFormData, {deviceConfigId: id});
                this.enableDefaultCurrentPage = !id;
                this.editFun = _deviceUserData.editFun;
            }, 50);
        },

        /**
         *
         * @param choosePage
         * @param id
         * @returns {{} & any}
         */
        getDataWhenShowListChange(choosePage, id) {
            return Object.assign({}, id ? deviceUserData : defaultData);
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

        beforeSubmit: function (formData) {
            if (this.pageAction === defaultData.pageAction) {
                formData.searchId = this.searchId;
            } else {
                formData.deviceConfigId = this.deviceConfigId;
            }
            return formData;
        },

        /**
         *
         * @param row
         */
        handelDevList(row) {
            this.goPage(this.PAGE_LIST);
            this.searchId = row.id;
            this.deviceConfigId = row.deviceConfigId;
            this.showList(row.id);
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

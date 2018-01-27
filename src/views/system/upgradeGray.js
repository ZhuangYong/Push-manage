import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {del as upDelete, getGrayGroupList, save as upSave} from "../../api/upgradeGray";
import uploadApk from '../../components/Upload/singleApk.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {listLoad} from "../../api/load";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'groupName', label: '灰度分组', minWidth: 120, sortable: true},
        {columnKey: 'appUpgradeName', label: 'app升级名', minWidth: 120},
        {columnKey: 'isEnabled', label: '是否开启', formatter: (r, h) => {
            switch (r.isEnabled) {
                case 1:
                    return '是';
                case 2:
                    return '否';
                default:
                    return '否';
            }
        }},
        // {columnKey: 'forceUpdate', label: '强制升级', minWidth: 100, formatter: r => {
        //
        //     if (r.forceUpdate === 0) return '否';
        //     if (r.forceUpdate === 1) return '是';
        //
        // }},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144} //{label: '关联设备', type: 'devices'}

    ],
    tableCanSelect: false,
    defaultFormData: {
        type: 1, //getUpgradeType函数获得，1app升级,2rom升级，3音效升级，4HDMI升级
        userGroupUuid: '', //设备组
        name: '', //名称
        appUpgradeId: '',
        romUpgradeId: '',
        // forceUpdate: 1, //是否强制升级， 0否，1是
        isEnabled: 1, //1生效 2禁用,
        // loadId: "", // 开机广告
        remark: ''
    },
    listDataGetter: function() {
        return this.system.grayManage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'gray/RefreshPage',
    delItemFun: upDelete,
    editFun: upSave
};
const devicesData = {
    viewRule: [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 285}
    ],
    defaultFormData: {deviceUuids: []},
    tableCanSelect: true,
    pageActionSearch: [
    ],
    pageActionSearchColumn: [],
    listDataGetter: function() {
        return this.system.deviceGroup;
    },
    pageAction: 'upgradeGray/device/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    version: [
        {required: true, message: '版本号不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ],
    fileOssUrl: [
        {required: true, message: '此处不能为空', trigger: 'blur'}
    ]
};

export default BaseListView.extend({
    name: "upgradeGrayPage",
    components: {
        uploadApk
    },
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            formData: _defaultData.defaultFormData,
            loading: false,
            submitLoading: false,
            rules: validRules,
            romList: [],
            appList: [],
            fileList: [],
            groupList: [],
            loadList: [],
            userGroupUuid: null,
            delItemFun: _defaultData.delItemFun,
            editFun: _defaultData.editFun,
        };
    },
    computed: {
        ...mapGetters(['system', 'userManage'])
    },
    mounted() {
        this.updateView();
        this.getGroupLists();
        this.getLoadList();
    },
    updated() {
        this.updateView();
    },
    created() {
        this.refreshAppRomList();
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            const uploadImgApi = Const.BASE_API + "/" + apiUrl.API_UPGRADE_GRAY_SAVEIMG;
            return (
                <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="180px">
                    <el-form-item label="名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                    </el-form-item>
                    <el-form-item label="设备组" prop="userGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.userGroupUuid} onHandleOptionClick={f => this.formData.userGroupUuid = f.value}>
                            {
                                this.showGroupList && this.showGroupList.map(item => (
                                    <el-option
                                        key={item.uuid}
                                        label={item.name}
                                        value={item.uuid}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="app升级">
                        <el-select placeholder="请选择" value={this.formData.appUpgradeId} onHandleOptionClick={f => this.formData.appUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.appList && this.appList.map(u => (
                                    <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="rom升级">
                        <el-select placeholder="请选择" value={this.formData.romUpgradeId} onHandleOptionClick={f => this.formData.romUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.romList && this.romList.map(u => (
                                    <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                   {/* <el-form-item label="是否强制升级" prop="forceUpdate">
                        <el-select placeholder="请选择" value={this.formData.forceUpdate} name='forceUpdate'>
                            <el-option label="否" value={0} key={0}/>
                            <el-option label="是" value={1} key={2}/>
                        </el-select>
                    </el-form-item>*/}
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    {/*<el-form-item label="开机广告：" prop="loadId">
                         <el-select placeholder="请选择" value={this.formData.loadId} name='loadId'>
                            {
                                this.loadList && this.loadList.map(load => (
                                    <el-option value={load.loadId} label={load.name} key={load.loadId}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>*/}
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
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
        topButtonHtml: function(h) {
            return (
                this.listStatus === "list" ? (this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.goPage(this.PAGE_ADD);
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : '') : (<div class="filter-container">
                    <el-button class="filter-item" onClick={this.historyBack} type="primary">返回</el-button>
                </div>)
            );
        },

        refreshAppRomList() {
            this.loading = true;
            this.$store.dispatch("system/appAndRom/RefreshPage").then(res => {
                this.romList = res.rom;
                this.appList = res.app;
                this.loading = false;
            }).catch(err => {
                this.romList = [];
                this.appList = [];
                this.loading = false;
            });
        },

        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
                defaultData.defaultFormData.channelCode = res[0].code;
                this.formData.channelCode = res[0].code;
            }).catch((err) => {
            });
        },
        getGroupLists: function() {
            this.loading = true;
            getGrayGroupList().then(res => {
                this.groupList = res;
                defaultData.defaultFormData.userGroupUuid = res[0].uuid;
                this.formData.userGroupUuid = res[0].uuid;
                this.loading = false;
            }).catch(e => this.loading = false);
        },
        getLoadList: function () {
            this.loading = true;
            listLoad().then(res => {
                this.loadList = res;
                this.formData.loadId = res[0].loadId;
                this.loading = false;
            }).catch(e => this.loading = false);
        },

        handelEdit(row) {
            this.formData = row;
            this.showGroupList = this.groupList.concat([{uuid: this.formData.userGroupUuid, name: this.formData.groupName}]);
            this.goPage(this.PAGE_EDIT);
        }
    }
});

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {del as upDelete, getGrayGroupList, save as upSave} from "../../api/upgradeGray";
import {bindData} from '../../utils/index';
import uploadApk from '../../components/Upload/singleApk.vue';
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import {listLoad} from "../../api/load";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        {columnKey: 'groupName', label: '设备组', minWidth: 120, sortable: true},
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
        {columnKey: 'forceUpdate', label: '强制升级', minWidth: 100, formatter: r => {

            if (r.forceUpdate === 0) return '否';
            if (r.forceUpdate === 1) return '是';

        }},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者'},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144} //{label: '关联设备', type: 'devices'}

    ],
    tableCanSelect: false,
    defaultFormData: {
        type: 1, //getUpgradeType函数获得，1app升级,2rom升级，3音效升级，4HDMI升级
        userGroupUuid: '', //设备组
        name: '', //名称
        appUpgradeId: '',
        romUpgradeId: '',
        forceUpdate: 1, //是否强制升级， 0否，1是
        isEnabled: 1, //1生效 2禁用,
        loadId: "", // 开机广告
        remark: ''
    },
    listDataGetter: function() {
        return this.system.grayManage;
    },
    pageActionSearch: [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        // {
        //     column: 'type', label: '请选择类型', type: 'option', value: '', options: [
        //     {value: 1, label: 'app升级'},
        //     {value: 2, label: 'rom升级'},
        //     {value: 3, label: '音效升级'},
        //     {value: 4, label: 'HDMI升级'},
        // ]
        // },
    ],
    pageActionSearchColumn: [],
    pageAction: 'gray/RefreshPage'
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
            userGroupUuid: null
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
                        <el-select placeholder="请选择" value={this.formData.userGroupUuid} name='userGroupUuid'>
                            {
                                this.groupList && this.groupList.map(item => (
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
                    <el-form-item label="是否强制升级" prop="forceUpdate">
                        <el-select placeholder="请选择" value={this.formData.forceUpdate} name='forceUpdate'>
                            <el-option label="否" value={0} key={0}/>
                            <el-option label="是" value={1} key={2}/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="开机广告：" prop="loadId">
                         <el-select placeholder="请选择" value={this.formData.loadId} name='loadId'>
                            {
                                this.loadList && this.loadList.map(load => (
                                    <el-option value={load.loadId} label={load.name} key={load.loadId}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
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
        topButtonHtml: function(h) {
            return (
                this.listStatus === "list" ? (this.status === 'list' ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, defaultData.defaultFormData);
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : '') : (<div class="filter-container">
                    <el-button class="filter-item" onClick={this.historyBack} type="primary">返回</el-button>
                </div>)
            );
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.formData.forceUpdate === '否') this.formData.forceUpdate = 0;
                    if (this.status === 'edit' || this.status === 'add') {
                        upSave(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const userId = row.id;
            this.sureCallbacks = () => {
                upDelete(userId).then(response => {
                    this.dialogVisible = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.dialogVisible = false;
                });
            };
        },

        /**
         * 重置密码
         */
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
                            this.loading = false;
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
                        });
                        this.$refs.Vtable.$on('devices', (row) => {
                            this.userGroupUuid = row.id;
                            this.listStatus = 'devices';
                            this.preStatus.push('list');
                            this.showList();
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
                this.loading = false;
            }).catch(e => this.loading = false);
        },
        showList: function () {
            let id = null;
            setTimeout(f => {
                let _thisData = null;
                switch (this.listStatus) {
                    case 'list':
                        _thisData = defaultData;
                        break;
                    case 'devices':
                        id = this.userGroupUuid;
                        _thisData = devicesData;
                        break;
                    default:
                        break;
                }

                for (let key in _thisData) {
                    this[key] = _thisData[key];
                }
                this.enableDefaultCurrentPage = !id;
                console.log("id", id);
                this.pageActionSearchColumn = [{
                    urlJoin: id
                }];
            }, 50);
        },
        historyBack: function () {
            this.listStatus = this.preStatus.pop();
            this.showList();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        uploadSuccess(data) {
            this.submitLoading = false;
            const {fileName, fileSize, filemd5, imgPath} = data;
            Object.assign(this.formData, {
                fileName: fileName,
                fileSize: fileSize,
                fileMd5: filemd5,
                fileUrl: imgPath
            });
        },

        beforeUpload() {
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
            });
            this.submitLoading = true;
        },
        uploadFail(err) {
            this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
            Object.assign(this.formData, {
                fileName: "",
                fileSize: "",
                fileMd5: "",
            });
            this.submitLoading = false;
        }
    }
});

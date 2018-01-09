import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
// import {searchGroupListByCode} from "../../api/user";
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {upSearchByCode} from "../../api/upgrade";
import {del as delPublish, edit as editPublish} from '../../api/publish';
import {vipGroupList} from '../../api/channel'; //获取产品包列表


const viewRule = [
    {columnKey: 'channelName', label: '机型名称', minWidth: 180, sortable: true},
    {columnKey: 'channelCode', label: '机型值'},
    {columnKey: 'isShare', label: '是否是共享', formatter: r => {
        if (r.isShare === 0) return '非共享';
        if (r.isShare === 1) return '共享';
        return '';
    }},
    {columnKey: 'vipGroupName', label: '产品包名', minWidth: 120},
    {columnKey: 'epgVersionName', label: '首页生成版本名称', minWidth: 220, sortable: true},
    {columnKey: 'appUpgradeName', label: 'app升级名'},
    {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
        if (r.isEnabled === 1) return '是';
            return '否';
    }},
    {columnKey: 'remark', label: '备注'},
    {columnKey: 'updateName', label: '更新者'},
    {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
    {columnKey: 'createName', label: '创建者'},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 120}
];
const defaultFormData = {
    channelCode: '',
    // groupId: '',
    epgIndexId: '',
    appUpgradeId: '',
    romUpgradeId: '',
    hdmiUpgradeId: '',
    soundUpgradeId: '',
    vipGroupUuid: '', //产品包
    isEnabled: 1, // 1 生效 2 禁用
    isShare: null,
    remark: ''
};
const validRules = {
    channelCode: [
        {required: true, message: '请选择', trigger: 'blur'},
    ],
    epgIndexId: [
        {required: true, message: '请选择epg'}
    ],
    vipGroupUuid: [
        {required: true, message: '请选择产品组'}
    ],
};
export default {
    data() {
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            formData: defaultFormData, // 表单数据
            userGroup: [],
            upgrade: [],
            romList: [],
            appList: [],
            tipTxt: "",
            pageActionSearch: [
                {
                    column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
                },
                {
                    column: 'isEnabled', label: '请选是否开启', type: 'option', value: '', options: [
                        {value: 1, label: '是'},
                        {value: 2, label: '否'},
                    ]
                },
                {
                    column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                    {value: 0, label: '非共享'},
                    {value: 1, label: '共享'},
                ]
                },
            ],
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
            chooseChannelCode: '',
            vipGroupOptionList: []
        };
    },
    computed: {
        ...mapGetters(['epgMange', 'system'])
    },
    created() {
        this.refreshChanel();
        this.refreshPageList();
        this.getVipGroupList();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
        if (this.epgMange.publishChannelList && this.pageActionSearch[0].options.length === 0) {
            this.epgMange.publishChannelList.map(f => {
                this.pageActionSearch[0].options.push({value: f.code, label: f.name});
            });
        }
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.status === "list" ? <div class="filter-container table-top-button-container">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = defaultFormData;
                                this.owned = [];
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </div> : ""
                }

                {
                    this.status === "list" ? <Vtable ref="Vtable" pageAction={'publish/RefreshPage'} data={this.epgMange.publishPage}
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule} pageActionSearch={this.pageActionSearch}
                                                     handleSelectionChange={this.handleSelectionChange}/> : this.cruHtml(h)
                }
                <ConfirmDialog
                    visible={this.dialogVisible}
                    tipTxt={this.tipTxt}
                    handelSure={this.sureCallbacks}
                    handelCancel={() => {
                        this.dialogVisible = false;
                    }}
                />
            </el-row>
        );
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="180px">
                    <el-form-item label="机型名称" props="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode' onChange={c => {
                            this.refreshUpgrade(c);
                            this.formData.appUpgradeId = '';
                            this.formData.romUpgradeId = '';
                            this.formData.hdmiUpgradeId = '';
                            this.formData.soundUpgradeId = '';
                            this.epgMange.publishChannelList && this.epgMange.publishChannelList.map(item => {
                               if (this.formData.channelCode === item.code) {
                                   this.formData.isShare = item.isShare;
                               }
                            });
                        }} disabled={this.status !== 'add'} style={{display: this.status === 'edit' ? 'none' : 'inline-block'}}>

                            {
                                this.epgMange.publishChannelList && this.epgMange.publishChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                            </el-select>
                            <el-input value={this.formData.channelName} name='channelName' style={{display: this.status === 'edit' ? "inline-block" : "none"}} disabled={true}/>
                            <span style={{display: this.formData.channelCode ? "inline-block" : "none", marginLeft: "10px", color: '#F56C6C'}}>{this.formData.channelCode}</span>
                            <span style={{display: this.formData.channelCode ? "inline-block" : "none", marginLeft: "10px", color: '#F56C6C'}}>{this.formData.isShare === 0 ? '非共享' : (this.formData.isShare === 1 ? '共享' : '')}</span>
                    </el-form-item>

                    <el-form-item label="epg主页Json" props="epgIndexId">
                        <el-select placeholder="请选择" value={this.formData.epgIndexId} name='epgIndexId'>
                            {
                                this.epgMange.epgList && this.epgMange.epgList.map(u => (
                                    <el-option label={u.versionName} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                    </el-form-item>
                    <el-form-item label="产品包选择" prop="vipGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.vipGroupUuid} name='vipGroupUuid'>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>

                     <el-form-item label="app升级">
                        <el-select placeholder="请选择" value={this.formData.appUpgradeId} onHandleOptionClick={f => this.formData.appUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.appList && this.appList.map(u => (
                                    <el-option label={u.name} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                     </el-form-item>

                     <el-form-item label="rom升级">
                        <el-select placeholder="请选择" value={this.formData.romUpgradeId} onHandleOptionClick={f => this.formData.romUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.romList && this.romList.map(u => (
                                    <el-option label={u.name} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                     </el-form-item>

                    <el-form-item label="音效升级" prop="soundUpgradeId">
                        <el-select placeholder="请选择" value={this.formData.soundUpgradeId} onHandleOptionClick={f => this.formData.soundUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.soundList && this.soundList.map(u => (
                                    <el-option label={u.name} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                     </el-form-item>

                     <el-form-item label="HDMI升级">
                        <el-select placeholder="请选择" value={this.formData.hdmiUpgradeId} onHandleOptionClick={f => this.formData.hdmiUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.hdmiList && this.hdmiList.map(u => (
                                    <el-option label={u.name} value={u.id} key={u.id}/>
                                ))
                            }
                            </el-select>
                     </el-form-item>
                     <el-form-item label="是否开启" props="isEnabled">
                         <el-radio-group value={this.formData.isEnabled} name='isEnabled'>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                         </el-radio-group>
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

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit') {
                        editPublish(this.formData).then(res => {
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    } else if (this.status === 'add') {
                        editPublish(this.formData).then(response => {
                            this.$message({
                                message: "添加成功",
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
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const id = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                delPublish(id).then(response => {
                    this.submitLoading = false;
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

        refreshChanel() {
            this.loading = true;
            this.$store.dispatch("publish/chanelList").then(res => { //fun/chanelList
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        refreshPageList() {
            this.loading = true;
            this.$store.dispatch("buildPage/epgList").then(res => {
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        // refreshUserGroup(code) {
        //     this.loading = true;
        //     searchGroupListByCode(code).then(res => {
        //         this.userGroup = res;
        //         this.loading = false;
        //     }).catch(err => {
        //         this.userGroup = [];
        //         this.loading = false;
        //     });
        // },

        refreshUpgrade(code) {
            this.loading = true;
            upSearchByCode(code).then(res => {
                this.romList = res.romList;
                this.appList = res.appList;
                this.soundList = res.soundList;
                this.hdmiList = res.hdmiList;
                this.loading = false;
            }).catch(err => {
                this.romList = [];
                this.appList = [];
                this.soundList = [];
                this.hdmiList = [];
                this.loading = false;
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
                            this.loading = true;
                            if (this.chooseChannelCode === row.channelCode) return this.loading = false;
                            const code = this.chooseChannelCode = row.channelCode;
                            // searchGroupListByCode(code).then(res => {
                            //     this.userGroup = res;
                                upSearchByCode(code).then(res => {
                                    this.romList = res.romList;
                                    this.appList = res.appList;
                                    this.soundList = res.soundList;
                                    this.hdmiList = res.hdmiList;
                                    this.loading = false;
                                }).catch(err => {
                                    this.romList = [];
                                    this.appList = [];
                                    this.soundList = [];
                                    this.hdmiList = [];
                                    this.loading = false;
                                });
                            // }).catch(err => {
                            //     this.userGroup = [];
                            //     this.loading = false;
                            // });
                        });
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
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
        getVipGroupList: function () {
            vipGroupList().then(res => {
                this.vipGroupOptionList = res;
            });
        }
    }
};

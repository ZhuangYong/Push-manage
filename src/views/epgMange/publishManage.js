import {mapGetters} from "vuex";
import Vtable from '../../components/Table';
import {searchGroupListByCode} from "../../api/user";
import {bindData} from '../../utils/index';
import ConfirmDialog from '../../components/confirm';
import {upSearchByCode} from "../../api/upgrade";
import {del as delPublish, edit as editPublish} from '../../api/publish';

const viewRule = [
    {columnKey: 'channelName', label: '渠道名称', minWidth: 180},
    {columnKey: 'remark', label: '备注'},
    {columnKey: 'status', label: '状态', formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }},
    {columnKey: 'epgVersionName', label: '首页生成版本名称', minWidth: 220},
    {columnKey: 'createTime', label: '创建日期', minWidth: 170},
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
    status: 2, // 1 生效 2 禁用
    remark: ''
};
const validRules = {
    channelCode: [
        {required: true, message: '请选择', trigger: 'blur'},
    ]
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
            dialogVisible: false,
            defaultCurrentPage: 1,
            rules: validRules,
            chooseChannelCode: ''
        };
    },
    computed: {
        ...mapGetters(['epgMange', 'system'])
    },
    created() {
        this.refreshChanel();
        this.refreshPageList();
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    render(h) {
        return (
            <el-row v-loading={this.submitLoading}>
                {
                    this.status === "list" ? <div class="filter-container">
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
                                                     defaultCurrentPage={this.defaultCurrentPage} select={false} viewRule={viewRule}
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
                         ref="addForm" rules={this.rules} label-position="right" label-width="120px">
                    <el-form-item label="机型号" props="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode' onChange={c => {
                            //this.refreshUserGroup(c);
                            this.refreshUpgrade(c);
                            //this.formData.groupId = '';
                            this.formData.appUpgradeId = '';
                            this.formData.romUpgradeId = '';
                            this.formData.hdmiUpgradeId = '';
                            this.formData.soundUpgradeId = '';
                        }}>

                            {
                                this.system.funChannelList && this.system.funChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                            </el-select>
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

                     <el-form-item label="状态" props="status">
                         <el-radio-group value={this.formData.status} name='status'>
                            <el-radio value={1} label={1}>生效</el-radio>
                            <el-radio value={2} label={2}>禁用</el-radio>
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
            this.$store.dispatch("fun/chanelList").then(res => {
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

        refreshUserGroup(code) {
            this.loading = true;
            searchGroupListByCode(code).then(res => {
                this.userGroup = res;
                this.loading = false;
            }).catch(err => {
                this.userGroup = [];
                this.loading = false;
            });
        },

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
                            searchGroupListByCode(code).then(res => {
                                this.userGroup = res;
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
                            }).catch(err => {
                                this.userGroup = [];
                                this.loading = false;
                            });
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
        }
    }
};

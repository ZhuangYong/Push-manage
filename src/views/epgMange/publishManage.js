import {mapGetters} from "vuex";
// import {searchGroupListByCode} from "../../api/user";
import {upSearchByCode} from "../../api/upgrade";
import {del as delPublish, edit as editPublish} from '../../api/publish';
import {vipGroupList} from '../../api/channel';
import {languageList} from "../../api/language";
import BaseListView from "../../components/common/BaseListView";
import {listLoad} from "../../api/load";
import {funGroupGroupListList} from "../../api/functionGroup"; //获取产品包列表

const defaultData = {
    viewRule: [
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
        }, inDetail: true},
        {columnKey: 'remark', label: '备注'},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    defaultFormData: {
        channelCode: '',
        functionGroupUuid: '',
        functionGroupName: '',
        // groupId: '',
        epgIndexId: '',
        appUpgradeId: '',
        romUpgradeId: '',
        hdmiUpgradeId: '',
        soundUpgradeId: '',
        vipGroupUuid: '', //产品包
        isEnabled: 1, // 1 生效 2 禁用
        isShare: null,
        remark: '',
        loadId: '',
        map: {
            epgIndexKey: {},
            loadKey: {}
        }
    },
    validRules: {
        channelCode: [
            {required: true, message: '请选择'},
        ],
        epgIndexId: [
            {required: true, message: '请选择epg'}
        ],
        vipGroupUuid: [
            {required: true, message: '请选择产品组'}
        ],
    },
};

export default BaseListView.extend({
    name: "publishManagePage",
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: "list",
            submitLoading: false, // 提交等待
            loading: false, // 数据加载等待
            selectItems: [], // 选择列
            defaultFormData: _defaultData.defaultFormData,
            formData: _defaultData.defaultFormData, // 表单数据
            userGroup: [],
            upgrade: [],
            romList: [],
            appList: [],
            tipTxt: "",
            pageActionSearch: [
                {
                    column: 'channelCodeOrName', label: '请输入机型名称或值', type: 'input', value: ''
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
            pageAction: 'publish/RefreshPage',
            listDataGetter: function() {
                return this.epgMange.publishPage;
            },
            tableCanSelect: false,
            dialogVisible: false,
            defaultCurrentPage: 1,
            viewRule: _defaultData.viewRule,
            rules: _defaultData.validRules,
            chooseChannelCode: '',
            vipGroupOptionList: [],
            loadList: [],
            funGroupList: [],
            editFun: editPublish,
            delItemFun: delPublish
        };
    },
    computed: {
        ...mapGetters(['epgMange', 'system'])
    },
    created() {
        this.refreshChanel();
        this.refreshPageList();
        this.getVipGroupList();
        this.getLoadList();
        this.getFunGoupList();
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
            return (
                <el-form v-loading={this.loading} class="small-space" model={this.formData}
                         ref="addForm" rules={this.rules} label-position="right" label-width="180px">
                    {<el-form-item label="机型名称" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} onHandleOptionClick={f => this.formData.channelCode = f.value} onChange={c => {
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
                        }} disabled={this.currentPage !== this.PAGE_ADD} style={{display: this.currentPage === this.PAGE_EDIT ? 'none' : 'inline-block'}}>

                            {
                                this.epgMange.publishChannelList && this.epgMange.publishChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                            </el-select>
                            <el-input value={this.formData.channelName} name='channelName' style={{display: this.currentPage === this.PAGE_EDIT ? "inline-block" : "none"}} disabled={true}/>
                            <span style={{display: this.formData.channelCode ? "inline-block" : "none", marginLeft: "10px", color: '#F56C6C'}}>{this.formData.channelCode}</span>
                            <span style={{display: this.formData.channelCode ? "inline-block" : "none", marginLeft: "10px", color: '#F56C6C'}}>{this.formData.isShare === 0 ? '非共享' : (this.formData.isShare === 1 ? '共享' : '')}</span>
                    </el-form-item>}

                    {
                        this.lanList.length > 0 ? <el-form-item label="epg主页Json：">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item >
                                        <el-select placeholder="请选择" value={this.formData.epgIndexId} onHandleOptionClick={f => this.formData.map.epgIndexKey[this.lanList[0].language] = this.formData.epgIndexId = f.value}>
                                            <el-option label="无" value="" key=""/>
                                            {
                                                this.epgMange.epgList && this.epgMange.epgList.length && this.epgMange.epgList.map(u => (
                                                    <el-option label={u.versionName} value={u.epgIndexId} key={u.epgIndexId}>
                                                        <span style="float: left">{u.versionName}</span>
                                                        <span style="float: right; color: #8492a6; font-size: 13px">{u.remark}</span>
                                                    </el-option>
                                                ))
                                            }
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("option",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "epg主页Json：",
                                                    getValue: v => this.formData.map.epgIndexKey [lanItem.language],
                                                    setValue: v => this.formData.map.epgIndexKey [lanItem.language] = v,
                                                    optionData: this.epgMange.epgList,
                                                    optionKey: "versionName",
                                                    optionValueKey: "epgIndexId",
                                                    optionTemplate: r => (
                                                        <div>
                                                            <span style="float: left">{r.versionName}</span>
                                                            <span style="float: right; color: #8492a6; font-size: 13px">{r.remark}</span>
                                                        </div>
                                                    ),
                                                    placeholder: `请选择`,
                                                };
                                            })
                                        )} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }
                    <el-form-item label="产品包选择" prop="vipGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.vipGroupUuid} onHandleOptionClick={f => this.formData.vipGroupUuid = f.value}>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
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

                    <el-form-item label="音效升级" prop="soundUpgradeId">
                        <el-select placeholder="请选择" value={this.formData.soundUpgradeId} onHandleOptionClick={f => this.formData.soundUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.soundList && this.soundList.map(u => (
                                    <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                ))
                            }
                            </el-select>
                     </el-form-item>

                    <el-form-item label="HDMI升级">
                        <el-select placeholder="请选择" value={this.formData.hdmiUpgradeId} onHandleOptionClick={f => this.formData.hdmiUpgradeId = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.hdmiList && this.hdmiList.map(u => (
                                    <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
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
                    {/*<el-form-item label="开机广告：" prop="loadId">
                        <el-select placeholder="请选择" value={this.formData.loadId} name='loadId'>
                            {
                                this.loadList && this.loadList.map(load => (
                                    <el-option value={load.loadId} label={load.name} key={load.loadId}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>*/}
                    {
                        this.lanList.length > 0 ? <el-form-item label="开机广告：" prop="loadId">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item >
                                        <el-select placeholder="请选择" value={this.formData.loadId} onHandleOptionClick={f => this.formData.map.loadKey[this.lanList[0].language] = this.formData.loadId = f.value}>
                                            {
                                                this.loadList && this.loadList.map(u => (
                                                    <el-option label={u.name} value={u.loadId} key={u.loadId}>
                                                        <span style="float: left">{u.name}</span>
                                                        <span style="float: right; color: #8492a6; font-size: 13px">{u.remark}</span>
                                                    </el-option>
                                                ))
                                            }
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col span={12}>
                                    <el-form-item prop="width">
                                        <el-button type="primary" onClick={f => this.editI18n("option",
                                            this.lanList.map(lanItem => {
                                                return {
                                                    label: lanItem.name + "开机广告：",
                                                    getValue: v => this.formData.map.loadKey [lanItem.language],
                                                    setValue: v => this.formData.map.loadKey [lanItem.language] = v,
                                                    optionData: this.loadList,
                                                    optionKey: "name",
                                                    optionValueKey: "loadId",
                                                    optionTemplate: r => (
                                                        <div>
                                                            <span style="float: left">{r.name}</span>
                                                            <span style="float: right; color: #8492a6; font-size: 13px">{r.remark}</span>
                                                        </div>
                                                    ),
                                                    placeholder: `请选择`,
                                                };
                                            })
                                        )} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }
                    <el-form-item label="功能组：" prop="loadId">
                        <el-select placeholder="请选择" value={this.formData.functionGroupUuid} name='functionGroupUuid'>
                            {
                                this.funGroupList && this.funGroupList.map(load => (
                                    <el-option value={load.uuid} label={load.name} key={load.uuid}/>
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
                                this.goPage(this.PAGE_LIST);
                            }
                        }>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            );
        },

        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
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
                this.formData.epgIndexId = res[0].epgIndexId;
                this.loading = false;
            }).catch(err => {
                this.loading = false;
            });
        },

        getLoadList: function () {
            this.loading = true;
            listLoad().then(res => {
                this.loadList = res;
                this.formData.loadId = res[0].loadId;
                this.loading = false;
            }).catch(e => this.loading = false);
        },

        getFunGoupList: function () {
            this.loading = true;
            funGroupGroupListList().then(res => {
                this.funGroupList = res;
                if (res.length) {
                    this.formData.functionGroupName = res[0].name;
                    this.formData.functionGroupUuid = res[0].uuid;
                }
                this.loading = false;
            }).catch(e => this.loading = false);
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
        // updateView: function () {
        //     switch (this.status) {
        //         case 'list':
        //             if (this.$refs.Vtable) {
        //                 this.$refs.Vtable.$on('edit', (row) => {
        //                     this.formData = row;
        //                     this.goPage(this.PAGE_EDIT);
        //                     this.loading = true;
        //                     if (this.chooseChannelCode === row.channelCode) return this.loading = false;
        //                     const code = this.chooseChannelCode = row.channelCode;
        //                     // searchGroupListByCode(code).then(res => {
        //                     //     this.userGroup = res;
        //                         upSearchByCode(code).then(res => {
        //                             this.romList = res.romList;
        //                             this.appList = res.appList;
        //                             this.soundList = res.soundList;
        //                             this.hdmiList = res.hdmiList;
        //                             this.loading = false;
        //                         }).catch(err => {
        //                             this.romList = [];
        //                             this.appList = [];
        //                             this.soundList = [];
        //                             this.hdmiList = [];
        //                             this.loading = false;
        //                         });
        //                     // }).catch(err => {
        //                     //     this.userGroup = [];
        //                     //     this.loading = false;
        //                     // });
        //                 });
        //                 this.$refs.Vtable.$on('del', (row) => {
        //                     this.submitDel(row);
        //                 });
        //                 this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
        //                     this.defaultCurrentPage = defaultCurrentPage;
        //                 });
        //             }
        //             break;
        //         case 'add':
        //         case 'edit':
        //             bindData(this, this.$refs.addForm);
        //             break;
        //         default:
        //             break;
        //     }
        // },

        /**
         * 对应table中button（type的值）中的edit事件
         * @param row
         * @returns {boolean}
         */
        handelEdit(row) {
            this.formData = row;
            this.goPage(this.PAGE_EDIT);
            this.loading = true;
            if (this.chooseChannelCode === row.channelCode) return this.loading = false;
            const code = this.chooseChannelCode = row.channelCode;
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

        getVipGroupList: function () {
            vipGroupList().then(res => {
                this.vipGroupOptionList = res;
            });
        }
    }
});

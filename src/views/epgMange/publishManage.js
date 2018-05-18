import {Component} from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {upPage, upSearchByCode} from "../../api/upgrade";
import Const from "../../utils/const";
import JPanel from "../../components/panel/JPanel";
import uploadApk from '../../components/Upload/singleApk.vue';
import {del as delPublish, edit as editPublish} from "../../api/publish";
import {vipGroupList} from "../../api/channel";
import {funGroupGroupListList} from "../../api/functionGroup";
import {languageList} from "../../api/language";
import EditI18nPage from "../commPages/editI18nPage";
import {listLoad} from "../../api/load";
import {EditUpgradePage} from "../system/upgrade";

@Component({name: 'PublishManageView'})
export default class PublishManageView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditPublishManagePage />, <EditI18nPage />, <EditUpgradePage />]);
    }
}

@Component({name: 'EditPublishManagePage', components: {uploadApk}})
class EditPublishManagePage extends BasePage {
    defaultFormData = {
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
            epgIndexKey: {type: Const.TYPE_I18N_KEY_EPG},
            loadKey: {type: Const.TYPE_I18N_KEY_LOAD}
        },
        pushType: 1, // 1 友盟 2 mpush
        switchChannel: '',
        shareVipGroupUuid: '',
    };
    validateRule = {
        channelCode: [
            {required: true, message: '请选择'},
        ],
        epgIndexId: [
            {required: true, message: '请选择epg'}
        ],
        vipGroupUuid: [
            {required: true, message: '请选择产品组'}
        ],
        shareVipGroupUuid: [
            {required: true, message: '请选择产品组'}
        ],
    };

    editFun = editPublish;

    @State(state => state.epgMange) epgMange;

    lanList = [];
    channelList = [];
    vipGroupOptionList = [];
    romList = [];
    appList = [];
    soundList = [];
    hdmiList = [];
    isShareChannel = false;
    funGroupList = [];
    loadList = [];

    created() {
        this.getTheOptionLists();
    }

    render(h) {
        const pushTypeOptions = [
            {code: 1, name: '友盟'},
            {code: 2, name: 'mpush'},
        ];

        const isAdd = typeof this.formData.id === 'undefined';
        const isShareChannel = isAdd ? this.isShareChannel : (parseInt(this.formData.isShare, 10) === 1);

        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}发布`}>
                <el-form className="small-space" model={this.formData} rules={this.validateRule} ref="addForm"
                         label-position="right" label-width="180px">
                    {<el-form-item label="机型名称" prop="channelCode">
                        <el-select placeholder="请选择" value={this.formData.channelCode} onHandleOptionClick={f => this.formData.channelCode = f.value} onChange={c => {
                            this.refreshUpgrade(c);
                            this.formData.appUpgradeId = '';
                            this.formData.romUpgradeId = '';
                            this.formData.hdmiUpgradeId = '';
                            this.formData.soundUpgradeId = '';
                            this.formData.switchChannel = '';
                            this.epgMange.publishChannelList && this.epgMange.publishChannelList.map(item => {
                                if (this.formData.channelCode === item.code) {
                                    this.formData.isShare = item.isShare;
                                }
                            });
                        }} disabled={!isAdd} v-show={isAdd}>

                            {
                                this.epgMange.publishChannelList && this.epgMange.publishChannelList.map(chanel => (
                                    <el-option label={chanel.name} value={chanel.code} key={chanel.code}/>
                                ))
                            }
                        </el-select>
                        <el-input value={this.formData.channelName} name='channelName' v-show={!isAdd} disabled={true}/>
                        <span v-show={this.formData.channelCode !== ''} style={{marginLeft: "10px", color: '#F56C6C'}}>{this.formData.channelCode}</span>
                        <span v-show={this.formData.channelCode !== ''} style={{marginLeft: "10px", color: '#F56C6C'}}>{isShareChannel ? '共享' : '非共享'}</span>
                    </el-form-item>}

                    {
                        this.lanList.length ? <el-form-item label="epg主页Json：">
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
                                        <el-button type="primary" onClick={f => this.goPage("EditI18nPage", {
                                            type: 'option',
                                            i18nObj: {
                                                label: 'epg主页Json',
                                                defaultMap: this.formData.map,
                                                lanList: this.lanList,
                                                i18nkey: 'epgIndexKey',
                                                options: {
                                                    optionData: this.epgMange.epgList,
                                                    optionKey: "versionName",
                                                    optionValueKey: "epgIndexId",
                                                    optionTemplate: r => (
                                                        <div>
                                                            <span style="float: left">{r.versionName}</span>
                                                            <span style="float: right; color: #8492a6; font-size: 13px">{r.remark}</span>
                                                        </div>
                                                    ),
                                                },
                                            },
                                        })} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    <el-form-item label='产品包选择' prop='vipGroupUuid'>
                        <el-select placeholder="请选择" value={this.formData.vipGroupUuid} onHandleOptionClick={f => this.formData.vipGroupUuid = f.value}>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item v-show={isShareChannel} label='VIP产品包选择' prop='shareVipGroupUuid'>
                        <el-select placeholder="请选择" value={this.formData.shareVipGroupUuid} onHandleOptionClick={f => this.formData.shareVipGroupUuid = f.value}>
                            {this.vipGroupOptionList.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="app升级">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-select placeholder="请选择" value={this.formData.appUpgradeId} onHandleOptionClick={f => this.formData.appUpgradeId = f.value}>
                                    <el-option label="无" value="" key=""/>
                                    {
                                        this.appList && this.appList.map(u => (
                                            <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                        ))
                                    }
                                </el-select>
                            </el-col>
                            <el-col span={12} v-show={this.formData.appUpgradeId !== ''}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.linkToEditUpgradePage(this.formData.appUpgradeId)} plain size="small">编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="rom升级">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-select placeholder="请选择" value={this.formData.romUpgradeId} onHandleOptionClick={f => this.formData.romUpgradeId = f.value}>
                                    <el-option label="无" value="" key=""/>
                                    {
                                        this.romList && this.romList.map(u => (
                                            <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                        ))
                                    }
                                </el-select>
                            </el-col>
                            <el-col span={12} v-show={this.formData.romUpgradeId !== ''}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.linkToEditUpgradePage(this.formData.romUpgradeId)} plain size="small">编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="音效升级" prop="soundUpgradeId">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-select placeholder="请选择" value={this.formData.soundUpgradeId} onHandleOptionClick={f => this.formData.soundUpgradeId = f.value}>
                                    <el-option label="无" value="" key=""/>
                                    {
                                        this.soundList && this.soundList.map(u => (
                                            <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                        ))
                                    }
                                </el-select>
                            </el-col>
                            <el-col span={12} v-show={this.formData.soundUpgradeId !== ''}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.linkToEditUpgradePage(this.formData.soundUpgradeId)} plain size="small">编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="HDMI升级">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-select placeholder="请选择" value={this.formData.hdmiUpgradeId} onHandleOptionClick={f => this.formData.hdmiUpgradeId = f.value}>
                                    <el-option label="无" value="" key=""/>
                                    {
                                        this.hdmiList && this.hdmiList.map(u => (
                                            <el-option label={u.name} value={u.upgradeId} key={u.upgradeId}/>
                                        ))
                                    }
                                </el-select>
                            </el-col>
                            <el-col span={12} v-show={this.formData.hdmiUpgradeId !== ''}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.linkToEditUpgradePage(this.formData.hdmiUpgradeId)} plain size="small">编辑</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item label="推送类型" prop="pushType">
                        <el-select placeholder="请选择" value={this.formData.pushType} onHandleOptionClick={f => this.formData.pushType = f.value}>
                            {pushTypeOptions.map(item => <el-option label={item.name} value={item.code} key={item.code}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="是否开启" props="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} onInput={v => this.formData.isEnabled = v}>
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
                        this.lanList.length > 0 ? <el-form-item label="开机广告：">
                            <el-row style="max-width: 440px">
                                <el-col span={12}>
                                    <el-form-item >
                                        <el-select placeholder="请选择" value={this.formData.loadId} onHandleOptionClick={f => this.formData.map.loadKey[this.lanList[0].language] = this.formData.loadId = f.value}>
                                            <el-option label="无" value="" key=""/>
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
                                    <el-form-item prop="width"><el-button type="primary" onClick={f => this.goPage("EditI18nPage", {
                                        type: 'option',
                                        i18nObj: {
                                            label: '开机广告',
                                            defaultMap: this.formData.map,
                                            lanList: this.lanList,
                                            i18nkey: 'loadKey',
                                            options: {
                                                optionData: this.loadList,
                                                optionKey: "name",
                                                optionValueKey: "loadId",
                                                optionTemplate: r => (
                                                    <div>
                                                        <span style="float: left">{r.name}</span>
                                                        <span style="float: right; color: #8492a6; font-size: 13px">{r.remark}</span>
                                                    </div>
                                                ),
                                            },
                                        },
                                    })} plain size="small">点击编辑多语言</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item> : ""
                    }

                    <el-form-item label="功能禁用组：" prop="loadId">
                        <el-select placeholder="请选择" value={this.formData.functionGroupUuid} name='functionGroupUuid' onHandleOptionClick={f => this.formData.functionGroupUuid = f.value}>
                            <el-option label="无" value="" key=""/>
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
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消</el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }

    /**
     * 跳转到升级管理的编辑页面
     * @param upgradeId
     */
    linkToEditUpgradePage(upgradeId) {
        this.loading = true;
        upPage({upgradeId}).then(res => {
            this.goPage("EditUpgradePage", {formData: res.data[0]});
            this.loading = false;
        }).catch(err => this.loading = false);
    }

    // 获取所有初始化接口信息
    getTheOptionLists() {
        this.loading = true;
        this.getLanList()
            .then(this.refreshPageList)
            .then(this.getChannelList)
            .then(this.getVipGroupList)
            .then(this.getFunGoupList)
            .then(this.getLoadList)
            .then(res => {
                if (this.formData.channelCode) {
                    upSearchByCode(this.formData.channelCode).then(res => {
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
                } else this.loading = false;
            })
            .catch(err => this.loading = false);
    }

    // 获取多语言列表
    getLanList() {
        return new Promise((resolve, reject) => {
            languageList().then(res => {
                this.lanList = res;
                resolve(res);
            }).catch(e => reject(e));
        });
    }

    // 获取epg列表
    refreshPageList() {
        return new Promise((resolve, reject) => {
            this.$store.dispatch("buildPage/epgList").then(res => {
                this.formData.map.epgIndexKey[this.lanList[0].language] = this.formData.epgIndexId = res[0].epgIndexId;
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    // 获取机型列表
    getChannelList() {
        return new Promise((resolve, reject) => {
            this.$store.dispatch("publish/chanelList", '').then((res) => {
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    // 切换机型是刷新数据
    refreshUpgrade(code) {
        this.loading = true;
        upSearchByCode(code).then(res => {
            this.romList = res.romList;
            this.appList = res.appList;
            this.soundList = res.soundList;
            this.hdmiList = res.hdmiList;
            this.isShareChannel = parseInt(res.isShare, 10) === 1;
            this.loading = false;
        }).catch(err => {
            this.romList = [];
            this.appList = [];
            this.soundList = [];
            this.hdmiList = [];
            this.isShareChannel = false;
            this.loading = false;
        });
    }

    // 获取产品包列表
    getVipGroupList() {
        return new Promise((resolve, reject) => {
            vipGroupList().then(res => {
                this.vipGroupOptionList = res;
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    // 获取功能禁用组列表
    getFunGoupList() {
        return new Promise((resolve, reject) => {
            funGroupGroupListList().then(res => {
                this.funGroupList = res;
                if (res.length) {
                    this.formData.functionGroupName = res[0].name;
                    this.formData.functionGroupUuid = res[0].uuid;
                }
                resolve(res);
            }).catch(err => reject(err));
        });
    }

    // 获取开机广告列表
    getLoadList() {
        return new Promise((resolve, reject) => {
            listLoad().then(res => {
                this.loadList = res;
                this.formData.map.loadKey[this.lanList[0].language] = this.formData.loadId = res[0].loadId;
                resolve(res);
            }).catch(err => reject(err));
        });
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {

    tableAction = 'publish/RefreshPage';

    viewRule = [
        {columnKey: 'channelCode', label: '机型值', sortable: true},
        {columnKey: 'channelName', label: '机型名称', minWidth: 140},
        // {columnKey: 'switchChannelName', label: '切换机型名称', minWidth: 140, inDetail: true},
        // {columnKey: 'switchChannel', label: '切换机型值', inDetail: true},
        {columnKey: 'isShare', label: '机型类型', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
                return '';
            }},
        {columnKey: 'pushType', label: '推送类型', formatter: r => {
                if (r.pushType === 1) return '友盟';
                if (r.pushType === 2) return 'mpush';
            }, inDetail: true},
        {columnKey: 'vipGroupName', label: '产品包名', minWidth: 120, inDetail: true},
        {columnKey: 'shareVipGroupName', label: '会员产品包名', minWidth: 120, inDetail: true},
        {columnKey: 'deviceCount', label: '设备数量', minWidth: 90},
        {columnKey: 'epgVersionName', label: '首页生成版本名称', minWidth: 140, inDetail: true},
        {columnKey: 'appUpgradeName', label: 'app升级包名称', minWidth: 140, inDetail: false},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
                if (r.isEnabled === 1) return '是';
                return '否';
            }, inDetail: true},
        {columnKey: 'appUpgradeVersion', label: '版本号'},
        {columnKey: 'remark', label: '备注', inDetail: true},
        {columnKey: 'updateName', label: '更新者', inDetail: false},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true, inDetail: false},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ];
    tableActionSearch = [
        {
            column: 'channelCodeOrName', label: '请输入机型名称或值', type: 'input', value: ''
        },
        {column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []},
        {
            column: 'isEnabled', label: '请选择是否开启', type: 'option', value: '', options: [
                {value: 1, label: '是'},
                {value: 2, label: '否'},
            ]
        },
        {
            column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                {value: 0, label: '非共享'},
                {value: 1, label: '共享'},
            ]},
        { // 筛选版本号
            column: 'appUpgradeVersion', label: '请输入版本号', type: 'input', value: ''
        },
        /*{
            column: 'pushType', label: '请选择推送方式', type: 'option', value: '', options: [
                {value: 1, label: '友盟'},
                {value: 2, label: 'mpush'},
            ]},*/
    ];

    delItemFun = delPublish;

    @State(state => state.epgMange.publishPage) tableData;

    created() {
        this.getChannelList();
    }

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => this.goPage('EditPublishManagePage')
            } type="primary" icon="edit">添加</el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage('EditPublishManagePage', {formData: row});
    }

    getChannelList() {
        this.$store.dispatch("fun/chanelList", '').then((res) => {
            this.tableActionSearch[1].options = [];
            res.map(f => {
                this.tableActionSearch[1].options.push({value: f.code, label: `${f.name}（${f.code}）`});
            });
        }).catch((err) => {});
    }
}

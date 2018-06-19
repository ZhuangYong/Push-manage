import {Component} from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {del as upDelete, save as upSave, upgradeGrayUserDelete, upgradeGrayUserSave} from "../../api/upgradeGray";
import JPanel from "../../components/panel/JPanel";
import {EditUpgradePage} from "./upgrade";
import {upPage} from "../../api/upgrade";
import Const from "../../utils/const";
import {languageList} from "../../api/language";
import EditI18nPage from "../commPages/editI18nPage";

@Component({name: 'UpgradeGrayView'})
export default class UpgradeGrayView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditPage />, <DevicesPage />, <AddDevicesPage />, <EditUpgradePage />, <EditI18nPage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'gray/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '名称', minWidth: 140, sortable: true},
        // {columnKey: 'groupName', label: '灰度分组', minWidth: 120, sortable: true},
        {columnKey: 'appUpgradeName', label: 'app升级包名称', minWidth: 120},
        {columnKey: 'deviceCount', label: '设备数(台)', minWidth: 120},
        {columnKey: 'upgradeCount', label: '已升级设备(台)', minWidth: 120},
        {columnKey: 'appUpgradeVersion', label: 'APP版本号', minWidth: 120},
        // {columnKey: 'romUpgradeName', label: 'rom升级名', minWidth: 120, inDetail: true},
        // {columnKey: 'hdmiUpgradeName', label: 'HDMI升级', minWidth: 120, inDetail: true},
        // {columnKey: 'soundUpgradeName', label: '音效升级', minWidth: 120, inDetail: true},
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
        {columnKey: 'vipGroupName', label: '产品包', inDetail: true},
        {columnKey: 'shareGroupName', label: '共享产品包', inDetail: true},
        {columnKey: 'functionGroupName', label: '功能禁用组', inDetail: true},
        {columnKey: 'pushName', label: '推送方式', inDetail: true},
        {columnKey: 'loadName', label: '开机广告', inDetail: true},
        {columnKey: 'updateName', label: '更新者'},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}, {label: '关联设备', type: 'devices'}], minWidth: 236},

    ];
    tableActionSearch = [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        // {column: 'channelCodeOrName', label: '请输入机型名称或值', type: 'input', value: ''},
        // {column: 'channelCodeOrName', label: '请选择机型', type: 'option', value: '', options: []},
    ];

    delItemFun = upDelete;

    @State(state => state.system.grayManage) tableData;

    created() {
        // this.getChannelList();
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
                    () => {
                        this.goPage('EditPage');
                    }
                } type="primary" icon="edit">添加
                </el-button>
            </div>;
    }

    handelEdit(row) {
        this.goPage('EditPage', {formData: row});
    }

    handelDevices(row) {
        this.goPage('DevicesPage', {formData: row});
    }

    handleSelectionChange(selectedItems) {
        this.selectItems = selectedItems;
    }

    getChannelList() {
        this.$store.dispatch("fun/chanelList", '').then((res) => {
            this.tableActionSearch[2].options = [];
            res.map(f => {
                this.tableActionSearch[2].options.push({value: f.code, label: `${f.name}（${f.code}）`});
            });
        }).catch((err) => {
        });
    }
}

@Component({name: 'DevicesPage'})
class DevicesPage extends IndexPage {
    tableAction = 'upgradeGray/user/RefreshPage';
    viewRule = [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 250},
        {columnKey: 'nickname', label: '设备昵称', minWidth: 120},
        {columnKey: 'lastChannelName', label: '旧机型', minWidth: 260, formatter: (r, h) => {
                const name = r.lastChannelName || '';
                const code = r.lastChannelCode ? '(' + r.lastChannelCode + ')' : '';
                return name + code;
            }},
        {columnKey: 'lastAppVersion', label: '旧app版本', minWidth: 120},
        {columnKey: 'lastRomVersion', label: '旧rom版本', minWidth: 120},
        {columnKey: 'currentChannelName', label: '当前新机型', minWidth: 260, formatter: (r, h) => {
                const name = r.currentChannelName || '';
                const code = r.currentChannelCode ? '(' + r.currentChannelCode + ')' : '';
                return name + code;
            }},
        {columnKey: 'currentAppVersion', label: '当前app版本', minWidth: 120},
        {columnKey: 'currentRomVersion', label: '当前rom版本', minWidth: 120},
        {columnKey: 'status', label: '升级状态', formatter: (r, h) => {
                if (r.status === 1) return '已升级';
                if (r.status === 2) return '未升级';
            }},
        // {label: '操作', buttons: [{label: '删除', type: 'del'}]}
    ];
    tableActionSearch = [
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
    ];
    tableCanSelect = true;
    userGroupUuid = '';
    @State(state => state.system.upgradeGrayUserData) tableData;

    created() {
        this.userGroupUuid = this.formData.userGroupUuid;
        this.tableActionSearchColumn = [{urlJoin: this.userGroupUuid}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={() => this.pageBack()} type="primary">返回</el-button>
            <el-button className="filter-item" onClick={() => this.goPage('AddDevicesPage', {formData: {userGroupUuid: this.userGroupUuid}})} type="primary">添加设备</el-button>
            <el-button className="filter-item" onClick={this.queryDelete} disabled={this.selectItems.length <= 0} type="primary">批量删除</el-button>
        </div>;
    }

    queryDelete() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.submitLoading = true;
            this.dialogVisible = false;
            let deviceUuids = [];
            this.selectItems.map(selectItem => deviceUuids.push(selectItem.deviceUuid));
            const param = {
                deviceUuids,
            };

            upgradeGrayUserDelete(this.userGroupUuid, param).then(() => {
                this.$message.success("操作成功！");
                this.submitLoading = false;
                this.refreshTable();
            }).catch(err => {this.submitLoading = false;});
        };

    }
}

@Component({name: 'AddDevicesPage'})
class AddDevicesPage extends DevicesPage {
    tableAction = 'upgradeGray/devices/RefreshPage';
    viewRule = [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 285},
        {columnKey: 'status', label: '设备状态', formatter: r => {
                if (r.status === 1) return '已开启';
                if (r.status === -1) return '禁用';
                if (r.status === -2) return '禁用';
            }},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 135},
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        {columnKey: 'sn', label: 'SN号', minWidth: 255},
        {columnKey: 'freeDays', label: '免费天数', minWidth: 100},
        {columnKey: 'createTime', label: '注册时间', minWidth: 170},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170}
    ];
    tableActionSearch = [
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'sn', label: '请输入SN号', type: 'input', value: ''},
    ];
    @State(state => state.system.upgradeGrayDeviceList) tableData;

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={() => this.pageBack()} type="primary">返回</el-button>
            <el-button className="filter-item" onClick={this.queryAdd} disabled={this.selectItems.length <= 0} type="primary">批量添加</el-button>
        </div>;
    }

    queryAdd() {
        this.dialogVisible = true;
        this.tipTxt = "确定要添加吗？";
        this.sureCallbacks = () => {
            this.submitLoading = true;
            this.dialogVisible = false;
            let deviceUuids = [];
            this.selectItems.map(selectItem => deviceUuids.push(selectItem.deviceUuid));
            const param = {
                deviceUuids,
            };

            upgradeGrayUserSave(this.userGroupUuid, param).then(() => {
                this.$message.success("操作成功！");
                this.submitLoading = false;
                this.pageBack();
            }).catch(err => {this.submitLoading = false;});
        };

    }
}

@Component({name: 'EditPage'})
class EditPage extends BasePage {
    defaultFormData = {
        type: 1, //getUpgradeType函数获得，1app升级,2rom升级，3音效升级，4HDMI升级
        userGroupUuid: '', //设备组
        name: '', //名称
        appUpgradeId: '',
        romUpgradeId: '',
        soundUpgradeId: '',
        hdmiUpgradeId: '',
        // forceUpdate: 1, //是否强制升级， 0否，1是
        isEnabled: 1, //1生效 2禁用,
        // loadId: "", // 开机广告
        remark: '',
        map: {
            loadKey: {type: Const.TYPE_I18N_KEY_LOAD}
        },
        loadId: '',
        vipGroupUuid: '',
        shareGroupUuid: '',
        functionGroupUuid: '',
        pushType: 1,
    };
    validateRule = {
        name: [
            {required: true, message: '名称不能为空'},
            {min: 1, max: 16, message: '请输入1-16位字符'}
        ],
        userGroupUuid: [
            {required: true, message: '请选择灰度分组'},
        ],
        version: [
            {required: true, message: '版本号不能为空'},
            {min: 1, max: 16, message: '请输入1-16位字符'}
        ],
        fileOssUrl: [
            {required: true, message: '此处不能为空'}
        ],
        vipGroupUuid: [
            {required: true, message: '请选择产品组'}
        ],
        shareGroupUuid: [
            {required: true, message: '请选择产品组'}
        ],
    };
    editFun = upSave;
    appList = [];
    romList = [];
    soundList = [];
    hdmiList = [];
    lanList = [];
    vipGroupList = [];
    loadList = [];
    funcList = [];

    @Action('system/appAndRom/RefreshPage') appRomAction;

    created() {
        this.refreshAppRomList();
        this.getLanList();
    }

    render(h) {
        const pushTypeOptions = [
            {code: 1, name: '友盟'},
            {code: 2, name: 'mpush'},
        ];
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}灰度发布`}>
                <el-form className="small-space" model={this.formData} rules={this.validateRule} ref="addForm"
                         label-position="right" label-width="180px">
                    <el-form-item label="名称" prop="name">
                        <el-input value={this.formData.name} name='name' placeholder="请输入名称"/>
                    </el-form-item>
                    {/*{
                        this.currentPage === this.PAGE_EDIT ? <el-form-item label="灰度分组" prop="userGroupUuid">
                            <el-input value={this.formData.groupName} disabled={true}/>
                        </el-form-item> : <el-form-item label="灰度分组" prop="userGroupUuid">
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
                    }*/}

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

                    <el-form-item label="会员产品包：" prop="vipGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.vipGroupUuid} name='vipGroupUuid' onHandleOptionClick={f => this.formData.vipGroupUuid = f.value}>
                            {
                                this.vipGroupList && this.vipGroupList.map(load => (
                                    <el-option value={load.uuid} label={load.name} key={load.uuid}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="共享产品包：" prop="shareGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.shareGroupUuid} name='shareGroupUuid' onHandleOptionClick={f => this.formData.shareGroupUuid = f.value}>
                            {
                                this.vipGroupList && this.vipGroupList.map(load => (
                                    <el-option value={load.uuid} label={load.name} key={load.uuid}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="功能禁用组：" prop="functionGroupUuid">
                        <el-select placeholder="请选择" value={this.formData.functionGroupUuid} name='functionGroupUuid' onHandleOptionClick={f => this.formData.functionGroupUuid = f.value}>
                            <el-option label="无" value="" key=""/>
                            {
                                this.funcList.map(load => (
                                    <el-option value={load.uuid} label={load.name} key={load.uuid}/>
                                ))
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="推送类型" prop="pushType">
                        <el-select placeholder="请选择" value={this.formData.pushType} onHandleOptionClick={f => this.formData.pushType = f.value}>
                            {pushTypeOptions.map(item => <el-option label={item.name} value={item.code} key={item.code}/>)}
                        </el-select>
                    </el-form-item>

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

                    {/* <el-form-item label="是否强制升级" prop="forceUpdate">
                            <el-select placeholder="请选择" value={this.formData.forceUpdate} name='forceUpdate'>
                                <el-option label="否" value={0} key={0}/>
                                <el-option label="是" value={1} key={2}/>
                            </el-select>
                        </el-form-item>*/}
                    <el-form-item label="是否开启：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name='isEnabled' onInput={v => this.formData.isEnabled = v}>
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
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
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
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

    refreshAppRomList() {
        this.loading = true;
        this.appRomAction().then(res => {
            const {rom, app, sound, hdmi, vipGroup, load, func} = res;
            this.romList = rom;
            this.appList = app;
            this.soundList = sound;
            this.hdmiList = hdmi;
            this.vipGroupList = vipGroup;
            this.loadList = load;
            this.funcList = func;
            this.loading = false;
        }).catch(err => {
            this.romList = [];
            this.appList = [];
            this.loading = false;
        });
    }

    // 获取多语言列表
    getLanList() {
        languageList().then(res => {
            this.lanList = res;
        }).catch(e => {});
    }
}

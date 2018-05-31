import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import DevicePage from "../commPages/devicePage";
import Const from "../../utils/const";
import apiUrl from "../../api/apiUrl";
import uploadExcel from '../../components/Upload/singleExcel.vue';
import StbUserViewDetailPage from "./StbUserViewDetailPage";
import BasePage from "../../components/common/BasePage";
import {
    banVIP,
    getShareProduct,
    save as saveStbUser,
    setDeviceFilter, setDeviceStatus,
    stbUserReset,
    stbUserSaveActivate
} from "../../api/userManage";
import {State} from "vuex-class";
import {soundDisable} from "../../api/recordManage";
import JPanel from "../../components/panel/JPanel";
import ConfirmDialog from '../../components/confirm';

const styles = {
    table: {
        borderCollapse: 'collapse',
        lineHeight: '24px',
        fontSize: '14px',
        color: '#1f2d3d',
        textAlign: 'left',
        boxSizing: 'border-box',
        textOverflow: 'ellipsis',
        whiteSpace: 'normal',
        wordBreak: 'break-all',
        border: 'none',
        borderColor: '#dfe6ec'
    },
    cell: {
        padding: '10px',
        boxSizing: 'border-box'
    }
};

@Component({name: 'DevicesView'})
export default class DevicesView extends BaseView {
    created() {
        this.initialPages([
            <IndexPage />,
            <ViewDetailPage />,
            <LoginInfoPage />,
            <DeviceBootPage />,
            <BindDeviceInfoPage />,
            <PayOrderingsPage />,
            <RecordingsPage />,
            <ActiveRecordingsPage />,
            <MsgListPage />,
            <EditActivePage />,
            <EditNicknamePage />,
            <EditDeviceResetPage />,
            <EditDeviceStatusPage />,
        ]);
    }
}

/**
 * 首页设备列表页
 */
@Component({
    name: 'IndexPage',
    components: {
        uploadExcel,
    }
})
class IndexPage extends DevicePage {
    importExcelShow = false;
    importExcelIng = false;
    importExcelSuccess = false;
    importErrMsg = '';
    viewRule = [
        {columnKey: 'deviceId', label: '设备编号', minWidth: 144},
        {columnKey: 'sn', label: 'SN号', minWidth: 255, inDetail: true},
        {columnKey: 'mac', label: 'MAC地址', minWidth: 135, inDetail: true},
        {columnKey: 'channelName', label: '机型', minWidth: 150},
        // {columnKey: 'orderCount', label: '订单数', minWidth: 70},
        {columnKey: 'orderAmount', label: '总金额', minWidth: 70},
        // {columnKey: 'address', label: '地址', minWidth: 150},
        {columnKey: 'online', label: '是否在线', formatter: (r, h) => {
                if (r.online === 1) return '是';
                return '否';
            }},
        {columnKey: 'ip', label: '最近登录ip', minWidth: 150, inDetail: true},
        {columnKey: 'city', label: '归属地', sortable: true, inDetail: true},
        {columnKey: 'random', label: '随机码', formatter: (r, h) => {
                if (r.random) return (<div><el-popover
                    placement="top"
                    width="100%"
                    trigger="click"
                    content={r.random}>
                    <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.random}</div>
                </el-popover></div>);
                return '';
            }, inDetail: true},
        {columnKey: 'nickname', label: '别名'},
        {columnKey: 'isShare', label: '是否共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
            }},

        /*{columnKey: 'status', label: '设备状态', formatter: r => {
            if (r.status === 1) return '已开启';
            if (r.status === -1) return '禁用';
            if (r.status === -2) return '禁用';
        }},*/
        {columnKey: 'vipExpireTime', label: 'vip状态', minWidth: 90, formatter: (r, h) => {
                //后台给的判断方法
                if (r.disableVip === 2) {
                    return '已禁用';
                } else {
                    if (r.vipExpireTime === null) {
                        return '未激活';
                    } else {
                        const date = (new Date()).getTime();
                        const expireTime = (new Date(r.vipExpireTime)).getTime();
                        if ((date - expireTime) <= 0) {
                            return '已激活';
                        } else {
                            return '已过期';
                        }
                    }
                }
            }},
        {columnKey: 'useTime', label: '最近下单时间', minWidth: 140, sortable: true},
        {columnKey: 'registerCount', label: '开机次数', minWidth: 140, inDetail: true},
        {columnKey: 'leikeExpireTime', label: '雷客过期时间', minWidth: 140, inDetail: true},
        {columnKey: 'vipExpireTime', label: '到期时间', minWidth: 140, inDetail: true},
        {columnKey: 'createTime', label: '注册时间', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 140, sortable: true},
        {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}, {label: '激活', type: 'del'}, {label: '推送', type: 'push'}], minWidth: 224}
    ];
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {
            column: 'vipStatus', label: '请选择VIP状态', type: 'option', value: '', options: [
                {value: 1, label: '未激活'},
                {value: 2, label: '已激活'},
                {value: 3, label: '已过期'},
            ]
        },
        {
            column: 'type', label: '请选择是否注册', type: 'option', value: 2, options: [
                {value: 2, label: '已注册'},
                {value: 3, label: '未注册'},
            ]
        },
        {
            column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                {value: 0, label: '非共享'},
                {value: 1, label: '共享'},
            ]
        },
        {
            column: 'status', label: '请选择设备状态', type: 'option', value: '', options: [
                {value: 1, label: '已开启'},
                {value: -1, label: '设备永久禁用'},
                {value: -2, label: '到时间禁用'},
            ]
        },
        {column: 'nickname', label: '请输入设备别名', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'sn', label: '请输入SN号', type: 'input', value: ''},
    ];

    created() {
        this.refreshChanel();
    }

    render(h) {
        const uploadExcelApi = Const.BASE_API + '/' + apiUrl.API_STBUSER_SAVE_EXCEL;
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
            <el-dialog title="导入Excel配置" visible={this.importExcelShow} onClose={this.closeImportExcel}>
                <el-form>
                    {
                        this.importErrMsg
                    }
                    <el-form-item label="选择文件" label-width="formLabelWidth">
                        {
                            !this.importErrMsg && this.importExcelSuccess && "导入成功 !"
                        }
                        <uploadExcel uploadSuccess={() => {
                            this.importExcelIng = false;
                            this.importExcelSuccess = true;
                            this.refreshTable();
                        }} uploadFail={() => this.importExcelIng = false} beforeUpload={() => {
                            this.importExcelIng = true;
                            this.importErrMsg = "";
                        }} uploadFail={this.uploadFail} handelEmpty={() => {
                            this.importExcelIng = false;
                            this.importErrMsg = "";
                        }} actionUrl={uploadExcelApi}/>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={() => this.importExcelShow = true} type="primary" icon="edit">
                导入Excel配置
            </el-button>
        </div>;
    }

    handelViewDetail(row) {
        this.goPage('ViewDetailPage', {formData: row});
    }

    handelDel(row) {
        this.goPage('EditActivePage', {formData: row});
    }

    handelPush(row) {
        this.$router.push({path: '/system/pushManage', query: {deviceUuid: row.deviceUuid, deviceId: row.deviceId}});
    }

    closeImportExcel() {
        this.importErrMsg = "";
        this.importExcelIng = false;
        this.importExcelShow = false;
        this.importExcelSuccess = false;
    }

    uploadFail(e) {
        const msg = `导入失败！` + e;
        this.importErrMsg = msg;
        this.importExcelIng = false;
        this.$message.error(msg);
    }

    refreshChanel() {
        this.loading = true;
        this.$store.dispatch("fun/chanelList").then(res => {
            this.loading = false;
            this.tableActionSearch[0].options = [];
            res.map(f => {
                this.tableActionSearch[0].options.push({value: f.code, label: `${f.name}(${f.code})`});
            });
        }).catch(err => {
            this.loading = false;
        });
    }
}

/**
 * 首页激活按钮跳转页
 */
@Component({name: 'EditActivePage'})
class EditActivePage extends BasePage {
    defaultFormData = {
        deviceConfigId: '',
        day: '',
    };
    activeData = [];
    activeShareData = [];

    editFun = stbUserSaveActivate;

    created() {
        const {isShare, id} = this.formData;
        if (isShare === 1) { // 共享设备
            this.activeShareDeviceGetter(id);
        } else this.activeDeviceGetter();
    }

    render() {
        return (
            <JPanel title='激活配置'>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="配置设备免费活动：" v-show={this.formData.isShare !== 1}>
                        <el-select placeholder="请选择" value={this.formData.deviceConfigId} name='deviceConfigId'>
                            {
                                this.activeData.map(item => <el-option
                                    label={`${item.groupName}--${item.codeAutoDay}天`}
                                    value={item.id}
                                    key={item.id}/>)
                            }
                        </el-select>
                    </el-form-item>

                    <el-form-item label="产品包活动：" v-show={this.formData.isShare === 1}>
                        <el-select placeholder="请选择" value={this.formData.day} name="day">
                            {
                                this.activeShareData && this.activeShareData.map(item => <el-option
                                    label={`${item.remark}(${item.day})`}
                                    value={item.day}
                                    key={item.day}/>
                                )
                            }
                        </el-select>
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
     * 获取设备激活类型列表
     * @constructor
     */
    activeDeviceGetter() { //非共享的设备信息
        this.$store.dispatch('device/deviceList').then(res => {
            this.activeData = res;
        }).catch(err => {});
    }

    /**
     * 获取共享的设备列表
     * @param param
     */
    activeShareDeviceGetter(param) { //共享设备信息
        this.loading = true;
        getShareProduct(param).then(res => {
            this.activeShareData = res;
            this.loading = false;
        }).catch(err => this.loading = false);
    }
}

/**
 * 昵称编辑
 */
@Component({name: 'EditNicknamePage'})
class EditNicknamePage extends BasePage {
    defaultFormData = {
        nickname: '',
    };

    editFun = saveStbUser;

    render() {
        return (
            <JPanel title="设备昵称修改">
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="别名">
                        <el-input value={this.formData.nickname} onChange={v => this.formData.nickname = v}/>
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
}

/**
 * 设备重置编辑
 */
@Component({name: 'EditDeviceResetPage'})
class EditDeviceResetPage extends BasePage {
    defaultFormData = {
        type: '',
    };

    editFun = stbUserReset;

    render() {
        const options = [
            {status: 1, label: 'vip失效（将清除支付相关信息，还原vip）'},
            {status: 2, label: '清除历史数据（将清除设备其他信息）'},
            {status: 3, label: '以上都是'},
        ];
        return (
            <JPanel>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="重置类型：">
                        <el-select placeholder={'请选择'} value={this.formData.type} name='type' onChange={v => this.formData.type = v}>
                            {
                                options.map(item => <el-option
                                    key={item.status}
                                    label={item.label}
                                    value={item.status}>
                                </el-option>)
                            }
                        </el-select>
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
}

/**
 * 设备状态编辑
 */
@Component({name: 'EditDeviceStatusPage'})
class EditDeviceStatusPage extends BasePage {
    defaultFormData = {
        status: '',
        frozenTime: '',
    };

    editFun = setDeviceStatus;

    render() {
        const options = [
            {status: 1, label: '启用'},
            {status: -1, label: '永久禁用'},
            {status: -2, label: '时间禁用'}
        ];
        return (
            <JPanel>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="设备状态：">
                        <el-select placeholder={'请选择'} value={this.formData.status} name='status'>
                            {
                                options.map(item => <el-option
                                    key={item.status}
                                    label={item.label}
                                    value={item.status}>
                                </el-option>)
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show={this.formData.status === -2}>
                        <el-date-picker
                            style="max-width: 300px;"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            value={this.formData.frozenTime}
                            onInput={v => {
                                this.formData.frozenTime = v || [];
                            }} />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack({formData: this.formData});
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
     * 获取设备激活类型列表
     * @constructor
     */
    activeDeviceGetter() { //非共享的设备信息
        this.$store.dispatch('device/deviceList').then(res => {
            this.activeData = res;
        }).catch(err => {});
    }

    /**
     * 获取共享的设备列表
     * @param param
     */
    activeShareDeviceGetter(param) { //共享设备信息
        this.loading = true;
        getShareProduct(param).then(res => {
            this.activeShareData = res;
            this.loading = false;
        }).catch(err => this.loading = false);
    }
}

/**
 * 查看详情页
 */
@Component({name: 'ViewDetailPage'})
class ViewDetailPage extends StbUserViewDetailPage {

    isShowTable = false;
    viewDetailRules = [
        [
            {label: '设备昵称', val: 'nickname', buttons: [
                    {click: 'editNickname', content: selectItem => '修改'}
                ]},
            {label: '禁用设备VIP', buttons: [
                    {click: 'banVIPClick', content: selectItem => {
                            return !selectItem.disableVip ? '禁用' : '恢复';
                        }, disabled: selectItem => {
                            return selectItem.vipExpireTime === null;
                        }},
                ]},
            {label: '统计过滤', buttons: [
                    {click: 'setDeviceFilter', content: selectItem => {
                            return !selectItem.isFilter ? '过滤设备' : '取消过滤';
                        }}
                ]},
        ],
        [
            {label: '重置设备', buttons: [
                    {click: 'deviceReset', type: 'danger', content: selectItem => '重置'}
                ]},
            {label: '设备状态', minWidth: 215, status: selectItem => {
                    return selectItem.status === 1 ? '已开启' : '禁用';
                }, buttons: [
                    {click: 'toSetDeviceStatusPage', content: selectItem => '设置'},
                ]},
            {label: '机型', val: 'channelName'},
        ],
        [
            {label: '设备编号', val: 'deviceId'},
            {label: 'SN', val: 'sn', minWidth: 232},
            {label: 'mac地址', val: 'mac'},
        ],
        [
            {label: '随机码', val: 'random'},
            {label: 'wifimac', val: 'wifimac', minWidth: 232},
            {label: '注册时间', val: 'createTime'}
        ],
        [
            {label: 'vip状态', status: selectItem => {
                    if (selectItem.disableVip === 2) {
                        return '已禁用';
                    } else {
                        if (selectItem.vipExpireTime === null) {
                            return '未激活';
                        } else {
                            const date = (new Date()).getTime();
                            const expireTime = (new Date(selectItem.vipExpireTime)).getTime();
                            if ((date - expireTime) <= 0) {
                                return '已激活';
                            } else {
                                return '已过期';
                            }
                        }
                    }
                }},
            {label: '会员到期时间', minWidth: 110, status: selectItem => {
                    return selectItem.vipExpireTime === null ? '未开通会员' : selectItem.vipExpireTime;
                }},
            {label: '开机次数', val: 'registerCount', minWidth: 375},
        ],
        [
            {label: '友盟token', val: 'pushtoken', minWidth: 375},
            {label: 'app版本', val: 'deviceVersion'},
            {label: '服务端版本', minWidth: 95, val: 'serverVersion'}
        ],
        [
            {label: '最近登录ip', minWidth: 95, val: 'ip'},
            {label: '归属地', val: 'city'},
            {label: '详细地址', val: 'address'},
        ],
        [
            {label: '最近下单时间', val: 'useTime', minWidth: 375},
            {label: '订单总数', val: 'orderCount'},
            {label: '总收入', minWidth: 95, val: 'orderAmount'}
        ],
    ];

    contentHtml(h) {
        const selectItem = this.formData;

        return <el-row>
            <el-col span={24} style={{overflowX: 'auto'}}>
                <table border="1" style={styles.table}>
                    {
                        this.viewDetailRules.map(rule => <tr>
                            {
                                rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth || 88}px`}}>
                                    <span>{item.label + ': '}</span>
                                    {item.val && <span>{selectItem[item.val]}</span>}
                                    {item.status && <span>{item.status(selectItem)}</span>}
                                    {
                                        item.buttons && item.buttons.map(button => <el-button style={{marginLeft: '10px'}} disabled={button.disabled ? button.disabled(selectItem) : false} size="mini" type={button.type || "primary"} onClick={() => this[button.click](selectItem)}>{button.content(selectItem)}</el-button>)
                                    }
                                </td>)
                            }
                        </tr>)
                    }
                </table>
            </el-col>

            <ConfirmDialog
                visible={this.dialogVisible}
                tipTxt={this.tipTxt}
                handelSure={this.sureCallbacks}
                handelCancel={() => {
                    this.dialogVisible = false;
                }}
            />
        </el-row>;
    }

    /**
     * 修改昵称
     * @param selectItem
     */
    editNickname(selectItem) {
        this.goPage('EditNicknamePage', {formData: selectItem});
    }

    /**
     * 禁用VIP
     */
    banVIPClick(selectItem) {
        this.dialogVisible = true;
        this.tipTxt = !selectItem.disableVip ? '确定要禁用VIP吗？' : '确定要恢复VIP吗';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            banVIP(selectItem.id).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.formData.disableVip = !selectItem.disableVip;
            }).catch(err => {});
        };
    }

    /**
     * 设置设备过滤
     */
    setDeviceFilter(selectItem) {
        this.dialogVisible = true;
        this.tipTxt = selectItem.isFilter ? '确定要恢复过滤吗？' : '确定要过滤吗';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            setDeviceFilter(selectItem.id).then(res => {
                this.$message({
                    message: "操作成功",
                    type: "success"
                });
                this.formData.isFilter = !selectItem.isFilter;
            }).catch(err => {
            });
        };
    }

    /**
     * 设备重置
     * @param selectItem
     */
    deviceReset(selectItem) {
        this.goPage('EditDeviceResetPage', {formData: selectItem});
    }

    toSetDeviceStatusPage(selectItem) {
        this.goPage('EditDeviceStatusPage', {formData: selectItem});
    }
}

/**
 * 用户登陆记录
 */
@Component({name: 'LoginInfoPage'})
class LoginInfoPage extends StbUserViewDetailPage {
    tabActiveItemName = 'LoginInfoPage';
    tableAction = 'stbUser/user/page/RefreshPage';
    viewRule = [
        {columnKey: 'nickName', label: '用户昵称', minWidth: 120},
        {columnKey: 'openid', label: 'openId', minWidth: 120},
        {columnKey: 'userUuid', label: '用户UUID', minWidth: 285},
        {columnKey: 'createTime', label: '登录时间', minWidth: 175},
        {imgColumn: 'headerImg', label: '用户头像'}
    ];

    @State(state => state.userManage.stbUserLoginPage) tableData;
}

/**
 * 设备开机日志
 */
@Component({name: 'DeviceBootPage'})
class DeviceBootPage extends StbUserViewDetailPage {
    tabActiveItemName = 'DeviceBootPage';
    tableAction = 'stbUser/user/device/boot/RefreshPage';
    viewRule = [
        {columnKey: 'deviceUuid', label: '设备号', minWidth: 90, inDetail: true},
        {columnKey: 'deviceIp', label: '设备IP', minWidth: 90, inDetail: true},
        {columnKey: 'city', label: '城市', minWidth: 90},
        {columnKey: 'region', label: '省份', minWidth: 90},
        {columnKey: 'area', label: '区域', minWidth: 95},
        {columnKey: 'country', label: '国家', minWidth: 120},
        {columnKey: 'createTime', label: '创建时间'},
        // {columnKey: 'updateTime', label: '更新时间'}
    ];

    @State(state => state.userManage.deviceBootInfoPage) tableData;
}

/**
 * 绑定设备（微信点歌）
 */
@Component({name: 'BindDeviceInfoPage'})
class BindDeviceInfoPage extends StbUserViewDetailPage {
    tabActiveItemName = 'BindDeviceInfoPage';
    tableAction = 'stbUser/user/RefreshPage';
    viewRule = [
        {columnKey: 'userUuid', label: '用户UUID', minWidth: 285},
        {columnKey: 'nickName', label: '昵称', minWidth: 120},
        {imgColumn: 'headerImg', label: '头像'},
        {columnKey: 'expireTime', label: '绑定过期时间', minWidth: 170},
        {columnKey: 'status', label: '绑定状态', minWidth: 160}
    ];

    @State(state => state.userManage.stbUserUserPage) tableData;
}

/**
 * 支付记录
 */
@Component({name: 'PayOrderingsPage'})
class PayOrderingsPage extends StbUserViewDetailPage {
    tabActiveItemName = 'PayOrderingsPage';
    tableAction = 'stbUser/order/RefreshPage';
    viewRule = [
        {columnKey: 'orderNo', label: '订单号', minWidth: 285},
        {columnKey: 'productName', label: '产品名称', minWidth: 120},
        {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 140},
        {columnKey: 'type', label: '激活方式', formatter: (r, h) => {
                switch (r.type) {
                    case 1:
                        return '订购支付激活';
                    case 2:
                        return '用户免费领取VIP激活（非共享）';
                    case 3:
                        return '后台直接配置（共享）';
                    default:
                        return '';
                }
            }},
        {columnKey: 'productType', label: '产品类型', minWidth: 140, formatter: (r, h) => {
                switch (r.productType) {
                    case 1:
                        return '非共享设备产品';
                    case 2:
                        return '共享设备产品';
                    default:
                        return '';
                }
            }},
        {columnKey: 'discountType', label: '折扣类型', minWidth: 140, formatter: (r, h) => {
                switch (r.discountType) {
                    case 0:
                        return '没有折扣';
                    case 1:
                        return '立减金额';
                    case 2:
                        return '赠送时间';
                    case 3:
                        return '都有';
                    default:
                        return '';
                }
            }},
        {columnKey: 'productVipContent', label: '产品模板VIP有效时间', minWidth: 140, formatter: (r, h) => {
                if (r.productVipContent === null) return '';
                if (parseInt(r.productType, 10) === 2) {
                    return r.productVipContent + '（分钟）';
                }
                return r.productVipContent + '（天）';
            }},
        {columnKey: 'activeDay', label: '实际VIP有效时间', minWidth: 140, formatter: (r, h) => {
                if (r.activeDay === null) return '';
                if (parseInt(r.productType, 10) === 2) {
                    return r.activeDay + '（分钟）';
                }
                return r.activeDay + '（天）';
            }},
        {columnKey: 'discountDetail', label: '折扣详情', minWidth: 140},
        {columnKey: 'salePrice', label: '售价（元）', minWidth: 140},
        {columnKey: 'dealPrice', label: '成交价（元）', minWidth: 140},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170}
    ];

    @State(state => state.userManage.stbUserOrderPage) tableData;
}

/**
 * 设备录音数据
 */
@Component({name: 'RecordingsPage'})
class RecordingsPage extends StbUserViewDetailPage {
    tabActiveItemName = 'RecordingsPage';
    tableAction = 'stbUser/userSound/RefreshPage';
    viewRule = [
        {auditionColumn: 'nameNorm', label: '歌曲名称', minWidth: 220},
        {columnKey: 'isEnabled', label: '录音状态', formatter: r => {
                if (r.isEnabled === 1) return '开启';
                if (r.isEnabled === 2) return '禁用';
            }},
        // {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
        // {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
        {columnKey: 'createTime', label: '录音时间', minWidth: 170},
        {label: '操作', buttons: [{label: '下载', type: 'download'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 145}
    ];

    @State(state => state.userManage.stbUserUserSoundPage) tableData;

    handelDownload(row) {
        window.location.href = row.musicUrl;
    }

    handelBan(row) {
        this.dialogVisible = true;
        this.tipTxt = row.isEnabled === 1 ? "确定要禁用吗？" : "确定开启吗？";
        const menuId = row.id;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            soundDisable(menuId).then(response => {
                this.loading = false;
                this.successMsg('操作成功');
                this.refreshTable();
            }).catch(err => {
                this.loading = false;
            });
        };
    }
}

/**
 * 激活码激活记录
 */
@Component({name: 'ActiveRecordingsPage'})
class ActiveRecordingsPage extends StbUserViewDetailPage {
    tabActiveItemName = 'ActiveRecordingsPage';
    tableAction = 'stbUser/activateRecord/RefreshPage';
    viewRule = [
        {columnKey: 'activateCode', label: '激活码', minWidth: 285},
        {columnKey: 'days', label: '激活天数', minWidth: 120},
        {columnKey: 'useTime', label: '使用时间', minWidth: 170},
        // {columnKey: 'status', label: '标识', minWidth: 100, formatter: r => {
        //     switch (r.status) {
        //         case 1:
        //             return '配置激活';
        //         case 2:
        //             return '免费激活';
        //         default:
        //             break;
        //     }
        // }},
        // {columnKey: 'remark', label: '备注', minWidth: 170},
        // {label: '操作', buttons: [{label: '设置', type: 'activeSettings'}], minWidth: 70}
    ];

    @State(state => state.userManage.stbUserActivateRecordPage) tableData;
}

/**
 * 消息列表
 */
@Component({name: 'MsgListPage'})
class MsgListPage extends StbUserViewDetailPage {
    tabActiveItemName = 'ActiveRecordingsPage';
    tableAction = 'stbUser/message/RefreshPage';
    viewRule = [
        {columnKey: 'msgTitle', label: '消息标题', minWidth: 120},
        {columnKey: 'msgContent', label: '消息内容', minWidth: 220},
        // 1-活动推送 2-支付成功 3-包年到期 4-反馈回复 5-vip即将到期提示
        {columnKey: 'msgType', label: '消息类型', minWidth: 100, formatter: r => {
                switch (r.msgType) {
                    case 1:
                        return '活动推送';
                    case 2:
                        return '支付成功';
                    case 3:
                        return '包年到期';
                    case 4:
                        return '反馈回复';
                    case 5:
                        return 'vip即将到期提示';
                    case 6:
                        return '免费领取vip成功';
                    case 7:
                        return '后台免费赠送vip';
                    case 8:
                        return '充值卡充值成功';
                    default:
                        return '';
                }
            }},
        {columnKey: 'msgTime', label: '发送时间', minWidth: 170},
        {columnKey: 'isRead', label: '是否查看', minWidth: 100, formatter: r => {
                switch (r.isRead) {
                    case 1:
                        return '未查看';
                    case 2:
                        return '已查看';
                    default:
                        return '';
                }
            }},
    ];

    @State(state => state.userManage.stbUserMessagePage) tableData;
}

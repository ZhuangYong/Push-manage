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
    stbUserSaveActivate, userSendMsg
} from "../../api/userManage";
import {State} from "vuex-class";
import {soundDelete, soundDisable} from "../../api/recordManage";
import JPanel from "../../components/panel/JPanel";
import ConfirmDialog from '../../components/confirm';
import {del as albumDelete, disable as ablumDisable} from "../../api/album";
import ChooseMaterialPage from "../weixin/ChooseMaterialPage";
import ChooseImagePage from "../weixin/ChooseImagePage";
import {EditWXMaterialPage} from "../weixin/material";
import {EditWXImagePage} from "../weixin/image";

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

@Component({name: 'UserListView'})
export default class UserListView extends BaseView {
    created() {
        this.initialPages([
            <IndexPage />,
            <ViewDetailPage />,
            <PayPage/>,
            <AlbumPage/>,
            <RecordingsPage/>,
            <BindDeviceInfoPage/>,
            <PushMsgPage />,
            <ChooseImagePage />,
            <ChooseMaterialPage />,
            <EditWXMaterialPage />,
            <EditWXImagePage />
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
class IndexPage extends BasePage {
    // 列表api地址
    tableAction = 'userList/RefreshPage';
    // 列表显示规则
    viewRule = [
        {columnKey: 'openid', label: 'openId', minWidth: 220},
        {imgColumn: 'headerImg', label: '微信头像', minWidth: 120},
        {columnKey: 'nickName', label: '微信昵称', minWidth: 120, sortable: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: '查看', type: 'viewDetail'}], minWidth: 80}
    ];
    // 搜索规则
    tableActionSearch = [
        {column: 'nickname', label: '请输入微信昵称', type: 'input', value: ''},
        {column: 'openid', label: '请输入openId', type: 'input', value: ''},
    ];
    // 列表数据
    @State(state => state.userManage.userListPage) tableData;
    tableCanSelect = true;
    openids = [];

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
            <el-button class="filter-item" onClick={() => this.goPage('PushMsgPage', {formData: {openid: this.openids}})} type="primary" disabled={this.openids.length <= 0}>
                推送消息
            </el-button>
        </div>;
    }

    handelViewDetail(row) {
        this.goPage('ViewDetailPage', {defaultData: {formData: row, extraData: this._data}});
    }

    handleSelectionChange(selectItems) {
        this.openids = [];
        if (selectItems.length > 0) {
            selectItems.map(selectItem => this.openids.push(selectItem.openid));
        }
    }
}

/**
 * 推送消息页
 */
@Component({name: 'PushMsgPage'})
class PushMsgPage extends BasePage {
    // private String openid;
    //消息类型。1：图文消息，2：文字消息，3：图片消息
    // private Integer type;
    //素材表的主键，tb_wx_material
    // private Integer materialId;
    //type=2的时候，直接传文字
    // private String content;
    defaultFormData = {
        type: 1,
        materialId: '',
        content: '',
        image: '',
    };
    validateRule = {
        materialId: [
            {required: true, message: '请选择图文'}
        ],
        content: [
            {required: true, message: '请输入文字信息'}
        ],
    };

    editFun = userSendMsg;

    render() {
        return (
            <JPanel title='推送消息'>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="消息类型：">
                        <el-radio-group value={this.formData.type} name="type">
                            <el-radio value={1} label={1}>图文消息</el-radio>
                            <el-radio value={2} label={2}>文字消息</el-radio>
                            <el-radio value={3} label={3}>图片消息</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    {
                        this.formData.type === 1 ? <el-form-item label="从图文管理里面选择：" prop="materialId">
                            {
                                this.formData.materialTitle ? <el-tag key="tag" closable disable-transitions={false} onClose={f => {
                                    this.formData.materialId = '';
                                    this.formData.materialTitle = '';
                                }}>
                                    {this.formData.materialTitle}
                                </el-tag> : <el-button type="primary" size="mini" onClick={f => {
                                    this.goPage('ChooseMaterialPage');
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }
                    {
                        this.formData.type === 2 ? <el-form-item label="文字内容：" prop="content">
                            <el-input value={this.formData.content} name='content' onChange={v => this.formData.content = v}/>
                        </el-form-item> : ''
                    }
                    {
                        this.formData.type === 3 ? <el-form-item label="从图片管理里面选择：" prop="materialId">
                            {
                                this.formData.image ? <div class="image-preview" style={{
                                    position: 'relative',
                                    // clear: 'both',
                                    height: '100px',
                                    width: '100px',
                                }}>
                                    <i class="el-icon-close"
                                       style={{
                                           position: 'absolute',
                                           left: '-3px',
                                           cursor: 'pointer',
                                           background: 'red',
                                           borderRadius: '50%',
                                           padding: '6px',
                                           zIndex: 3,
                                           right: 'auto!important',
                                           top: '1px!important',
                                           color: '#fff!important'
                                       }}
                                       onClick={f => {
                                           this.formData.materialId = '';
                                           this.formData.image = '';
                                       }} />
                                    <div class="image-preview-wrapper">
                                        <img src={this.formData.image} style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            marginTop: '7px'
                                        }} />
                                    </div>
                                </div> : <el-button type="primary" size="mini" onClick={f => {
                                    this.goPage('ChooseImagePage');
                                }}>点击选择</el-button>
                            }
                        </el-form-item> : ''
                    }

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack({defaultData: {openids: []}});
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
 * 查看详情页
 */
@Component({name: 'ViewDetailPage'})
class ViewDetailPage extends StbUserViewDetailPage {
    tabItems = [
        {status: 'ViewDetailPage', label: '查看详情'},
        {status: 'PayPage', label: '支付详情'},
        {status: 'AlbumPage', label: '相册'},
        {status: 'RecordingsPage', label: '录音'},
        {status: 'BindDeviceInfoPage', label: '绑定设备'}
    ];
    isShowTable = false;
    viewDetailRules = [
        [
            {label: '微信昵称'},
            {val: 'nickName'},
            {label: '微信头像'},
            {formatter: (r, h) => {
                    if (r.headerImg) return (<img src={r.headerImg} style="height: 30px; margin-top: 6px;"/>);
                    return '';
                }},
            {label: '用户id'},
            {val: 'id'}
        ],
        [
            {label: 'openid'},
            {val: 'openid'},
            {label: 'unionid'},
            {val: 'unionid'},
            {label: '创建时间'},
            {val: 'createTime'}
        ]
    ];

    contentHtml(h) {
        const selectItem = this.formData;

        return <el-row>
            <el-col span={24} style={{overflowX: 'auto'}}>
                <table border="1" style={styles.table}>
                    <tr>
                        {
                            this.viewDetailRules.map(rule => <tr>
                                {
                                    rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth}`}}
                                                         colSpan={item.colspan ? item.colspan : ''}>
                                        <span>{item.label ? item.label + ': ' : (item.val ? selectItem[item.val] : (item.formatter ? item.formatter(selectItem, h) : item.status(selectItem)))}</span>
                                    </td>)
                                }
                            </tr>)
                        }
                    </tr>
                </table>
            </el-col>
        </el-row>;
    }
}

/**
 * 支付详情页
 */
@Component({name: 'PayPage'})
class PayPage extends ViewDetailPage {
    isShowTable = true;
    tabActiveItemName = 'PayPage';
    tableAction = 'order/RefreshPage';
    viewRule = [
        {columnKey: 'orderNo', label: '订单号', minWidth: 220},
        {columnKey: 'deviceUuid', label: '设备编号', minWidth: 220},
        {columnKey: 'productName', label: '产品名', minWidth: 120},
        {columnKey: 'dealPrice', label: '订单金额（元）'},
        {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170},
        {columnKey: 'payType', label: '支付方式', formatter: r => {
                if (r.payType === 1) return '支付宝';
                if (r.payType === 2) return '微信';
            }},
        {columnKey: 'payStatus', label: '付款状态', formatter: r => {
                if (r.payStatus === 1) return '创建';
                if (r.payStatus === 2) return '已完成';
            }},
        {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
                if (r.orderStatus === 1) return '未付款';
                if (r.orderStatus === 2) return '已付款';
            }},
        {columnKey: 'transactionId', label: '支付流水号', minWidth: 170},
    ];
    tableActionSearch = [
        {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
        {column: 'deviceUuid', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'productName', label: '请输入产品名', type: 'input', value: ''},
        {column: 'transactionId', label: '请输入支付流水号', type: 'input', value: ''},
    ];

    @State(state => state.userManage.orderPage) tableData;

    created() {
        this.tableActionSearchColumn = [{openid: this.formData.openid}];
    }
}

/**
 * 相册页
 */
@Component({name: 'AlbumPage'})
class AlbumPage extends PayPage {
    tabActiveItemName = 'AlbumPage';
    tableAction = 'album/RefreshPage';
    viewRule = [
        {columnKey: 'nickName', label: '微信昵称', minWidth: 120},
        {columnKey: 'id', label: '用户id', minWidth: 80},
        {imgColumn: 'thumbnail', label: '图片缩略图', minWidth: 120, formatter: (r, h) => {
                if (r.thumbnail) return (<img src={r.thumbnail} style="height: 30px; margin-top: 6px;"/>);
                return '';
            }},
        {columnKey: 'createTime', label: '上传时间', minWidth: 170},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
                switch (r.isEnabled) {
                    case 1:
                        return '是';
                    case 2:
                        return '否';
                    default:
                        return '否';
                }
            }},
        {label: '操作', buttons: [{label: '删除', type: 'del'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 145}
    ];
    tableActionSearch = [
        {column: 'nickname', label: '请输入微信昵称', type: 'input', value: ''},
        {column: 'id', label: '请输入用户id', type: 'input', value: ''},
    ];

    @State(state => state.userManage.albumPage) tableData;

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        const id = row.id;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            albumDelete(id).then(response => {
                this.loading = false;
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
                this.refreshTable();
            }).catch(err => {
                this.loading = false;
            });
        };
    }

    handelBan(row) {
        this.dialogVisible = true;
        this.tipTxt = row.isEnabled === 1 ? "确定要禁用吗？" : (row.isEnabled === 1 ? "确定要禁用吗?" : "确定开启吗？");
        const id = row.id;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            ablumDisable(id).then(response => {
                this.loading = false;
                this.$message({
                    message: row.isEnabled === 1 ? "禁用成功！" : "开启成功！",
                    type: "success"
                });
                this.refreshTable();
            }).catch(err => {
                this.loading = false;
            });
        };
    }
}

/**
 * 录音页
 */
@Component({name: 'RecordingsPage'})
class RecordingsPage extends PayPage {
    tabActiveItemName = 'RecordingsPage';
    tableAction = 'soundList/RefreshPage';
    viewRule = [
        {auditionColumn: 'nameNorm', label: '歌曲名称', minWidth: 220},
        {columnKey: 'deviceUuid', label: '设备号'},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
                switch (r.isEnabled) {
                    case 1:
                        return '是';
                    case 2:
                        return '否';
                    default:
                        return '否';
                }
            }},
        // {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 120},
        // {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
        {columnKey: 'createTime', label: '录音时间', minWidth: 170},
        {label: '操作', buttons: [{label: '删除', type: 'del'}, {label: '下载', type: 'download'}, {label: r => r.isEnabled === 1 ? '禁用' : '开启', type: 'ban'}], minWidth: 200}
    ];
    tableActionSearch = [
        {column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''},
        {column: 'deviceUuid', label: '请输入设备号', type: 'input', value: ''},
    ];

    @State(state => state.recordManage.soundList) tableData;

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        const id = row.id;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            const deleteParams = {ids: id};
            soundDelete(deleteParams).then(response => {
                this.loading = false;
                this.$message({
                    message: "删除成功",
                    type: "success"
                });
                this.refreshTable();
            }).catch(err => {
                this.loading = false;
            });
        };
    }

    handelBan(row) {
        this.dialogVisible = true;
        this.tipTxt = row.isEnabled === 1 ? "确定要禁用吗？" : (row.isEnabled === 1 ? "确定要禁用吗?" : "确定开启吗？");
        const id = row.id;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            soundDisable(id).then(response => {
                this.loading = false;
                this.$message({
                    message: row.isEnabled === 1 ? "禁用成功！" : "开启成功！",
                    type: "success"
                });
                this.refreshTable();
            }).catch(err => {
                this.loading = false;
            });
        };
    }

    handelDownload(row) {
        window.location.href = row.musicUrl;
    }
}

/**
 * 绑定设备页
 */
@Component({name: 'BindDeviceInfoPage'})
class BindDeviceInfoPage extends PayPage {
    tabActiveItemName = 'BindDeviceInfoPage';
    tableAction = 'userBind/RefreshPage';
    viewRule = [
        {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 100},
        {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
        {columnKey: 'openid', label: 'openid', minWidth: 170},
        {columnKey: 'deviceUuid', label: 'deviceUuid', minWidth: 170},
        {columnKey: 'unionid', label: 'unionid', minWidth: 170}
    ];
    tableActionSearch = [
        {column: 'nickName', label: '请输入登录设备昵称', type: 'input', value: ''},
        {column: 'openid', label: '请输入openid', type: 'input', value: ''},
    ];

    @State(state => state.userManage.userBindPage) tableData;

    bindDeviceRules =[
        [
            {label: '当前', colspan: 6},
        ],
        [
            {label: '状态'},
            {val: 'status'},
            {label: '设备号'},
            {val: 'deviceId'},
            {label: '时间'},
            {val: 'time'}
        ]
    ];

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.contentHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    contentHtml(h) {
        const bindDeviceData = this.tableData.result;
        return <el-row>
            <el-col span={24} style={{overflowX: 'auto', marginBottom: '30px'}}>
                <table border="1" style={styles.table}>
                    <tr>
                        {
                            this.bindDeviceRules.map(rule => <tr>
                                {
                                    rule.map(item => <td style={{...styles.cell, minWidth: `${item.minWidth || 88}px`}} colspan={item.colspan ? item.colspan : 0}>
                                        <span>{item.label ? item.label + ': ' : (item.val ? bindDeviceData[item.val] : '')}</span>
                                    </td>)
                                }
                            </tr>)
                        }
                    </tr>
                </table>
            </el-col>
        </el-row>;
    }
}


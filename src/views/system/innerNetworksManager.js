/**
 * Created by Zed on 2018/3/20.
 */
import {Component} from 'vue-property-decorator';
import {State} from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import JPanel from "../../components/panel/JPanel";
import {
    innerNetworksAddChannels, innerNetworksCalibratePrivateTime,
    innerNetworksDelete,
    innerNetworksDeleteChannels,
    innerNetworksSave, innerNetworksSendResourceToPrivate,
    innerNetworksSendToPrivate
} from "../../api/innerNetworksManager";
import ChannelPage from "../commPages/channelPage";

@Component({name: 'InnerNetworksView'})
export default class InnerNetworksView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <EditPage />, <RelateChannelPage />, <ChooseChannelPage />, <RefreshResourcePage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'innerNetworks/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '专网组名称', minWidth: 120, sortable: true},
        {columnKey: 'queueId', label: '通信队列ID', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否启用', minWidth: 120, formatter: r => {
                if (r.isEnabled === 1) return '启用';
                if (r.isEnabled === 2) return '未启用';
            }},
        {columnKey: 'updateName', label: '更新者', minWidth: 170, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 170, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, sortable: true, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
        {
            label: '操作',
            buttons: [
                {label: '编辑', type: 'edit'},
                {label: '删除', type: 'del'},
                {label: '关联机型', type: 'relateChannel'},
                {label: '资源包更新', type: 'refreshResource'},
                {label: '服务器时间校准', type: 'checkServerTime'},
                ],
            minWidth: 456
        }
    ];
    delItemFun = innerNetworksDelete;
    sendToPrivateSerialNo = null;

    @State(state => state.system.innerNetworksList) tableData;

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

            <el-input value={this.sendToPrivateSerialNo} placeholder={"请输入歌曲SerialNo"} onChange={v => {
                this.sendToPrivateSerialNo = v;
            }} class="filter-item" style={{
                verticalAlign: 'center',
                maxWidth: '160px',
                margin: '0 10px',
            }}/>

            <el-button class="filter-item" onClick={
                () => {
                   this.clickSendToPrivate(this.sendToPrivateSerialNo);
                }
            } type="primary" icon="edit">推送
            </el-button>
        </div>;
    }

    handelRefreshResource(row) {
        this.goPage('RefreshResourcePage', {formData: row});
    }

    handelCheckServerTime(row) {
        this.submitLoading = true;
        innerNetworksCalibratePrivateTime({queueId: row.queueId}).then(res => {
            this.successMsg('操作成功');
            this.submitLoading = false;
        }).catch(err => this.submitLoading = false);
    }

    handelEdit(row) {
        this.goPage('EditPage', {formData: row});
    }

    handelRelateChannel(row) {
        this.goPage('RelateChannelPage', {formData: row});
    }

    /**
     * 推送歌曲
     * @param serialNo 歌曲serialNo
     */
    clickSendToPrivate(serialNo) {
        if (serialNo === null) {
            this.$message.error('请输入歌曲serialNo');
            return;
        }
        this.dialogVisible = true;
        this.tipTxt = "确定要推送吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            innerNetworksSendToPrivate(serialNo).then(res => {
                this.submitLoading = false;
                this.sendToPrivateSerialNo = null;
                this.$message.success('推送成功');
            }).catch(err => {
                this.submitLoading = false;
                this.$message.error('推送失败');
            });
        };
    }
}

@Component({name: 'RefreshResourcePage'})
class RefreshResourcePage extends BasePage {
    showIndex = true;
    showDetail = false;
    pagination = false;
    tableAction = 'innerNetworks/resource/RefreshPage';
    viewRule = [
        // {columnKey: 'id', label: 'ID', minWidth: 60, sortable: true},
        {columnKey: 'confName', label: '名称', minWidth: 120, sortable: true},
        {columnKey: 'confValue', label: '版本号', sortable: true},
        // {columnKey: 'comment', label: '备注', minWidth: 140},
        {label: '操作', buttons: [{label: r => r.status ? '同步数据' : '同步中请稍等', type: 'update'}], minWidth: 220}
    ];
    topViewRule = [
        {columnKey: 'picture', label: '图片资源版本', minWidth: 140},
        {columnKey: 'rank', label: '榜单资源版本', minWidth: 140},
        {columnKey: 'type', label: '分类资源版本', minWidth: 140},
        {columnKey: 'media', label: '歌星歌曲数据库版本', minWidth: 140},
        {columnKey: 'push', label: '推荐资源版本', minWidth: 140},
    ];

    @State(state => {
        const {data} = state.system.innerNetworksGetPrivateResourceVersionPage || {data: {}};
        return {data: [
                {id: "pictures", confName: "pictures", status: data.picturesStatus, confValue: data.picturesVersion},
                {id: "rank", confName: "rank", status: data.rankStatus, confValue: data.rankVersion},
                {id: "recommend", confName: "recommend", status: data.recommendStatus, confValue: data.recommendVersion},
                {id: "type", confName: "type", status: data.typeStatus, confValue: data.typeVersion},
            ]};
    }) tableData;
    @State(state => state.system.innerNetworksGetPrivateResourceVersionTopPage) tableTopData;

    created() {
        this.targetId = this.formData.queueId;
        this.tableActionSearchColumn = [{queueId: this.targetId}];
    }

    render(h) {
        return <div>
            {this.pageBackHtml(h)}
            <div style={{marginTop: '15px'}}>
                {this.cacheTableHtml(h, this.tableTopData, this.topViewRule)}
                {this.tableHtml(h)}
            </div>
        </div>;
    }

    handelUpdate(row) {
        if (!row.status) {
            return;
        }
        this.submitLoading = true;
        innerNetworksSendResourceToPrivate({
            queueId: this.targetId,
            // type: row.type
            requestParam: row.id
        }).then(res => {
            this.successMsg('操作成功');
            this.submitLoading = false;
            this.refreshTable();
        }).catch(err => this.submitLoading = false);
    }

    /**
     * 返回表格HTML代码段
     * @param h
     * @param data
     * @param viewRule
     * @returns {XML}
     */
    cacheTableHtml(h, data, viewRule) {
        return <div class="table" style="inline;">
            <el-table
                border
                data={data}
                v-loading={this.loading}
                filter-multiple={this['filter-multiple']}
                ref="multipleTable"
                tooltip-effect="dark"
                style="width: 100%">

                {
                    viewRule && viewRule.map((viewRuleItem) => (
                        <el-table-column
                            key={this.pageAction + viewRuleItem.columnKey}
                            prop={viewRuleItem.columnKey}
                            sortable={!!viewRuleItem.sortable}
                            scope="scope"
                            label={viewRuleItem.label || viewRuleItem.columnKey}
                            width={viewRuleItem.width || ''}
                            min-width={viewRuleItem.minWidth || 100}
                            fixed={viewRuleItem.fixed || false}
                            formatter={viewRuleItem.buttons ? (row) => {
                                return (
                                    viewRuleItem.buttons.map(button => (
                                        (!button.condition || (typeof button.condition === "function" && button.condition(row))) && <el-button
                                            size="mini"
                                            type={(button.type === "edit" && "success") || (button.type === "del" && "danger") || (button.type === "auth" && "plain") || "primary"}
                                            onClick={
                                                () => {
                                                    this.$emit(button.type, row);

                                                }
                                            }>{button.label}</el-button>
                                    ))
                                );
                            } : (viewRuleItem.formatter ? (row) => {
                                return viewRuleItem.formatter(row, h);
                            } : (viewRuleItem.imgColumn ? (row) => {
                                const _img = typeof viewRuleItem.imgColumn === "function" ? viewRuleItem.imgColumn(row) : row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px;"/>);
                                return '';
                            } : null))}>
                        </el-table-column>
                    ))
                }
            </el-table>
        </div>;
    }
}

@Component({name: 'EditPage'})
class EditPage extends BasePage {
    defaultFormData = {
        name: '',
        queueId: '',
        isEnabled: 1,
    };

    validateRule = {
        name: [
            {required: true, message: '通信队列ID', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
        ],
        queueId: [
            {required: true, message: '请输入专网组名称', trigger: 'blur'},
            {min: 1, max: 50, message: '请输入1-50位字符', trigger: 'blur'}
        ],
    };

    editFun = innerNetworksSave;

    render() {
        return <JPanel title={`${this.formData.id ? "修改" : "添加"}升级`}>
            <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm"
                     label-position="right" label-width="180px">
                <el-form-item label="专网组名称：" prop="name">
                    <el-input value={this.formData.name} name='name'/>
                </el-form-item>
                <el-form-item label="通信队列ID：" prop="queueId">
                    <el-input value={this.formData.queueId} name='queueId'/>
                </el-form-item>
                <el-form-item label="是否启用" prop="isEnabled">
                    <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                        <el-radio value={1} label={1}>启用</el-radio>
                        <el-radio value={2} label={2}>未启用</el-radio>
                    </el-radio-group>
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
        </JPanel>;
    }
}

@Component({name: 'RelateChannelPage'})
class RelateChannelPage extends ChannelPage {
    tableAction = 'innerNetworks/channels/RefreshPage';
    defaultViewRule = [
        {columnKey: 'name', label: '机型名称', minWidth: 120, sortable: true},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120, sortable: true},
    ];
    tableCanSelect = true;
    selectIds = [];

    @State(state => state.system.innerNetworksChannels) tableData;

    created() {
        this.targetId = this.formData.queueId;
        this.tableActionSearchColumn = [{queueId: this.targetId}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('ChooseChannelPage', {formData: this.formData});
            }}>
                批量添加
            </el-button>
            <el-button class="filter-item" type="danger" disabled={this.selectIds.length <= 0} onClick={f => {
                this.operateChannels(innerNetworksDeleteChannels, this.refreshTable);
            }}>
                批量删除
            </el-button>
        </div>;
    }

    operateChannels(editFun, suc) {
        this.submitLoading = true;
        editFun({
            queueId: this.targetId,
            channelCodes: this.selectIds,
        }).then(() => {
            this.successMsg('操作成功');
            suc && suc();
            this.submitLoading = false;
        }).catch(err => {
            this.failMsg('操作失败');
            this.submitLoading = false;
        });
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.selectIds = [];
        selectedItems.map(item => this.selectIds.push(item.channelCode));
    }
}

@Component({name: 'ChooseChannelPage'})
class ChooseChannelPage extends RelateChannelPage {
    tableAction = 'innerNetworks/restChannels/RefreshPage';
    defaultViewRule = [
        {columnKey: 'name', label: '机型名称', minWidth: 120, sortable: true},
        {columnKey: 'code', label: '机型值', minWidth: 120, sortable: true},
    ];
    @State(state => state.system.innerNetworksRestChannels) tableData;

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" type="primary" disabled={this.selectIds.length <= 0} onClick={f => {
                this.operateChannels(innerNetworksAddChannels, this.pageBack);
            }}>
                选定
            </el-button>
        </div>;
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.selectIds = [];
        selectedItems.map(item => this.selectIds.push(item.code));
    }
}

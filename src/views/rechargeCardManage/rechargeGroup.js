/**
 * Created by Zed on 2018/5/3.
 */
import {Component, Watch} from "vue-property-decorator";
import {State} from "vuex-class/lib/index";
import BasePage from "../../components/common/BasePage";
import BaseView from "../../components/common/BaseView";
import RechargeGroupEditPage from './editPages/rechargeGroupEditPage';
import {
    rechargeGroupDeleteChannels,
    rechargeGroupSaveChannels,
    rechargeGroupSwitchEnable
} from "../../api/rechargeCardManage";

@Component({name: 'rechargeGroupView'})
export default class rechargeGroupView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <RechargeGroupEditPage />, <RechargeGroupDevicesPage />, <DevicesPage />]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'rechargeGroup/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '名称', minWidth: 120},
        {columnKey: 'uuid', label: '控制码', minWidth: 120},
        {columnKey: 'isEnabled', label: '是否生效', minWidth: 120, formatter: (r, h) => {
                switch (r.isEnabled) {
                    case 1:
                        return '生效';
                    case 2:
                        return '禁用';
                    default:
                        return '';
                }
            }},
        {columnKey: 'remark', label: '备注', minWidth: 120},
        {columnKey: 'updateName', label: '更新者', minWidth: 120, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 120, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 120, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: r => r.isEnabled === 1 ? '禁用' : '生效', type: 'del'}, {label: '关联设备', type: 'devices'}], minWidth: 168},
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {column: 'uuid', label: '请输入控制码', type: 'input', value: ''},
    ];

    @State(state => state.rechargeCardManage.rechargeGroupList) tableData;

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('rechargeGroupEditPage');
            }}>
                添加
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage('rechargeGroupEditPage', {formData: row});
    }

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要${row.isEnabled === 1 ? '禁用' : '生效'}当前控制码吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            rechargeGroupSwitchEnable(row.id).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }

    handelDevices(row) {
        this.goPage('rechargeGroupDevicesPage', {formData: row});
    }

}

@Component({name: 'rechargeGroupDevicesPage'})
class RechargeGroupDevicesPage extends BasePage {
    tableAction = 'rechargeGroupChannels/RefreshPage';
    viewRule = [
        {columnKey: 'name', label: '机型名称', minWidth: 190, sortable: true},
        {columnKey: 'code', label: '机型值', minWidth: 120},
        {columnKey: 'isShare', label: '是否是共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
                return '';
            }},
        {columnKey: 'payX', label: 'X轴', inDetail: true},
        {columnKey: 'payY', label: 'Y轴', inDetail: true},
        {columnKey: 'payW', label: '宽', inDetail: true},
        {columnKey: 'payH', label: '高', inDetail: true},
        {columnKey: 'remark', label: '描述', minWidth: 170},
        {columnKey: 'updateName', label: '更新者', inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];

    tableActionSearch = [
        {column: 'name', label: '请输入名称', type: 'input', value: ''},
        {column: 'code', label: '请输入机型值', type: 'input', value: ''},
    ];
    tableCanSelect = true;
    codes = '';

    @State(state => state.rechargeCardManage.rechargeGroupChannels) tableData;

    created() {
        this.targetId = this.formData.uuid;
        this.tableActionSearchColumn = [{urlJoin: this.targetId}];
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button className="filter-item" type="primary" onClick={f => {
                this.pageBack();
            }}>
                返回
            </el-button>
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('devicesPage', {formData: this.formData});
            }}>
                添加设备
            </el-button>
            <el-button className="filter-item" type="primary" disabled={this.codes === ''} onClick={f => {
                this.editDevices(rechargeGroupDeleteChannels, this.refreshTable);
            }}>
                批量删除
            </el-button>
        </div>;
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        this.selectItems = selectedItems;
        let arr = [];
        selectedItems.map(item => {
            arr.push(item.code);
        });
        this.codes = arr.join(',');
    }

    editDevices(editFun, suc) {
        console.log(this.codes);
        this.submitLoading = true;
        const params = {
            codes: this.codes
        };
        editFun(params, this.targetId).then(() => {
            this.successMsg('操作成功');
            suc && suc();
            this.submitLoading = false;
        }).catch(err => {
            this.failMsg('操作失败');
            this.submitLoading = false;
        });
    }
}

@Component({name: 'devicesPage'})
class DevicesPage extends RechargeGroupDevicesPage {
    tableAction = 'rechargeGroupChannelList/RefreshPage';
    @State(state => state.rechargeCardManage.rechargeGroupChannelList) tableData;

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button className="filter-item" type="primary" onClick={f => {
                this.pageBack();
            }}>
                返回
            </el-button>
            <el-button className="filter-item" type="primary" disabled={this.codes === ''} onClick={f => {
                this.editDevices(rechargeGroupSaveChannels, this.pageBack);
            }}>
                批量添加
            </el-button>
        </div>;
    }

}


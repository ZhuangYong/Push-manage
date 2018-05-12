/**
 * Created by Zed on 2018/5/12.
 */

import { Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import {SNListPage} from "./snList";
import {snExport} from "../../api/snManage";
import SNEditPage from "./SNEditPage";
import MACEditPage from "./MACEditPage";

@Component
export default class SNListView extends BaseView {
    created() {
        this.initialPages([<IndexPage />, <DetailPage />, <SNEditPage />, <MACEditPage />]);
    }
}

@Component
export class IndexPage extends BasePage {
    viewRule = [
        {columnKey: 'batch', label: '批次', minWidth: 90},
        {columnKey: 'number', label: '数量', minWidth: 90},
        {columnKey: 'createTime', label: '生成时间', minWidth: 120},
        {columnKey: 'remark', label: '备注', minWidth: 90},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {label: '操作', buttons: [{label: '导出', type: 'export'}, {label: '查看', type: 'detail'}], minWidth: 120},
    ];
    tableActionSearch = [
        {column: 'batch', label: '批次', type: 'input', value: ''},
        {column: 'startTime,endTime', label: '生成时间', type: 'daterange', value: '', option: Const.dataRangerOption},
    ];
    tableAction = 'snRecord/RefreshPage';
    @State(state => state.snManage.snRecordData) tableData;

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return <div className="filter-container table-top-button-container" style={{paddingBottom: '15px'}}>
            <el-button type="primary" onClick={f => {
                this.goPage('SNEditPage');
            }}>
                生成SN号
            </el-button>
            <el-button type="primary" onClick={f => {
                this.goPage('MACEditPage');
            }}>
                生成虚拟MAC
            </el-button>
        </div>;
    }

    handelDetail(row) {
        this.goPage('detailPage', {formData: {recordUuid: row.uuid}});
    }

    handelExport(row) {
        this.dialogVisible = true;
        this.tipTxt = '确定要导出吗？';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            const params = {
                recordUuid: row.uuid,
            };
            snExport(params).then(res => {
                this.submitLoading = false;
                this.successMsg('即将开始下载');
                window.location = res.path;
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg('操作失败');
            });
        };
    }
}

@Component({name: 'detailPage'})
class DetailPage extends SNListPage {
    recordUuid = '';
    tableActionSearch = [];
    created() {
        this.recordUuid = this.formData.recordUuid;
        this.tableActionSearchColumn = [{recordUuid: this.recordUuid}];
    }

    topButtonHtml(h) {
        return <div className="filter-container table-top-button-container" style={{paddingBottom: '15px'}}>
            <el-button type="primary" onClick={f => {
                this.pageBack();
            }}>
                返回
            </el-button>
        </div>;
    }
}

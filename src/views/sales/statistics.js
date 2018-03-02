/*
 * Copyright (c) 2018 J-MAKE.COM All Rights Reserved.FileName: statistics.js @author: walljack@163.com @date: 18-3-1 下午7:17 @version: 1.0
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import CommonTable from "../../components/Table/CommonTable";
import JSelect from "../../components/select/select";
import _ from "lodash";

@Component({
    name: 'StatisticsView',
    components: {
        JSelect
    }
})
export default class StatisticsView extends BasePage {
    deviceGroupUuid = "";
    salesUuid = "";
    form = {
        effectTime: ["2017-12-02 10:00:49", "2017-12-12 10:00:49"],
        deviceGroupUuid: "",
        salesUuid: ""
    };
    pickerOptions = {
        shortcuts: [{
            text: '最近一周',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近15天',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                picker.$emit('pick', [start, end]);
            }
        }, {
            text: '最近一个月',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
        }]
    };
    render() {
        const options = [{label: 'test', value: "1"}, {label: 'test2', value: "2"}];
        return <div>
            <div class="filter-container table-top-button-container">
                <el-form ref="form" model={this.form} label-width="100px">
                    <div class="table" style="inline;">
                        <JSelect placeholder="请选择设备组" emptyLabel="所有" vModel="deviceGroupUuid" options={options} class="table-top-item"/>
                        <JSelect placeholder="请选择销售方" emptyLabel="所有" vModel="salesUuid" options={options} multiple class="table-top-item"/>
                        <el-date-picker
                            class="table-top-item"
                            style="max-width: 300px;"
                            type="daterange"
                            picker-options={this.pickerOptions}
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            value={this.form.effectTime}
                            onInput={v => this.form.effectTime = v || []}
                            align="left">
                        </el-date-picker>
                    </div>
                </el-form>
            </div>
        </div>;
    }
    tableHtml(h) {
        return <div>
            <CommonTable ref="commonTable"
                         data={this.tableData || {data: []}}
                         tableAction={this.tableAction}
                         defaultSort={this.defaultSort[this.tableAction]}
                         tableActionSearchColumn={this.tableActionSearchColumn}
                         tableActionSearch={this.tableActionSearch}
                         defaultCurrentPage={this.enableDefaultTableCurrentPage ? this.defaultTableCurrentPage : 0}
                         select={this.tableCanSelect}
                         viewRule={this.viewRule}
                         pagination={this.pagination}
                         handelSortChange={this.handelSortChange}
                         handleSelectionChange={this.handleSelectionChange}
                         handelTablePageChange={this.handelTablePageChange}
                         handelTableButtonsEvent={this.handelTableButtonsEvent}
            />
            <ConfirmDialog
                visible={this.dialogVisible}
                tipTxt={this.tipTxt}
                handelSure={this.sureCallbacks}
                handelCancel={() => {
                    this.dialogVisible = false;
                }}
            />
        </div>;
    }

    handelSearch() {

    }
}

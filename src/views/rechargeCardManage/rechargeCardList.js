/**
 * Created by Zed on 2018/4/4.
 */
import {Component, Watch} from "vue-property-decorator";
import {State} from "vuex-class/lib/index";
import BasePage from "../../components/common/BasePage";
import BaseView from "../../components/common/BaseView";
import {getRechargeCardVIPAndChannels} from "../../api/rechargeCardManage";
import Const from "../../utils/const";
import CommonTable from "../../components/Table/CommonTable";

@Component({name: 'rechargeCardListView'})
export default class rechargeCardListView extends BaseView {
    created() {
        this.initialPages([<IndexPage/>]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'rechargeCard/RefreshPage';
    viewRule = [
        {columnKey: 'cardNo', label: '卡号', minWidth: 120},
        {columnKey: 'password', label: '密码', minWidth: 170},
        {columnKey: 'vipName', label: '会员套餐', minWidth: 170},
        {columnKey: 'channelNo', label: '控制码', minWidth: 230, formatter: (r, h) => {
                return `${r.groupName}(${r.channelNo})`;
            }},
        {columnKey: 'status', label: '状态', minWidth: 170, formatter: (r, h) => {
                switch (r.status) {
                    case 1:
                        return `未使用 ${r.startTime}至${r.endTime}（有效期）`;
                    case 2:
                        return `已使用 ${r.useTime}`;
                    case 3:
                        return `已过期 ${r.endTime}`;
                    default:
                        return '';
                }
            }},
        {columnKey: 'createTime', label: '生成时间', minWidth: 170},
        // {columnKey: 'remark', label: '备注', minWidth: 170},
    ];

    tableActionSearch = [
        {column: 'cardNo', label: '卡号', type: 'input', value: ''},
        {column: 'batch', label: '批次', type: 'input', value: ''},
        {column: 'startTime,endTime', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption},
        {column: 'vipDays', label: '会员套餐', type: 'option', value: '', options: []},
        {column: 'channelNo', label: '控制码', type: 'option', value: '', options: [{value: '0000', label: '0000'}]},
        {column: 'status', label: '状态', type: 'option', value: '', options: [
                {value: 1, label: '未使用'},
                {value: 2, label: '已使用'},
                {value: 3, label: '已过期'},
            ]},
    ];

    @State(state => state.rechargeCardManage.rechargeCardList) tableData;

    created() {
        this.refreshVIPAndChannel();
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
        const options = {
            data: this.$store.state.rechargeCardManage.rechargeCardStatistics,
            tableAction: 'rechargeCard/statistics',
            viewRule: [
                {columnKey: 'totalNum', label: '充值卡', minWidth: 170},
                {columnKey: 'usedNum', label: '已使用', minWidth: 170},
                {columnKey: 'unUsedNum', label: '未使用', minWidth: 170},
                {columnKey: 'expireNum', label: '已过期', minWidth: 170},
            ],
        };
        return <div>
            <CommonTable ref="topButtonHtml"
                         data={{data: [options.data || {}]}}
                         showDetail={false}
                         tableAction={options.tableAction}
                         select={false}
                         viewRule={options.viewRule}
                         pagination={false}
            />
        </div>;
    }

    refreshVIPAndChannel() {
        this.loading = true;
        getRechargeCardVIPAndChannels().then(response => {
            // console.log(response);
            const {channelNos, vipDays} = response;

            this.tableActionSearch[3].options = [];
            vipDays && vipDays.map(vipDay => {
                const {comment, confValue} = vipDay;
                this.tableActionSearch[3].options.push({value: confValue, label: comment});
            });

            this.tableActionSearch[4].options = [];
            channelNos && channelNos.map(channel => {
                const {uuid, name} = channel;
                uuid !== '' && this.tableActionSearch[4].options.push({value: uuid, label: name + `(${uuid})`});
            });

            this.loading = false;
        }).catch(err => this.loading = false);
    }
}

import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import {Component} from "vue-property-decorator";
import {State} from "vuex-class/lib/index";

@Component({name: 'OrderPage'})
export class OrderPage extends BasePage {
    tableAction = 'order/RefreshPage';
    viewRule = [
        {columnKey: 'headImg', label: '头像', formatter: (r, h) => {
                if (r.headImg) return (<img src={r.headImg} style="height: 30px; margin-top: 6px;"/>);
                return '';
            }, inDetail: true},
        {columnKey: 'nickname', label: '昵称', minWidth: 140, sortable: true},
        {columnKey: 'productName', label: '产品名', minWidth: 120, sortable: true},
        {columnKey: 'dealPrice', label: '订单金额（元）', minWidth: 160, sortable: true},
        {columnKey: 'payStatus', label: '付款状态', formatter: r => {
                if (r.payStatus === 1) return '未付款';
                if (r.payStatus === 2) return '已付款';
            }},
        // 1-待付款，2-已付款，3-已退款，4-订单出错，5：退款中，6：退款失败，7：审核中，8：审核通过，9：审核失败
        {columnKey: 'orderStatus', label: '订单状态', formatter: r => {
                if (r.orderStatus === 1) return '未付款';
                if (r.orderStatus === 2) return '已付款';
                if (r.orderStatus === 3) return '已退款';
                if (r.orderStatus === 4) return '订单出错';
                if (r.orderStatus === 5) return '退款中';
                if (r.orderStatus === 6) return '退款失败';
                if (r.orderStatus === 7) return '审核中';
                if (r.orderStatus === 8) return '审核通过';
                if (r.orderStatus === 9) return '审核失败';
            }},
        {columnKey: 'payType', label: '支付方式', formatter: r => {
                if (r.payType === 1) return '支付宝';
                if (r.payType === 2) return '微信';
            }},
        {columnKey: 'orderNo', label: '订单号', minWidth: 280, inDetail: true},
        {columnKey: 'deviceId', label: '设备编号', minWidth: 280, inDetail: true},
        {columnKey: 'channelName', label: '机型名称', minWidth: 110},
        {columnKey: 'subscribeTime', label: '交易时间', minWidth: 170, sortable: true},
        {columnKey: 'transactionId', label: '支付流水号', minWidth: 170, inDetail: true},
    ];
    tableActionSearch = [
        {
            column: 'channelCode', label: '请选择机型', type: 'option', value: '', options: []
        },
        {column: 'orderNo', label: '请输入订单号', type: 'input', value: ''},
        {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
        {column: 'productName', label: '请输入产品名', type: 'input', value: ''},
        {
            column: 'payType', label: '请选择付款方式', type: 'option', value: '', options: [
                {value: 1, label: '支付宝'},
                {value: 2, label: '微信'},
            ]
        },
        {
            column: 'payStatus', label: '请选择付款状态', type: 'option', value: '', options: [
                {value: 1, label: '创建'},
                {value: 2, label: '完成'},
            ]
        },
        {
            column: 'startTime,endTime', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption
        }
    ];
    @State(state => state.userManage.orderPage) tableData;
    orderNos = [];

    created() {
        this.refreshChanel();
    }

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.tableHtml(h)}
        </div>;
    }

    topButtonHtml(h) {
        return '';
    }

    refreshChanel() {
        this.loading = true;
        this.$store.dispatch("fun/chanelList").then(res => {
            this.loading = false;
            this.tableActionSearch[0].options = [];
            res.map(f => this.tableActionSearch[0].options.push({value: f.code, label: `${f.name}(${f.code})`}));
        }).catch(err => {
            this.loading = false;
        });
    }

    handleSelectionChange(selectItems) {
        selectItems.length > 0 ? selectItems.map(item => this.orderNos.push(item.orderNo)) : this.orderNos = [];
    }
}

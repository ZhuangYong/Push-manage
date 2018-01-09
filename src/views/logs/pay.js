import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'payActivate',

    data() {
        return {
            viewRule: [
                {columnKey: 'orderId', label: '订单号', minWidth: 100, sortable: true},
                {columnKey: 'activateDay', label: '激活天数', minWidth: 120, sortable: true},
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 190, sortable: true},
                // 1 未使用 2 已使用 3 待处理（雷石使用了，数据库没修改情况）
                {columnKey: 'status', label: '激活状态', formatter: r => {
                    if (r.status === 1) return '已激活';
                    if (r.status === 0) return '未激活';
                }},
                {columnKey: 'activateCode', label: '激活码', minWidth: 240},
                {columnKey: 'waitActivateTime', label: '待激活日期', minWidth: 170, sortable: true},
                {columnKey: 'createTime', label: '开始时间', minWidth: 190, sortable: true},
                {columnKey: 'endTime', label: '到期时间', minWidth: 170, sortable: true}

            ],
            listDataGetter: function() {
                return this.logs.payActivateLogPage;
            },
            pageAction: 'logs/payActivate/RefreshPage',
            pageActionSearch: [{
                column: 'activateCode', label: '请输入激活码', type: 'input', value: ''
            }],
            tableCanSelect: false
        };
    },

    computed: {
        ...mapGetters(['logs'])
    },

    methods: {
        topButtonHtml() {
            return "";
        }
    }
});

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'activateIndex',

    data() {
        return {
            viewRule: [
                {columnKey: 'activateCode', label: '激活码', minWidth: 190},
                {columnKey: 'days', label: '时间', formatter: r => r.days + '天', sortable: true},
                {columnKey: 'avaTime', label: '激活码有效时间', minWidth: 170, sortable: true},
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 190, sortable: true},
                {columnKey: 'useTime', label: '使用时间', minWidth: 170, sortable: true},
                {columnKey: 'orderCode', label: '订单号'},
                // 1 未使用 2 已使用 3 待处理（雷石使用了，数据库没修改情况）
                {columnKey: 'isUse', label: '状态', formatter: r => {
                    if (r.isUse === 1) return '未使用';
                    if (r.isUse === 2) return '已使用';
                    if (r.isUse === 3) return '待处理';
                }}
            ],
            listDataGetter: function() {
                return this.activate.activatePage;
            },
            pageActionSearch: [{
                column: 'activateCode', label: '请输入激活码', type: 'input', value: ''
            }],
            pageAction: 'activate/RefreshPage',
            tableCanSelect: false
        };
    },

    computed: {
        ...mapGetters(['activate'])
    },

    methods: {
        topButtonHtml() {
            return "";
        }
    }
});

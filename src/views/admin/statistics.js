import {mapGetters} from "vuex";
import BaseListView from "../../components/common/BaseListView";

export default BaseListView.extend({
    data() {
        return {
            viewRule: [
                {columnKey: 'allCount', label: '总设备数（台）'},
                {columnKey: 'notShareCount', label: '非共享设备（台）'},
                {columnKey: 'shareCount', label: '共享设备（台）'},
                {columnKey: 'vipCount', label: 'VIP设备（台）'},
                {columnKey: 'allPrice', label: '总收入（元）'},
                {columnKey: 'notSharePrice', label: '会员收入（元）'},
                {columnKey: 'sharePrice', label: '共享收入（元）'},
            ],
            listDataGetter: function() {
                return {data: [this.statistics.statisticsPage]};
            },
            pageActionSearch: [],
            pageAction: 'statistics/RefreshPage',
            tableCanSelect: false,
            pagination: false,
        };
    },
    computed: {
        ...mapGetters(['statistics'])
    },
    methods: {
        topButtonHtml(h) {
            return '';
        }
    }
});

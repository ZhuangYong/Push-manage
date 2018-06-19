import {mapGetters} from "vuex";
import BaseListView from "../../components/common/BaseListView";

const JMAKE_VIEW_RULE = [
    {columnKey: 'allCount', label: '总设备数（台）'},
    {columnKey: 'notShareCount', label: '非共享设备（台）'},
    {columnKey: 'shareCount', label: '共享设备（台）'},
    {columnKey: 'registerCount', label: '已激活设备（台）'},
    {columnKey: 'vipCount', label: 'VIP设备（台）'},
    {columnKey: 'payCount', label: '自主付费设备（台）'},
    {columnKey: 'allPrice', label: '总收入（元）'},
    {columnKey: 'notSharePrice', label: '会员收入（元）'},
    {columnKey: 'sharePrice', label: '共享收入（元）'},
];

const SALES_VIEW_RULE = [
    {columnKey: 'allCount', label: '总设备数（台）'},
    {columnKey: 'notShareCount', label: '非共享设备（台）'},
    {columnKey: 'shareCount', label: '共享设备（台）'},
    {columnKey: 'registerCount', label: '已激活设备（台）'},
    {columnKey: 'vipCount', label: 'VIP设备（台）'},
    {columnKey: 'payCount', label: '自主付费设备（台）'},
    // {columnKey: 'allPrice', label: '总收入（元）'},
    // {columnKey: 'notSharePrice', label: '会员收入（元）'},
    {columnKey: 'sharePrice', label: '共享收入（元）'},
];

const CHANNELS_VIEW_RULE = [
    {columnKey: 'allCount', label: '总设备数（台）'},
    {columnKey: 'notShareCount', label: '非共享设备（台）'},
    {columnKey: 'shareCount', label: '共享设备（台）'},
    {columnKey: 'registerCount', label: '已激活设备（台）'},
    {columnKey: 'vipCount', label: 'VIP设备（台）'},
    {columnKey: 'payCount', label: '自主付费设备（台）'},
    // {columnKey: 'allPrice', label: '总收入（元）'},
    {columnKey: 'notSharePrice', label: '会员收入（元）'},
    // {columnKey: 'sharePrice', label: '共享收入（元）'},
];

export default BaseListView.extend({
    data() {
        return {
            viewRule: [],
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
        ...mapGetters(['statistics', 'user'])
    },
    created() {
        // type:1:金麦客，2：销售方，3：渠道方
        let viewRule = [];
        switch (this.user.type) {
            case 1:
                viewRule = JMAKE_VIEW_RULE;
                break;
            case 2:
                viewRule = SALES_VIEW_RULE;
                break;
            case 3:
                viewRule = CHANNELS_VIEW_RULE;
                break;
            default:
                break;
        }

        this.viewRule = viewRule;
    },
    methods: {
        topButtonHtml(h) {
            return '';
        }
    }
});

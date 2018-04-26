import {mapGetters} from "vuex";
import BaseListView from "../../components/common/BaseListView";

const activateViewRule = [
    {columnKey: 'day', label: '激活码天数', formatter: (r, h) => {
        return (<span><i class="el-icon-time" />{r.day}</span>);
    }},
    {columnKey: 'rest', label: '剩余数量'},
    {columnKey: 'total', label: '总数量'},
    {columnKey: 'expireCount', label: '已过期数量'},
    {columnKey: 'useCount', label: '已使用数量'},
];

export default BaseListView.extend({
    data() {
        return {
            viewRule: activateViewRule,
            listDataGetter: function() {
                return {data: this.statistics.statActivate};
            },
            pageActionSearch: [],
            pageAction: 'statistics/activate',
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

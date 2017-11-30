import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'sync',
    data() {
        return {
            viewRule: [
                {columnKey: 'type', label: '同步类型', minWidth: 80},
                {columnKey: 'status', label: '激活状态', formatter: r => {
                    if (r.status === 1) return '已激活';
                    if (r.status === 0) return '未激活';
                }},
                {columnKey: 'version', label: '同步版本', minWidth: 170},
                {columnKey: 'createTime', label: '同步时间', minWidth: 190},
            ],
            listDataGetter: function() {
                return this.logs.synchLogPage;
            },
            pageAction: 'logs/synch/RefreshPage',
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

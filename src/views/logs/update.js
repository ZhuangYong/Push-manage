import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'upload',
    data() {
        return {
            viewRule: [
                {columnKey: 'dataStr', label: '数据串', minWidth: 280},
                {columnKey: 'uploadTime', label: '上报时间', minWidth: 170},
                {columnKey: 'state', label: '上报状态', formatter: r => {
                    if (r.state === 1) return '未上报';
                    if (r.state === 2) return '已上报';
                }},
            ],
            listDataGetter: function() {
                return this.logs.uploadLogPage;
            },
            pageAction: 'logs/upload/RefreshPage',
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

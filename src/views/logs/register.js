import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'register',
    data() {
        return {
            viewRule: [
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 280, sortable: true},
                {columnKey: 'activateTime', label: '激活日期', minWidth: 170, sortable: true},
                {columnKey: 'activateDay', label: '激活天数', minWidth: 100, sortable: true},
                {columnKey: 'status', label: '状态', formatter: r => {
                    if (r.status === 1) return '激活成功';
                    return r;
                }},
                {columnKey: 'activateCode', label: '激活码', minWidth: 180},
            ],
            listDataGetter: function() {
                return this.logs.registerLogPage;
            },
            pageActionSearch: [{
                column: 'deviceUuid', label: '请输入设备编号', type: 'input', value: ''
            }],
            pageAction: 'logs/register/RefreshPage',
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

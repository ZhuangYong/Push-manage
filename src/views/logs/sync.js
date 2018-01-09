import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';

export default BaseListView.extend({
    name: 'sync',
    data() {
        return {
            viewRule: [
                {columnKey: 'type', label: '同步类型', minWidth: 80, sortable: true},
                {columnKey: 'status', label: '激活状态', formatter: r => {
                    if (r.status === 1) return '已激活';
                    if (r.status === 0) return '未激活';
                }},
                {columnKey: 'version', label: '同步版本', minWidth: 170},
                {columnKey: 'createTime', label: '同步时间', minWidth: 190, sortable: true},
            ],
            listDataGetter: function() {
                return this.logs.synchLogPage;
            },
            pageActionSearch: [{
                column: 'type', label: '请输入激活码', type: 'option', value: '', options: [
                    {value: 1, label: '歌曲歌星数据'},
                    {value: 2, label: '榜单'},
                    {value: 3, label: '分类'},
                    {value: 4, label: '推荐'},
                    {value: 5, label: '增量图片'},
                ]
            }],
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

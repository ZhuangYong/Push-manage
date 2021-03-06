import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {upLogUpload} from "../../api/logs";

export default BaseListView.extend({
    name: 'upload',
    data() {
        return {
            viewRule: [
                {columnKey: 'dataStr', label: '数据串', minWidth: 280},
                {columnKey: 'uploadTime', label: '上报时间', minWidth: 170, sortable: true},
                {columnKey: 'state', label: '上报状态', formatter: r => {
                    if (r.state === 1) return '未上报';
                    if (r.state === 2) return '已上报';
                }},
            ],
            listDataGetter: function() {
                return this.logs.uploadLogPage;
            },
            pageActionSearch: [
                {
                    column: 'state', label: '请选择是否上报', type: 'option', value: '', options: [
                        {value: 1, label: '未上报'},
                        {value: 2, label: '已上报'},
                    ]
                },
            ],
            pageAction: 'logs/upload/RefreshPage',
            tableCanSelect: true
        };
    },

    computed: {
        ...mapGetters(['logs'])
    },

    methods: {
        topButtonHtml: function (h) {
            return <div class="filter-container table-top-button-container">
                <el-button class="filter-item" disabled={!this.selectItems.length} onClick={f => {
                    this.submitLoading = true;
                    upLogUpload({ids: this.selectItems.map(i => i.id)}).then(res => {
                        this.submitLoading = false;
                        this.$message({
                            message: "操作成功！",
                            type: "success"
                        });
                        this.refreshTable();
                    }).catch(e => this.submitLoading = false);
                }}>
                    数据上报
                </el-button>
            </div>;
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },
    }
});

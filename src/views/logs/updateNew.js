import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {upTextUpload} from "../../api/logs";

export default BaseListView.extend({
    name: 'upload',
    data() {
        return {
            viewRule: [
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 280},
                {columnKey: 'uploadTime', label: '上报时间', minWidth: 170, sortable: true},
                {columnKey: 'url', label: '文件路径', minWidth: 120, sortable: true},
                {columnKey: 'status', label: '上报状态', formatter: r => {
                    if (r.status === 1) return '未上报';
                    if (r.status === 2) return '已上报';
                }},
            ],
            listDataGetter: function() {
                return this.logs.uploadNewLogPage;
            },
            pageActionSearch: [
                {
                    column: 'status', label: '请选择是否上报', type: 'option', value: '', options: [
                        {value: 2, label: '已上报'},
                        {value: 1, label: '未上报'},
                    ]
                },
            ],
            pageAction: 'logs/upload/new/RefreshPage',
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
                    upTextUpload({ids: this.selectItems.map(i => i.id)}).then(res => {
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

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {activateDayList} from "../../api/activate";

export default BaseListView.extend({
    name: 'activateIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'activateCode', label: '激活码', minWidth: 190},
                {columnKey: 'days', label: '时间', formatter: r => r.days + '天', sortable: true},
                {columnKey: 'avaTime', label: '激活码有效时间', minWidth: 170, sortable: true},
                {columnKey: 'deviceUuid', label: '设备编号', minWidth: 190},
                {columnKey: 'useTime', label: '使用时间', minWidth: 170, sortable: true},
                // {columnKey: 'orderCode', label: '订单号'},
                // 1 未使用 2 已使用 3 待处理（雷石使用了，数据库没修改情况）
                {columnKey: 'status', label: '状态', formatter: r => {
                    if (r.status === 1) return '未使用';
                    if (r.status === 2) return '已使用';
                    if (r.status === 3) return '待处理';
                }}
            ],
            listDataGetter: function() {
                return this.activate.activatePage;
            },
            pageActionSearch: [
                {column: 'activateCode', label: '请输入激活码', type: 'input', value: ''},
                {column: 'deviceId', label: '请输入设备编号', type: 'input', value: ''},
                {column: 'status', label: '请选择使用状态', type: 'option', value: '', options: [
                    {value: 1, label: '未使用'},
                    {value: 2, label: '已使用'},
                    {value: 3, label: '待处理'},
                ]},
                {column: 'days', label: '请选择有效时间', type: 'option', value: '', options: []}
            ],
            pageAction: 'activate/RefreshPage',
            tableCanSelect: false,
        };
    },
    computed: {
        ...mapGetters(['activate'])
    },

    created() {
        this.getActivateDays();
    },

    methods: {
        topButtonHtml() {
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button class="filter-item" onClick={this.getActivateCode} type="primary">获取激活码
                    </el-button>
                </div> : ""
            );
        },
        getActivateCode() {
            this.submitLoading = true;
            this.$store.dispatch('activate/code/list', {type: 2}).then((res) => {
                this.refreshTable();
                this.submitLoading = false;
            }).catch(e => this.submitLoading = false);
        },

        getActivateDays() {
            this.loading = true;
            activateDayList().then(r => {
                this.pageActionSearch[3].options = r.map(d => {
                    return {value: d, label: d};
                });
                this.$refs.Vtable.handelActionSearchChange();
                this.loading = false;
            }).catch(e => this.loading = false);
        }
    }
});

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {activateAll, activateDayList} from "../../api/activate";
import Const from "../../utils/const";

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
                {column: 'days', label: '请选择有效时间', type: 'option', value: '', options: []},
                {column: 'expireAfter,expireBefore', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption}
            ],
            pageAction: 'activate/RefreshPage',
            tableCanSelect: true,
            activateCodesStatus: '1',
            refreshStatusErrorCounts: 0,
            nextRefreshStatus: true,
            isAbleClickActivateAll: true,
        };
    },
    computed: {
        ...mapGetters(['activate'])
    },

    created() {
        this.getActivateDays();
        this.refreshUpdateMigrationStatus();
    },

    beforeDestroy() {
        this.nextRefreshStatus = false;
    },

    watch: {
        activateCodesStatus: function (v, ov) {
            if (parseInt(v, 10) === 1) {
                // this.refreshPage();
                this.isAbleClickActivateAll = true;
                this.$message.success('激活成功');
            }
        }
    },

    methods: {
        topButtonHtml(h) {
            const isAbleClickActivateAll = this.activateCodesStatus === '1' ? this.isAbleClickActivateAll : false;
            return (
                this.currentPage === this.PAGE_LIST ? <div class="filter-container table-top-button-container">
                    <el-button onClick={this.getActivateCode} type="primary">获取激活码</el-button>
                    <el-button onClick={() => {
                        if (this.selectItems.length <= 0) {
                            this.$message.error('请选择激活项！');
                            return;
                        }
                        this.isAbleClickActivateAll = false;
                        // console.log(this.selectItems);
                        let codes = [];
                        this.selectItems.map(selectItem => codes.push(selectItem.activateCode));
                        const params = {
                            activateCode: codes.join(','),
                        };
                        activateAll(params).then(res => {
                        }).catch(err => {
                            this.isAbleClickActivateAll = true;
                        });
                    }} disabled={!isAbleClickActivateAll} type="primary">批量激活</el-button>
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
        },

        /**
         * 递归刷新迁移状态
         */
        refreshUpdateMigrationStatus() {
            const params = {
                confName: 'activateCodesStatus',
            };
            this.$store.dispatch('config/status', params).then(res => {
                this.activateCodesStatus = res.activateCodesStatus;
                if (this.nextRefreshStatus) {
                    this.refreshStatusErrorCounts = 0;
                    setTimeout(this.refreshUpdateMigrationStatus, 1000);
                }
            }).catch(err => {
                if (this.refreshStatusErrorCounts <= 3) {
                    this.refreshStatusErrorCounts += 1;
                    if (this.nextRefreshStatus) setTimeout(this.refreshUpdateMigrationStatus, 1000);
                }
            });
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

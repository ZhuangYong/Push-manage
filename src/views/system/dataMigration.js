/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {doMigrate, migrateChannels, updateMigrate} from "../../api/dataMigration";

const defaultData = {
    viewRule: [
        {columnKey: 'deviceId', label: '设备号', minWidth: 200, sortable: true},
        {columnKey: 'mac', label: 'mac地址', minWidth: 180, sortable: true},
        {columnKey: 'status', label: '迁移状态', formatter: r => {
            switch (r.status) {
                case 1:
                    return '未同步';
                case 2:
                    return '已同步';
                case 3:
                    return '同步中';
                default:
                    return '未同步';
            }
        }},
        {columnKey: 'updateName', label: '更新者', minWidth: 180, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 180},
        {columnKey: 'createName', label: '创建者', minWidth: 180, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 180},
    ],
    tableCanSelect: true,
    rowCanSelect: (row, index) => {
        return parseInt(row.status, 10) !== 3;
    },
    defaultFormData: {},
    enableDefaultCurrentPage: true,
    listDataGetter: function() {
        return this.system.migratePage;
    },
    pageActionSearch: [
        {
            // 1-未同步 2-已同步 3-同步中 查询全部就不传status
            column: 'status', label: '请选择类型', type: 'option', value: '', options: [
            {value: 1, label: '未同步'},
            {value: 2, label: '已同步'},
            {value: 3, label: '同步中'},
        ]
        },
        {column: 'deviceId', label: '请输入设备号', type: 'input', value: ''},
        {column: 'code', label: '请选择机型', type: 'option', value: '', options: []},
    ],
    pageAction: 'dataMigration/RefreshPage'
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearchColumn: [],
            pageActionSearch: _defaultData.pageActionSearch,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            rowCanSelect: _defaultData.rowCanSelect,
            pageAction: _defaultData.pageAction,
            nextRefreshStatus: true,
            refreshStatusErrorCounts: 0,
            migrateFlag: '2',
            isAbleClickUpdateMigrate: true,
        };
    },

    mounted() {
        this.updateView();
        this.refreshUpdateMigrationStatus();
        this.refreshChannel();
    },

    beforeDestroy() {
        this.nextRefreshStatus = false;
        this.pageActionSearch[2].options = [];
    },

    watch: {
        migrateFlag: function (v, ov) {
            if (parseInt(v, 10) === 2) {
                this.refreshPage();
                this.isAbleClickUpdateMigrate = true;
            }
        }
    },

    computed: {
        ...mapGetters(['system'])
    },

    methods: {

        /**
         * 刷新机型列表
         */
        refreshChannel() {
            migrateChannels().then(res => {
                // console.log(res);
                res.map(item => {
                    const {code, name} = item;
                    this.pageActionSearch[2].options.push({value: code, label: name});
                });
            }).catch(err => {});
        },

        /**
         * 递归刷新迁移状态
         */
        refreshUpdateMigrationStatus() {
            const params = {
                confName: 'migrateFlag',
            };
            this.$store.dispatch('config/status', params).then(res => {
                this.migrateFlag = res.migrateFlag;
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

        refreshPage() {
            this.loading = true;
            this.$store.dispatch(this.pageAction).then((res) => {
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return '';
        },

        topButtonHtml: function (h) {

            const isAbleClickUpdateMigrate = this.migrateFlag === '2' ? this.isAbleClickUpdateMigrate : false;
            return <div class="filter-container table-top-button-container">
                <el-button type="primary"
                   loading={!isAbleClickUpdateMigrate}
                   onClick={f => {
                        this.isAbleClickUpdateMigrate = false;
                        this.clickUpdateMigrate();
                    }}>{isAbleClickUpdateMigrate ? '更新迁移数据' : '更新迁移数据中。。。'}</el-button>

                <el-button type="primary" onClick={f => {
                    let ids = [];
                    this.selectItems.map(selectItem => ids.push(selectItem.id));
                    // console.log(ids);
                    const params = {ids: ids.join(',')};
                    this.clickDoMigrate(params)
                    ;
                }}>批量迁移</el-button>
            </div>;
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 数据迁移列表更新
         */
        clickUpdateMigrate() {

            // this.submitLoading = true;
            updateMigrate().then(res => {
                // this.submitLoading = false;
                // this.refreshPage();
            }).catch(err => {
                this.isAbleClickUpdateMigrate = true;
                // this.submitLoading = false;
            });
        },

        clickDoMigrate(params) {

            this.dialogVisible = true;
            this.tipTxt = '确定要进行批量迁移吗？';
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                this.submitLoading = true;
                doMigrate(params).then(res => {
                    this.submitLoading = false;
                    this.refreshPage();
                    this.$message({
                        message: "操作成功",
                        type: "success"
                    });
                }).catch(err => {
                    this.submitLoading = false;
                });
            };
        },

    }
});

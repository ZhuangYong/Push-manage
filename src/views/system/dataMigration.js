/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {soundDelete, soundDisable} from "../../api/recordManage";
import {doMigrate, updateMigrate} from "../../api/dataMigration";

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
                default:
                    return '未同步';
            }
        }},
        {columnKey: 'updateName', label: '更新者', minWidth: 180, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 180, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 180, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 180, inDetail: true},
    ],
    tableCanSelect: true,
    defaultFormData: {},
    enableDefaultCurrentPage: true,
    listDataGetter: function() {
        return this.system.migratePage;
    },
    pageActionSearch: [
        {
            // 1-未同步 2-已同步 查询全部就不传status
            column: 'status', label: '请选择类型', type: 'option', value: '', options: [
            {value: 1, label: '未同步'},
            {value: 2, label: '已同步'},
        ]
        },
        {column: 'deviceId', label: '请输入设备号', type: 'input', value: ''},
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
            pageAction: _defaultData.pageAction,
        };
    },

    computed: {
        ...mapGetters(['system'])
    },

    methods: {

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
            return <div class="filter-container table-top-button-container">
                <el-button type="primary" onClick={f => {
                    this.clickUpdateMigrate();
                }}>更新迁移数据</el-button>

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

            this.submitLoading = true;
            updateMigrate().then(res => {
                this.submitLoading = false;
                this.refreshPage();
            }).catch(err => {
                this.submitLoading = false;
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

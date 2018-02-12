import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from '../../utils/index';
import {
    systemRedisClearAllCache, systemRedisClearCache, systemRedisDeleteAndCreateIndex, systemRedisGetCacheDownloadUrl,
    systemRedisSaveCache
} from "../../api/cacheManage";

const defaultData = {
    viewRule: [
        {columnKey: 'key', label: '缓存KEY名', minWidth: 140, sortable: true},
        {columnKey: 'objectNum', label: '对象数', minWidth: 140, sortable: true},
        {columnKey: 'survivalTime', label: '剩余存活时间', minWidth: 140, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '清空', type: 'clearCache'}], minWidth: 144}
    ],
    tableCanSelect: false,
    pagination: false,
    defaultFormData: {
        key: "",
        survivalTime: -1
    },
    listDataGetter: function() {
        return {
            data: this.system.systemRedisList.keyPair
        };
    },
    pageActionSearch: [],
    pageActionSearchColumn: [],
    pageAction: 'systemRedisList/RefreshPage'
};

const validRules = {
    survivalTime: [
        {required: true, message: '剩余生存时间不能为空', trigger: 'blur'}
    ]
};


const topViewRule = [
    {columnKey: 'connectedClients', label: '客户端连接数', minWidth: 140},
    {columnKey: 'usedMemoryHuman', label: '内存总占用', minWidth: 140},
    {columnKey: 'memFragmentationRatio', label: '内存碎片率', minWidth: 140},
    {columnKey: 'totalConnectionsReceived', label: '总连接数', minWidth: 140},
    {columnKey: 'totalCommandsProcessed', label: '总命令执行数', minWidth: 140},
    {columnKey: 'keyspaceHits', label: '键命中数', minWidth: 140},
    {columnKey: 'keyspaceMisses', label: '键MISS数', minWidth: 140},
];

const topViewRuleKeySpace = [
    {columnKey: 'dbNumber', label: '数据库编号', minWidth: 140},
    {columnKey: 'value', label: '值', minWidth: 140},
];

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            formData: _defaultData.defaultFormData,
            pagination: _defaultData.pagination,
            loading: false,
            submitLoading: false,
            rules: validRules,
            searchDownloadUrl: '',
        };
    },
    computed: {
        ...mapGetters(['system'])
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                            ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                <el-form-item label="剩余生存时间" prop="survivalTime">
                    <el-input value={this.formData.survivalTime} name='survivalTime' placeholder="请输入剩余生存时间"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.goPage(this.PAGE_LIST);
                        }
                    }>取消
                    </el-button>
                </el-form-item>
            </el-form>;
        },

        topButtonHtml: function(h) {
            return (
                this.currentPage === this.PAGE_LIST ? <div>
                    <el-button class="table-top-item" onClick={this.deleteAndCreateIndex} type="primary">重建es搜索索引</el-button>
                    <el-button class="table-top-item" onClick={this.clearAllCache} type="primary">清空所有缓存</el-button>
                    <el-input class="table-top-item" value={this.searchDownloadUrl} name='searchDownloadUrl' placeholder="歌曲id（serialNo）" onChange={v => this.searchDownloadUrl = v}/>
                    <el-button class="table-top-item" onClick={this.fnSearchDownloadUrl} type="primary">查询下载地址</el-button>
                    <div style={{width: '100%', height: "2rem"}} />

                    {this.cacheTableHtml(h, [this.system.systemRedisList], topViewRule)}
                    <div style={{width: '100%', height: "2rem"}} />
                    {this.cacheTableHtml(h, this.system.systemRedisList.keyspace, topViewRuleKeySpace)}
                    <div style={{width: '100%', height: "2rem"}} />
                </div> : ""
            );
        },

        /**
         * 返回表格HTML代码段
         * @param h
         * @param data
         * @param viewRule
         * @returns {XML}
         */
        cacheTableHtml(h, data, viewRule) {
            return <div class="table" style="inline;">
                <el-table
                    border
                    data={data}
                    v-loading={this.loading}
                    filter-multiple={this['filter-multiple']}
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%">

                    {
                        viewRule && viewRule.map((viewRuleItem) => (
                            <el-table-column
                                key={this.pageAction + viewRuleItem.columnKey}
                                prop={viewRuleItem.columnKey}
                                sortable={!!viewRuleItem.sortable}
                                scope="scope"
                                label={viewRuleItem.label || viewRuleItem.columnKey}
                                width={viewRuleItem.width || ''}
                                min-width={viewRuleItem.minWidth || 100}
                                fixed={viewRuleItem.fixed || false}
                                formatter={viewRuleItem.buttons ? (row) => {
                                    return (
                                        viewRuleItem.buttons.map(button => (
                                            (!button.condition || (typeof button.condition === "function" && button.condition(row))) && <el-button
                                                size="mini"
                                                type={(button.type === "edit" && "success") || (button.type === "del" && "danger") || (button.type === "auth" && "plain") || "primary"}
                                                onClick={
                                                    () => {
                                                        this.$emit(button.type, row);

                                                    }
                                                }>{button.label}</el-button>
                                        ))
                                    );
                                } : (viewRuleItem.formatter ? (row) => {
                                    return viewRuleItem.formatter(row, h);
                                } : (viewRuleItem.imgColumn ? (row) => {
                                    const _img = typeof viewRuleItem.imgColumn === "function" ? viewRuleItem.imgColumn(row) : row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                    if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px;"/>);
                                    return '';
                                } : null))}>
                            </el-table-column>
                        ))
                    }
                </el-table>
            </div>;
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            console.log(this.formData);
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;

                    systemRedisSaveCache(this.formData).then(res => {
                        this.$message({
                            message: "操作成功",
                            type: "success"
                        });
                        this.submitLoading = false;
                        this.goPage(this.PAGE_LIST);
                    }).catch(err => {
                        this.submitLoading = false;
                        this.$message.error(`操作失败(${typeof err === 'string' ? err : '网络错误或服务器错误'})！`);
                    });
                } else {
                    return false;
                }
            });
        },

        /**
         * 查询下载地址
         */
        fnSearchDownloadUrl() {
            console.log(this.searchDownloadUrl);
            const searchDownloadUrl = this.searchDownloadUrl;
            if (searchDownloadUrl.length > 0) {
                this.submitLoading = true;
                const params = {
                    serialNo: searchDownloadUrl,
                };
                systemRedisGetCacheDownloadUrl(params).then(res => {
                    this.submitLoading = false;
                    this.dialogVisible = true;
                    this.tipTxt = res;
                    this.sureCallbacks = () => this.dialogVisible = false;
                }).catch(err => {
                    this.submitLoading = false;
                });
            } else {
                this.$message({
                    message: "请输入正确的歌曲id！",
                    type: "error"
                });
            }
        },

        /**
         * 清空缓存
         * @param row
         */
        handelClearCache(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要清除此条缓存吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                systemRedisClearCache({key: row.key}).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "操作成功！",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        /**
         * 重建es搜索索引
         */
        deleteAndCreateIndex() {
            this.dialogVisible = true;
            this.tipTxt = "确定要重建es搜索索引吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                systemRedisDeleteAndCreateIndex().then(response => {
                    this.loading = false;
                    this.$message({
                        message: "操作成功！",
                        type: "success"
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },

        /**
         * 清空所有缓存
         */
        clearAllCache() {
            this.dialogVisible = true;
            this.tipTxt = "确定要清除所有缓存吗？";
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                systemRedisClearAllCache().then(response => {
                    this.loading = false;
                    this.$message({
                        message: "操作成功！",
                        type: "success"
                    });
                    this.$refs.Vtable.refreshData({
                        currentPage: this.defaultCurrentPage
                    });
                }).catch(err => {
                    this.loading = false;
                });
            };
        },
    }
});

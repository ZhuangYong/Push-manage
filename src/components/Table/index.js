export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            loading: false
        };
    },
    computed: {},
    created: function () {
        this.refreshData({
            currentPage: this.currentPage
        });
    },
    render: function (h) {
        return (
            <div class="table">
                <el-table
                    border
                    data={this.data.data}
                    v-loading={this.loading}
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    onSelection-change={this.handleSelectionChange}>
                    {
                        this.select && <el-table-column type="selection" width="55"/>
                    }
                    {
                        this.viewRule && this.viewRule.map((viewRuleItem) => (
                            <el-table-column
                                prop={viewRuleItem.columnKey}
                                label={viewRuleItem.label || viewRuleItem.columnKey}
                                width={viewRuleItem.width || ''}
                                min-width={viewRuleItem.minWidth || 100}
                                formatter={viewRuleItem.buttons ? (row) => {
                                    return (
                                        viewRuleItem.buttons.map(button => (
                                            <el-button
                                                size="mini"
                                                type={(button.type === "edit" && "success") || (button.type === "del" && "danger")}
                                                onClick={
                                                    () => {
                                                        switch (button.type) {
                                                            case "edit":
                                                                this.edit(row);
                                                                break;
                                                            default:
                                                        }
                                                    }
                                                }>{button.label}</el-button>
                                        ))
                                    );
                                } : null}>
                                <template scope="scope"/>
                            </el-table-column>
                        ))
                    }
                </el-table>
                <div style="margin-top: 20px">
                    <el-pagination
                    onSize-change={this.handlePageSizeChange}
                    onCurrent-change={this.handleCurrentPageChange}
                    current-page={this.currentPage}
                    page-sizes={[2, 10, 50, 100, 400]}
                    page-size={this.data.pageSize}
                    layout="total, sizes, prev, pager, next, jumper"
                    total={this.data.totalRow}>
                </el-pagination>
                </div>
            </div>
        );
    },
    methods: {
        refreshData: function (param) {
            this.loading = true;
            this.$store.dispatch(this.pageAction, param).then((res) => {
                const {currentPage} = res;
                this.currentPage = currentPage;
                this.loading = false;
            }).catch((err) => {
                this.loading = false;
            });
        },
        edit: function (data) {
            this.$router.push({path: `/detail`, name: 'detail', params: { id: data.id }});
        },
        handlePageSizeChange: function (size) {
            this.refreshData({
                pageSize: size,
                currentPage: this.currentPage
            });
        },
        handleCurrentPageChange: function (page, a, b) {
            if (this.currentPage !== page) {
                this.refreshData({
                    currentPage: page
                });
            } else {
                this.currentPage = page;
            }
        }
    },
    props: {
        pageAction: {
            type: String
        },
        data: {
            type: Object
        },
        viewRule: {
            type: Array
        },
        select: {
            type: Boolean
        },
        handleSelectionChange: {
            type: Function
        }
    }
};

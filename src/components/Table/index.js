export default {
    data() {
        return {
            currentPage: this.defaultCurrentPage || 1,
            pageSize: 10,
            loading: false,
            selectItems: [],
            hoverItem: {}
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
                    onSelection-change={this.onSelectionChange}
                    onCell-mouse-enter={(row) => {
                        this.hoverItem = row;
                    }}>
                    {
                        this.select && <el-table-column type="selection" width="55"/>
                    }
                    {
                        this.viewRule && this.viewRule.map((viewRuleItem) => (
                            <el-table-column
                                prop={viewRuleItem.columnKey}
                                scope="scope"
                                label={viewRuleItem.label || viewRuleItem.columnKey}
                                width={viewRuleItem.width || ''}
                                min-width={viewRuleItem.minWidth || 100}
                                fixed={viewRuleItem.fixed || false}
                                formatter={viewRuleItem.buttons ? (row) => {
                                    return (
                                        viewRuleItem.buttons.map(button => (
                                            <el-button
                                                size="mini"
                                                type={(button.type === "edit" && "success") || (button.type === "del" && "danger") || (button.type === "auth" && "plain")}
                                                onClick={
                                                    () => {
                                                        this.$emit(button.type, this.hoverItem);
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
                this.$emit('pageChange', currentPage);
            }).catch((err) => {
                this.loading = false;
            });
        },
        handlePageSizeChange: function (size) {
            this.refreshData({
                pageSize: size,
                currentPage: this.currentPage
            });
        },
        handleCurrentPageChange: function (page) {
            if (this.currentPage !== page) {
                this.refreshData({
                    currentPage: page
                });
            } else {
                this.currentPage = page;
            }
        },
        onSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
            this.handleSelectionChange && this.handleSelectionChange(selectedItems);
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
        defaultCurrentPage: {
            type: Number
        },
        handleSelectionChange: {
            type: Function
        }
    }
};

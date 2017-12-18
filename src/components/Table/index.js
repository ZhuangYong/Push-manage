export default {
    name: 'listTable',
    data() {
        return {
            currentPage: this.defaultCurrentPage || 1,
            pageSize: 10,
            loading: false,
            selectItems: [],
            tempSearchColumn: [],
            searched: false,
            orderBy: {}
        };
    },
    computed: {},
    watch: {
        pageAction: function () {
            this.handelSearchColumn();
            this.currentPage = this.defaultCurrentPage || 1;
            this.pageAction && this.refreshData({
                currentPage: this.currentPage
            });
        },
        pageActionSearch: function () {
            this.handelSearchColumn();
        }
    },
    created: function () {
        this.pageAction && this.refreshData({
            currentPage: this.currentPage
        });
        this.refreshTable();
    },
    updated: function () {
        this.refreshTable();
    },
    render: function (h) {
        return (
            <div class="table" style="inline;">
                {
                    this.pageActionSearch && this.pageActionSearch.map(_data => {
                        let str = '';
                        let {column, label, type, value} = _data;
                        //if (value) this.pageActionSearchColumn[column] = value;
                        switch (type) {
                            case 'input':
                                str = <el-input value={value} placeholder={label} name={column} onChange={v => {
                                    _data.value = v;
                                    this.onChangePageActionSearch();
                                }} class="table-top-item"/>;
                                break;
                            default:
                                break;
                        }
                        return str;
                    })
                }
                {
                    (this.pageActionSearch && this.pageActionSearch.length > 0) && <el-button type="primary" icon="search" class="table-top-item" onClick={this.handelSearch}>搜索</el-button>
                }
                {
                    this.pageAction ? <el-table
                            border
                            data={this.data.data}
                            v-loading={this.loading}
                            filter-multiple={this['filter-multiple']}
                            ref="multipleTable"
                            tooltip-effect="dark"
                            style="width: 100%"
                            onSelection-change={this.onSelectionChange}>
                        {
                            this.select && <el-table-column type="selection" width="55"/>
                        }
                        {
                            this.viewRule && this.viewRule.map((viewRuleItem) => (
                                <el-table-column
                                    key={this.pageAction}
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
                                                <el-button
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
                                        const _img = row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                        if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px;"/>);
                                        return '';
                                    } : null))}>
                            </el-table-column>
                            ))
                        }
                    </el-table> : '请制定列表api'
                }

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

        /**
         * 刷新页面数据
         * @param param
         * @param pageAction
         */
        refreshData: function (param, pageAction) {
            const _pageAction = pageAction || this.pageAction;
            if (!_pageAction) return;
            this.loading = true;
            let _searchColumnData = {};
            this.tempSearchColumn.concat(this.pageActionSearchColumn).map(_data => {
                if (_data) {
                    const _column = Object.keys(_data)[0];
                    const _val = _data[_column];
                    if (typeof _val !== 'undefined' && _val !== "") {
                        _searchColumnData[_column] = _val;
                    }
                }
            });
            param = Object.assign(this.orderBy, param, _searchColumnData);
            this.$store.dispatch(_pageAction, param).then((res) => {
                const {currentPage} = res;
                this.currentPage = currentPage;
                this.loading = false;
                this.$emit('pageChange', currentPage);
            }).catch((err) => {
                this.loading = false;
            });
        },

        refreshTable() {
            if (this.$refs.multipleTable && !this.$refs.multipleTable.sortChange) {
                this.$refs.multipleTable.$on("sort-change", f => {
                    const {order, prop} = f;
                    if (prop) {
                        this.orderBy = {sort: prop, direction: order.replace("ending", "")};
                    } else this.orderBy = {};

                    this.pageAction && this.refreshData({
                        currentPage: this.currentPage
                    });
                });
                this.$refs.multipleTable.sortChange = true;
            }
        },

        /**
         * 处理每页size修改时候调用
         * @param size
         */
        handlePageSizeChange: function (size) {
            this.currentPage = 1;
            this.refreshData({
                pageSize: size,
                currentPage: 1
            });
        },

        /**
         * 当前页码改变的时候调用
         * @param page
         */
        handleCurrentPageChange: function (page) {
            if (this.currentPage !== page) {
                this.refreshData({
                    currentPage: page
                });
            } else {
                this.currentPage = page;
            }
        },

        handelSearch: function() {
            this.refreshData({
                currentPage: this.currentPage
            });
            this.handelSearchColumn();
            this.searched = true;
        },

        handelSearchColumn() {
            this.tempSearchColumn = [];
            this.pageActionSearch && this.pageActionSearch.map(_data => {
                const {column, value} = _data;
                let _item = {};
                _item[column] = value;
                this.tempSearchColumn.push(_item);
            });
        },

        /**
         * 选择的item修改的时候调用
         * @param selectedItems
         */
        onSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
            this.handleSelectionChange && this.handleSelectionChange(selectedItems);
        },

        onChangePageActionSearch: function () {
            let hasValue = false;
            this.pageActionSearch && this.pageActionSearch.map(_data => {
                const {value} = _data;
                if (value || value === 0) hasValue = true;
            });
            if (!this.searched) return;
            if (!hasValue) {
                this.pageAction && this.refreshData({
                    currentPage: this.currentPage
                });
                this.searched = false;
            }
        }
    },
    props: {
        pageAction: {
            type: String
        },
        pageActionSearchColumn: {
            type: Array
        },
        pageActionSearch: {
            type: Array,
            default: f => []
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
        sortable: {
            type: Boolean
        },
        'filter-multiple': {
            type: Boolean,
            default: true
        },
        defaultCurrentPage: {
            type: Number
        },
        handleSelectionChange: {
            type: Function
        }
    }
};

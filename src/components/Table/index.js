import Const from "../../utils/const";
import imageViewer from "vue-image-viewer";
import "vue-image-viewer/lib/vue-image-viewer.css";
import VueSimpleAudio from "vue-simple-audio";

export default {
    name: 'listTable',
    data() {
        return {
            currentPage: this.defaultCurrentPage || 1,
            pageSize: 10,
            loading: [],
            selectItems: [],
            tempSearchColumn: [],
            handelSearchColumnForShow: [],
            searched: false,
            orderBy: {},
            tableImages: {},
            imageViewerParams: {
                visible: false,
                index: 0,
                page: 0,
                images: [
                    // {
                    //     name: "image1",
                    //     url: "/static/images/1.jpg"
                    // },
                ]
            },
            expandedRow: {},
            preRow: null,
            showAudio: false,
            songs: []
        };
    },
    components: {
        imageViewer,
        VueSimpleAudio
    },
    computed: {},
    watch: {
        pageAction: function () {
            this.handelActionSearchChange();
            this.currentPage = this.defaultCurrentPage || 1;
            this.pageAction && this.refreshData({
                currentPage: this.currentPage
            });
        },
        pageActionSearch: function () {
            this.handelActionSearchChange();
        },
        data: function () {
            this.checkLeike();
        },
    },
    created: function () {
        this.handelActionSearchChange();
        this.pageAction && this.refreshData({
            currentPage: this.currentPage
        });
        this.refreshTable();
    },
    updated: function () {
        this.refreshTable();
    },
    beforeDestroy() {
        if (this.updateFromLeikeTimer) {
            clearInterval(this.updateFromLeikeTimer);
            this.updateFromLeikeTimer = 0;
        }
    },
    render: function (h) {
        return (
            <div class="table" style="inline;">
                {
                    this.handelSearchColumnForShow && this.handelSearchColumnForShow.map(_data => {
                        let str = '';
                        let {column, label, type, value, options} = _data;
                        //if (value) this.pageActionSearchColumn[column] = value;
                        switch (type) {
                            case 'input':
                                str = <el-input value={value} placeholder={label} name={column} onChange={v => {
                                    _data.value = v;
                                    this.onChangePageActionSearch();
                                }} class="table-top-item">
                                    {
                                        _data.value ? <i slot="append" class="el-icon-circle-close" style="cursor: pointer" onClick={v => {
                                            _data.value = '';
                                            this.onChangePageActionSearch();
                                        }}/> : ""
                                    }
                                </el-input>;
                                break;
                            case 'option':
                                str = <el-select placeholder={label} value={value} name={column} onHandleOptionClick={f => {
                                    _data.value = f.value;
                                    this.handelSearch();
                                }} class="table-top-item">
                                    <el-option label={value || value === 0 || value === '0' ? "所有" : label} value="" key=""/>
                                    {
                                                options.map && options.map(u => (
                                                        <el-option label={u.label} value={u.value} key={u.value}/>
                                                    ))
                                            }
                                       </el-select>;
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
                            v-loading={this.loading.length > 0}
                            filter-multiple={this['filter-multiple']}
                            ref="multipleTable"
                            tooltip-effect="dark"
                            style="width: 100%"
                            onSelection-change={this.onSelectionChange}>
                        <el-table-column type="expand">
                            {
                                this.getDetails(h)
                            }
                        </el-table-column>
                        {
                            this.select && <el-table-column type="selection" width="55"/>
                        }
                        {
                            this.viewRule && this.viewRule.map((viewRuleItem) => (
                                !viewRuleItem.inDetail ? <el-table-column
                                    key={this.pageAction + viewRuleItem.label}
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
                                                        (e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            this.$emit(button.type, row);

                                                        }
                                                    }>{typeof button.label === "function" ? button.label(row) : button.label}</el-button>
                                            ))
                                        );
                                    } : (viewRuleItem.formatter ? (row) => {
                                        return viewRuleItem.formatter(row, h);
                                    } : (viewRuleItem.imgColumn ? (row) => {
                                        const _img = typeof viewRuleItem.imgColumn === "function" ? viewRuleItem.imgColumn(row) : row[viewRuleItem.imgColumn] || (row.tails && row.tails[viewRuleItem.imgColumn]);
                                        this.tableImages[_img] = true;
                                        if (_img) return (<img src={_img} style="height: 30px; margin-top: 6px; cursor: pointer;" onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            (this.imageViewerParams.images = [{url: _img}]) && (this.imageViewerParams.visible = true);
                                        }}/>);
                                        return '';
                                    } : (viewRuleItem.auditionColumn ? row => {
                                        return <div>
                                            <span style={{lineHeight: "30px"}}>{row[viewRuleItem.auditionColumn]}</span>
                                            <span style={{
                                                position: "relative",
                                                display: "inline-block",
                                                top: "3px",
                                                left: "3px",
                                                width: "20px",
                                                height: "20px",
                                                border: "1px solid #409EFF",
                                                borderRadius: "20px",
                                                cursor: "pointer"
                                            }} onClick={e => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                this.showAudio = true;
                                                this.songs = [{
                                                    url: row.musicUrl,
                                                    songname: row.nameNorm
                                                }];

                                            }}><span style={{
                                                position: "absolute",
                                                display: "inline-block",
                                                top: "50%",
                                                left: "50%",
                                                marginTop: "-6px",
                                                marginLeft: "-3px",
                                                width: 0,
                                                height: 0,
                                                borderTop: '6px solid transparent',
                                                borderLeft: '6px solid #409EFF',
                                                borderBottom: '6px solid transparent',
                                                boxSizing: "border-box"
                                            }} /></span>
                                        </div>;
                                    } : null)))}>
                            </el-table-column> : ""
                            ))
                        }
                    </el-table> : '请制定列表api'
                }
                {
                    this.pagination ? <div style="margin-top: 20px">
                            <el-pagination
                                onSize-change={this.handlePageSizeChange}
                                onCurrent-change={this.handleCurrentPageChange}
                                current-page={this.currentPage}
                                page-sizes={[2, 10, 50, 100, 400]}
                                page-size={this.data.pageSize}
                                layout="total, sizes, prev, pager, next, jumper"
                                total={this.data.totalRow}>
                        </el-pagination>
                    </div> : ''
                }
                <image-viewer images={this.imageViewerParams.images}
                index={this.imageViewerParams.index}
                visible={this.imageViewerParams.visible}
                page={this.imageViewerParams.page}
                onClose={f => this.imageViewerParams.visible = false}/>

                <el-dialog customClass="audioDialog" title="试听" visible={this.showAudio} onClose={() => this.showAudio = false}>
                    {this.showAudio && <VueSimpleAudio
                        style={{
                            margin: "10px auto",
                            width: "100%",
                            backgroundColor: "#324157",
                            transform: "none",
                            boxShadow: "none"
                        }}
                        songs={this.songs}
                        initial-volume="40"
                        loop
                        auto-play
                        repeat />}
                </el-dialog>
            </div>
        );
    },
    methods: {

        /**
         * 刷新页面数据
         * @param param
         * @param pageAction
         */
        refreshData: function (param, pageAction, hideLoading) {
            const _pageAction = pageAction || this.pageAction;
            if (!_pageAction) return;
            const randomNum = !hideLoading ? Math.random() : "";
            if (randomNum) this.loading.push(randomNum);
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
            param = Object.assign({}, this.orderBy, param, _searchColumnData);
            this.searched = !!Object.keys(_searchColumnData).length;
            this.$store.dispatch(_pageAction, param).then((res) => {
                const {currentPage} = res;
                this.currentPage = currentPage;
                this.loading = this.loading.filter(l => l !== randomNum);
                this.$emit('pageChange', currentPage);
            }).catch((err) => {
                this.loading = this.loading.filter(l => l !== randomNum);
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

                this.$refs.multipleTable.$on("cell-click", row => {
                    if (this.preRow === row) {
                        const opened = !!this.$refs.multipleTable.opened;
                        this.$refs.multipleTable.toggleRowExpansion(row, !opened);
                        this.$refs.multipleTable.opened = !opened;
                        return;
                    }
                    if (this.preRow) {
                        this.$refs.multipleTable.toggleRowExpansion(this.preRow, false);
                        this.$refs.multipleTable.toggleRowExpansion(row, true);
                    } else {
                        this.$refs.multipleTable.toggleRowExpansion(row, true);
                    }
                    this.$refs.multipleTable.opened = true;
                    this.preRow = row;
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
            this.handelSearchColumnForShowChange();
            this.refreshData({
                currentPage: this.currentPage
            });
        },

        /**
         * 搜索条件改变的时候
         */
        handelActionSearchChange() {
            this.tempSearchColumn = [];
            this.handelSearchColumnForShow = [];
            this.pageActionSearch && this.pageActionSearch.map(_data => {
                const {column, value} = _data;
                let _item = {};
                _item[column] = value;
                this.handelSearchColumnForShow.push(Object.assign({}, _data));
                this.tempSearchColumn.push(_item);
            });
        },

        /**
         * 显示的查询条件值修改的时候调用
         */
        handelSearchColumnForShowChange: function () {
            this.tempSearchColumn = [];
            this.handelSearchColumnForShow && this.handelSearchColumnForShow.map(_data => {
                this.pageActionSearch && this.pageActionSearch.map(__data => {
                    const {column, value} = _data;
                    const column1 = __data.column;
                    if (column === column1) __data.value = value;
                    let _item = {};
                    _item[column] = value;
                    this.tempSearchColumn.push(_item);
                });
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

        /**
         * 表单的action url修改的时候调用
         */
        onChangePageActionSearch: function () {
            let hasValue = false;
            this.handelSearchColumnForShow && this.handelSearchColumnForShow.map(_data => {
                const {value} = _data;
                if (value || value === 0) hasValue = true;
            });
            if (!this.searched) return;
            if (!hasValue) {
                this.pageActionSearch && this.pageActionSearch.map(_data => {
                    _data.value = _data.defaultValue;
                });
                this.handelSearchColumnForShow && this.handelSearchColumnForShow.map(_data => {
                    _data.value = _data.defaultValue;
                });
                this.tempSearchColumn = [];
                this.pageAction && this.refreshData({
                    currentPage: this.currentPage
                });
                this.searched = false;
            }
        },

        /**
         * 检查从雷客更新的数据情况
         */
        checkLeike: function () {
            if (!this.data || !this.data.config) return;
            const {isLeike, confValue} = this.data.config;
            if (confValue === 0 || confValue === Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING) {
                if (!this.updateFromLeikeTimer) this.updateFromLeikeTimer = setInterval(f => {
                    if (this.data.config.confValue !== Const.STATUS_UPDATE_DATE_FROM_LEIKE_UPDATE_ING) {
                        this.updateFromLeikeTimer && clearInterval(this.updateFromLeikeTimer);
                        this.updateFromLeikeTimer = 0;
                        this.$message({
                            message: `从雷客更新${this.dataName}数据成功`,
                            type: "success"
                        });
                    } else {
                        this.pageAction && this.refreshData({
                            currentPage: this.currentPage
                        }, null, true);
                    }

                }, 5000);
            } else if (this.updateFromLeikeTimer) {
                this.$message({
                    message: `从雷客更新${this.dataName}数据成功`,
                    type: "success"
                });
                clearInterval(this.updateFromLeikeTimer);
                this.updateFromLeikeTimer = 0;
            }
        },

        getDetails: function (h) {
            const row = this.preRow;
            if (!row) return "";
            const detailContent = (ruleItem) => {
                const {formatter, imgColumn, auditionColumn, columnKey} = ruleItem;
                if (typeof formatter === "function") return formatter(row, h) || " ";
                if (imgColumn) {
                    const _img = typeof imgColumn === "function" ? imgColumn(row) : row[imgColumn] || (row.tails && row.tails[imgColumn]);
                    let showImgs;
                    if (_img && _img.map) {
                        showImgs = _img.map(subImg => {
                            return {url: subImg};
                        });
                    } else {
                        showImgs = [{url: _img}];
                    }
                    this.tableImages[_img] = true;
                    return (<img src={showImgs[0].url} v-show={showImgs[0].url} style="height: 30px; margin-top: 6px; cursor: pointer;" onClick={f => (this.imageViewerParams.images = showImgs) && (this.imageViewerParams.visible = true)}/>);
                }
                if (auditionColumn) {
                    return row[auditionColumn] || " ";
                }
                return row[columnKey] || " ";
            };
            return (
                <form class="el-form el-form--label-left el-form--inline" style="max-width: 1000px;" id={`detail-${Math.random()}`}>
                    {
                        (row && this.viewRule) && this.viewRule.map((viewRuleItem) => (
                            !viewRuleItem.buttons ? <div class= "el-form-item" style="margin-right: 0; margin-bottom: 0; width: 50%;">
                                <label class="el-form-item__label" style="min-width: 110px; color: #99a9bf;">{viewRuleItem.label}</label>
                                <div class="el-form-item__content">
                                    <span>
                                        {
                                            detailContent(viewRuleItem)
                                        }
                                    </span>
                                </div>
                            </div> : ""
                        ))
                    }
                </form>
            );
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
        dataName: {
            type: String
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
        pagination: {
            type: Boolean,
            default: true
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

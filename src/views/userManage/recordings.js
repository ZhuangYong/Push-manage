/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from "../../utils/index";
import {soundDelete, soundDisable} from "../../api/recordManage";

const defaultData = {
    viewRule: [
        {columnKey: 'openid', label: 'openid', minWidth: 120, formatter: (r, h) => {
            if (r.openid) return (<div><el-popover
                placement="top"
                width="100%"
                trigger="click"
                content={r.openid}>
                <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.openid}</div>
            </el-popover></div>);
            return '';
        }},
        {auditionColumn: 'nameNorm', label: '歌曲名称', minWidth: 180, sortable: true},
        {columnKey: 'deviceUuid', label: '设备号', minWidth: 200, sortable: true},
        {columnKey: 'isEnabled', label: '是否开启', formatter: r => {
            switch (r.isEnabled) {
                case 1:
                    return '是';
                case 2:
                    return '否';
                default:
                    return '否';
            }
        }},
        {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 200, sortable: true},
        {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 160, sortable: true},
        {columnKey: 'createTime', label: '录音时间', minWidth: 180, sortable: true},
        {label: '操作', buttons: [{label: '下载', type: 'download'}, {label: '禁用/开启', type: 'ban'}], minWidth: 250}
    ],

    tableCanSelect: false,

    defaultFormData: {
        id: null,
        name: '',
        channelCode: null,
        info: ''

    },
    listDataGetter: function() {
        return this.recordManage.soundList;
    },
    pageActionSearch: [
        {column: 'nameNorm', label: '请输入歌曲名称', type: 'input', value: ''},
        {column: 'deviceUuid', label: '请输入设备号', type: 'input', value: ''},
        {column: 'nickName', label: '请输入昵称', type: 'input', value: ''},
        {column: 'openid', label: '请输入openId', type: 'input', value: ''},
    ],
    pageAction: 'soundList/RefreshPage'
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
            groupId: null
        };
    },

    computed: {
        ...mapGetters(['recordManage'])
    },

    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return '';
        },

        topButtonHtml: function (h) {
            return '';
        },

        /**
         * 获取选择列
         * @param selectedItems
         */
        handleSelectionChange: function (selectedItems) {
            this.selectItems = selectedItems;
        },

        /**
         * 删除列
         * @param row
         */
        submitDel(row) {
            this.dialogVisible = true;
            this.tipTxt = "确定要删除吗？";
            const menuId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                soundDelete(menuId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: "删除成功",
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
         * 禁用录音
         * @param row
         */
        banSound(row) {
            this.dialogVisible = true;
            this.tipTxt = row.isEnabled === 1 ? "确定要禁用吗？" : "确定开启吗？";
            const menuId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                soundDisable(menuId).then(response => {
                    this.loading = false;
                    this.$message({
                        message: row.isEnabled === 1 ? "禁用成功！" : "开启成功！",
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
         * 更新视图状态
         */
        updateView: function () {
            switch (this.currentPage) {
                case this.PAGE_LIST:
                    if (this.$refs.Vtable && !this.$refs.Vtable.handCustomEvent) {

                        this.$refs.Vtable.$on('ban', (row) => {
                            this.banSound(row);
                        });
                        // this.$refs.Vtable.$on('del', (row) => {
                        //     this.submitDel(row);
                        // });
                        this.$refs.Vtable.$on('download', (row) => { //下载
                            location.href = row.musicUrl;
                        });

                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            if (this.pageAction === defaultData.pageAction) {
                                this.defaultCurrentPage = defaultCurrentPage;
                            }
                        });
                        this.$refs.Vtable.handCustomEvent = true;
                    }
                    break;
                default:
                    break;
            }
        },
    }
});

import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from "../../utils/index";
import {del as albumDelete, disable as ablumDisable} from "../../api/album";

const defaultData = {
    viewRule: [
        {columnKey: 'id', label: '用户id', minWidth: 110, sortable: true},
        {columnKey: 'nickname', label: '微信昵称', minWidth: 140, sortable: true},
        {imgColumn: 'thumbnail', label: '图片缩略图', minWidth: 120, formatter: (r, h) => {
            if (r.thumbnail) return (<img src={r.thumbnail} style="height: 30px; margin-top: 6px;"/>);
            return '';
        }},
        {columnKey: 'createTime', label: '上传时间', minWidth: 170, sortable: true},
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
        {label: '操作', buttons: [{label: '删除', type: 'del'}, {label: '禁用/开启', type: 'ban'}], minWidth: 175}
    ],
    tableCanSelect: false,
    defaultFormData: {
        id: null,
        nickname: '',
        thumbnail: null
    },
    listDataGetter: function() {
        return this.userManage.albumPage;
    },
    pageActionSearch: [
        {column: 'id', label: '请输入用户id', type: 'input', value: ''},
        {column: 'nickname', label: '请输入用户昵称', type: 'input', value: ''},
        {column: 'nickName', label: '请输入昵称', type: 'input', value: ''},
        {column: 'openid', label: '请输入openId', type: 'input', value: ''},
    ],
    pageActionSearchColumn: [],
    pageAction: 'album/RefreshPage'
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            listStatus: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction
        };
    },

    computed: {
        ...mapGetters(['userManage'])
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
            const albumId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                albumDelete(albumId).then(response => {
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
            const albumId = row.id;
            this.sureCallbacks = () => {
                this.dialogVisible = false;
                ablumDisable(albumId).then(response => {
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
                        this.$refs.Vtable.$on('del', (row) => {
                            this.submitDel(row);
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

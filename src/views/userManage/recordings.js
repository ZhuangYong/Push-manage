/* eslint-disable no-undef */
import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {soundDelete, soundDisable} from "../../api/recordManage";

const PAGE_USER_LIIST = "userList";
const defaultData = {
    viewRule: [
        // {columnKey: 'openid', label: 'openid', minWidth: 120, formatter: (r, h) => {
        //     if (r.openid) return (<div><el-popover
        //         placement="top"
        //         width="100%"
        //         trigger="click"
        //         content={r.openid}>
        //         <div slot="reference" style="width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">{r.openid}</div>
        //     </el-popover></div>);
        //     return '';
        // }},
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
        // {imgColumn: 'headerImg', label: '登录设备录音微信头像', minWidth: 200, sortable: true},
        // {columnKey: 'nickName', label: '登录设备录音昵称', minWidth: 160, sortable: true},
        {columnKey: 'createTime', label: '录音时间', minWidth: 180, sortable: true},
        {label: '操作', buttons: [{label: '下载', type: 'download'}, {label: '禁用/开启', type: 'ban'}, {label: '用户', type: 'userList'}], minWidth: 250}
    ],
    tableCanSelect: false,
    defaultFormData: {
        id: null,
        name: '',
        channelCode: null,
        info: ''

    },
    enableDefaultCurrentPage: true,
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

const userListData = {
    viewRule: [
        {columnKey: 'openid', label: 'openId', minWidth: 90},
        {columnKey: 'nickName', label: '微信昵称', minWidth: 90},
        {columnKey: 'headerImg', label: '微信头像', minWidth: 90, imgColumn: "headerImg"},
        {columnKey: 'coverMap', label: '封面图', minWidth: 90, imgColumn: "coverMap"},
        {columnKey: 'coverMap', label: '轮播图', minWidth: 90, imgColumn: "carouselFigure", inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, sortable: true, inDetail: true},
    ],
    tableCanSelect: false,
    pageActionSearchColumn: [],
    pageActionSearch: [
        {column: 'nickname', label: '请输入微信昵称', type: 'input', value: ''},
        {column: 'openid', label: '请输入openId', type: 'input', value: ''},
    ],
    defaultFormData: {},
    enableDefaultCurrentPage: false,
    listDataGetter: function() {
        return this.recordManage.userList;
    },
    pageAction: 'soundList/userList/RefreshPage'
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
            return this.currentPage === PAGE_USER_LIIST ? <div class="filter-container table-top-button-container">
                <el-button type="primary" onClick={f => {
                    this.pageBack();
                    this.showList();
                }}>返回</el-button>
            </div> : '';
        },

        renderUserListHtml: function (h) {
            return this.tableHtml(h);
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
        handelBan(row) {
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

        handelUserList: function (row) {
            this.showList(row.id);
            this.goPage(PAGE_USER_LIIST);
        },

        handelDownload: function (row) {
            location.href = row.musicUrl;
        },

        getDataWhenShowListChange(choosePage, id) {
            return Object.assign({}, id ? userListData : defaultData);
        },

    }
});

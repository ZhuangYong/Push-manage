/**
 * Created by Zed on 2018/5/24.
 */
import {Component} from "vue-property-decorator";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";

@Component({name: 'ChannelPage'})
export default class ChannelPage extends BasePage {
    tableAction = 'channel/RefreshPage';
    defaultViewRule = [
        {columnKey: 'name', label: '机型名称', minWidth: 190, sortable: true},
        {columnKey: 'code', label: '机型值', minWidth: 120},
        {columnKey: 'isShare', label: '是否是共享', formatter: r => {
                if (r.isShare === 0) return '非共享';
                if (r.isShare === 1) return '共享';
                return '';
            }},
        // {columnKey: 'vipGroupName', label: '产品包名'},
        // {columnKey: 'image', label: '支付二维码背景图片', minWidth: 170, imgColumn: 'image'},
        {columnKey: 'payX', label: 'X轴', inDetail: true},
        {columnKey: 'payY', label: 'Y轴', inDetail: true},
        {columnKey: 'payW', label: '宽', inDetail: true},
        {columnKey: 'payH', label: '高', inDetail: true},
        // {columnKey: 'status', label: '状态', formatter: r => {
        //     if (r.status === 1) return '生效';
        //     if (r.status === 2) return '禁用';
        //     if (r.status === 3) return '删除';
        // }, inDetail: true},
        {columnKey: 'remark', label: '描述', minWidth: 170},
        {columnKey: 'updateName', label: '更新者', inDetail: true},
        {columnKey: 'updateTime', label: '更新日期', minWidth: 190, sortable: true},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
    ];
    operateViewRule = [];
    tableActionSearch = [
        {
            column: 'name', label: '请输入机型名称', type: 'input', value: ''
        },
        {
            column: 'isShare', label: '请选择是否共享', type: 'option', value: '', options: [
                {value: 0, label: '非共享'},
                {value: 1, label: '共享'},
            ]
        },
    ];

    @State(state => state.channel.channelPage) tableData;

    created() {
        this.viewRule = [...this.defaultViewRule, ...this.operateViewRule];
    }

    render(h) {
        return <div>
            {
                this.pageCanBack() ? <div class="filter-container table-top-button-container">
                    {
                        this.pageBackHtml(h)
                    }
                </div> : ""
            }
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }
}

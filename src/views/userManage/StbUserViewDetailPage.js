/**
 * Created by Zed on 2018/5/31.
 */
import {Component} from 'vue-property-decorator';
import BasePage from "../../components/common/BasePage";

@Component({
    name: 'StbUserViewDetailPage'
})
export default class StbUserViewDetailPage extends BasePage {

    tabActiveItemName = 'ViewDetailPage';
    isShowTable = true;

    tabItems = [
        {status: 'ViewDetailPage', label: '查看详情'},
        {status: 'LoginInfoPage', label: '用户登陆记录'},
        {status: 'DeviceBootPage', label: '设备开机日志'},
        {status: 'BindDeviceInfoPage', label: '绑定设备（微信点歌）'},
        {status: 'PayOrderingsPage', label: '支付记录'},
        {status: 'RecordingsPage', label: '设备录音数据'},
        {status: 'ActiveRecordingsPage', label: '激活码激活记录'},
        {status: 'MsgListPage', label: '消息列表'}
    ];

    created() {
        this.tableActionSearchColumn = [{urlJoin: this.formData.id}];
    }

    render(h) {
        return <div>
            {this.topButtonHtml(h)}
            {this.isShowTable ? this.tableHtml(h) : this.contentHtml(h)}
        </div>;
    }

    contentHtml(h) {
        return <div>
            请重写contentHtml(h)方法
        </div>;
    }

    topButtonHtml(h) {
        return <div>
            <el-button type="primary" onClick={f => {
                this.goPage('IndexPage');
            }}>返回</el-button>

            <el-tabs value={this.tabActiveItemName} onTab-click={this.tabsActive}>
                {this.tabItems.map((item) => (<el-tab-pane
                    name={item.status}
                    label={item.label}/>))}
            </el-tabs>
        </div>;
    }

    /**
     * tabs激活处理
     * @param e
     */
    tabsActive(e) {
        // this.listStatus = pages[e.index].status;
        this.goPage(this.tabItems[e.index].status, {formData: this.formData});
    }
}

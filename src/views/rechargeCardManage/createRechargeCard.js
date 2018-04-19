/**
 * Created by Zed on 2018/4/4.
 */
import {Component, Watch} from "vue-property-decorator";
import {State} from "vuex-class/lib/index";
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import Const from "../../utils/const";
import JPanel from "../../components/panel/JPanel";
import {getRechargeCardRestNum, rechargeCardExport, rechargeCardSave} from "../../api/rechargeCardManage";

@Component({name: 'createRechargeCard'})
export default class createRechargeCard extends BaseView {
    created() {
        this.initialPages([<IndexPage/>, <CreateCard/>, <CardDetail/>]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    tableAction = 'rechargeCard/record/RefreshPage';

    viewRule = [
        // {columnKey: 'firstToLast', label: '卡号段', minWidth: 120},
        {columnKey: 'number', label: '数量', minWidth: 120},
        {columnKey: 'createTime', label: '生成时间', minWidth: 170},
        {columnKey: 'channelNo', label: '控制码', minWidth: 170},
        {columnKey: 'batch', label: '批次', minWidth: 170},
        {columnKey: 'startTime', label: '有效期', minWidth: 170, formatter: (r, h) => {
            return r.startTime + ' - ' + r.endTime;
            }},
        {columnKey: 'vipName', label: '会员套餐', minWidth: 170},
        // {columnKey: 'remark', label: '备注', minWidth: 170},
        {label: '操作', buttons: [{label: '导出', type: 'export'}, {label: '详情', type: 'detail'}], minWidth: 168}
    ];

    tableActionSearch = [
        // {column: 'cardNo', label: '卡号', type: 'input', value: ''},
        {column: 'batch', label: '批次', type: 'input', value: ''},
        {column: 'startTime,endTime', label: '请输选择时间', type: 'daterange', value: '', option: Const.dataRangerOption},
        {column: 'vipDays', label: '会员套餐', type: 'option', value: '', options: []},
        {column: 'channelNo', label: '控制码', type: 'option', value: '', options: [{value: '0000', label: '0000'}]},
    ];

    @State(state => state.rechargeCardManage.rechargeCardRecordList) tableData;

    created() {
        this.refreshVIPAndChannel();
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={f => {
                this.goPage('CreateCard');
            }}>
                生成卡
            </el-button>
        </div>;
    }

    handelExport(row) {
        this.dialogVisible = true;
        this.tipTxt = "确定要导出吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            const params = {
                recordUuid: row.uuid,
            };

            rechargeCardExport(params).then(response => {
                this.$message.success('操作成功！');
                location.href = response.path;
            }).catch(err => this.$message.error('操作失败！'));
        };
    }

    handelDetail(row) {
        this.goPage('CardDetail', {formData: {recordUuid: row.uuid}});
    }

    refreshVIPAndChannel() {
        this.loading = true;
        this.$store.dispatch('rechargeCard/vipAndChannels').then(response => {
            // console.log(response);
            const {channelNos, vipDays} = response;

            vipDays && vipDays.map(vipDay => {
                const {confName, confValue} = vipDay;
                this.tableActionSearch[3].options.push({value: confValue, label: confName});
            });

            channelNos && channelNos.map(channel => {
                const {uuid, name} = channel;
                uuid !== '' && this.tableActionSearch[4].options.push({value: uuid, label: name});
            });

            this.loading = false;
        }).catch(err => this.loading = false);
    }
}

@Component({name: 'CardDetail'})
class CardDetail extends BasePage {
    tableAction = 'rechargeCard/recordCards/RefreshPage';

    viewRule = [
        {columnKey: 'cardNo', label: '卡号', minWidth: 120},
        {columnKey: 'createTime', label: '生成时间', minWidth: 170},
        {columnKey: 'startTime', label: '有效期', minWidth: 170, formatter: (r, h) => {
                return r.startTime + ' - ' + r.endTime;
            }},
        {columnKey: 'password', label: '密码', minWidth: 170},
        {columnKey: 'vipName', label: '会员套餐', minWidth: 170},
    ];

    @State(state => state.rechargeCardManage.rechargeCardRecordCardsList) tableData;

    created() {
        this.tableActionSearchColumn = [{recordUuid: this.formData.recordUuid}];
    }

    render(h) {
        return <div>
            {
                this.topButtonHtml(h)
            }
            {
                this.tableHtml(h)
            }
        </div>;
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={f => {
                this.pageBack();
            }}>
                返回
            </el-button>
            <el-button className="filter-item" onClick={f => {
                this.dialogVisible = true;
                this.tipTxt = "确定要导出吗？";
                this.sureCallbacks = () => {
                    this.dialogVisible = false;
                    const params = {
                        recordUuid: this.formData.recordUuid,
                    };

                    rechargeCardExport(params).then(response => {
                        this.$message.success('操作成功！');
                        location.href = response.path;
                    }).catch(err => this.$message.error('操作失败！'));
                };
            }}>
                导出
            </el-button>
        </div>;
    }
}

@Component({name: 'CreateCard'})
class CreateCard extends BasePage {
    batchRestNumber = 0;
    isShowBatchValidTip = false;
    defaultFormData = {
        number: '',
        batch: '',
        channelNo: '',
        startTime: '',
        endTime: '',
        vipDays: '',
        remark: '',
        datePicker: '',
    };
    validateRule = {
        number: [
            {required: true, message: '请输入卡片数量'},
            {type: 'number', message: '必须为数字值'},
        ],
        batch: [
            {required: true, message: '请输入卡片批次'},
            {validator: (rule, value, callback) => {
                    const v = parseInt(value, 10);
                    if (!isNaN(v) && v > 0 && value.length === 2) {
                        callback();
                    } else {
                        callback(new Error('请输入大于0的2位数字'));
                    }
                }, trigger: 'blur'},
        ],
        channelNo: [
            {required: true, message: '请选择控制码'}
        ],
        vipDays: [
            {required: true, message: '请选择套餐类型'}
        ],
        datePicker: [
            {required: true, message: '请选择日期'},
        ]
    };

    editFun = rechargeCardSave;

    constructor() {
        super();
    }

    @Watch('formData.batch')
    onBatchChange() {
        const {batch} = this.formData;
        const v = parseInt(batch, 10);
        if (isNaN(v) || v <= 0 || batch.length !== 2) {
            this.batchRestNumber = 0;
            return;
        }
        this.submitLoading = true;
        const params = {
            batch,
        };
        getRechargeCardRestNum(params).then(res => {
            this.batchRestNumber = parseInt(res.restNumer, 10);
            this.submitLoading = false;
        }).catch(err => {
            this.submitLoading = false;
        });
    }

    render() {
        const {channelNos, vipDays} = this.$store.state.rechargeCardManage.rechargeCardVIPAndChannels;
        return (
            <JPanel title={'生成充值卡'}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">

                    <el-form-item label="批次：" prop="batch">
                        <el-input value={this.formData.batch} name="batch" placeholder="请输入两位数字如：01,11" />
                    </el-form-item>

                    <el-form-item label="数量：" prop="number">
                        <el-input value={this.formData.number} name="number" number disabled={this.batchRestNumber <= 0} placeholder={this.batchRestNumber > 0 ? `最多生成${this.batchRestNumber}张` : '请先输入批次'} onChange={v => this.isShowBatchValidTip = v > this.batchRestNumber || v <= 0} />

                        <div class="el-form-item__content" v-show={this.isShowBatchValidTip}>
                            <transition name="el-zoom-in-top">
                                <div class="el-form-item__error" >请输入不超过{this.batchRestNumber}张</div>
                            </transition>
                        </div>
                    </el-form-item>

                    <el-form-item label="有效时间：" prop="datePicker">
                        <el-date-picker
                            value={this.formData.datePicker}
                            type="datetimerange"
                            range-separator=" 至 "
                            placeholder="请输入有效起止日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            onInput={v => {
                                this.formData.datePicker = v;
                                this.formData.startTime = v[0];
                                this.formData.endTime = v[1];
                            }}
                        />
                    </el-form-item>

                    <el-form-item label="控制码：" prop="channelNo">
                        <el-select placeholder="请选择" value={this.formData.channelNo} onHandleOptionClick={f => this.formData.channelNo = f.value}>
                            <el-option label="0000" value="0000" key="default_0000" />
                            {channelNos.map(item => <el-option label={item.name} value={item.uuid} key={item.uuid}/>)}
                        </el-select>
                    </el-form-item>

                    <el-form-item label="会员套餐：" prop="vipDays">
                        <el-select placeholder="请选择" value={this.formData.vipDays} onHandleOptionClick={f => this.formData.vipDays = f.value}>
                            {vipDays.map(item => <el-option label={item.confName} value={item.confValue} key={item.confValue}/>)}
                        </el-select>
                    </el-form-item>

                    {/*<el-form-item label="备注" props="remark">
                        <el-input type="textarea" rows={2} placeholder="请选择" value={this.formData.remark} name='remark'/>
                    </el-form-item>*/}

                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.submitAddOrUpdate(() => {
                                this.pageBack();
                            });
                        }}>提交</el-button>
                        <el-button onClick={this.pageBack}>取消
                        </el-button>
                    </el-form-item>
                </el-form>
            </JPanel>
        );
    }
}

import {Component} from 'vue-property-decorator';
import BaseView from "../../components/common/BaseView";
import BasePage from "../../components/common/BasePage";
import {State} from "vuex-class";
import JPanel from "../../components/panel/JPanel";
import {userTagDelete, userTagSave, userTagSwitchEnable} from "../../api/userTag";

@Component({name: 'UserTagView'})
export default class UserTagView extends BaseView {
    created() {
        this.initialPages([
            <UserTagPage />,
            <UserTagEditPage />
        ]);
    }
}

@Component({name: 'UserTagPage'})
export class UserTagPage extends BasePage {
    tableAction = 'userTag/RefreshPage';
    viewRule = [
        {columnKey: 'tagName', label: '标签名称', minWidth: 120, sortable: true},
        {columnKey: 'tagCode', label: '标签值', minWidth: 120, sortable: true},
        {columnKey: 'isEnabled', label: '是否生效', minWidth: 120, formatter: (r, h) => {
                switch (r.isEnabled) {
                    case 1:
                        return '生效';
                    case 2:
                        return '禁用';
                    default:
                        return '';
                }
            }, inDetail: true},
        {columnKey: 'userNum', label: '关联用户数', minWidth: 120, inDetail: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 120, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 120, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 120, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
        {
            label: '操作',
            buttons: [
                {label: '编辑', type: 'edit'},
                {label: r => r.isEnabled === 1 ? '禁用' : '生效', type: 'del'},
            ],
            minWidth: 225,
        },
    ];
    tableActionSearch = [
        {column: 'tagName', label: '请输入标签名称', type: 'input', value: ''},
        {column: 'tagCode', label: '请输入标签值', type: 'input', value: ''},
    ];
    @State(state => state.userManage.userTagPage) tableData;
    selectItemIds = [];
    tableCanSelect = true;

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

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button className="filter-item" onClick={() => this.goPage('UserTagEditPage')} type="primary">
                添加
            </el-button>
            <el-button class="filter-item" onClick={this.deleteTags} type="danger" disabled={this.selectItemIds.length <= 0}>
                批量删除
            </el-button>
        </div>;
    }

    deleteTags() {
        this.dialogVisible = true;
        this.tipTxt = '确定要删除所选标签吗';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            userTagDelete({ids: this.selectItemIds.join(',')}).then(res => {
                this.successMsg('操作成功');
                this.loading = false;
                this.refreshTable();
            }).catch(err => this.loading = false);
        };
    }

    handelEdit(row) {
        this.goPage('UserTagEditPage', {formData: row});
    }

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = row.isEnabled === 1 ? '确定要禁用该标签吗？' : '确定要生效该标签吗';
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.loading = true;
            userTagSwitchEnable({id: row.id}).then(res => {
                this.successMsg('操作成功');
                this.loading = false;
                this.refreshTable();
            }).catch(err => this.loading = false);
        };
    }

    handleSelectionChange(selectItems) {
        this.selectItemIds = [];
        if (selectItems.length > 0) {
            selectItems.map(selectItem => this.selectItemIds.push(selectItem.id));
        }
    }
}

@Component({name: 'UserTagEditPage'})
export class UserTagEditPage extends BasePage {
    defaultFormData = {
        tagName: '',
        tagCode: '',
        isEnabled: 1,
    };
    validateRule = {
        tagName: [
            {required: true, message: '请输入名称'}
        ],
        tagCode: [
            {required: true, message: '请输入标签值'},
            {validator: function (rule, value, callback) {
                    // console.log("val", value);
                    if (value === '') {
                        callback(new Error('请输入标签值'));
                    } else {
                        callback();
                        // tagCodeExist({tagCode: value}).then(res => {
                        //     const {codeExist} = res;
                        //     if (codeExist === 1) { //已经存在
                        //         callback(new Error('标签值已存在'));
                        //     } else {
                        //         callback();
                        //     }
                        // });
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = userTagSave;

    render() {
        return (
            <JPanel title={`${this.formData.id ? "修改" : "添加"}标签项`}>
                <el-form class="small-space" model={this.formData} rules={this.validateRule} ref="addForm" label-position="right" label-width="180px">
                    <el-form-item label="标签名称：" prop="tagName">
                        <el-input value={this.formData.tagName} name="tagName" placeholder="请输入"/>
                    </el-form-item>
                    <el-form-item label="标签值：" prop="tagCode">
                        <el-input value={this.formData.tagCode} name="tagCode" placeholder="设置后不能修改" disabled={!!this.formData.id} />
                    </el-form-item>
                    <el-form-item label="是否生效：" prop="isEnabled">
                        <el-radio-group value={this.formData.isEnabled} name="isEnabled">
                            <el-radio value={1} label={1}>是</el-radio>
                            <el-radio value={2} label={2}>否</el-radio>
                        </el-radio-group>
                    </el-form-item>
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

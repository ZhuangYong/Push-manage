/**
 * Created by Zed on 2018/5/3.
 */
import {Component} from "vue-property-decorator";
import {State} from "vuex-class/lib/index";
import BasePage from "../../components/common/BasePage";
import BaseView from "../../components/common/BaseView";
import {
    tagCodeExist,
    tagDelete, tagDeleteActor,
    tagDeleteChannels, tagDeleteMedia, tagDeleteRankGroup,
    tagSave, tagSaveActor,
    tagSaveChannel, tagSaveMedia, tagSaveRankGroup,
    tagSwitchChannelEnabled,
    tagSwitchEnable
} from "../../api/tagManage";
import JPanel from "../../components/panel/JPanel";
import ChannelPage from "../commPages/channelPage";
import OwnMusicPage from "../commPages/ownMusicPage";
import ChooseMusicPage from "../commPages/chooseMusicPage";
import TypeGroupPage from "../commPages/typeGroupPage";
import ActorPage from "../commPages/actorPage";
import {actorPage} from "../../api/actor";
import {delAcotors, saveActors} from "../../api/group";

@Component({name: 'TagManageView'})
export default class TagManageView extends BaseView {
    created() {
        this.initialPages([
            <IndexPage/>,
            <EditTagManagePage />,
            <RelateChannelPage />,
            <AddChannelPage />,
            <TagRelateMediaPage />,
            <TagChooseMediaPage />,
            <TagRelateTypeGroupPage />,
            <TagChooseTypeGroupPage />,
            <TagRelateActorPage />,
            <TagChooseActorPage />,
        ]);
    }
}

@Component({name: 'IndexPage'})
class IndexPage extends BasePage {
    deleteIds = [];
    tableCanSelect = true;
    tableAction = 'tag/RefreshPage';
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
            }},
        {columnKey: 'hot', label: '热度', minWidth: 120, sortable: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 120, inDetail: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 120, inDetail: true},
        {columnKey: 'createName', label: '创建者', minWidth: 120, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 120, inDetail: true},
        {
            label: '操作',
            buttons: [
                {label: '编辑', type: 'edit'},
                {label: r => r.isEnabled === 1 ? '禁用' : '生效', type: 'del'},
                {label: '关联机型', type: 'devices'},
                {label: '关联歌曲', type: 'media'},
                {label: '关联分类组', type: 'typeGroup'},
                {label: '关联歌星', type: 'actor'},
            ],
            minWidth: 525,
        },
    ];

    tableActionSearch = [
        {column: 'tagName', label: '请输入标签名称', type: 'input', value: ''},
        {column: 'tagCode', label: '请输入标签值', type: 'input', value: ''},
    ];

    @State(state => state.tagManage.tagPageData) tableData;

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
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('EditTagManagePage');
            }}>
                添加
            </el-button>
            <el-button class="filter-item" type="primary" disabled={this.deleteIds.length <= 0} onClick={f => {
                this.dialogVisible = true;
                this.tipTxt = '确定要删除选中项吗？';
                this.sureCallbacks = () => {
                    this.dialogVisible = false;
                    this.loading = true;
                    tagDelete({ids: this.deleteIds.join(',')}).then(res => {
                        this.loading = false;
                        this.successMsg('操作成功');
                        this.refreshTable();
                    }).catch(err => this.loading = false);
                };
            }}>
                批量删除
            </el-button>
        </div>;
    }

    handelEdit(row) {
        this.goPage('EditTagManagePage', {formData: row});
    }

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要${row.isEnabled === 1 ? '禁用' : '生效'}当前标签吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            tagSwitchEnable({id: row.id}).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }

    handelDevices(row) {
        this.goPage('RelateChannelPage', {formData: row});
    }

    handelMedia(row) {
        this.goPage('TagRelateMediaPage', {formData: row});
    }

    handelTypeGroup(row) {
        this.goPage('TagRelateTypeGroupPage', {formData: row});
    }

    handelActor(row) {
        this.goPage('TagRelateActorPage', {formData: row});
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0)
            selectedItems.map(selectedItem => this.deleteIds.push(selectedItem.id));
        else this.deleteIds = [];
    }

}

@Component({name: 'TagRelateTypeGroupPage'})
class TagRelateTypeGroupPage extends TypeGroupPage {
    tableAction = 'tag/typeGroup/RefreshPage';
    oprateViewRule = [];
    defaultViewRule = [
        {columnKey: 'groupUuid', label: '歌星编号', minWidth: 120, sortable: true},
        {columnKey: 'groupName', label: '歌星名称', minWidth: 120, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, inDetail: true},
    ];
    tableActionSearch = [{
        column: 'rankGroupName', label: '请输入分类组名称', type: 'input', value: ''
    }];
    @State(state => state.tagManage.tagRankGroupPage) tableData;
    actorNos = [];
    tableCanSelect = true;

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
    }

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage('TagChooseTypeGroupPage', {formData: this.formData});
                }
            } type="primary">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.actorNos && this.actorNos.length)}>
                批量删除
            </el-button>
        </div>;
    }

    /**
     * 删除自定义分类中歌曲
     */
    submitDelSongs() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            tagDeleteRankGroup({ids: this.actorNos.join(','), tagCode: this.targetId}).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
            }).catch(() => this.submitLoading = false);
        };
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.id);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

@Component({name: 'TagChooseTypeGroupPage'})
class TagChooseTypeGroupPage extends TypeGroupPage {
    tableAction = 'tag/otherTypeGroup/RefreshPage';
    oprateViewRule = [];
    tableActionSearch = [{
        column: 'rankGroupName', label: '请输入分类组名称', type: 'input', value: ''
    }];
    tableCanSelect = true;
    created() {
        this.targetId = this.formData.tagCode;
    }
    actorNos = [];
    @State(state => state.tagManage.tagOtherRankGroupPage) tableData;

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveSongs} type="primary" disabled={this.actorNos.length <= 0}>
                选定
            </el-button>
        </div>;
    }

    submitSaveSongs() {
        this.submitLoading = true;
        tagSaveRankGroup({groupUuids: this.actorNos.join(','), tagCode: this.targetId}).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(err => this.submitLoading = false);
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.groupUuid);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

@Component({name: 'TagRelateActorPage'})
class TagRelateActorPage extends ActorPage {
    tableAction = 'tag/actor/RefreshPage';
    viewRule = [
        {columnKey: 'actorNo', label: '歌星编号', minWidth: 120, sortable: true},
        {columnKey: 'actorName', label: '歌星名称', minWidth: 120, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 170, inDetail: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 170, inDetail: true},
    ];
    tableActionSearch = [{
        column: 'actorName', label: '请输入歌星名称', type: 'input', value: ''
    }];

    @State(state => state.tagManage.tagActorPage) tableData;
    actorNos = [];
    tableCanSelect = true;

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
    }

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={
                () => {
                    this.goPage('TagChooseActorPage', {formData: this.formData});
                }
            } type="primary">
                批量添加
            </el-button>
            <el-button class="filter-item" onClick={this.submitDelSongs} type="danger" disabled={!(this.actorNos && this.actorNos.length)}>
                批量删除
            </el-button>
        </div>;
    }

    /**
     * 删除自定义分类中歌曲
     */
    submitDelSongs() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            tagDeleteActor({ids: this.actorNos.join(','), tagCode: this.targetId}).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
            }).catch(() => this.submitLoading = false);
        };
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.id);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

@Component({name: 'TagChooseActorPage'})
class TagChooseActorPage extends ActorPage {
    tableAction = 'tag/otherActor/RefreshPage';
    tableActionSearch = [{
        column: 'actorName', label: '请输入歌星名称', type: 'input', value: ''
    }];
    tableCanSelect = true;
    created() {
        this.viewRule.pop();
        this.targetId = this.formData.tagCode;
    }
    actorNos = [];
    @State(state => state.tagManage.tagOtherActorPage) tableData;

    topButtonHtml() {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" onClick={this.submitSaveSongs} type="primary" disabled={this.actorNos.length <= 0}>
                选定
            </el-button>
        </div>;
    }

    submitSaveSongs() {
        this.submitLoading = true;
        tagSaveActor({actorNos: this.actorNos.join(','), tagCode: this.targetId}).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(err => this.submitLoading = false);
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let actorNos = [];
            selectedItems.map(s => {
                actorNos.push(s.actorNo);
            });
            this.actorNos = actorNos;
        } else {
            this.actorNos = [];
        }
    }
}

@Component({name: 'TagRelateMediaPage'})
class TagRelateMediaPage extends OwnMusicPage {
    tableAction = 'tag/media/RefreshPage';
    @State(state => state.tagManage.tagMediaPage) tableData;
    chooseMusicPageName = 'TagChooseMediaPage';
    tableActionSearch = [];

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
        this.viewRule = [
            {columnKey: 'serialNo', label: '歌曲编号', minWidth: 120, sortable: true},
            {columnKey: 'mediaName', label: '歌曲名称', minWidth: 120, sortable: true},
        ];
    }

    /**
     * 删除自定义分类中歌曲
     */
    submitDelSongs() {
        this.dialogVisible = true;
        this.tipTxt = "确定要删除吗？";
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            tagDeleteMedia({ids: this.serialNos.join(','), tagCode: this.targetId}).then(res => {
                this.submitLoading = false;
                this.successMsg("删除成功");
                this.refreshTable();
            }).catch(() => this.submitLoading = false);
        };
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0) {
            let serialNos = [];
            selectedItems.map(s => {
                serialNos.push(s.id);
            });
            this.serialNos = serialNos;
        } else {
            this.serialNos = [];
        }
    }
}

@Component({name: 'TagChooseMediaPage'})
class TagChooseMediaPage extends ChooseMusicPage {
    tableAction = 'tag/otherMedia/RefreshPage';
    @State(state => state.tagManage.tagOtherMediaPage) tableData;
    tableActionSearch = [];

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
    }

    /**
     * 保存所选歌曲到分类下
     */
    submitSaveSongs() {
        this.submitLoading = true;
        tagSaveMedia({serialNos: this.serialNos.join(','), tagCode: this.targetId}).then(res => {
            this.submitLoading = false;
            this.successMsg("添加成功");
            this.pageBack();
        }).catch(() => this.submitLoading = false);
    }
}

@Component({name: 'RelateChannelPage'})
class RelateChannelPage extends ChannelPage {
    deleteIds = [];
    tableCanSelect = true;
    tableAction = 'tag/channel/RefreshPage';
    @State(state => state.tagManage.tagChannelData) tableData;
    tableActionSearch = [
        {column: 'channelName', label: '请输入机型名称', type: 'input', value: ''},
        {column: 'channelCode', label: '请输入机型值', type: 'input', value: ''},
    ];
    defaultViewRule = [
        {columnKey: 'channelName', label: '机型名称', minWidth: 190, sortable: true},
        {columnKey: 'channelCode', label: '机型值', minWidth: 120},
        {columnKey: 'isEnabled', label: '是否生效', formatter: r => {
                if (r.isEnabled === 1) return '是';
                if (r.isEnabled === 2) return '否';
                return '';
            }},
        {columnKey: 'createName', label: '创建者', inDetail: true},
        {columnKey: 'createTime', label: '创建日期', minWidth: 170, sortable: true, inDetail: true},
        {label: '操作', buttons: [{label: r => r.isEnabled === 1 ? '禁用' : '生效', type: 'del'}], minWidth: 144 },
    ];

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" type="primary" onClick={f => {
                this.goPage('AddChannelPage', {formData: this.formData});
            }}>
                添加机型
            </el-button>
            <el-button class="filter-item" type="primary" disabled={this.deleteIds.length <= 0} onClick={f => {
                this.deleteChannels(tagDeleteChannels, this.refreshTable);
            }}>
                批量删除
            </el-button>
        </div>;
    }

    handelDel(row) {
        this.dialogVisible = true;
        this.tipTxt = `确定要${row.isEnabled === 1 ? '禁用' : '生效'}当前标签与该机型的关联吗？`;
        this.sureCallbacks = () => {
            this.dialogVisible = false;
            this.submitLoading = true;
            tagSwitchChannelEnabled({tagCode: this.targetId, id: row.id}).then(res => {
                this.submitLoading = false;
                this.successMsg("操作成功");
                this.refreshTable();
            }).catch(err => {
                this.submitLoading = false;
                this.failMsg("操作失败");
            });
        };
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0)
            selectedItems.map(item => this.deleteIds.push(item.id));
        else this.deleteIds = [];
    }

    deleteChannels(editFun, suc) {
        this.submitLoading = true;
        const params = {
            tagCode: this.targetId,
            ids: this.deleteIds.join(',')
        };
        editFun(params).then(() => {
            this.successMsg('操作成功');
            suc && suc();
            this.submitLoading = false;
        }).catch(err => {
            this.failMsg('操作失败');
            this.submitLoading = false;
        });
    }
}

@Component({name: 'AddChannelPage'})
class AddChannelPage extends ChannelPage {
    tableAction = 'tag/otherChannel/RefreshPage';
    tableCanSelect = true;
    addIds = [];

    @State(state => state.tagManage.tagOtherChannelData) tableData;

    created() {
        this.targetId = this.formData.tagCode;
        this.tableActionSearchColumn = [{tagCode: this.targetId}];
    }

    topButtonHtml(h) {
        return <div class="filter-container table-top-button-container">
            <el-button class="filter-item" type="primary" disabled={this.addIds.length <= 0} onClick={f => {
                this.saveChannel(tagSaveChannel, this.pageBack);
            }}>
                批量添加
            </el-button>
        </div>;
    }

    saveChannel(editFun, suc) {
        this.submitLoading = true;
        const params = {
            tagCode: this.targetId,
            channelCodes: this.addIds.join(',')
        };
        editFun(params).then(() => {
            this.successMsg('操作成功');
            suc && suc();
            this.submitLoading = false;
        }).catch(err => {
            this.failMsg('操作失败');
            this.submitLoading = false;
        });
    }

    /**
     * 获取选择列
     * @param selectedItems
     */
    handleSelectionChange(selectedItems) {
        if (selectedItems.length > 0)
            selectedItems.map(item => this.addIds.push(item.code));
        else this.addIds = [];
    }
}

@Component({name: 'EditTagManagePage'})
class EditTagManagePage extends BasePage {
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
                        tagCodeExist({tagCode: value}).then(res => {
                            const {codeExist} = res;
                            if (codeExist === 1) { //已经存在
                                callback(new Error('标签值已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                }, trigger: 'blur'},
        ],
    };

    editFun = tagSave;

    constructor() {
        super();
    }

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

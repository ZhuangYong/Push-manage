import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView1';
import Vtable from '../../components/Table';
import {
    pushSave,
    getGroupList,
    getPushDevice
} from "../../api/push";
import {bindData, getPushType} from '../../utils/index';

const defaultFormData = {
    type: 1,
    method: 1,
    groupId: '',
    channelCode: '', //机型
    deviceUuid: '', //指定设备,
    title: '', //标题
    content: '', //内容
    pageId: '', //跳转页面
};

//页面选择
const pageViewRule = [
    {columnKey: 'name', label: '页面名称'},
    {columnKey: 'pageCode', label: '页面ID'},
    {columnKey: 'createName', label: '创建人'},
    {columnKey: 'status', label: '状态', minWidth: 80, formatter: r => {
        if (r.status === 1) return '生效';
        if (r.status === 2) return '禁用';
        if (r.status === 3) return '删除';
    }}
];

//设备选择
const deviceViewRule = [
    {columnKey: 'deviceId', label: '设备ID'},
    {columnKey: 'createTime', label: '创建时间'},
    {label: '操作', buttons: [{label: '选择', type: 'edit'}], minWidth: 80}
];

export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'id', label: '序号', minWidth: 70},
                {columnKey: 'content', label: '内容'},
                {columnKey: 'deviceUuid', label: '设备编号'},
                {columnKey: 'title', label: '标题'},
                {columnKey: 'createTime', label: '创建时间'},
                {columnKey: 'updateTime', label: '更新时间'}
            ],
            listDataGetter: function() {
                return this.system.pushManage; //先用升级调试
            },
            pageAction: 'push/RefreshPage',
            defaultFormData: defaultFormData, // 默认表单值
            tableCanSelect: false, // 表单项是否可以选择
            channelStatus: true,
            deviceStatus: false,
            msgStatus: false,
            groupList: [],
            channelList: [], //机型
            formData: {}, // 表单值
            deviceTable: false,
            deviceDefaultCurrentPage: 1,
            pageDefaultCurrentPage: 1,
            filters: {
                type: ''
            },
            deviceSelectedItems: [],
            pageTable: false,
            pageSelectedItems: [],
            pageName: ''
        };
    },
    mounted() {
        this.getGroupLists();
        this.getChannelList();
    },
    computed: {
        ...mapGetters(['system'])
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            return (
                <el-row>
                    <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                             ref="addForm" label-position="right" label-width="90px">
                        <el-form-item label="推送类型" prop="type">
                            <el-select placeholder="请选择" value={this.formData.type} name='type' onChange={() => {
                                if (this.formData.type === 4) {
                                    this.msgStatus = true;
                                } else {
                                    this.msgStatus = false;
                                    this.formData.title = '';
                                    this.formData.content = '';
                                    this.formData.pageId = '';
                                }
                            }}>
                                {
                                    getPushType().map(item => (
                                        <el-option
                                            key={item.value}
                                            label={item.label}
                                            value={item.value}>
                                        </el-option>
                                    ))
                                }
                            </el-select>
                        </el-form-item>
                        <el-form-item label="推送方式" prop="method">
                            <el-select placeholder="请选择" value={this.formData.method} name='method' onChange={() => {
                                if (this.formData.method === 1) { //机型
                                    this.channelStatus = true ;
                                    this.deviceStatus = false ;
                                    this.formData.groupId = '';
                                    this.formData.deviceUuid = '';
                                } else {
                                    this.deviceStatus = true ;
                                    this.channelStatus = false ;
                                    this.formData.channelCode = '';
                                }
                            }}>
                                <el-option label="机型" value={1} key={1}/>
                                <el-option label="设备组" value={2} key={2}/>
                            </el-select>
                        </el-form-item>
                        <div v-show={this.channelStatus}>
                            <el-form-item label="机型" prop="channelCode">
                                <el-select placeholder="请选择" value={this.formData.channelCode} name='channelCode'>
                                    {
                                        this.channelList && this.channelList.map(item => (
                                            <el-option
                                                key={item.id}
                                                label={item.name}
                                                value={item.code}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                        </div>

                        <div v-show={this.deviceStatus}>
                            <el-form-item label="设备组" prop="groupId">
                                <el-select placeholder="请选择" value={this.formData.groupId} name='groupId'>
                                    {
                                        this.groupList && this.groupList.map(item => (
                                            <el-option
                                                key={item.id}
                                                label={item.name}
                                                value={item.id}>
                                            </el-option>
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item label="指定设备" prop="deviceUuid">
                                <el-button class="filter-item" onClick={
                                    () => {
                                        this.deviceTable = true;
                                        this.$refs.Dtable && this.$refs.Dtable.refreshData({
                                            currentPage: this.defaultCurrentPages,
                                            deviceId: this.formData.groupId
                                        });
                                    }
                                } type="primary" disabled={!this.formData.groupId}>选择设备
                                </el-button>
                                {
                                    this.formData.deviceUuid ? <el-input type="textarea" value={this.formData.deviceUuid} name="deviceUuid"></el-input> : ''
                                }
                            </el-form-item>
                        </div>
                       <div v-show={this.msgStatus}>
                           <el-form-item label="标题" prop="title">
                                <el-input type="textarea" value={this.formData.title} name="title"></el-input>
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <el-input type="textarea" value={this.formData.content} name="content"></el-input>
                            </el-form-item>
                            <el-form-item label="跳转页面" prop="pageId">
                                <el-button onClick={() => {
                                    this.pageTable = true;
                                }}>选择</el-button>
                                <el-tag type="success" style="margin-left:10px" value={this.formData.pageId} name="pageId" v-show={this.pageName}>{this.pageName}</el-tag>
                            </el-form-item>
                       </div>

                        <el-form-item>
                            <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                            <el-button onClick={
                                () => {
                                    this.status = "list";
                                    this.channelStatus = true;
                                    this.deviceStatus = false;
                                    this.msgStatus = false;
                                    this.pageName = '';
                                }
                            }>取消
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog
                        title="选择设备"
                        visible={this.deviceTable}
                        width="30%">
                        <div class="filter-container">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.deviceTable = false;
                                }
                            } type="primary">返回</el-button>
                            <el-button class="filter-item" onClick={
                                () => {
                                    const deviceUuid = [];
                                    this.deviceSelectedItems && this.deviceSelectedItems.map(item => {
                                        deviceUuid.push(item.deviceId);
                                    });
                                    this.formData.deviceUuid = deviceUuid.join(',');
                                    this.deviceTable = false;

                                }
                            } type="primary">确定</el-button>
                        </div>
                        <Vtable ref="Dtable" pageAction={'device/RefreshPage'} data={this.system.deviceList}
                                defaultCurrentPage={this.deviceDefaultCurrentPage} viewRule={deviceViewRule} select={true} handleSelectionChange={this.handleDevice}/>
                    </el-dialog>
                    <el-dialog
                        title="选择页面"
                        visible={this.pageTable}
                        width="30%">
                        <div class="filter-container">
                            <el-button class="filter-item" onClick={
                                () => {
                                    this.pageTable = false;

                                }
                            } type="primary">返回</el-button>
                            <el-button class="filter-item" disabled={this.pageSelectedItems.length !== 1} onClick={
                                () => {

                                    this.formData.pageId = this.pageSelectedItems[0].pageCode;
                                    this.pageName = this.pageSelectedItems[0].name;
                                    console.log(this.formData.pageId);
                                    this.pageTable = false;
                                }
                            } type="primary">确定</el-button>
                        </div>
                        <Vtable ref="Ptable" pageAction={'page/RefreshPage'} data={this.system.pageManage}
                                defaultCurrentPage={this.pageDefaultCurrentPage} viewRule={pageViewRule} select={true} handleSelectionChange={this.handlePage}/>
                    </el-dialog>
                </el-row>
            );
        },
        filterHtml: function(h) {
            return (
                <el-form model={this.filters} inline ref="filterData">
                    <el-form-item label="">
                        <el-button class="filter-item" onClick={
                            () => {
                                this.status = "add";
                                this.formData = Object.assign({}, defaultFormData);
                                console.log(this.formData);
                            }
                        } type="primary" icon="edit">添加
                        </el-button>
                    </el-form-item>
                    <el-form-item label="" prop="type">
                        <el-select placeholder="请选择" value={this.filters.type} name='type'>
                            <el-option
                                label="全部类型"
                                value="">
                            </el-option>
                            {
                                getPushType().map(item => (
                                    <el-option
                                        label={item.label}
                                        value={item.value}>
                                    </el-option>
                                ))
                            }
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" onClick={() => {
                            this.$refs.Vtable.refreshData({
                                currentPage: 1,
                                type: this.filters.type
                            });
                        }}>搜索</el-button>
                    </el-form-item>
                </el-form>
            );
        },
        submitAddOrUpdate: function () {
            console.log(this.formData);
            // this.$refs.addForm.validate((valid) => {
            //     if (valid) {
            //         this.submitLoading = true;
            //         if (this.status === 'edit' || this.status === 'add') {
            //             pushSave(this.formData).then(response => {
            //                 this.$message({
            //                     message: this.status === 'add' ? "添加成功" : "修改成功",
            //                     type: "success"
            //                 });
            //                 this.submitLoading = false;
            //                 this.status = 'list';
            //             }).catch(err => {
            //                 this.submitLoading = false;
            //             });
            //         }
            //     } else {
            //         return false;
            //     }
            // });
        },
        getGroupLists: function() {
            getGroupList().then(res => {
                this.groupList = res;
            });
        },
        getChannelList: function() {
            this.$store.dispatch("fun/chanelList", '').then((res) => {
                this.channelList = res ;
            }).catch((err) => {
            });
        },
        handleDevice: function (selectedItems) {
            this.deviceSelectedItems = selectedItems;
        },
        handlePage: function (selectedItems) {
            this.pageSelectedItems = selectedItems;
        }
    }
});

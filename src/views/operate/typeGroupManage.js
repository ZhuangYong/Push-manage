import {mapGetters} from "vuex";
import BaseListView from '../../components/common/BaseListView';
import {bindData} from '../../utils/index';
import {adminTypeGroupDelete, adminTypeGroupGroupList, adminTypeGroupSave} from "../../api/typeGroupManage";
import {languageList} from "../../api/language";

const defaultData = {
    viewRule: [
        {columnKey: 'name', label: '分组名称', minWidth: 140, sortable: true},
        {columnKey: 'isEnabled', label: '状态', formatter: r => {
            if (r.isEnabled === 1) return '生效';
            if (r.isEnabled === 2) return '禁用';
        }, minWidth: 120},
        {columnKey: 'sort', label: '排序', minWidth: 140, sortable: true},
        {columnKey: 'createName', label: '创建者', minWidth: 140, sortable: true},
        {columnKey: 'createTime', label: '创建时间', minWidth: 180, sortable: true},
        {columnKey: 'updateName', label: '更新者', minWidth: 140, sortable: true},
        {columnKey: 'updateTime', label: '更新时间', minWidth: 180, sortable: true},
        {label: '操作', buttons: [{label: '编辑', type: 'edit'}, {label: '删除', type: 'del'}], minWidth: 144}
    ],
    tableCanSelect: false,
    defaultFormData: {
        id: null,
        name: null,
        isEnabled: 1,
        sort: null,
        isLeike: null,
        map: {
            nameKey: {},
        },
    },
    listDataGetter: function() {
        return this.operate.adminTypeGroupList;
    },
    pageActionSearch: [],
    pageActionSearchColumn: [],
    pageAction: 'adminTypeGroupList/RefreshPage'
};

const validRules = {
    name: [
        {required: true, message: '分组名称不能为空', trigger: 'blur'},
        {min: 1, max: 16, message: '请输入1-16位字符', trigger: 'blur'}
    ]
};

export default BaseListView.extend({
    data() {
        const _defaultData = Object.assign({}, defaultData);
        return {
            status: 'list',
            preStatus: [],
            viewRule: _defaultData.viewRule,
            listDataGetter: _defaultData.listDataGetter,
            pageActionSearch: _defaultData.pageActionSearch,
            pageActionSearchColumn: _defaultData.pageActionSearchColumn,
            defaultFormData: _defaultData.defaultFormData,
            tableCanSelect: _defaultData.tableCanSelect,
            pageAction: _defaultData.pageAction,
            formData: _defaultData.defaultFormData,
            pagination: _defaultData.pagination,
            loading: false,
            submitLoading: false,
            rules: validRules,
            delItemFun: adminTypeGroupDelete,
            editFun: adminTypeGroupSave
        };
    },
    computed: {
        ...mapGetters(['operate'])
    },
    mounted() {
        this.updateView();
    },
    updated() {
        this.updateView();
    },
    created() {
        this.loading = true;
        languageList().then(res => {
            this.lanList = res;
            this.loading = false;
        }).catch(e => this.loading = false);
    },
    methods: {

        /**
         * 新增、修改、查看页面模板
         * @param h
         * @returns {XML}
         */
        cruHtml: function (h) {
            if (this.status === 'editI18n') return this.cruI18n(h);
            const options = [
                {isEnabled: 1, label: "生效"},
                {isEnabled: 2, label: "禁用"}
            ];

            return <el-form v-loading={this.submitLoading || this.loading} class="small-space" model={this.formData}
                            ref="addForm" rules={this.rules} label-position="right" label-width="110px">
                {
                    this.lanList.length > 0 ? <el-form-item label="分组名称：" prop="name">
                        <el-row style="max-width: 440px">
                            <el-col span={12}>
                                <el-form-item prop="x">
                                    <el-input value={this.formData.map.nameKey[this.lanList[0].language]} placeholder="中文名称" onChange={v => this.formData.map.nameKey[this.lanList[0].language] = this.formData.name = v}/>
                                </el-form-item>
                            </el-col>
                            <el-col span={12}>
                                <el-form-item prop="width">
                                    <el-button type="primary" onClick={f => this.editI18n("txt",
                                        this.lanList.map(lanItem => {
                                            return {
                                                label: lanItem.name + "名称：",
                                                getValue: v => this.formData.map.nameKey[lanItem.language],
                                                onChange: v => this.formData.map.nameKey[lanItem.language] = v,
                                                placeholder: `请输入${lanItem.name}名称`,
                                            };
                                        })
                                    )} plain size="small">点击编辑多语言</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item> : ""
                }
                <el-form-item label="状态：">
                    <el-select placeholder={'请选择'} value={this.formData.isEnabled} name='isEnabled' disabled={parseInt(this.formData.isLeike, 10) === 1}>
                        {
                            options.map(item => <el-option
                                key={item.isEnabled}
                                label={item.label}
                                value={item.isEnabled}>
                            </el-option>)
                        }
                    </el-select>
                </el-form-item>

                <el-form-item label="排序" prop="sort">
                    <el-input value={this.formData.sort} name='sort' placeholder="请输入排序数"/>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" onClick={this.submitAddOrUpdate}>提交</el-button>
                    <el-button onClick={
                        () => {
                            this.status = "list";
                        }
                    }>取消
                    </el-button>
                </el-form-item>
            </el-form>;
        },

        /**
         * 新增、修改提交
         */
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) this.submitFormI18n();
            });
        },

    }
});

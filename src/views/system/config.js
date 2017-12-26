import {mapGetters} from 'vuex';
import BaseListView from '../../components/common/BaseListView';
import {save as configSave} from '../../api/config';
import {bindData} from '../../utils/index';

const defaultFormData = {
    confName: '',
    confValue: '',
    comment: '',
    type: 1 //1系统配置，2会员配置，3支付配置 ,4发票配置
};
export default BaseListView.extend({
    name: 'channelIndex',
    data() {
        return {
            viewRule: [
                {columnKey: 'id', label: 'ID', minWidth: 80, sortable: true},
                {columnKey: 'confName', label: '配置名称', minWidth: 160, sortable: true},
                {columnKey: 'confValue', label: '配置值', sortable: true},
                {columnKey: 'type', label: '类型', formatter: r => {
                    if (r.type === 1) return '系统配置';
                    if (r.type === 2) return '会员配置';
                    if (r.type === 3) return '支付配置';
                    if (r.type === 4) return '发票配置';
                }, minWidth: 120},
                {columnKey: 'comment', label: '备注', minWidth: 220},
                {label: '操作', buttons: [{label: '编辑', type: 'edit'}], minWidth: 80}
            ],
            validateRule: {
                confName: [
                    {required: true, message: '请输入配置名称'},
                    {min: 1, max: 32, message: '请输入1-16位字符'}
                ],
                confValue: [
                    {required: true, message: '请输入配置值'},
                    {min: 1, max: 16, message: '请输入1-16位字符'}
                ]
            },
            listDataGetter: function() {
                return this.system.configManage;
            },
            pageAction: 'config/RefreshPage',
            defaultFormData: defaultFormData,
            pageActionSearch: [
                {column: 'confName', label: '请输入配置名称', type: 'input', value: ''},
            ],
            tableCanSelect: false, // 表单项是否可以选择
            formData: {}
        };
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
              <el-form v-loading={this.loading} class="small-space" model={this.formData}
                       ref="addForm" rules={this.validateRule} label-position="right" label-width="180px">
                  <el-form-item label="配置名称" prop="confName">
                      <el-input value={this.formData.confName} name="confName"/>
                  </el-form-item>
                  <el-form-item label="配置值" prop="confValue">
                      <el-input value={this.formData.confValue} name="confValue"/>
                  </el-form-item>
                  <el-form-item label="备注" prop="comment">
                      <el-input value={this.formData.comment} name="comment"/>
                  </el-form-item>
                  <el-form-item label="类型" prop="type">
                      <el-select placeholder="请选择" value={this.formData.type} name='type'>
                          <el-option
                              value={1}
                              label="系统配置"
                              key={1}>
                          </el-option>
                          <el-option
                              value={2}
                              label="会员配置"
                              key={2}>
                          </el-option>
                          <el-option
                              value={3}
                              label="支付配置"
                              key={3}>
                          </el-option>
                          <el-option
                              value={4}
                              label="发票配置"
                              key={4}>
                          </el-option>
                      </el-select>
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
              </el-form>
          );
       },
        topButtonHtml: function (h) {
            return (
                this.status === "list" ? <div class="filter-container" style="float: left;margin: 12px 12px 12px 0;">
                    <el-button class="filter-item" onClick={
                        () => {
                            this.status = "add";
                            this.formData = Object.assign({}, this.defaultFormData);
                            this.owned = [];
                        }
                    } type="primary" icon="edit">添加
                    </el-button>
                </div> : ""
            );
        },
        submitAddOrUpdate: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    if (this.status === 'edit' || this.status === 'add') {
                        configSave(this.formData).then(response => {
                            this.$message({
                                message: this.status === 'add' ? "添加成功" : "修改成功",
                                type: "success"
                            });
                            this.submitLoading = false;
                            this.status = 'list';
                        }).catch(err => {
                            this.submitLoading = false;
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        updateView: function () {
            switch (this.status) {
                case 'list':
                    if (this.$refs.Vtable) {
                        this.$refs.Vtable.$on('edit', (row) => {
                            this.formData = row;
                            this.status = "edit";
                            this.loading = false;
                        });
                        this.$refs.Vtable.$on('pageChange', (defaultCurrentPage) => {
                            this.defaultCurrentPage = defaultCurrentPage;
                        });
                    }
                    break;
                case 'add':
                case 'edit':
                    bindData(this, this.$refs.addForm);
                    break;
                default:
                    break;
            }
        },
    }
});

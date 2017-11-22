    export default {
        name: 'confirm',
        props: {
            visible: {
                type: Boolean
            },
            tipTxt: {
                type: String
            },
            handelSure: {
                type: Function
            },
            handelCancel: {
                type: Function
            }
        },
        data() {
            return {
                _visible: this.visible
            };
        },
        watch: {
            visible: function () {
                this._visible = this.visible;
            }
        },
        mounted() {
            this.$refs.confirmDialog.$on('visible-change', this.onVisibleChange);
        },
        render() {
            return (
                <div class="dialog-container">
                    <div class="dialog-temp">
                        <el-dialog v-loading="loading" ref="confirmDialog" title="确认提示" visible={this._visible} width="30%">
                            <span>{this.tipTxt}</span>
                            <span slot="footer" class="dialog-footer">
                                    <el-button onClick={this.onCancel}>取 消</el-button>
                                    <el-button type="primary" onClick={this.onSur}>确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </div>
            );
        },
        methods: {
            onSur() {
                this.handelSure();
            },
            onCancel() {
                this.handelCancel();
            },
            onVisibleChange(visible) {
                if (visible) {
                    this._visible = true;
                } else {
                    this._visible = false;
                    this.handelCancel();
                }
            }
        }

    };

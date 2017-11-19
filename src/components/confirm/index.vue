<template>
    <div class="dialog-container">
        <div class="dialog-temp">
            <el-dialog
                title="确认提示"
                :visible.sync="dialogVisibles"
                width="30%">
                <span>{{ tipTxts }}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancelConfirm">取 消</el-button>
                    <el-button type="primary" @click="sureConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'confirm',
        props: {
            dialogVisible: {
                type: Boolean
            },
            tipTxt: {
                type: String
            },
            sureCallback: {
                type: Function
            }
        },
        data() {
            return {
                dialogVisibles: this.dialogVisible,
                tipTxts: this.tipTxt,
                sureCallbacks: this.sureCallback
            };
        },
        watch: {
            dialogVisible: function () {
                this.dialogVisibles = this.dialogVisible;
            },
            tipTxt: function () {
                this.tipTxts = this.tipTxt;
            },
            sureCallback: function () {
                this.sureCallbacks = this.sureCallback;
            }
        },
        mounted() {

        },
        methods: {
            sureConfirm() {
                this.sureCallback();
            },
            cancelConfirm() {
                this.$emit('cancelConfirm');
            }
        }

    };
</script>

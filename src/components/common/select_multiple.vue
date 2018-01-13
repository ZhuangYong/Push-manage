<template>
    <div class="el-select-multiple">
        <el-select v-model="checkedValue" multiple placeholder="请选择" @change="change">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>

    export default {
        name: 'selectMultiple',
        props: {
            options: {
                type: Array,
                require: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiChange: {
                type: Function,
                default: f => f
            }
        },
        data() {
            return {
                checkedValue: []
            };
        },
        methods: {
            change: function(v) {
                this.multiChange && this.multiChange(this.checkedValue);
                this.$emit('selectMultiple', this.checkedValue);
            }
        }
    };
</script>

<style>
</style>

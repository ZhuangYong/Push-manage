<template>
    <div class="el-select-multiple">
        <el-select v-model="checkedValue" multiple placeholder="请选择" @change="change">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                disabled="disabled">
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
            }

        },
        data() {
            return {
                checkedValue: []
            };
        },
        methods: {
            change: function(v) {
                this.$emit('selectMultiple', this.checkedValue);
            }
        }
    };
</script>

<style>
</style>

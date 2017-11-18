<template>
    <div class="table-container">
        <div class="table-temp">
            <el-table
                :data="dataLists"
                height="600"
                border
                style="width: 100%">
                <el-table-column
                    v-for="(item, index) in fields"
                    :prop="item"
                    :label="item"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="180"
                >
                    <template scope="scope">
                        <el-button size="small" v-for="(item, index) in operFields" :type="item.type"
                                   @click="item.fn === 'modifyInfo' ? modifyInfo(scope.$index, scope.row) : deleteInfo(scope.$index, scope.row)">
                            {{ item.name }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'table',
        props: {
            field: { //必传
                type: Array
            },
            dataList: { //必传
                type: Array
            },
            operField: { //必传
                type: Array
            }

        },
        data() {
            return {
                fields: this.field,
                dataLists: this.dataList,
                operFields: this.operField
            }
        },
        watch: {
            dataList: function () {
                this.dataLists = this.dataList;
            }
        },
        mounted() {
            console.log(this.dataList);
            console.log(this.operField)
        },
        methods: {
            modifyInfo(index, row) {
                this.$emit('modifyInfo', row);
            },
            deleteInfo(index, row) {
                this.$emit('deleteInfo', row);
            }
        }

    }
</script>

<template>
    <div class="page-container">
        <div class="page-temp">
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="listParams.currentPage"
                    :page-sizes="pageSizes"
                    :page-size="listParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalRows">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'pager',
        props: ["totalRow", "listParam"],
        data() {
            return {
                listParams: this.listParam,
                pageSizes: [10, 20, 30, 50, 100],
                totalRows: this.totalRow
            }
        },
        watch: {
        },
        methods: {
            handleSizeChange(val) {
                this.listParams.currentPage = 1;
                this.listParams.pageSize = val;
                this.$emit('updateData', {currentPage: this.listParams.currentPage, pageSize: this.listParams.pageSize});
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.listParams.currentPage = val;
                this.$emit('updateData', {currentPage: this.listParams.currentPage, pageSize: this.listParams.pageSize});
                console.log(`当前页: ${val}`);
            }
        }

    }
</script>

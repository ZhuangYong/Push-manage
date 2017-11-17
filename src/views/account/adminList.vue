<template>
    <div>
        <div v-if="flag">
            <div class="filter-container">
                <el-button class="filter-item" style="margin-left: 10px;"  type="primary"
                           icon="edit">添加
                </el-button>
            </div>

            <Tabletemp :field="field" :dataList="dataList" :operField="operField"></Tabletemp>
            <Pager  :totalRow="totalRow" :listParam="listParam" @updateData="updateData" ></Pager>
        </div>

    </div>
</template>
<script>
    import Tabletemp from 'components/table';
    import Pager from 'components/pager';
    import {getUserList} from 'api/user';
    export default {
        name: 'layout',
        components: {
            Tabletemp,
            Pager
        },
        data() {
            return {
                field: [
                    "id",
                    "loginName",
                    "type",
                    "userName"
                ],
                operField: [
                    {
                        name: "编辑",
                        fn: "modifyInfo",
                        type: "success"
                    },
                    {
                        name: "删除",
                        fn: "deleteInfo",
                        type: "danger"
                    }
                ],
                dataList: [],
                listParam: {
                    currentPage: 1,
                    pageSize: 10
                },
                totalRow: 0,
                flag: false
            }
        },
        created() {
            this.getDataList(this.listParam);
        },
        methods: {
            getDataList(postData) {
                getUserList(postData).then(response => {
                    var data = response.data;
                    this.dataList = response.data;
                    this.totalRow = response.totalRow;
                    this.flag = true ;

                });
            },
            updateData(msg) {
                this.listParam = msg;
                this.getDataList(this.listParam);
            }
        }

    }
</script>
<style>
    .filter-container {
        padding-top: 20px;
    }
</style>

<template>
    <div class="tree-container">
        <div class="tree-temp">
            <el-tree
                :data="dataLists"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                ref="tree"
                :default-checked-keys="owneds"
                highlight-current
                default-expand-all>
            </el-tree>
            <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tree',
        props: {
            dataList: {
                type: Array
            },
            owned: {
                type: Array
            }
        },
        data() {
            return {
                dataLists: [
                    {
                        id: '1',
                        name: '一行',
                        children: [
                            {
                                id: '2',
                                name: '子一'
                            },
                            {
                                id: '3',
                                name: '子二',
                                children: [
                                    {
                                        id: '4',
                                        name: '子子三'
                                    }
                                ]
                            }
                        ]
                    }],
                owneds: this.owned,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        watch: {
            dataList: function () {
//                this.dataLists = this.dataList;
            },
            owned: function () {
                this.owneds = this.owned;
            }

        },
        mounted() {
        },
        methods: {
            getCheckedKeys() {
                console.log(this.$refs.tree.getCheckedKeys());
            },
            getIds() {
                const data = this.dataLists;
                const hasChooseId = this.$refs.tree.getCheckedKeys(); //选中的id

            }
        }

    };
</script>




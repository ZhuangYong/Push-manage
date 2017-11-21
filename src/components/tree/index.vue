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
                owneds: [4],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            };
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
                this.getIds(this.dataLists, this.$refs.tree.getCheckedKeys());
            },
            getIds(data, ids) {
                //需求
                //第一步 按级别存好所有的节点
                //第二部 获得所有已经选中的节点
                //第三部 把选中的节点，一个一个的在里面找，把他下面的子节点从已经选中的节点中删除
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < ids.length; j++) {
                        console.log(data[i].id);
                        console.log(ids[j].id);
                        if (data[i].id === ids[j]) {
                            console.log("匹配成功");
                            console.log(ids[j]);
                        }

                    }
                }

            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            }

        }

    };
</script>




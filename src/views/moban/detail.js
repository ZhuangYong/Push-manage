import {mapGetters} from "vuex";

export default {
    data() {
        return {
            detailId: this.$route.params.id,
            detailData: {name: 'test'},
            testtt: "aaa"
        };
    },
    computed: {
        ...mapGetters(['resource'])
    },
    watch: {
        testtt: function () {
            console.log(this.testtt);
        }
    },
    created: function () {
        // this.detailData = this.resource.data.find(item => {
        //     if (item.id === this.detailId) return item;
        // }) || {};
    },
    render: function (h) {
        console.log(this.detailData);
        return (
            <el-form ref="form" model={this.detailData} label-width="80px">
                {this.testtt}
                <input type="text" vmodel={this.testtt}/>
                <el-form-item label="活动名称">
                    <el-input v-model={this.testtt}/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" onClick={
                        () => {
                            console.log(this.testtt);
                        }
                    }>提交</el-button>
                    <el-button onClick="resetForm('numberValidateForm')">重置</el-button>
                </el-form-item>
            </el-form>
        );
    },
    methods: {

    },
    props: {
        id: {
            type: String
        }
    },
};

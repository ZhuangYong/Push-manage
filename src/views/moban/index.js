import {mapGetters} from "vuex";
import Vtable from '../../components/Table';

const viewRule = [
    {columnKey: 'name', label: '名称', width: 140},
    {columnKey: 'createUser', label: '创建者'},
    {columnKey: 'description', label: '描述'},
    {columnKey: 'createTime', label: '创建日期', width: 170},
    {label: '操作', buttons: [{label: '编辑', type: 'edit'}]}
    ];

export default {
    data() {
        return {
        };
    },
    computed: {
        ...mapGetters(['resource'])
    },
    render() {
        return (
            <el-row>
                <Vtable pageAction={'resource/RefreshPage'} data={this.resource} select={false} viewRule={viewRule}/>
            </el-row>
        );
    },
    methods: {
    }
};

/**
 * Created by Zed on 2018/6/20.
 */
import {Component} from "vue-property-decorator";
import {WXMaterialPage} from "./material";

@Component({name: 'ChooseMaterialPage'})
export default class ChooseMaterialPage extends WXMaterialPage {

    tableCanSelect = true;

    handleSelectionChange(selectedItems) {
        if (selectedItems.length === 1) {
            const {name, id} = selectedItems[0];
            this.pageBack({formData: {materialTitle: name, materialId: id}});
        }
    }
}

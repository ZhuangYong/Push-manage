/**
 * Created by Zed on 2018/6/20.
 */
import {Component} from "vue-property-decorator";
import {WXImagePage} from "./image";

@Component({name: 'ChooseImagePage'})
export default class ChooseImagePage extends WXImagePage {

    tableCanSelect = true;

    handleSelectionChange(selectedItems) {
        if (selectedItems.length === 1) {
            const {image, id} = selectedItems[0];
            this.pageBack({formData: {image, materialId: id, materialTitle: ''}});
        }
    }
}

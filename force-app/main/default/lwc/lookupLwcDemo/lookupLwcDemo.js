import { LightningElement, track } from 'lwc';

export default class LookupLwcDemo extends LightningElement {

    @track oppRecord = {};
    @track dependentFilters = '';
    handleSelection(event) {
        event.stopPropagation();
        //unique-key passed in input is coming as key here
        //By passing ApiName of the field, we can make this function
        //dynamic for mutilple lookups on a single screen
        let fieldName = event.detail.data.key;

        //selected id passed by lookup component
        let selectedId = event.detail.data.selectedId;
        this.oppRecord[fieldName] = selectedId;

        //if AccountId is changed, refresh the dependent lookup
        if (fieldName === 'AccountId') {
            this.dependentFilters = 'AccountId = \'' + selectedId + '\'';
        }

        console.log('Record', this.oppRecord);
    }
}
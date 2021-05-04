import { LightningElement,track,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues  } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import CUSTOMER_CASE_OBJECT from '@salesforce/schema/Customer_Case__c';
import NAME_FIELD from '@salesforce/schema/Customer_Case__c.Name';
import ADDITIONAL_CLASS_REPRESENTATIVE from '@salesforce/schema/Customer_Case__c.AdditionalClassRep__c';
import USER_CASE_STATUS from '@salesforce/schema/Customer_Case__c.UserCaseStatusId__c';
import ASSIGNED_DATE from '@salesforce/schema/Customer_Case__c.DateAssigned__c';
import CASE from '@salesforce/schema/Customer_Case__c.Case__c';
import METHOD_OF_RECEIPT from '@salesforce/schema/Customer_Case__c.ReceiveMethodId__c';

export default class LdsCreateRecord extends NavigationMixin(LightningElement) {
    @track receivemethodvalue;
    @track userCaseStatusvalue;
    @track selectedCaseNumber;
    accountId;
    name = '';
    assignedDate;
    aditionalClassRepresenative = '';

    @wire(getObjectInfo, { objectApiName: CUSTOMER_CASE_OBJECT })
    objectInfo;


    @wire(getPicklistValues , { objectApiName: CUSTOMER_CASE_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: METHOD_OF_RECEIPT})
    methodOfReceipt;

    UserCaseStatushandleuChange(event) {
        this.userCaseStatusvalue = event.detail.value;
    }
    receiptMethodHandleChange(event){
        this.receivemethodvalue = event.detail.value;
    }

    handleNameChange(event) {
        this.accountId = undefined;
        
        if(event.target.label=='Name'){
            this.name = event.target.value;
        } 
        if(event.target.label=='Additional Class Representative'){
            this.aditionalClassRepresenative = event.target.value;
        }     
        if(event.target.label == 'Assigned Date' ){
            this.assignedDate = event.target.value;
        }
    }
    createAccount() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[ADDITIONAL_CLASS_REPRESENTATIVE.fieldApiName] = this.aditionalClassRepresenative;
        fields[ASSIGNED_DATE.fieldApiName] = this.assignedDate;
        fields[CASE.fieldApiName] = this.selectedCaseNumber;
       // fields[USER_CASE_STATUS.fieldApiName] = this.userCaseStatusvalue;
        fields[METHOD_OF_RECEIPT.fieldApiName] = this.receivemethodvalue;
        const recordInput = { apiName: CUSTOMER_CASE_OBJECT.objectApiName, fields };
        console.log(recordInput);
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: account.id,
                    objectApiName: 'Customer_Case__c',
                    actionName: 'view'
                },
            });

        })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
    myLookupHandle(event){
        event.stopPropagation();
        
        //selected id passed by lookup component
        this.selectedCaseNumber = event.detail.data.selectedId;
        
    }
    
}
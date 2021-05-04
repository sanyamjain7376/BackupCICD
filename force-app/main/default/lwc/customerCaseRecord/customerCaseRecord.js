import { LightningElement,track,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { createRecord } from 'lightning/uiRecordApi';
import { getPicklistValues  } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import CUSTOMER_CASE_OBJECT from '@salesforce/schema/Customer_Case__c';
import ADDITIONAL_CLASS_REPRESENTATIVE from '@salesforce/schema/Customer_Case__c.AdditionalClassRep__c';
import CLASS_REPRESENTATIVE from '@salesforce/schema/Customer_Case__c.ClassRep__c';
import USER_CASE_STATUS from '@salesforce/schema/Customer_Case__c.UserCaseStatusId__c';
import ASSIGNED_DATE from '@salesforce/schema/Customer_Case__c.DateAssigned__c';
import METHOD_OF_RECEIPT from '@salesforce/schema/Customer_Case__c.ReceiveMethodId__c';
import SIGNED_CLIENT from '@salesforce/schema/Customer_Case__c.SignedClient__c';
import NAMED_PLAINTIFF from '@salesforce/schema/Customer_Case__c.NamedPlaintiff__c';
import MARKETING_METHOD from '@salesforce/schema/Customer_Case__c.MarketingMethodId__c';
import LEAD_PLAINTIFF_NOT_APPOINTED from '@salesforce/schema/Customer_Case__c.LeadPlaintiffNotAppointedDate__c';
import LEAD_PLAINTIFF_MOVANT_DATE from '@salesforce/schema/Customer_Case__c.LeadPlaintiffMovantDate__c';
import LEAD_PLAINTIFF from '@salesforce/schema/Customer_Case__c.LeadPlaintiff__c';
import MATTER from '@salesforce/schema/Customer_Case__c.Matter__c';
import INTAKE from '@salesforce/schema/Customer_Case__c.Intake__c';


export default class CustomerCaseRecord extends NavigationMixin(LightningElement) {

    @track receivemethodvalue;
    @track userCaseStatusvalue;
    @track marketingMethodvalue;
    @track selectedMatter;
    @track customerCaseId;
    assignedDate;
    leadPlaintiff;
    leadPlaintiffMovantdate;
    leadplaintiffNotAppointed;
    namedPlaintff;
    additionalClassRepresenattive;
    classRepresentative;
    signedClient;


    @wire(getObjectInfo, { objectApiName: CUSTOMER_CASE_OBJECT })
    objectInfo;


    @wire(getPicklistValues , { objectApiName: CUSTOMER_CASE_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: METHOD_OF_RECEIPT})
    methodOfReceipt;

    @wire(getPicklistValues , { objectApiName: CUSTOMER_CASE_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: MARKETING_METHOD})
    marketingmethod;

    @wire(getPicklistValues , { objectApiName: CUSTOMER_CASE_OBJECT, recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: USER_CASE_STATUS})
    userCaseStatus;

    userCaseStatushandleuChange(event) {
        this.userCaseStatusvalue = event.detail.value;
    }
    receiptMethodHandleChange(event){
        this.receivemethodvalue = event.detail.value;
    }
    marketingMethodHandleChange(event){
        this.marketingMethodvalue = event.detail.value;
    }

    handleNameChange(event) {
       this.customerCaseId = undefined;
        
        if(event.target.label=='Assigned Date'){
            this.assignedDate = event.target.value;
        } 
        if(event.target.label=='Additional Class Representative'){
            this.additionalClassRepresenattive = event.target.value;
        }     
        if(event.target.label == 'Class Representative' ){
            this.classRepresentative = event.target.value;
        }
        if(event.target.label == 'Named PlaintIff'){
            this.namedPlaintff = event.target.value;
        }
        if(event.target.value =='Lead Plaintiff'){
            this.leadPlaintiff = event.target.value;
        }
        if(event.target.value =='Lead Plaintiff Movant'){
            this.leadPlaintiffMovantdate = event.target.value;
        }
        if(event.target.value =='Lead Plaintiff Not Appointed'){
            this.leadplaintiffNotAppointed = event.target.value;
        }
        if(event.target.value =='Signed Client'){
            this.signedClient  = event.target.value;
        }
    }

    createCustomerCase() {
        const fields = {};
        
        fields[MATTER.fieldApiName] = this.selectedMatter;
        fields[METHOD_OF_RECEIPT.fieldApiName] = this.receivemethodvalue;
        fields[MARKETING_METHOD.fieldApiName] = this.marketingMethodvalue;
        fields[USER_CASE_STATUS.fieldApiName] = this.userCaseStatusvalue;
        fields[ASSIGNED_DATE.fieldApiName] = this.assignedDate;
        fields[SIGNED_CLIENT.fieldApiName] = this.signedClient;
        fields[LEAD_PLAINTIFF.fieldApiName] = this.leadPlaintiff;
        fields[NAMED_PLAINTIFF.fieldApiName] = this.namedPlaintff;
        fields[CLASS_REPRESENTATIVE.fieldApiName] = this.classRepresentative;
        fields[ADDITIONAL_CLASS_REPRESENTATIVE.fieldApiName] = this.additionalClassRepresenattive;
        fields[LEAD_PLAINTIFF_MOVANT_DATE.fieldApiName] = this.leadPlaintiffMovantdate;
        fields[LEAD_PLAINTIFF_NOT_APPOINTED.fieldApiName] = this.LEAD_PLAINTIFF_NOT_APPOINTED;
        const recordInput = { apiName: CUSTOMER_CASE_OBJECT.objectApiName, fields };
        console.log(recordInput);
        console.log(createRecord(recordInput));
        createRecord(recordInput)
            .then(newCustomerCase => {
                this.customerCaseId = newCustomerCase.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Customer Case created',
                        variant: 'success',
                    }),
                );
            this[NavigationMixin.Navigate]({
                type: 'standard__recordPage',
                attributes: {
                    recordId: newCustomerCase.id,
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
        
       // selected id passed by lookup component
       this.selectedMatter = event.detail.data.selectedId;
        
   }


}
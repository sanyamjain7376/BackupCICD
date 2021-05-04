import { LightningElement, api,track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { reduceErrors } from 'c/ldsUtils';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import CUSTOMERCASE_OBJECT from '@salesforce/schema/CustomerCases__c';
import NAME from '@salesforce/schema/CustomerCases__c.Name';
import CASE from '@salesforce/schema/CustomerCases__c.Case__c';
import ADDITIONAL_CLASS_REPRESENTATIVE from '@salesforce/schema/CustomerCases__c.AdditionalClassRep__c';
import ASSIGNED_DATE from '@salesforce/schema/CustomerCases__c.DateAssigned__c';
import CLASS_REPRESENTATIVE from '@salesforce/schema/CustomerCases__c.ClassRep__c';
import LEAD_PLAINTIFF from '@salesforce/schema/CustomerCases__c.LeadPlaintiff__c';
import LEAD_PLAINTIFF_MOVANT_DATE from '@salesforce/schema/CustomerCases__c.LeadPlaintiffMovantDate__c';
//import LEAD_PLAINTIFF_NOT_APPOINTED_DATE from '@salesforce/schema/CustomerCase__c.LeadPlaintiffNotAppointedDate__c';
//import MARKETING_METHOD from '@salesforce/schema/CustomerCase__c.MarketingMethodId__c';
////import METHOD_OF_RECEIPT from '@salesforce/schema/CustomerCase__c.ReceiveMethodId__c';
import NAMED_PLAINTIFF from '@salesforce/schema/CustomerCases__c.NamedPlaintiff__c';
//import SIGNED_CLIENT from '@salesforce/schema/CustomerCase__c.SignedClient__c';
//import USER_CASE_STATUS from '@salesforce/schema/CustomerCase__c.UserCaseStatusId__c';
export default class CustomerCase extends NavigationMixin(LightningElement){

    //@track selectedCaseNumber;
    customerCaseId;
    aditionalClassRepresenative = '';
   // assignedDate ='';
   name =''
    classRepresentative ='';
    leadPlaintiff = '';
    leadPlaintiffMovantDate ='';
    LeadPlaintiffNotApponted ='';
    signedClient = '';
    namedPalintIff = '';
    
    

   customerCaseHandleChange(event) {
       // console.log(event.target.label);
       // console.log(event.target.value);        
       // if(event.target.label=='Assigned date'){
        //    this.assignedDate = event.target.value;
      //  }
        if(event.target.label=='Signed Client'){
            this.signedClient = event.target.value;
        }   
        if(event.target.label=='Lead PlaintIff'){
            this.leadPlaintiff = event.target.value;
        }
 
        if(event.target.label=='Named PlainIff'){
            this.namedPalintIff = event.target.value;
        }
        if(event.target.label=='Class Representative'){
            this.classRepresentative = event.target.value;
        }
        if(event.target.label=='Additional Class Representative'){
            this.aditionalClassRepresenative = event.target.value;
        }
        if(event.target.label=='Lead PlaintIff Movant'){
            this.leadPlaintiffMovantDate = event.target.value;
        }
         if(event.target.label=='Lead PlaintIff Not Appointed'){
            this.LeadPlaintiffNotApponted = event.target.value;
        }
        if(event.target.label=='Name'){
            this.name = event.target.value;
        }
                   
    }
        

     createLookupCustomerCaseAction(){
        // console.log(this.signedClient);
        //console.log(this.selectedCaseNumber);
        const fields = {};
       // fields[ASSIGNED_DATE.fieldApiName] = this.assignedDate;
        fields[ADDITIONAL_CLASS_REPRESENTATIVE.fieldApiName] = this.aditionalClassRepresenative;
        //console.log(fields);
        fields[NAME.fieldApiName] = this.name;
        fields[LEAD_PLAINTIFF.fieldApiName] = this.leadPlaintiff;
        fields[LEAD_PLAINTIFF_MOVANT_DATE.fieldApiName] = this.leadPlaintiffMovantDate;
        fields[LEAD_PLAINTIFF_NOT_APPOINTED_DATE.fieldApiName] = this.LeadPlaintiffNotApponted;
        fields[SIGNED_CLIENT.fieldApiName] = this.signedClient;
        fields[NAMED_PLAINTIFF.fieldApiName] = this.namedPalintIff;
        fields[CLASS_REPRESENTATIVE.fieldApiName] = this.classRepresentative;
        
       
       // fields[CASE.fieldApiName] = this.selectedCaseNumber;

        const recordInput = { apiName: CUSTOMERCASE_OBJECT.objectApiName, fields };
        console.log(recordInput);
        createRecord(recordInput)
            .then(customerCaseobj => {
               
               // console.log(customerCaseobj);
                this.customerCaseId = customerCaseobj.id;
               // console.log(this.customerCaseId);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Customer case created successfully..!',
                        variant: 'success',
                    }),
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: customerCaseobj.id,
                        objectApiName: 'Customer_Cases__c',
                        actionName: 'view'
                    },
                });

            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error',
                    }),
                );
            });
    }
    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }

     //  myLookupHandle(event){
     //   console.log(event.detail);
       // this.selectedCaseNumber = event.detail;
    //}
}
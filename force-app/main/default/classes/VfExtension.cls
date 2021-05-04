public class VfExtension {
    public id recordID{get;set;}
    public final Intake__c currentIntake;
    public string str{get;set;}
    public boolean err{get;set;}
    public VfExtension(ApexPages.StandardController controller)
    {
        recordID = ApexPages.CurrentPage().getParameters().get('id');
        list<Intake__c> crlst= [select id,name,Amount__c from Intake__c where id = : recordID];
        str=crlst[0].name;
        if(crlst[0].Amount__c!=null)
        {
            err=true;
            ApexPages.addmessage(new ApexPages.message(ApexPages.severity.FATAL,'Refund is Already Created'));
        }
        
        this.currentIntake = (Intake__c)controller.getRecord();
        System.debug(currentIntake);
    }
    public void Save(){
        
        Matter__c matterNew = new Matter__c();
        matterNew.Name = 'test';
        matterNew.Date__c = currentIntake.Refund_Date__c;
        insert matterNew;
        
        currentIntake.Matter__c = matterNew.Id;
        update currentIntake;
    }
}
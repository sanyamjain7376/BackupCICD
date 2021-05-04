public without sharing class CreateAccount {
    @future
    public static void insertacct(List<String> accountname){
        List<Account> accList = new List<Account>();
        for(String str : accountname){
            Account acc = new Account();
            acc.Name = str;
            accList.add(acc);
        }
        try{
            insert accList;
            User user = [SELECT Id ,Total_Number_of_Accounts__c FROM User WHERE Id =: userinfo.getUserId() limit 1];
            if(user != null){
                user.Total_Number_of_Accounts__c += acclist.size();   
                update user;
            }
        }
        catch(DMLException e){
            return;
        }
    }
    
}
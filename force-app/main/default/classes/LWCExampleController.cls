public inherited sharing class LWCExampleController {

    @AuraEnabled
    public static list<Account> readCSVFile(Id idContentDocument){
        list<Account> lstAccsToInsert = new list<Account>();
        if(idContentDocument != null) {
            
            // getting File Data based on document id 
            ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
            // split the file data
            list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

            for(Integer i = 1; i < lstCSVLines.size(); i++){
                Account objAcc = new Account();
                list<String> csvRowData = lstCSVLines[i].split(',');
                System.debug('csvRowData====> '+csvRowData);
                objAcc.Name = csvRowData[0]; // accName
                objAcc.Industry = csvRowData[1];
                objAcc.Rating = csvRowData[2];
                objAcc.Type = csvRowData[3];
                objAcc.Website = csvRowData[4];
                lstAccsToInsert.add(objAcc);
            }

            try{    
                if(!lstAccsToInsert.isEmpty()) {
                    insert lstAccsToInsert;
                }
            }
            catch (Exception ex) {
                throw new AuraHandledException(ex.getMessage());
            } 
        }
        return lstAccsToInsert;    
    }

    @AuraEnabled
    public static List<Wrapper> showCSVData(Id idContentDocument){

        List<Wrapper> result = new List<Wrapper>();
          // getting File Data based on document id 
          ContentVersion objVersion = [SELECT Id, VersionData FROM ContentVersion WHERE ContentDocumentId =:idContentDocument];
          // split the file data
          list<String> lstCSVLines = objVersion.VersionData.toString().split('\n');

          for(Integer i = 1; i < lstCSVLines.size(); i++){
              wrapper wrap = new wrapper();
              list<String> csvRowData = lstCSVLines[i].split(',');
              System.debug('csvRowData====> '+csvRowData);
              wrap.Name = csvRowData[0]; // accName
              wrap.Industry = csvRowData[1];
              wrap.Rating = csvRowData[2];
              wrap.Type = csvRowData[3];
              wrap.Website = csvRowData[4];
              result.add(wrap);
          }
          return result;
    }

    public class wrapper{
       @AuraEnabled public string Name;
       @AuraEnabled  public String Industry;
       @AuraEnabled  public String Rating;
       @AuraEnabled public String Type;
       @AuraEnabled  public String Website;

    }
}
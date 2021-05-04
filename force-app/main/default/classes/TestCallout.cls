@RestResource(urlMapping='/callout/*')
global with sharing class TestCallout {
    @HttpGet
    global static void getContract(){
        
        Account result =[ select id, (select Id,Title,ContentUrl from CombinedAttachments) from account where id ='0012w00000UZTFLAA5'];
        
        RestResponse res = RestContext.response;
        
          res.responseBody = Blob.valueOf(Json.serialize(result));
         res.statusCode = 200; 
        
        
    }
}
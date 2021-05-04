public class ContactController {
     @AuraEnabled(cacheable=true)
    public static list<contact> getContacts(){
        /*
        return [
            SELECT FirstName, LastName, Email
            FROM Contact
            ORDER BY Name
        ];
*/
        throw new AuraHandledException('Forced error');
    }

}
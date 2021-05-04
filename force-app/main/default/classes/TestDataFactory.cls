@isTest
public class TestDataFactory {
    public static List<String> accountName(Integer Num_Of_Accounts){
        List<String> accountnamelist = new List<String>();
        for(Integer i=0;i<Num_of_Accounts;i++){
            accountnamelist.add('TestAccount'+i);
        }
        return accountnamelist;
    }
    
    public static void createcase(Integer Num_of_cases){
        List<Case> caselist = new List<Case>();
        for(Integer i =0; i<Num_of_cases;i++){
            Case cs = new Case();
            cs.CreatedDate = Date.today().addDays(-30);
            cs.LastModifiedDate = Date.today().addDays(-20);
            cs.Status = 'open';
            caselist.add(cs);
        }
        insert caselist;
    }
}
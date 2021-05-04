@isTest
public class CreateAccountTest {
    @isTest 
    public static void accountTest(){
        List<String> accountNames = TestDatafactory.accountName(5);
        Test.startTest();
        CreateAccount.insertacct(accountNames);
        Test.stopTest();
        System.assertEquals(5,[SELECT COUNT() FROM Account]);
    }
    
}
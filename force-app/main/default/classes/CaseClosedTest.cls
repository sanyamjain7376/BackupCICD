@isTest
public class CaseClosedTest {
    @isTest public static void closedtestmethod(){
        TestDataFactory.createcase(10);
        Test.startTest();
        caseclosed cs = new caseclosed();
        Id batchId = Database.executeBatch(cs);
        Test.stopTest();
        System.assertEquals(10, [SELECT Count() from Case where Status ='open']);
    }
}
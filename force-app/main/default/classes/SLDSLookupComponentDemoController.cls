public class SLDSLookupComponentDemoController {
    
    public contact con{get;set;}
   
    
    /**
     * Constructor
    **/
    public SLDSLookupComponentDemoController(){
        con = new Contact( OwnerId = '00528000000MB72');
     
    }
    
    /**
     * Method to create a record
    **/
    public pagereference createRecord(){
        insert con;
        
        return new pagereference('/'+con.Id);
    }
}
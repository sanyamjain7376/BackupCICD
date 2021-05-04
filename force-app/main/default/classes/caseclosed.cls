global class caseclosed implements Database.Batchable<sObject> {
    public Database.QueryLocator start(Database.BatchableContext bc){
        String query = 'SELECT Id FROM Case WHERE LastModifiedDate < LAST_N_DAYS:15';
        return Database.getQueryLocator(query);
    }
     public void execute(Database.BatchableContext bc, List<Case> caselist){
         List<Case> updatedlist = new List<Case>();
         for(Case c : caselist){
             c.Status= 'closed';
             updatedlist.add(c);
         }
         update updatedlist;        
    }    
    public void finish(Database.BatchableContext bc){
        // execute any post-processing operations
    }    
    

}
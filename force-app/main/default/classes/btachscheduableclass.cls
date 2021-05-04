global class btachscheduableclass implements Schedulable {
    global void execute(SchedulableContext ctx){
        caseclosed ca = new caseclosed();
        Database.executeBatch(ca);
       // String cronStr = '0 0 * * * ';
        //String jobID = System.schedule('update case status', cronStr, ca); 
    }
}
public class ConvertStringtodate {
    
    public static datetime  getConvertDateTime(string strDT)
{

Map<string,integer> MapMonthList = new Map<string,integer>();
MapMonthList.put('January',1);
MapMonthList.put('February',2);
MapMonthList.put('March',3);
MapMonthList.put('April',4);
MapMonthList.put('May',5);
MapMonthList.put('June',6);
MapMonthList.put('July',7);
MapMonthList.put('August',8);
MapMonthList.put('September',9);
MapMonthList.put('October',10);
MapMonthList.put('November',11);
MapMonthList.put('December',12);

String[] strDTDivided = strDT.split(' ');
    System.debug(strDTDivided);
    for(String str : strDTDivided){
        System.debug(str);
    }

 
string month = String.ValueOf(MapMonthList.get(strDTDivided.get(1)));
string day = strDTDivided.get(2).replace(',', '');
string year = strDTDivided.get(3);

string hour = strDTDivided.get(4).split(':').get(0);
string minute = strDTDivided.get(4).split(':').get(1);
string second = '00';

if (strDTDivided.get(5) == 'PM')
{
hour = String.ValueOf(Integer.ValueOf(hour) + 12);
}
string stringDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
System.debug(datetime.valueOf(stringDate));
    Event ev = new Event();
     ev.StartDateTime = datetime.valueOf(stringDate);
     ev.DurationInMinutes = 5;
    insert ev;
    
return datetime.valueOf(stringDate);

}

  


}
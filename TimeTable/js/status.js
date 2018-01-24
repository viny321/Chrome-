var flag = false;
var timetablejson;

function status() {
    if(flag){
        return timetablejson;
    }else{
        
        flag = true;
    }
}